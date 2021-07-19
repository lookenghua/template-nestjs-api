import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { nanoid } from 'nanoid'

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const key = 'x-request-id'
    const requestId = req.headers[key] || nanoid()
    res.setHeader(key, requestId)
    console.log(`当前请求id: ${requestId}`)
    next()
  }
}
