require('dotenv').config()
const { promisify } = require('util')

const fs = require('fs')
const readFile = promisify(fs.readFile)
const parseOpml = promisify(require('node-opml-parser'))

const sequelize = require('./connection')
const Feed = require('./Feed')

async function parse() {
  let opml = await readFile('./feeds.opml')
  let feeds = await parseOpml(opml.toString())
  return feeds.map((feed) => ({
    name: sequelize.escape(feed.title),
    url: feed.feedUrl
  }))
}

async function seedDb(feeds) {
  await Feed.sync({ force: true }) // Drop table before inserting
  return Feed.bulkCreate(feeds, { validate: true })
}

(async () => {
  try {
    let feeds = await parse()
    let output = await seedDb(feeds)
    console.log(`\nInserted:\n${output.map(({ name }) => name).join(',\n')}`)
    let count = await Feed.count()
    console.log(`\nTotal records: ${count}`)
  } catch (err) {
    console.error(err)
  }
})()
