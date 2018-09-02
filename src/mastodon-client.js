const got = require('got')

const MASTODON_BASE_URL = 'https://mastodon.social/api/v1'

async function post(status) {
  console.log(`POSTING: ${status}`)

  try {
    return await got.post('statuses', {
      baseUrl: MASTODON_BASE_URL,
      headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
      },
      form: true,
      body: { status }
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = post
