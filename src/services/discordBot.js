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
  console.log("Glimpse is ready!");
});

client.login(process.env.DISCORD_TOKEN).catch((error) => {
  console.error("Login failed:", error);
});
