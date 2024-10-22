import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'

let s3Client: S3Client | null

export const getS3Client = () => {
  if (!s3Client) {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
    const region = process.env.AWS_REGION

    s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
      apiVersion: 'v4',
    })
  }

  return s3Client
}

export class PresignedPostDto {
  @ApiProperty()
  @Type(() => String)
  url: string

  @ApiProperty()
  @Type(() => String)
  fields: Record<string, string>
}

export const getUploadPresignedUrl = async (keyPrefix: string) => {
  const bucket = process.env.AWS_S3_BUCKET
  const s3Client = getS3Client()
  const key = keyPrefix + '${filename}'

  const presignedPost = await createPresignedPost(s3Client, {
    Bucket: bucket,
    Key: key,
    Conditions: [
      { acl: 'private' },
      ['starts-with', '$key', keyPrefix],
      { 'x-amz-server-side-encryption': 'AES256' },
    ],
    Fields: {
      acl: 'private',
      'x-amz-server-side-encryption': 'AES256',
    },
    Expires: 3600,
  })

  return presignedPost as PresignedPostDto
}

export const getDownloadUrl = async (key: string, expiresIn = 3600) => {
  const bucket = process.env.AWS_S3_BUCKET
  const s3Client = getS3Client()

  const url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
      ResponseContentType: 'application/octet-stream',
    }),
    {
      expiresIn,
    },
  )

  return url
}
