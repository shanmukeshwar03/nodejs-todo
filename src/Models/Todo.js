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
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    select: false,
    required: true,
  },
  client_id: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Todo', Todo, 'Todos')
