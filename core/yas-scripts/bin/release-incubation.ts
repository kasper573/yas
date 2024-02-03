#!/usr/bin/env tsx

import path from "path";
import fs from "fs/promises";
import os from "os";
import crypto from "crypto";
import tar from "tar";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { execaCommand as $ } from "execa";
import type { PackageJson } from "../src/publicizePackageJson";
import { publicizePackageJson } from "../src/publicizePackageJson";
import type { MutableResource } from "../src/createMutableResource";

async function releaseIncubation({ distFolder }: { distFolder: string }) {
  const exitCode = await publicizePackageJson({
    async operation(pkg) {
      const { local, latest } = await packageChanges(pkg.contents.name);
      if (local === latest) {
        console.log("No changes detected. Skipping release.");
        return;
      }

      // Update package.json with new version
      const newVersion = await bumpPackageVersion(pkg);

      // Release to npm
      console.log(`Releasing to npm: ${pkg.contents.name}@${newVersion}`);
      await $(`pnpm publish --no-git-checks`, { stdio: "inherit" });
    },
    distFolder,
  });

  if (exitCode !== 0) {
    return exitCode;
  }

  return 0;
}

async function packageChanges(packageName: string) {
  const localTarball = await npmPack("");
  const latestTarball = await npmPack(`${packageName}@latest`);
  const local = await hashTarball(localTarball);
  const latest = await hashTarball(latestTarball);
  if (local !== latest) {
    console.log(`Changes detected.\nLocal: ${local}\nLatest:${latest}`);
    console.log(await diffTarball(localTarball, latestTarball));
  }
  return { local, latest };
}

async function npmPack(args = "") {
  const { stdout: tarballName } = await $(`npm pack ${args}`);
  const tarball = await fs.readFile(tarballName);
  fs.unlink(tarballName);
  return tarball;
}

async function hashTarball(tarball: Buffer): Promise<string> {
  return crypto.createHash("sha1").update(tarball).digest("hex");
}

async function diffTarball(a: Buffer, b: Buffer): Promise<string> {
  const dirA = tempFilename();
  const dirB = tempFilename();

  try {
    await unpackTarball(a, dirA);
    await unpackTarball(b, dirB);
    await $(`diff -ru ${dirA} ${dirB}`);
    return "No difference";
  } catch (e) {
    if (e !== null && typeof e === "object" && "stdout" in e) {
      return String(e.stdout);
    }
    throw e; // Unexpected error
  } finally {
    await fs.rm(dirA, { recursive: true });
    await fs.rm(dirB, { recursive: true });
  }
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
  })
  .parseSync();

releaseIncubation(args).then(process.exit);
