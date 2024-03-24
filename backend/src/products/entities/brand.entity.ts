import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  brandId: number;

  @Column()
  brandName: string;

  @OneToMany(() => Product, (product) => product.productBrand)
  products: Product[];
}
