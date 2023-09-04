const { z } = require("zod");

const schema = z.object({
  analytics: z.boolean(),
  docsUrl: z.string().url(),
  git: z
    .object({
      owner: z.string(),
      project: z.string(),
      branch: z.string(),
    })
    .transform((git) => {
      const projectUrl = `https://github.com/${git.owner}/${git.project}`;
      return {
        ...git,
        projectUrl,
        ownerUrl: `https://github.com/${git.owner}`,
        sourceUrl: (path) => `${projectUrl}/tree/${git.branch}${path}`,
      };
    }),
});

const env = schema.parse({
  analytics: process.env.VERCEL === "1",
  docsUrl: process.env.DOCS_URL ?? "http://localhost:3000",
  git: {
    owner: process.env.VERCEL_GIT_REPO_OWNER ?? "unknown-owner",
    project: process.env.VERCEL_GIT_REPO_SLUG ?? "unknown-project",
    branch: process.env.VERCEL_GIT_COMMIT_REF ?? "unknown-branch",
  },
});

module.exports = { env };
