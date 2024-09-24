import { Controller, Get, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FilterOptionsInterface } from '@utils';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sort') sort?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    @Query('fields') fields?: string[],
    @Query('filters') filters?: Record<string, any>,
  ) {
    const filterOptions: FilterOptionsInterface = {
      table: 'customers',
      page: page ?? 1,
      limit: limit ?? 10,
      sort: sort ?? 'id',
      sortOrder: sortOrder ?? 'ASC',
      fields: fields ?? ['*'],
      filters: filters ?? {},
    };
    return this.customerService.findAll(filterOptions);
  }
}
