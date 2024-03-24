import { PaginatedQueryDto } from "src/common/paginated.dto";

export class GetProductsQueryDto extends PaginatedQueryDto {
  name?: string;
  brand?: string;
  category?: string;
  color?: string;
}

export class GetProductsResponseDto {
  productId: string;
  productName: string;
  productPrice: string;
  productBrand: string;
  productCategory: string;
  productColors: { productColorId: string; colorName: string }[];
}

export class GetFilterOptionsResponseDto {
  categories: string[];
  brands: string[];
  colors: string[];
}
