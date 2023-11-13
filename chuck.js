const tmi = require('tmi.js');

const options = {
  identity: {
    username: 'jimboslicechciago', // Update to your bot or your username
    password: '12345', // Update to your bot's OAuth token - use https://twitchapps.com/tmi/ to get this
  },
  channels: ['chuckthedjca'], // Update to your channel name you want to mod (can be your own also)
};

const client = new tmi.client(options);

client.connect();

// Store a list of known bot usernames to exclude
const knownBots = require('./knownBots'); // Import the list of known bots from knownBots.js

// Store a list of users who have already been welcomed
const welcomedUsers = new Set();

client.on('chat', (channel, user, message, self) => {
  // Ignore messages from the bot itself
  if (self) return;

  const username = user['username'];

  // Check if the message sender's username is in the exclusion list
  if (knownBots.includes(username)) {
    console.log(`Ignoring message from known bot: ${username}`);
    return;
  }

  // Check if the user is in the set of welcomed users
  if (!welcomedUsers.has(username)) {
    // Add the user to the list of welcomed users
    welcomedUsers.add(username);

    // Set a timeout to send the welcome message after 5 seconds
    setTimeout(() => {
      client.say(channel, `@${username} Welcome into the chat! Today is a great day!`);
    }, 5000); // 5000 milliseconds = 5 seconds
  }
});
