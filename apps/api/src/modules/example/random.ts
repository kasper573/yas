export const randomAvatarUrl = (index: number) =>
  `https://picsum.photos/40/40?grayscale&random=${index}`;

export function createSeededRandom(seedStr = randomString()) {
  let seed = Array.from(seedStr).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );
  return () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}

function randomString() {
  return Math.random().toString(36).substring(7);
}
