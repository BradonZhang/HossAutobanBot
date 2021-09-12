import tmi from 'tmi.js';
import dotenv from 'dotenv';

dotenv.config();
const { TWITCH_AUTH_TOKEN } = process.env;
const BOT_USERNAME = 'FiresBotZ';
const CHANNEL = 'FiresBZ';

const opts = {
  identity: {
    username: BOT_USERNAME,
    password: TWITCH_AUTH_TOKEN,
  },
  channels: [CHANNEL],
};

const client = tmi.Client(opts);

client.on('connected', () => {
  console.log(`Successfully logged in as ${BOT_USERNAME} and looking at ${CHANNEL}'s chat!'`);
  client.say(CHANNEL, 'Logged in widepeepoHappy');
});

const banned: Array<string> = [];
const whitelist: Set<string> = new Set();

const isMod = (user: tmi.ChatUserstate) => user.mod || user['user-id'] === user['room-id'];
const isHoss = (username: string) => username.match(/\w*(h(o|0)ss|00312)\w*/gi);

const banHoss = (username: string) => {
  if (whitelist.has(username)) return;
  client.ban(CHANNEL, username, 'IP grabbing bot (hoss)');
  client.say(CHANNEL, `BOP ${username} was banned`);
  banned.push(username);
};

// No way to directly listen for follows in tmi.js
// This uses the message that StreamElements sends when someone follows
client.on('message', (channel, userstate, message, self) => {
  if (self) return;
  if (userstate.username && isHoss(userstate.username)) banHoss(userstate.username);
  if (message.includes('thanks so much for the follow!')) {
    if (userstate.username?.toLowerCase() !== 'streamelements') return;
    const username = message.split(' ')[0];
    console.log('New follower: ', username);
    if (isHoss(username)) banHoss(username);
    return;
  }
  const command = message.split(' ')[0];
  if (command === '!unban' && isMod(userstate)) {
    if (banned.length) {
      const username = banned.pop()!;
      whitelist.add(username);
      client.unban(channel, username);
      client.say(channel, `Oops! Unbanned ${username}`);
    }
  }
});

client.connect();
