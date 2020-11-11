import 'source-map-support/register'
import * as uuid from 'uuid'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { createLogger } from '../../utils/logger'
import {
  generateUploadUrl,
  updateAttachmentUrl
} from '../../businessLogic/attachments'

const logger = createLogger('http-generateUploadUrl')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing Generate Upload Url', { event })

  const userId = '123'
  const todoId = event.pathParameters.todoId
  const attachmentId = uuid.v4()

  const uploadUrl = await generateUploadUrl(attachmentId)
  await updateAttachmentUrl(userId, todoId, attachmentId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      uploadUrl
    })
  }
}
