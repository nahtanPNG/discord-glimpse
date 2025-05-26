import express from "express";
import { configDotenv } from "dotenv";
import { client } from "./services/discordBot.js";
import { parseUserBadges } from "./utils/parseBadge.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const guildId = "1207769265940209734";

    // Validate userId format
    if (!/^\d{17,19}$/.test(userId)) {
      return res.status(400).json({
        error: "Invalid user ID format",
      });
    }

    let userInfo = null;
    let publicFlags = 0;

    if (client.isReady()) {
      const guilds = guildId
        ? [client.guilds.cache.get(guildId)].filter(Boolean)
        : client.guilds.cache.values();

      for (const guild of guilds) {
        try {
          const member = await guild.members.fetch(userId);
          if (member) {
            publicFlags = member.user.flags?.bitfield || 0;

            userInfo = {
              id: member.user.id,
              username: member.user.username,
              displayName: member.user.displayName,
              discriminator: member.user.discriminator,
              hexAccentColor: member.user.hexAccentColor,
              avatar: member.user.avatarURL({ size: 1024 }),
              banner: member.user.bannerURL({ size: 1024 }),
              bot: member.user.bot,
              system: member.user.system,
              createdAt: member.user.createdTimestamp,
              publicFlags: publicFlags,
              badges: parseUserBadges(publicFlags),
              presence: member.presence
                ? {
                    status: member.presence.status,
                    activities: member.presence.activities.map((activity) => ({
                      name: activity.name,
                      type: activity.type,
                      details: activity.details,
                      state: activity.state,
                      url: activity.url,
                    })),
                  }
                : null,
            };
            break;
          }
        } catch (error) {
          res.status(404).json({
            success: false,
            message: `User not found in guild`,
          });
        }
      }
    }

    res.json({
      success: true,
      data: userInfo,
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

const startServer = async () => {
  if (!client.isReady()) {
    console.log("Waiting for Discord bot to be ready...");
    await new Promise((resolve) => {
      client.once("ready", resolve);
    });
  }

  app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
    console.log(`User info: http://localhost:${PORT}/user/:userId`);
  });
};

startServer().catch(console.error);
