const _ = require('lodash')

const Feed = require('../db/Feed')
const fetch = require('./rss')

async function getFeeds() {
  return Feed.findAll()
}

function getUuid(str) {
  // Escape slashes (in urls) which cause problems with sqlite  
  return str.replace('/', '\\\/')
}

async function getTootsForFeed(feed) {
  let toots = []
  let posts = await fetch(feed)

  if (feed.get('latest')) {
    toots = toots.concat(
      _.takeWhile(posts, (post) => getUuid(post.uuid) !== feed.get('latest'))
    )
  }

  feed
    .set('latest', getUuid(posts[0].uuid))
    .save()
  
  return toots
}

async function getToots() {
  let toots = []

  for (let feed of await getFeeds()) {
    toots = toots.concat(await getTootsForFeed(feed))
  }

  return toots
}

module.exports = getToots
