import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandlerFilter } from './filters';

import { ValidationPipe } from '@nestjs/common';
import morgan from 'morgan';

async function startApp() {
  const app = await NestFactory.create(AppModule, ({ logger: false }));

  app.useGlobalPipes(new ValidationPipe({}))

  app.setGlobalPrefix("api/v1")

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'))
  }
  await app.listen(3030, () => {
    console.log(`Okajon serveriz 3030-portda ishlavotti..)`);

  });
}
startApp();
