import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarModule } from './car/car.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'gowmysen26',
      database: 'rental_car',
      autoLoadModels: true,
      synchronize: true,
    }),
    CarModule,
    CustomerModule,
  ],
})
export class AppModule {}
