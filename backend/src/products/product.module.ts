import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductService } from "src/products/product.service";
import { ProductController } from "src/products/product.controller";
import { Product } from "src/products/entities/product.entity";
import { Category } from "./entities/category.entity";
import { Brand } from "./entities/brand.entity";
import { Color } from "./entities/color.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Brand, Color])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
