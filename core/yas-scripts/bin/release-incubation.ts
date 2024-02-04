#!/usr/bin/env tsx

import path from "path";
import fs from "fs/promises";
import os from "os";
import tar from "tar";
import { $ } from "execa";
import { err, ok, type Result } from "@yas/result";
import {
  createPackageResource,
  makePackagePublishable,
} from "../src/makePackagePublishable";

const $$ = $({ stdio: "inherit" });

async function tryReleaseIncubation() {
  const pkg = createPackageResource(process.cwd());

  const ok = pkg.update((pkg) => makePackagePublishable(pkg, "dist"));
  if (!ok) {
    throw new Error("Failed to make package.json release ready");
  }

  const versionBeforeReleaseAttempt = pkg.contents.version;
  try {
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

    console.log("Changes detected: ", result.error);
    pkg.update((draft) => (draft.version = bumpVersion(currentVersion)));
    await $$`pnpm publish --no-git-checks`;
  } finally {
    pkg.restore((draft) => (draft.version = pkg.contents.version));
  }

  if (pkg.contents.version === versionBeforeReleaseAttempt) {
    console.log("Package version didn't change. Skipping git operations.");
    return;
  }

  const { name, version } = pkg.contents;
  const tag = `${name}@${version}`;
  const msg = `chore(${name}): bump package.json to ${version}`;
  await $$`git add ./package.json`;
  await $$`git ${["commit", "-m", msg]}`;
  await $$`git ${["tag", "-a", tag, "-m", `Release ${tag}`]}`;
  await $$`git push`;
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

let seed = 0;
function tempFilename() {
  return path.resolve(
    os.tmpdir(),
    ++seed + "_" + Math.random().toString(36).slice(2),
  );
}

tryReleaseIncubation();
