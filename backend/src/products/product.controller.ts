import { Controller, Get, Query } from "@nestjs/common";
import { ProductService } from "src/products/product.service";
import { GetProductsQueryDto } from "./product.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(@Query() query: GetProductsQueryDto) {
    return this.productService.findAll(query);
  }

  @Get("options")
  getFilterOptions() {
    return this.productService.getFilterOptions();
  }
}
