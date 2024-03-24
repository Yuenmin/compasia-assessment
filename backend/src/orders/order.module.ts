import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/orders/entities/order.entity";
import { ProductColor } from "src/products/entities/product-color.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
  imports: [TypeOrmModule.forFeature([Order, ProductColor])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
