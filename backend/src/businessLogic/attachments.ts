import { AttachmentAccess } from '../dataLayer/attachmentAccess'
import { TodoAccess } from '../dataLayer/todoAccess'
import { createLogger } from '../utils/logger'

const attachmentAccess = new AttachmentAccess()
const todoAccess = new TodoAccess()
const logger = createLogger('attachment')

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

export async function generateUploadUrl(attachmentId: string): Promise<string> {
  logger.info('Generating upload URL', { attachmentId })

  const uploadUrl = await attachmentAccess.getUploadUrl(attachmentId)

  return uploadUrl
}

export async function updateAttachmentUrl(
  userId: string,
  todoId: string,
  attachmentId: string
) {
  logger.info('Updating attachment URL', { todoId, userId, attachmentId })

  const attachmentUrl = attachmentAccess.getAttachmentUrl(attachmentId)
  const item = await todoAccess.getTodoItem(todoId, userId)

  checkUserPermissions(item.userId, userId, todoId)

  await todoAccess.updateAttachmentUrl(
    todoId,
    userId,
    item.createdAt,
    attachmentUrl
  )
}
