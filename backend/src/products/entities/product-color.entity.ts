import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Color } from "./color.entity";
import { Product } from "./product.entity";
import { Order } from "../../orders/entities/order.entity";

@Entity()
export class ProductColor {
  @PrimaryGeneratedColumn()
  productColorId: number;

  @ManyToOne(() => Color, (color) => color.productColors)
  color: Color;

  @ManyToOne(() => Product, (product) => product.productColors)
  product: Product;

  @OneToMany(() => Order, (order) => order.productColor)
  orders: Order[];
}
