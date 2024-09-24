import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Car extends Model<Car> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brand: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string; 

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  rentalPricePerDay: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  available: boolean;
}
