const Parser = require('rss-parser')

let parser = new Parser({
  headers: { 'Accept': '*' } // Some feeds don't handle the default nicely
})

function formatFeed(data, feed) {
  return data.items.map((item) => {
    return {
      toot: `${feed.get('name')} | ${item.title}: item.link`,
      uuid: item.guid || item.id || item.link
    }
  })
}

async function fetch(feed) {
  console.log(`FETCHING: ${feed.get('url')}`)

  // try {
  let data = await parser.parseURL(feed.get('url'))
  return formatFeed(data, feed)
  // } catch (e) {
  //   if (e.message === 'Invalid character in entity name') {
      
  //   }
  // }
}

module.exports = fetch
