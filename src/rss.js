const got = require('got')
const FeedParser = require('feedparser')

function formatItem(item, feed) {
  return {
    toot: `${feed.get('name')} | ${item.title}: ${item.link}`,
    uuid: item.guid || item.id || item.link
  }
}

async function fetch(feed) {
  console.log(`FETCHING: ${feed.get('url')}`)

  let items = []

  return new Promise((resolve) => {
    got.stream(feed.get('url'))
      .on('error', (error) => console.error(error))
      .pipe(new FeedParser())
      .on('error', (error) => console.error(error))
      .on('readable', function () {
        let stream = this // UGGGGH
        let item

        while (item = stream.read()) {
          items.push(formatItem(item, feed))
        }

        resolve(items)
      })
  })
}

module.exports = fetch
