import mongoose from 'mongoose'

const Todo = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
})

export default mongoose.model('Todo', Todo, 'Todos')
