#!/usr/bin/env tsx

import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import { execa } from "execa";
import { hideBin } from "yargs/helpers";
import yargs from "yargs";
import Bottleneck from "bottleneck";
import { colorize } from "../src/colorize";

const { include, exclude, maxConcurrent, force, type } = yargs(
  hideBin(process.argv),
)
  .usage(`Typechecks all workspaces that has a tsconfig. `)
  .option("maxConcurrent", {
    type: "number",
    description: "Max concurrent typechecked projects",
    default: 2,
  })
  .option("include", {
    type: "array",
    description: "Check only these packages",
  })
  .option("exclude", {
    type: "array",
    description: "Skip checking these packages",
    default: ["tsconfig"],
  })
  .option("force", {
    type: "boolean",
    description: "Force a full typecheck ignoring cache",
    default: false,
  })
  .option("type", {
    type: "string",
    choices: ["tsc", "lsp"] as const,
    default: "tsc" as const,
  })
  .parseSync();

const tsProjects = findTypescriptProjects(process.cwd(), { include, exclude });

const bottleneck = new Bottleneck({ maxConcurrent });

console.log(
  `🚀  Typechecking ${tsProjects.length} packages (${maxConcurrent} at a time)`,
);

const startTime = Date.now();
Promise.all(
  tsProjects.map((project) => bottleneck.schedule(typecheckProject, project)),
).then((results) => {
  const timeElapsedMs = Date.now() - startTime;
  console.log(createSummary(results, timeElapsedMs));
  if (results.some(({ result }) => !result.ok)) {
    process.exit(1);
  }
});

function createSummary(
  results: TypecheckResult[],
  timeElapsedMs: number,
): string {
  const sorted = results.toSorted((a, b) => {
    if (a.result.ok !== b.result.ok) {
      return a.result.ok ? -1 : 1;
    }
    const order = a.duration - b.duration;
    if (order !== 0) {
      return order;
    }
    return a.project.name.localeCompare(b.project.name);
  });

  const sum = sorted.reduce((sum, { duration }) => sum + duration, 0);

  let summary = sorted
    .map((r) => {
      const { workspace, name } = r.project;
      if (r.result.ok) {
        return `✅  ${workspace}/${name} - ${durationString(r.duration)}`;
      } else {
        return `❌  ${colorize(workspace)}/${colorize(name)}\n${
          r.result.error
        }`;
      }
    })
    .join("\n");

  summary += `\n\nSum: ${durationString(sum)}, Time Elapsed: ${durationString(timeElapsedMs)}`;

  return summary;
}

function durationString(ms: number): string {
  return `${(ms / 1000).toFixed(2)}s`;
}

type TypecheckResult = {
  project: TypescriptProject;
  duration: number;
  result: { ok: true } | { ok: false; error: string };
};

async function typecheckProject(
  project: TypescriptProject,
): Promise<TypecheckResult> {
  const start = Date.now();
  try {
    await typeCheckers[type](project);
    const duration = Date.now() - start;
    return { project, duration, result: { ok: true } };
  } catch (e) {
    const duration = Date.now() - start;
    const errorMessage = e instanceof Error ? e.message : String(e);
    return { project, duration, result: { ok: false, error: errorMessage } };
  }
}

const typeCheckers = {
  tsc: typecheckWithTSC,
  lsp: typecheckWithLSP,
} satisfies Record<string, (project: TypescriptProject) => void>;

async function typecheckWithTSC(project: TypescriptProject) {
  const args: string[] = ["--build", project.tsconfig, "--pretty", "--dry"];
  if (force) {
    args.push("--force");
  }

  await execa("tsc", args);
}

function typecheckWithLSP(project: TypescriptProject) {
  const configPath = ts.findConfigFile(
    project.tsconfig,
    ts.sys.fileExists,
    "tsconfig.json",
  );
  if (!configPath) {
    throw new Error("Could not find a valid 'tsconfig.json'.");
  }

  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  const configParseResult = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(configPath),
  );

  const program = ts.createProgram({
    rootNames: configParseResult.fileNames,
    options: configParseResult.options,
    projectReferences: configParseResult.projectReferences,
  });

  const errors: string[] = [];
  for (const diagnostic of ts.getPreEmitDiagnostics(program)) {
    if (diagnostic.file && diagnostic.start) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start,
      );
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n",
      );
      errors.push(
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`,
      );
    } else {
      errors.push(
        ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
}

function findTypescriptProjects(
  rootDir: string,
  {
    include,
    exclude,
  }: {
    include?: Array<string | number>;
    exclude?: Array<string | number>;
  },
): TypescriptProject[] {
  const { workspaces } = JSON.parse(
    fs.readFileSync(path.resolve(rootDir, "package.json"), "utf-8"),
  ) as { workspaces: string[] };

  const workspacePaths = workspaces.map((pattern) =>
    path.resolve(rootDir, pattern.replace("/*", "")),
  );

  return workspacePaths.flatMap((workspacePath) =>
    fs
      .readdirSync(workspacePath, { withFileTypes: true })
      .filter((file) => file.isDirectory())
      .map((file) => path.resolve(workspacePath, file.name))
      .map((packagePath) => ({ name: path.basename(packagePath), packagePath }))
      .filter(({ name }) => !include || include.includes(name))
      .filter(({ name }) => !exclude?.includes(name))
      .map(
        ({ name, packagePath }) => ({
          workspace: path.basename(workspacePath),
          name,
          tsconfig: path.resolve(packagePath, "tsconfig.json"),
        }),
        [] as TypescriptProject[],
      )
      .filter(({ tsconfig }) => fs.existsSync(tsconfig)),
  );
}

interface TypescriptProject {
  name: string;
  workspace: string;
  tsconfig: string;
}
