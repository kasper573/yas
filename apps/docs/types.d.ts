declare module "*.png" {
  const imageUrl: string;
  export default imageUrl;
}

declare module "current-git-branch" {
  function currentGitBranch(): string;
  export = currentGitBranch;
}
