# Vegetation 🍃

Mastodon RSS ([feed](https://en.wikipedia.org/wiki/Mastodon#Diet)) bot.

### Set up

1. `npm install`
2. Replace the `feeds.opml` file with your own (most RSS readers can provide 
you with this)
3. `npm run seed`
4. Get the access token for the account you want to post from (Settings > 
Development > New Application > give it a name & allow `write` > should appear
at the top)
5. Add the access key to the `.env` file
6. Set up a cron job for `npm run main` (Note: this won't post anything the first time you run it)
