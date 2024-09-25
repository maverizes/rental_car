import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './model/customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiFeature } from '@utils';
import { QueryTypes } from 'sequelize';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
  ) { }

  async findAll(filterOptions: Record<string, any>): Promise<Customer[]> {
    const apiFeature = new ApiFeature('customers');

    if (filterOptions.sort && filterOptions.sortOrder) {
      apiFeature.sort(filterOptions.sort, filterOptions.sortOrder);
    }

    apiFeature
      .paginate(filterOptions.page, filterOptions.limit)
      .limitFields(filterOptions.fields);

    if (filterOptions.filters) {
      apiFeature.setFilters(filterOptions.filters);
    }

    const { queryString } = apiFeature.getQuery();
    const [customers] = await this.customerModel.sequelize?.query(queryString, {
      type: QueryTypes.SELECT,
    });

    return customers as Customer[];
  }


  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerModel.findByPk(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerModel.create(createCustomerDto);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const [updatedRows] = await this.customerModel.update(updateCustomerDto, {
      where: { id },
    });
    if (updatedRows === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const deletedUser = await this.findOne(id);
    const deletedRows = await this.customerModel.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return {
      message: `Customer with id: ${id} successfully deleted`,
      data: deletedUser,
    };
  }
}
