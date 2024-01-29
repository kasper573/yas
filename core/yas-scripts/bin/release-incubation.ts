#!/usr/bin/env tsx

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { execaCommand as $, execa } from "execa";
import type { PackageJson } from "../src/publicizePackageJson";
import { publicizePackageJson } from "../src/publicizePackageJson";
import type { MutableResource } from "../src/createMutableResource";

async function releaseIncubation({ distFolder }: { distFolder: string }) {
  const exitCode = await publicizePackageJson({
    async operation(pkg) {
      if (!(await hasChanges(pkg.contents.name))) {
        console.log("No changes detected. Skipping release.");
        return;
      }

      // Update package.json with new version
      const newVersion = await bumpPackageVersion(pkg);

      // Release to npm
      console.log(`Releasing to npm: ${pkg.contents.name}@${newVersion}`);
      await $(`pnpm publish --no-git-checks`, { stdio: "inherit" });

      // Commit the new package.json version
      const commitMessage = `ci: update ${pkg.contents.name} to ${newVersion}`;
      console.log(`Committing updated package version ${pkg.filePath}`);
      await $(`git add ${pkg.filePath}`, { stdio: "inherit" });
      await execa("git", ["commit", "-m", commitMessage], {
        stdio: "inherit",
      });
      await $(`git push`, { stdio: "inherit" });
    },
    distFolder,
  });

  if (exitCode !== 0) {
    return exitCode;
  }

  return 0;
}

async function hasChanges(packageName: string) {
  const { stdout: tarballName } = await $(`npm pack`);
  const { stdout: opensslOutput } = await $(`openssl sha1 ${tarballName}`);
  const [, local] = opensslOutput.split(" ");
  const { stdout: latest } = await $(
    `npm show ${packageName}@latest dist.shasum`,
  );
  return local !== latest;
}

async function bumpPackageVersion(pkg: MutableResource<PackageJson>) {
  const version = pkg.contents.version;
  const [major, minor, patch] = version.split(".").map((n) => Number(n));

  if (patch === undefined) {
    throw new Error(`Invalid version: ${version}`);
  }

  const newVersion = `${major}.${minor}.${patch + 1}`;

  console.log(`Bumping version from ${version} to ${newVersion}`);
  pkg.update((pkg) => {
    pkg.version = newVersion;
  });

  return newVersion;
}

const args = yargs(hideBin(process.argv))
  .options({
    distFolder: { type: "string", alias: "d", demandOption: true },
  })
  .parseSync();

releaseIncubation(args).then(process.exit);
