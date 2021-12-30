import { Router } from 'express'
import TodoController from '../Controllers/Todo.js'
const router = Router()

router.get('/', TodoController.GetTodo)
router.post('/', TodoController.PostTodo)
router.put('/:_id', TodoController.PatchTodo)
router.patch('/:_id', TodoController.ToggleStatus)
router.delete('/:_id', TodoController.DeleteTodo)

export default router
