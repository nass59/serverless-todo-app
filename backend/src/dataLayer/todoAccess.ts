import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('todos-access')

export class TodoAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly todosTable = process.env.TODOS_TABLE
  ) {}

  async createTodo(todo: TodoItem): Promise<TodoItem> {
    logger.info(`Creating todo ${todo.todoId}`, {
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
}
