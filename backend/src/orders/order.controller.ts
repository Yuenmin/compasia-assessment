import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { OrderService } from "./order.service";
import { PaginatedQueryDto } from "src/common/paginated.dto";
import { CreateOrderRequestDto } from "./order.dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(@Query() query: PaginatedQueryDto) {
    return this.orderService.findAll(query);
  }

  @Post()
  placeOrder(@Body() data: CreateOrderRequestDto) {
    return this.orderService.createOrder(data.productColorId);
  }
}
