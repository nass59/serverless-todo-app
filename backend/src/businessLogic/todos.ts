import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todoAccess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { createLogger } from '../utils/logger'

const todoAccess = new TodoAccess()
const logger = createLogger('todos')

export async function getTodos(userId: string): Promise<TodoItem[]> {
  logger.info('Getting all items for an user', { userId })

  return await todoAccess.getTodoItems(userId)
}

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  logger.info('Creating new Todo item', {
    todo: createTodoRequest,
    userId
  })

  const todoId = uuid.v4()

  return await todoAccess.createTodo({
    todoId,
    userId,
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl: null,
    ...createTodoRequest
  })
}
