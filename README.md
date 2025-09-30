#HabibaLyricsBot (Template)

**Important:** This is a *template* project to help you run a Facebook Group helper bot locally.  
It uses browser automation (Puppeteer) to open Facebook and post messages. **Do not share your Facebook password or tokens with anyone.**

## What is included
- `bot.js` - main script (uses Puppeteer to open Facebook, post messages, and perform simple actions)
- `welcome.js` - helper for sending welcome messages
- `rules.js` - helper to show group rules (prints to console or posts to group)
- `reply.js` - simple reply handler (stub)
- `config.json` - configuration (put your info here)
- `package.json` - Node project file
- `.gitignore`

## Before you start (must read)
1. Install [Node.js (v16+)](https://nodejs.org/) on your computer or a server.
2. Put your Facebook account email/phone and password **only** in `config.json` (do NOT share this file).
3. This script uses Puppeteer to control a browser. Facebook may block automation or ask for verification. Use responsibly.
4. Running automated scripts can violate Facebook's terms. Use at your own risk.

## How to run (basic)
1. Extract the ZIP and open a terminal in the project folder.
2. Install dependencies:
   ```
   npm install
   ```
3. Open `config.json` and fill your details:
   - `facebook.email`
   - `facebook.password`
   - `groupUrl` â€” the full URL of your Facebook group (e.g. https://www.facebook.com/groups/xxxxx)
   - `phoneOrAdminLink` â€” a link or phone text you want to share publicly (optional)
4. Run the bot:
   ```
   node bot.js
   ```

## Features in this template
- Scheduled posting: the bot reads `schedule` from `config.json` and posts messages at chosen times (local time).
- Welcome helper: you can trigger sending a welcome message to the group via the helper.
- Rules printer: prints rules and can post them to the group.

## Limitations & Next steps
- This is a starting template. Facebook group automation (detecting joins/lefts) is fragile and may require custom selectors and testing.
- If you want full automation (welcome message when member joins), you need to:
  - host the bot on a server (always-on)
  - update selectors when Facebook changes layout
  - handle 2FA and security checks

## Security notes
- Never commit `config.json` with your real password to a public repository.
- Keep a backup of your account data and enable 2FA for safety.

Need help customizing? Tell me which message texts you want for Welcome, Left, and Posting schedule â€” I will update the files for you.
