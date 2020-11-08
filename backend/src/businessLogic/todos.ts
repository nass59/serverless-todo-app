import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todoAccess'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'

const todoAccess = new TodoAccess()
const logger = createLogger('todos')

export async function getTodos(userId: string): Promise<TodoItem[]> {
  logger.info('Getting all items for an user', { userId })

  return await todoAccess.getTodoItems(userId)
}

export async function createTodo(
  userId: string,
  createTodoRequest: CreateTodoRequest
): Promise<TodoItem> {
  logger.info('Creating new Todo item', {
    userId,
    todo: createTodoRequest
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

export async function updateTodo(
  userId: string,
  todoId: string,
  updateTodoRequest: UpdateTodoRequest
) {
  logger.info('Updating Todo item', {
    userId,
    todoId,
    todo: updateTodoRequest
  })

  const item = await todoAccess.getTodoItem(todoId)

  if (!item) {
    throw new Error('Item not found')
  }

  if (item.userId !== userId) {
    logger.error('User does not have permission to delete a todo', {
      userId,
      todoId
    })
    throw new Error('You are not authorized to update this item')
  }

  await todoAccess.updateTodoItem(todoId, updateTodoRequest as TodoUpdate)
}
