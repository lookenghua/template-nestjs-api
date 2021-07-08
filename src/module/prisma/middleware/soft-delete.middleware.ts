import { Prisma } from '@prisma/client'

type MiddlewareParams = Prisma.MiddlewareParams

// 软删除中间件
export function SoftDeleteMiddleware(
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<any>,
): Promise<any> {
  if (params.action === 'delete') {
    params.action = 'update'
    params.args['data'] = { deletedAt: new Date() }
  }
  if (params.action == 'deleteMany') {
    params.action = 'updateMany'
    if (params.args.data != undefined) {
      params.args.data['deletedAt'] = new Date()
    } else {
      params.args['data'] = { deletedAt: new Date() }
    }
  }
  if (params.action == 'findUnique') {
    params.action = 'findFirst'
    params.args.where['deletedAt'] = null
  }
  if (params.action == 'findMany') {
    if (params.args.where != undefined) {
      if (params.args.where.deletedAt == undefined) {
        params.args.where['deletedAt'] = null
      }
    } else {
      params.args['where'] = { deletedAt: null }
    }
  }
  return next(params)
}
