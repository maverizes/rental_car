import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CarService } from './car.service';
import { Car } from './model/car.model';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) { }

  @Get()
  findAll(): Promise<Car[]> {
    return this.carService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Car> {
    return this.carService.findOne(+id);
  }

  @Post('/add')
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.create(createCarDto);
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.carService.remove(+id);
  }
}
