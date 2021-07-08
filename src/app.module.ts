import { Module } from '@nestjs/common'
import { UserModule } from '_module/user/user.module'
import { AuthModule } from '_module/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from '_module/prisma/prisma.service'

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
