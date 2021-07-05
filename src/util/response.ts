import { ClassConstructor, plainToClass } from 'class-transformer'

export class ResponseData {
  static success(data?: any) {
    return { success: true, data }
  }
  static fail(code: number, message: string) {
    return { success: false, errorCode: code, errorMessage: message }
  }
  static list(list: Array<any>, current: number, size: number, total: number) {
    return { success: true, data: { list, total, current, size } }
  }
}

export enum ApiErrorCode {
  DATA_NOT_EXIST = 1000,
  ARGUMENTS_VALIDATE_ERROR,
  PASSWORD_NOT_MATCH,
  DATA_EXIST,
}

// 格式化数据
export function formatData(plain: unknown, cls: ClassConstructor<unknown>) {
  return plainToClass(cls, plain, { strategy: 'excludeAll' })
}

// 格式化列表
export function covertListData(
  list: Array<any>,
  total: number,
  offset: number,
  limit: number,
) {
  return {
    list,
    total,
    offset,
    limit,
  }
}
