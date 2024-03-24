import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "./products/product.module";
import { SeedModule } from "./seed/seed.module";
import { OrderModule } from "./orders/order.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      ssl: true,
      dropSchema: true,
    }),
    SeedModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
