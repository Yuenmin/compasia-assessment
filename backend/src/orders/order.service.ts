import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  PaginatedQueryDto,
  PaginatedResponseDto,
} from "src/common/paginated.dto";
import { Order } from "src/orders/entities/order.entity";
import { GetOrdersResponseDto } from "./order.dto";
import { ProductColor } from "src/products/entities/product-color.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(ProductColor)
    private productColorRepository: Repository<ProductColor>
  ) {}

  async findAll(query: PaginatedQueryDto) {
    const queryBuilder = this.orderRepository
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.productColor", "productColor")
      .leftJoinAndSelect("productColor.product", "product")
      .leftJoinAndSelect("productColor.color", "color")
      .skip(query.skip)
      .take(query.take);
    const count = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    return new PaginatedResponseDto<GetOrdersResponseDto>(
      entities.map((e) => ({
        orderId: String(e.orderId),
        productId: String(e.productColor.product.productId),
        productName: e.productColor.product.productName,
        productColor: e.productColor.color.colorName,
        orderDateTime: e.orderCreatedAt.toISOString(),
      })),
      {
        page: query.page,
        pageSize: query.take,
        totalCount: count,
      }
    );
  }

  async createOrder(productColorId: string) {
    const queryBuilder = this.productColorRepository
      .createQueryBuilder("productColor")
      .where("productColor.productColorId = :productColorId", {
        productColorId,
      });
    const result = await queryBuilder.getOne();
    if (result) this.orderRepository.save({ productColor: result });
  }
}
