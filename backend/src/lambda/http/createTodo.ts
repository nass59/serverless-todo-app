import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { createTodo } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

const logger = createLogger('http-create-todo')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing new Todo item', { event })

  const userId = '123'
  const newTodo: CreateTodoRequest = JSON.parse(event.body)

  const newTodoItem = await createTodo(newTodo, userId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item: newTodoItem
    })
  }
}
