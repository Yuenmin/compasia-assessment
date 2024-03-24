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
