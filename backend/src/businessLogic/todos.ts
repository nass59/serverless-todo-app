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
  const item = await todoAccess.getTodoItem(todoId, userId)

  logger.info('Updating Todo item', {
    userId,
    todoId,
    todo: item,
    changes: updateTodoRequest
  })

  checkUserPermissions(item.userId, userId, todoId)

  if (item.userId !== userId) {
    logger.error('User does not have permission to delete a todo', {
      userId,
      todoId
    })
    throw new Error('You are not authorized to update this item')
  }

  await todoAccess.updateTodoItem(todoId, item, updateTodoRequest as TodoUpdate)
}

export async function deleteTodo(userId: string, todoId: string) {
  const item = await todoAccess.getTodoItem(todoId, userId)

  logger.info('Deleting Todo item', {
    userId,
    todoId
  })

  checkUserPermissions(item.userId, userId, todoId)

  await todoAccess.deleteTodoItem(todoId, userId, item.createdAt)
}

const checkUserPermissions = (
  itemUserId: string,
  userId: string,
  todoId: string
) => {
  if (itemUserId !== userId) {
    logger.error('User does not have permission to do this action', {
      itemUserId,
      userId,
      todoId
    })
    throw new Error('You are not authorized to update this item')
  }
}
