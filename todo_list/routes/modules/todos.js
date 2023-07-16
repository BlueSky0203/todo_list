const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id) // 從資料庫查找出資料
    .lean() // 把資料轉換成單純JS物件
    .then(todo => res.render('detail', { todo })) // 把資料送給前端樣板
    .catch(error => console.log(error)) // 錯誤處理
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// edit
router.put('/:id', (req, res) => {
  const id = req.params.id
  // 解構賦值 (destructuring assignment)
  const { name, isDone } = req.body

  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(()=> res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  return Todo.findByIdAndRemove(id) // function provided by Mongoose to find the todo by its ID and remove it from the database.
    .then(() => res.redirect('/'))
    .catch(error => console.log(error));
});

module.exports = router