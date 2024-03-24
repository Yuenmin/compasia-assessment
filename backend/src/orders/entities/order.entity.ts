import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { ProductColor } from "../../products/entities/product-color.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne(() => ProductColor, (productColor) => productColor.orders)
  productColor: ProductColor;

  @CreateDateColumn()
  orderCreatedAt: Date;
}
