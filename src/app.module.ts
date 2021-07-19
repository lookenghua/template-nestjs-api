import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UserModule } from '_module/user/user.module'
import { AuthModule } from '_module/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from '_module/prisma/prisma.service'
import { RequestIdMiddleware } from '_common/middleware/request-id.middleware'
import { TimeoutMiddleware } from '_common/middleware/timeout.middleware'

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimeoutMiddleware).forRoutes()
    consumer.apply(RequestIdMiddleware).forRoutes()
  }
}
