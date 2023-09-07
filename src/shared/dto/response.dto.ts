import { HttpCodeMessages } from '@/shared/utils'

export type Resource = Record<string, any>

export class Meta {
  page: number = 1
  total: number = 0
  count: number = 0
  perPage: number = 20
}

export class ResponseDTO {
  success: boolean = true
  statusCode: number = 200
  error?: string
  message?: string | string[]
  data?: Resource | Resource[]
  meta?: Meta

  constructor(data: Partial<ResponseDTO> = {}) {
    Object.assign(this, {
      ...data,
      message: data.message || HttpCodeMessages[this.statusCode],
    })
  }
}
