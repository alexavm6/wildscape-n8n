import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schema/product.schema';

/* otros módulos importados */
import { SaleModule } from '@sale/sale.module';
import { SaleDetailModule } from '@sale-detail/sale-detail.module';

@Module({
  imports: [
    SaleModule,
    SaleDetailModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
})
export class ProductModule {}
