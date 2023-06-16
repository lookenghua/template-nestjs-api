import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { SoftDeleteMiddleware } from './middleware/soft-delete.middleware'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
    this.$use(SoftDeleteMiddleware)
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
