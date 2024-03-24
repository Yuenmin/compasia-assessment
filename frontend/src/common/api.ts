import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
});

export const GET_PRODUCTS_PATH = "/products";
export const GET_FILTER_OPTIONS_PATH = "/products/options";
export const GET_ORDERS_PATH = "/orders";
export const CREATE_ORDER_PATH = "/orders";

interface Metadata {
  page: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
}
export class PaginatedResponseDto<V> {
  data: V[];
  _metadata: Metadata;
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
export class CreateOrderRequestDto {
  productColorId: string;
}
export class GetOrdersResponseDto {
  orderId: string;
  productId: string;
  productName: string;
  productColor: string;
  orderDateTime: string;
}
