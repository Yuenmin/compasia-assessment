import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/products/entities/product.entity";
import { Repository } from "typeorm";
import { GetProductsQueryDto, GetProductsResponseDto } from "./product.dto";
import { PaginatedResponseDto } from "src/common/paginated.dto";
import { Brand } from "./entities/brand.entity";
import { Category } from "./entities/category.entity";
import { Color } from "./entities/color.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>
  ) {}

  async findAll(query: GetProductsQueryDto) {
    const queryBuilder = this.productsRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.productCategory", "category")
      .leftJoinAndSelect("product.productBrand", "brand")
      .leftJoinAndSelect("product.productColors", "productColors")
      .leftJoinAndSelect("productColors.color", "color")
      .skip(query.skip)
      .take(query.take);
    if (query.name) {
      queryBuilder.andWhere("product.productName like :productName", {
        productName: `%${query.name}%`,
      });
    }
    if (query.brand) {
      queryBuilder.andWhere("brand.brandName = :brandName", {
        brandName: query.brand,
      });
    }
    if (query.category) {
      queryBuilder.andWhere("category.categoryName = :categoryName", {
        categoryName: query.category,
      });
    }
    if (query.color) {
      queryBuilder.andWhere("color.colorName = :colorName", {
        colorName: query.color,
      });
    }
    const count = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    return new PaginatedResponseDto<GetProductsResponseDto>(
      entities.map((e) => ({
        productId: String(e.productId),
        productName: e.productName,
        productPrice: e.productPrice,
        productBrand: e.productBrandName,
        productCategory: e.productCategoryName,
        productColors: e.productColorsOptions,
      })),
      {
        page: query.page,
        pageSize: query.take,
        totalCount: count,
      }
    );
  }

  async getFilterOptions() {
    const categories = await this.categoryRepository.find();
    const brands = await this.brandRepository.find();
    const colors = await this.colorRepository.find();
    return {
      categories: categories.map((category) => category.categoryName),
      brands: brands.map((brand) => brand.brandName),
      colors: colors.map((color) => color.colorName),
    };
  }
}
