import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ValidationErrorException } from '_common/exception/validation-error.exception'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix('/api')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => new ValidationErrorException(errors),
    }),
  )
  await app.listen(process.env.PORT || 3000)
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap().then(() => {
  console.log('项目启动')
})
