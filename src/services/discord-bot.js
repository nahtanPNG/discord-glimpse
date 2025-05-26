import { configDotenv } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";

configDotenv();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", async () => {
  console.log("InfoBot is ready!");

  const userId = "457725135940616202";
  const guilds = client.guilds.cache;
  let member;

  for (const guild of guilds.values()) {
    const user = await guild.members.fetch(userId);
    if (user) {
      member = user;
      break;
    }
  }

  if (!member) {
    console.error("User not found");
    process.exit();
  }

  console.log(member.user.id);
  console.log(member.user.username);
  console.log(member.user.displayName);
  console.log(member.user.hexAccentColor);
  console.log(member.user.avatarURL());
  console.log(member.user.bannerURL());
  console.log(member.presence.status);
  console.log(member.presence.activities);
});

client.login(process.env.DISCORD_TOKEN).catch((error) => {
  console.error("Login failed:", error);
});
