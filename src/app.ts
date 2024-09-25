import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';

import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandlerFilter } from './filters';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: ".env"
      isGlobal: true,
    //   load: [dbConfig],
    }),
    CarModule,
    CustomerModule
  ],
  providers: [
    {
      useClass: ExceptionHandlerFilter,
      provide: APP_FILTER,
    },
  ],
})
export class AppModule {}