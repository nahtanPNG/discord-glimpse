# DiscordGlimpse 👀

A RESTful API that provides quick access to Discord user profiles and information. Get user details, badges, presence status, and more with a simple HTTP request.

## ✨ Features

- 🔍 **User Profile Lookup** - Fetch detailed user information by Discord ID
- 🏆 **Badge Detection** - Automatically parse and display user badges (Staff, Nitro, Developer, etc.)
- 🟢 **Presence Status** - Real-time online status and activities
- 🎨 **Rich Profile Data** - Avatar, banner, accent colors, and more
- 🚀 **Fast & Lightweight** - Built with Express.js for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Discord Bot Token with appropriate permissions
- Access to the Discord server containing target users

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nahtanPNG/discord-glimpse.git
   cd discord-glimpse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   PORT=3000
   ```

4. **Start the server**
   ```bash
   # Development (with auto-reload)
   npm run dev
   
   # Production
   npm start
   ```

## 📖 API Documentation

### Get User Information

**Endpoint:** `GET /user/:userId`

**Parameters:**
- `userId` (string): Discord user ID (17-19 digits)

**Example Request:**
```bash
curl http://localhost:3000/user/457725135940616202
```

**Example Response:**
```json
{
    "success":true,
    "data": {
        "id":"457725135940616202",
        "username":"nahtanpng",
        "displayName":"nathan",
        "discriminator":"0",
        "avatar":"https://cdn.discordapp.com/avatars/457725135940616202/712d13f013a8c45556c7d08b60a6c6aa.webp?size=1024",
        "bot":false,
        "system":false,
        "createdAt":1529200576530,
        "publicFlags":4194368,
        "badges":[
            {
                "id":"hypesquad_house_1",
                "description":"HypeSquad Bravery",
                "asset":"8a88d63823d8a71cd5e390baa45efa02",
                "icon_image":"https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png"
            },
            {
                "id":"active_developer",
                "description":"Active Developer",
                "asset":"6bdc42827a38498929a4920da12695d9",
                "icon_image":"https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png"
            }
        ],
        "presence":{
            "status":"dnd",
            "activities":[
                {
                    "name":"Custom Status",
                    "type":4,
                    "details":null,
                    "state":"meu problema é saber um pouco de tudo e muito de nada",
                    "url":null
                }
            ]
        }
    }
}
```

### Error Responses

**Invalid User ID:**
```json
{
  "error": "Invalid user ID format"
}
```

**User Not Found:**
```json
{
  "success": false,
  "message": "User not found in guild"
}
```

**Server Error:**
```json
{
  "error": "Internal server error",
  "message": "Detailed error message"
}
```

## 🏆 Supported Badges

DiscordGlimpse automatically detects and parses the following Discord badges:

| Badge                | Description                   |
| -------------------- | ----------------------------- |
| 🛡️ Staff              | Discord Employee              |
| 🤝 Partner            | Partnered Server Owner        |
| 🎉 HypeSquad Events   | HypeSquad Event Attendee      |
| 🐛 Bug Hunter         | Bug Hunter Level 1 & 2        |
| 💜 Early Supporter    | Discord Nitro Early Supporter |
| ⚖️ Balance            | HypeSquad House Balance       |
| 💎 Brilliance         | HypeSquad House Brilliance    |
| 💪 Bravery            | HypeSquad House Bravery       |
| 👨‍💻 Verified Developer | Early Verified Bot Developer  |
| 🔨 Active Developer   | Active Developer              |

## 🔧 Configuration

### Bot Permissions Required

Your Discord bot needs the following permissions:
- `View Server`
- `Read Message History` 
- `View Server Members`

### Guild Configuration

Update the `guildId` in `src/main.js` to match your Discord server:
```javascript
const guildId = "YOUR_GUILD_ID_HERE";
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ by [nahtanPNG](https://github.com/nahtanPNG)**

*Give this project a ⭐ if you found it helpful!*
