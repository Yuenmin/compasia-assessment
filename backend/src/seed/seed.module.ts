import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/products/entities/product.entity";
import { SeedService } from "./seed.service";
import { Brand } from "src/products/entities/brand.entity";
import { Category } from "src/products/entities/category.entity";
import { ProductColor } from "src/products/entities/product-color.entity";
import { Color } from "src/products/entities/color.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Brand, Category, Color, ProductColor]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
