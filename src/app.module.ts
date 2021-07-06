import { Module } from '@nestjs/common'
import { UserModule } from '_module/user/user.module'
import { AuthModule } from '_module/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('database.mysql.host'),
        port: +config.get<number>('database.mysql.port'),
        username: config.get('database.mysql.username'),
        password: config.get('database.mysql.password'),
        database: config.get('database.mysql.database'),
        entities: [__dirname + '/model/*.model{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
        keepConnectionAlive: true,
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
