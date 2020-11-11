import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('todos-access')

export class TodoAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly todoIndex = process.env.TODO_ID_INDEX
  ) {}

  async getTodoItem(todoId: string, userId: string): Promise<TodoItem> {
    logger.info('Getting todo by id', {
      todoId,
      TableName: this.todosTable
    })

    const data = await this.docClient
      .query({
        TableName: this.todosTable,
        IndexName: this.todoIndex,
        KeyConditionExpression: 'userId = :userId and todoId = :todoId',
        ExpressionAttributeValues: {
          ':userId': userId,
          ':todoId': todoId
        }
      })
      .promise()

    if (data.Items.length === 0) {
      throw new Error('Item does not exist')
    }

    return data.Items[0] as TodoItem
  }

  async getTodoItems(userId: string) {
    logger.info('Getting all todo items for an user', {
      userId,
      TableName: this.todosTable
    })

    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        IndexName: this.todoIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()

    return result.Items as TodoItem[]
  }

  async createTodo(todo: TodoItem): Promise<TodoItem> {
    logger.info('Creating todo', {
      todoId: todo.todoId,
      TableName: this.todosTable
    })

    await this.docClient
      .put({
        TableName: this.todosTable,
        Item: todo
      })
      .promise()

    return todo
  }

  async updateTodoItem(todoId: string, item: TodoItem, todoUpdate: TodoUpdate) {
    logger.info('Updating todo', {
      todoId,
      TableName: this.todosTable
    })

    const key = {
      userId: item.userId,
      createdAt: item.createdAt
    }

    logger.info('Updating todo with key', { key })

    await this.docClient
      .update({
        TableName: this.todosTable,
        Key: key,
        UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
        ExpressionAttributeNames: {
          '#name': 'name'
        },
        ExpressionAttributeValues: {
          ':name': todoUpdate.name,
          ':dueDate': todoUpdate.dueDate,
          ':done': todoUpdate.done
        }
      })
      .promise()
  }
}
