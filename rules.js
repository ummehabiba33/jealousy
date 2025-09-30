*
 * rules.js
 * Helper to return or print rules. You can extend to post into group similarly.
 */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
  getRulesText: function() {
    const rules = config.rules || [];
    let out = "à¦—à§à¦°à§à¦ª à¦°à§à¦²à¦¸:\n";
    rules.forEach((r,i)=> out += `${i+1}. ${r}\n`);
    out += `\nAdmin contact: ${config.phoneOrAdminLink || ''}`;
    return out;
  }
};
