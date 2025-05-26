const FLAGS_BADGES = {
  DISCORD_EMPLOYEE: {
    id: "staff",
    flag: 1n << 0n,
    description: "Discord Staff",
    asset: "5e74e9b61934fc1f67c65515d1f7e60d",
  },
  PARTNERED_SERVER_OWNER: {
    id: "partner",
    flag: 1n << 1n,
    description: "Partnered Server Owner",
    asset: "3f9748e53446a137a052f3454e2de41e",
  },
  HYPESQUAD_EVENTS: {
    id: "hypesquad",
    flag: 1n << 2n,
    description: "HypeSquad Events",
    asset: "bf01d1073931f921909045f3a39fd264",
  },
  BUG_HUNTER_LEVEL_1: {
    id: "bug_hunter_level_1",
    flag: 1n << 3n,
    description: "Discord Bug Hunter",
    asset: "2717692c7dca7289b35297368a940dd0",
  },
  HOUSE_BRAVERY: {
    id: "hypesquad_house_1",
    flag: 1n << 6n,
    description: "HypeSquad Bravery",
    asset: "8a88d63823d8a71cd5e390baa45efa02",
  },
  HOUSE_BRILLIANCE: {
    id: "hypesquad_house_2",
    flag: 1n << 7n,
    description: "HypeSquad Brilliance",
    asset: "011940fd013da3f7fb926e4a1cd2e618",
  },
  HOUSE_BALANCE: {
    id: "hypesquad_house_3",
    flag: 1n << 8n,
    description: "HypeSquad Balance",
    asset: "956af597459b3d455a723796da19b16f",
  },
  EARLY_SUPPORTER: {
    id: "early_supporter",
    flag: 1n << 9n,
    description: "Early Supporter",
    asset: "7060786766c9c840eb3019e725d2b358",
  },
  BUG_HUNTER_LEVEL_2: {
    id: "bug_hunter_level_2",
    flag: 1n << 14n,
    description: "Discord Bug Hunter",
    asset: "848f79194d4be5ff5f81505cbd0ce1e6",
  },
  VERIFIED_BOT_DEVELOPER: {
    id: "verified_developer",
    flag: 1n << 17n,
    description: "Early Verified Bot Developer",
    asset: "6df5892e0f35b051f8b61eace34f4967",
  },
  ACTIVE_DEVELOPER: {
    id: "active_developer",
    flag: 1n << 22n,
    description: "Active Developer",
    asset: "6bdc42827a38498929a4920da12695d9",
  },
};

export function parseUserBadges(publicFlags) {
  if (!publicFlags) return [];

  const userFlags = BigInt(publicFlags);
  const badges = [];

  for (const badge of Object.values(FLAGS_BADGES)) {
    if (userFlags & badge.flag) {
      badges.push({
        id: badge.id,
        description: badge.description,
        asset: badge.asset,
        icon_image: `https://cdn.discordapp.com/badge-icons/${badge.asset}.png`,
      });
    }
  }

  return badges;
}
