import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

import { createLogger } from '../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('attachment-access')

export class AttachmentAccess {
  constructor(
    private readonly s3 = new XAWS.S3({ signatureVersion: 'v4' }),
    private readonly bucketName = process.env.TODO_ATTACHMENTS_S3_BUCKET,
    private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
  ) {}

  async getUploadUrl(attachmentId: string): Promise<string> {
    logger.info('Getting upload URL', { attachmentId })

    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: attachmentId,
      Expires: this.urlExpiration
    })
  }

  getAttachmentUrl(attachmentId: string): string {
    return `https://${this.bucketName}.s3.amazonaws.com/${attachmentId}`
  }
}
