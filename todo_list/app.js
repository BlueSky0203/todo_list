const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const app = express()

// exname副檔名 app.engine第一個parameter對照app.set的名字
app.engine('handlebars', engine({ defaultLayout: 'main', extname: '.handlebars'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(3000, () => {
  console.log('App is running')
})