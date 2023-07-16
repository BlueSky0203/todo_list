const mongoose = require('mongoose')
require('dotenv').config(); // .env

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error')
})

db.once('open', () => {
  console.log('mongoDB connected')
})

module.exports = db