const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  // 拿到全部的 todo 資料
  Todo.find() // 找出所有資料
    .lean() // 把 mongoose model 物件換成乾淨的 javascript 資料陣列
    .sort({ _id: 'asc'}) // desc
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

module.exports = router