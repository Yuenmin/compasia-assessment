import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductColor } from "./product-color.entity";

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  colorId: number;

  @Column()
  colorName: string;

  @OneToMany(() => ProductColor, (productColor) => productColor.color)
  productColors: ProductColor[];
}
