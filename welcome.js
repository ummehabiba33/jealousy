/**
     * welcome.js
     * Simple helper to send a welcome message to the group.
     * In this template we expose a function you can call from bot.js or manually.
     */
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

    module.exports = {
      getWelcomeText: function(name) {
        const msg = config.welcomeMessage || "à¦¸à§à¦¬à¦¾à¦—à¦¤à¦®!";
        return `${msg}\n
à¦†à¦ªà¦¨à¦¾à¦° à¦¨à¦¾à¦®: ${name}\nà¦¯à§‹à¦—à¦¾à¦¯à§‹à¦—: ${config.phoneOrAdminLink || ''}`;
      }
    };
