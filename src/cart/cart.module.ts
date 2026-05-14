import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CatalogModule } from '../catalog/catalog.module';

/**
 * Cart Module — FDD Business Area "Gestión de Carrito" (Epic FDD-3)
 *
 * Chief Programmer: Carlos Ramírez
 * Class Owners: Cart, CartItem
 *
 * Features:
 *  - FDD-10: Add a product to the cart
 *  - FDD-11: Remove a product from the cart
 *  - FDD-12: Calculate the subtotal of the cart
 *
 * Depends on CatalogModule to validate that products exist before adding
 * them to the cart.
 */
@Module({
  imports: [CatalogModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
