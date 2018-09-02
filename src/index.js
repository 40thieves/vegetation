const post = require('./mastodon-client')
const getToots = require('./get-toots')

async function run() {
  try {
    let toots = await getToots()

    for (let toot of toots) {
      await post(toot.toot)
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = run
