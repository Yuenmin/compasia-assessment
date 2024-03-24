import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Brand } from "./brand.entity";
import { Category } from "./category.entity";
import { ProductColor } from "./product-color.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  productName: string;

  @Column()
  productPrice: string;

  @ManyToOne(() => Category, (category) => category.products)
  productCategory: Category;

  @ManyToOne(() => Brand, (brand) => brand.products)
  productBrand: Brand;

  @OneToMany(() => ProductColor, (productColor) => productColor.product)
  productColors: ProductColor[];

  get productCategoryName(): string {
    return this.productCategory.categoryName;
  }

  get productBrandName(): string {
    return this.productBrand.brandName;
  }

  get productColorsOptions(): { productColorId: string; colorName: string }[] {
    return this.productColors.map((productColor) => ({
      productColorId: String(productColor.productColorId),
      colorName: productColor.color.colorName,
    }));
  }
}
