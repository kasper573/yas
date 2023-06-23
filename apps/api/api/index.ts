// This is Vercel's Serverless Function entrypoint

// Assume tsup has been run and the output is in dist/index.js
// (This is required because vercel doesn't play well with turborepo internal packages, so we must manually bundle)
export default require("../dist/index.js");
