# HossAutobanBot
Twitch chatbot using Node.js that automatically bans followers with "hoss" or "h0ss" in their name (common IP-grabbing bots on Twitch).

# Installation

Create a bot account on Twitch. Grant it moderator privileges on your channel (using `/mod YourBotUsername`, replacing `YourBotUsername` with your bot's username). Then obtain an authentication token (which is used to log in as your bot) with [this guide](https://dev.twitch.tv/docs/authentication) (only the "Introduction" section is really needed here).

Download and install [Node.js](https://nodejs.org/).

Once `npm` is installed, run the following command to install CLI tools we need to run/test the bot:
```bash
npm i -g yarn nodemon ts-node
```

Clone this git repository. Run the following command to install the necessary dependencies:

```bash
yarn
```

In the outer directory (the same level as `package.json`, `README.md`, etc.), create a file called `.env` with the following contents (replace `your_token_here` with your bot's Twitch authentication token):

```env
TWITCH_AUTH_TOKEN=your_token_here
```

Set the value of `BOT_USERNAME` in `src/index.ts` to be your bot's username. Likewise, set the value of `CHANNEL` in `src/index.ts` to be your channel name.

### StreamElements

For this bot this work (at the moment), you need to have [StreamElements](https://streamelements.com/) (including Chat Alerts) enabled. Set your follow message to be something similar to:

```
{user} , thanks so much for the follow! <3
```

Note that `{user}` is at the start of the message. Edit line 32 of `src/index.ts` to include a key component of your follow message to make it recognizable. This will help the bot recognize when there's a new follower to the channel.

### Running the bot

To run the bot, use the following command:

```bash
yarn start
```

To run the bot in a testing environment (where the bot reloads itself if you modify files):
```bash
yarn test
```
