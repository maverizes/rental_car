import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';

async function startApp() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3030, () => {
    console.log(`Okajon serveriz 3030-portda ishlavotti..)`);

  });
}
startApp();
