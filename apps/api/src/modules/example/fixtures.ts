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

export function createRandomUsers(rand = createSeededRandom()) {
  return [
    {
      id: 1,
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: rand() * 1999,
      avatarUrl: randomAvatarUrl(0),
    },
    {
      id: 2,
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: rand() * 39,
      avatarUrl: randomAvatarUrl(1),
    },
    {
      id: 3,
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: rand() * 299,
      avatarUrl: randomAvatarUrl(2),
    },
    {
      id: 4,
      name: "William Kim",
      email: "will@email.com",
      amount: rand() * 99,
      avatarUrl: randomAvatarUrl(3),
    },
    {
      id: 5,
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: rand() * 39,
      avatarUrl: randomAvatarUrl(4),
    },
  ];
}

function randomString() {
  return Math.random().toString(36).substring(7);
}
