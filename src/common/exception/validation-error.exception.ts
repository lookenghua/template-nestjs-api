import { HttpException, HttpStatus, ValidationError } from '@nestjs/common'

export class ValidationErrorException extends HttpException {
  private errorMessage: string
  private readonly errorCode: number
  constructor(errors: ValidationError[]) {
    super('', HttpStatus.BAD_REQUEST)
    const constraints = errors[0].constraints
    const property = errors[0].property
    const keys = Object.keys(constraints)
    this.errorMessage = this.formatMessage(property, keys[0])
    this.errorCode = HttpStatus.BAD_REQUEST
  }

  formatMessage(property: string, key: string) {
    const templates = {
      isNotEmpty: '{0}参数不能为空',
      isNumberString: '{0}参数不是合法数字',
      isIdentifier: '{0}参数不是合法识别码',
      isEnum: '{0}参数不在范围内',
      isDateString: '{0}参数不是合法日期',
    }
    if (!key) return ''
    const template = templates[key]
    if (!template) {
      return key
    }
    return template.replace('{0}', property)
  }

  get message(): string {
    return this.errorMessage
  }
  set message(val) {
    this.errorMessage = val
  }
}
