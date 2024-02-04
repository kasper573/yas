#!/usr/bin/env tsx

import path from "path";
import fs from "fs/promises";
import os from "os";
import tar from "tar";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { $ } from "execa";
import { err, ok, type Result } from "@yas/result";
import { publicizePackageJson } from "../src/publicizePackageJson";

async function tryReleaseIncubation({
  distFolder,
  preview = false,
}: {
  distFolder: string;
  preview?: boolean;
}) {
  const exitCode = await publicizePackageJson({
    async operation(pkg) {
      const [localTarball] = await npmPack(pkg.contents.name);
      const [latestTarball, currentVersion] = await npmPack(
        pkg.contents.name,
        "latest",
      );

      const result = await diffTarballs(localTarball, latestTarball);
      if (result.isOk()) {
        console.log("No changes detected. Skipping release.");
        return;
      }

      const nextVersion = bumpVersion(currentVersion);

      console.log(`Changes detected`);
      console.log(result.error);

      console.log(
        `Updating from version ${pkg.contents.version} to ${nextVersion}`,
      );

      if (!preview) {
        pkg.update((pkg) => (pkg.version = nextVersion));

        const tag = `${pkg.contents.name}@${nextVersion}`;

        const $$ = $({ stdio: "inherit" });
        await $$`pnpm publish --no-git-checks`;
        await $$`git add ./package.json`;
        await $$`git commit -m "Bump to ${tag}"`;
        await $$`git tag -a "${tag}"`;
        await $$`git push`;
      }
    },
    distFolder,
  });

  if (exitCode !== 0) {
    return exitCode;
  }

  return 0;
}

async function npmPack(packageName: string, versionQuery?: string) {
  const { stdout: tarballName } = await (versionQuery
    ? $`npm pack ${packageName}@${versionQuery}`
    : $`npm pack`);
  const tarball = await fs.readFile(tarballName);
  fs.unlink(tarballName);

  const packageVersion = tarballName.match(/-(\d+\.\d+\.\d+).tgz$/)?.[1];
  if (!packageVersion) {
    throw new Error(`Could not extract version from ${tarballName}`);
  }

  return [tarball, packageVersion] as const;
}

async function diffTarballs(
  a: Buffer,
  b: Buffer,
): Promise<Result<void, string>> {
  const dirA = tempFilename();
  const dirB = tempFilename();

  try {
    await unpackTarball(a, dirA);
    await unpackTarball(b, dirB);
    await $`diff -r ${dirA} ${dirB}`;
    return ok(void 0);
  } catch (e) {
    if (e !== null && typeof e === "object" && "stdout" in e) {
      return err(String(e.stdout));
    }
    throw e; // Unexpected error
  } finally {
    await fs.rm(dirA, { recursive: true });
    await fs.rm(dirB, { recursive: true });
  }
}

function bumpVersion(version: string) {
  const [major, minor, patch] = version.split(".").map((n) => Number(n));
  return `${major}.${minor}.${patch + 1}`;
}

async function unpackTarball(tarball: Buffer, outDir: string): Promise<void> {
  const file = tempFilename() + ".tgz";
  await fs.writeFile(file, tarball);
  try {
    await fs.mkdir(outDir);
    await tar.extract({ file, cwd: outDir });
  } finally {
    await fs.rm(file);
  }
}

const count = 0;
function tempFilename() {
  return path.resolve(
    os.tmpdir(),
    count + "_" + Math.random().toString(36).slice(2),
  );
}

const args = yargs(hideBin(process.argv))
  .options({
    distFolder: { type: "string", alias: "d", demandOption: true },
    preview: { type: "boolean", alias: "p" },
  })
  .parseSync();

tryReleaseIncubation(args).then(process.exit);
