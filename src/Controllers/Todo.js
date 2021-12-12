import TodoModal from '../Models/Todo.js'

const GetTodo = async (req, res, next) => {
  try {
    const todos = await TodoModal.find({ user: req._id, status: false }).sort({
      date: 1,
    })
    await TodoModal.deleteMany({ user: req._id, status: true })
    res.send(todos)
  } catch (error) {
    next(error)
  }
}

const PostTodo = async (req, res, next) => {
  try {
    const { content, date } = req.body
    if (!content || !date) throw { id: 5 }
    const todo = await TodoModal.create({ content, user: req._id })
    res.send(todo)
  } catch (error) {
    next(error)
  }
}

const PatchTodo = async (req, res, next) => {
  try {
    const { _id, content, date } = req.body
    if (!_id || !content || !date) throw { id: 5 }
    const todo = await TodoModal.findByIdAndUpdate(_id, { content, date })
    if (!todo) throw { id: 2 }

    res.send('Ok')
  } catch (error) {
    next(error)
  }
}

const ToggleStatus = async (req, res, next) => {
  try {
    const { _id } = req.params
    if (!_id) throw { _id: 5 }
    const todo = await TodoModal.findById(_id)
    if (!todo) throw { id: 2 }

    todo.status = !todo.status
    await todo.save()
    res.send('Ok')
  } catch (error) {
    next(error)
  }
}

const DeleteTodo = async (req, res, next) => {
  try {
    const { _id } = req.params
    if (!_id) throw { id: 5 }
    const todo = await TodoModal.findByIdAndDelete(_id)
    if (!todo) throw { id: 2 }

    res.send('Ok')
  } catch (error) {
    next(error)
  }
}

export default { GetTodo, PostTodo, DeleteTodo, PatchTodo, ToggleStatus }
