import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { ValidationErrorException } from '../exception/validation-error.exception'
import { ApiErrorCode, ApiUtil } from '_util/response'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      if (exception instanceof ValidationErrorException) {
        response
          .status(200)
          .json(
            ApiUtil.fail(
              ApiErrorCode.ARGUMENTS_VALIDATE_ERROR,
              exception.message,
            ),
          )
      } else if (exception instanceof UnauthorizedException) {
        response.status(200).json(ApiUtil.fail(status, exception.message))
      } else if (exception instanceof BadRequestException) {
        response.status(200).json({
          code: status,
          msg: exception.message || '',
          url: request.originalUrl,
        })
      } else if (exception instanceof NotFoundException) {
        response
          .status(200)
          .json(ApiUtil.fail(404, `${request.originalUrl}不存在`))
      } else {
        response.status(200).json(ApiUtil.fail(status, exception.message || ''))
      }
    } else {
      response.status(200).json(ApiUtil.fail(500, exception.toString() || ''))
    }
  }
}
