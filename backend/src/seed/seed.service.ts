import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brand } from "src/products/entities/brand.entity";
import { Category } from "src/products/entities/category.entity";
import { Color } from "src/products/entities/color.entity";
import { ProductColor } from "src/products/entities/product-color.entity";
import { Product } from "src/products/entities/product.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
    @InjectRepository(ProductColor)
    private productColorRepository: Repository<ProductColor>
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.dataSource.initialize();
    } catch (exception) {}
    this.logger.log("Seeding database...");
    const smartphoneCategory = await this.categoryRepository.save({
      categoryName: "Smartphone",
    });
    const tabletCategory = await this.categoryRepository.save({
      categoryName: "Tablet",
    });

    const samsungBrand = await this.brandRepository.save({
      brandName: "Samsung",
    });
    const appleBrand = await this.brandRepository.save({ brandName: "Apple" });
    const googleBrand = await this.brandRepository.save({
      brandName: "Google",
    });

    const blackColor = await this.colorRepository.save({
      colorName: "Black",
    });
    const silverColor = await this.colorRepository.save({
      colorName: "Silver",
    });
    const goldColor = await this.colorRepository.save({
      colorName: "Gold",
    });

    const products = [
      {
        productName: "Samsung Galaxy S21",
        productPrice: "RM799.99",
        productCategory: smartphoneCategory,
        productBrand: samsungBrand,
        productColors: [blackColor, silverColor],
      },
      {
        productName: "iPhone 13 Pro",
        productPrice: "RM999.99",
        productCategory: smartphoneCategory,
        productBrand: appleBrand,
        productColors: [blackColor, goldColor],
      },
      {
        productName: "Google Pixel 6",
        productPrice: "RM699.99",
        productCategory: smartphoneCategory,
        productBrand: googleBrand,
        productColors: [blackColor, silverColor],
      },
      {
        productName: "Samsung Galaxy Tab S7",
        productPrice: "RM649.99",
        productCategory: tabletCategory,
        productBrand: samsungBrand,
        productColors: [blackColor, silverColor],
      },
      {
        productName: "iPad Air",
        productPrice: "RM599.99",
        productCategory: tabletCategory,
        productBrand: appleBrand,
        productColors: [silverColor, goldColor],
      },
      {
        productName: "Samsung Galaxy Z Fold 3",
        productPrice: "RM1799.99",
        productCategory: smartphoneCategory,
        productBrand: samsungBrand,
        productColors: [blackColor, silverColor],
      },
      {
        productName: "iPhone 13 Mini",
        productPrice: "RM699.99",
        productCategory: smartphoneCategory,
        productBrand: appleBrand,
        productColors: [blackColor, goldColor],
      },
      {
        productName: "Google Pixel 6 Pro",
        productPrice: "RM899.99",
        productCategory: smartphoneCategory,
        productBrand: googleBrand,
        productColors: [blackColor, silverColor],
      },
      {
        productName: "Samsung Galaxy Tab A7",
        productPrice: "RM229.99",
        productCategory: tabletCategory,
        productBrand: samsungBrand,
        productColors: [blackColor, silverColor],
      },
      {
        productName: "iPad Pro",
        productPrice: "RM1099.99",
        productCategory: tabletCategory,
        productBrand: appleBrand,
        productColors: [silverColor, goldColor],
      },
      {
        productName: "Samsung Galaxy Note 20 Ultra",
        productPrice: "RM1299.99",
        productCategory: smartphoneCategory,
        productBrand: samsungBrand,
        productColors: [blackColor, silverColor],
      },
      {
        productName: "iPhone SE",
        productPrice: "RM399.99",
        productCategory: smartphoneCategory,
        productBrand: appleBrand,
        productColors: [blackColor, goldColor],
      },
      {
        productName: "Google Pixel 5a",
        productPrice: "RM449.99",
        productCategory: smartphoneCategory,
        productBrand: googleBrand,
        productColors: [blackColor, silverColor],
      },
      {
        productName: "Samsung Galaxy Tab S6 Lite",
        productPrice: "RM349.99",
        productCategory: tabletCategory,
        productBrand: samsungBrand,
        productColors: [blackColor, silverColor],
      },
      {
        productName: "iPad Mini",
        productPrice: "RM499.99",
        productCategory: tabletCategory,
        productBrand: appleBrand,
        productColors: [silverColor, goldColor],
      },
    ];

    for (const product of products) {
      const savedProduct = await this.productRepository.save({
        productName: product.productName,
        productPrice: product.productPrice,
        productCategory: product.productCategory,
        productBrand: product.productBrand,
      });
      for (const color of product.productColors) {
        await this.productColorRepository.save({
          product: savedProduct,
          color: color,
        });
      }
    }
    this.logger.log("Database seeding completed");
  }
}
