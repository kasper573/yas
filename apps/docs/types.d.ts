declare module "*.png" {
  const imageUrl: string;
  export default imageUrl;
}

declare module "*.webp" {
  const imageUrl: string;
  export default imageUrl;
}

declare module "*.scss" {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module "current-git-branch" {
  function currentGitBranch(): string;
  export = currentGitBranch;
}
