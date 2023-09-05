import { randomUUID } from 'crypto'

export const genReqId = (req: any) => req.headers['x-request-id'] || randomUUID()
