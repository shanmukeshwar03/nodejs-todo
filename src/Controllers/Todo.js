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
    const { content } = req.body
    if (!content) throw { id: 5 }
    const todo = await TodoModal.create({ content, user: req._id })
    res.send(todo)
  } catch (error) {
    next(error)
  }
}

const PatchTodo = async (req, res, next) => {
  try {
    const { _id, content, status } = req.body
    if (!_id || !content || !status) throw { id: 5 }
    const todo = await TodoModal.findByIdAndUpdate(_id, { content, status })
    if (!todo) throw { id: 2 }

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

export default { GetTodo, PostTodo, DeleteTodo, PatchTodo }
