import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import * as uuid from 'uuid'
import * as AWS from 'aws-sdk'

import { createLogger } from '../../utils/logger'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

const logger = createLogger('http-create-todo')
const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  logger.info('Creating new Todo item', newTodo)

  const todoId = uuid.v4()

  const newTodoItem = {
    todoId,
    userId: '123',
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl: null,
    ...newTodo
  }

  await docClient
    .put({
      TableName: todosTable,
      Item: newTodoItem
    })
    .promise()

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newTodoItem
    })
  }
}
