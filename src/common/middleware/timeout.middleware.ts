import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ApiUtil } from '_util/response'

@Injectable()
export class TimeoutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.setTimeout(5000, () => {
      res.send(ApiUtil.fail(HttpStatus.REQUEST_TIMEOUT, '请求超时'))
    })
    next()
  }
}
