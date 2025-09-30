/**
 * bot.js
 * Basic Puppeteer-based template to login to Facebook and post scheduled messages to a group.
 *
 * WARNING: This is a template. Facebook may detect automation and block actions.
 * Fill config.json, run `npm install`, then `node bot.js`.
 */

const fs = require('fs');
const puppeteer = require('puppeteer');
const schedule = require('node-schedule');

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

async function loginFacebook(page) {
  await page.goto('https://www.facebook.com/login', {waitUntil: 'networkidle2'});
  await page.waitForSelector('#email');
  await page.type('#email', config.facebook.email, {delay: 50});
  await page.type('#pass', config.facebook.password, {delay: 50});
  await Promise.all([
    page.click('button[name="login"]'),
    page.waitForNavigation({waitUntil: 'networkidle2', timeout: 60000}).catch(()=>{})
  ]);
  console.log('Logged in (or attempted). Check browser window for verification.');
}

async function postToGroup(page, message) {
  const url = config.groupUrl;
  await page.goto(url, {waitUntil: 'networkidle2'});
  // Wait for the group composer. Selectors may change; update if needed.
  await page.waitForTimeout(3000);
  try {
    // Try a generic composer selector
    const composer = await page.$('[aria-label="Create a public post"]') || await page.$('[role="textbox"]');
    if (!composer) {
      console.log('Could not find composer textbox. You may need to update selectors for Facebook layout.');
      return;
    }
    await composer.focus();
    await page.keyboard.type(message, {delay: 30});
    await page.waitForTimeout(500);
    // Click Post button - selector may vary
    const buttons = await page.$$('div[aria-label="Post"]');
    if (buttons.length>0) {
      await buttons[0].click();
      console.log('Posted message to group.');
    } else {
      // fallback: press Ctrl+Enter (may or may not work)
      await page.keyboard.down('Control');
      await page.keyboard.press('Enter');
      await page.keyboard.up('Control');
      console.log('Tried to submit post via Ctrl+Enter.');
    }
  } catch (err) {
    console.log('Error posting to group:', err.message);
  }
}

async function start() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox','--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(60000);

  await loginFacebook(page);

  // Schedule posts based on config.postTimes every day
  config.postTimes.forEach(timeStr => {
    const [hour, minute] = timeStr.split(':').map(Number);
    const rule = new schedule.RecurrenceRule();
    rule.hour = hour;
    rule.minute = minute;
    rule.tz = 'Etc/Local';
    schedule.scheduleJob(rule, async () => {
      const dayName = new Date().toLocaleString('en-US', {weekday: 'long'});
      const daySchedule = config.schedule.find(s => s.day === dayName);
      const text = daySchedule ? daySchedule.message : 'Hello from HabibaLyricsBot!';
      await postToGroup(page, text + '\n\n' + '(This is an automated post)');
    });
  });

  console.log('Scheduler set. Bot is running. Keep this terminal open.');
}

start().catch(err => {
  console.error('Bot error:', err);
});
