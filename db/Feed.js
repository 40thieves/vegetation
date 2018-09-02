const Sequelize = require('sequelize')
const sequelize = require('./connection')

const Feed = sequelize.define('feed', {
  name: { type: Sequelize.STRING },
  url: { type: Sequelize.TEXT },
  latest: { type: Sequelize.STRING }
}, {
  timestamps: false
})

module.exports = Feed
