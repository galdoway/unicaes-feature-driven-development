import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item.dto';
import { Cart } from './entities/cart.entity';

/**
 * Cart Controller — exposes the FDD features of the Cart area (Epic FDD-3).
 */
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  getCart(@Param('id') id: string): Cart {
    return this.cartService.getOrCreate(id);
  }

  /** FDD-10: Add a product to the cart */
  @Post(':id/items')
  addItem(@Param('id') id: string, @Body() dto: AddItemDto): Cart {
    return this.cartService.addItem(id, dto);
  }

  /** FDD-11: Remove a product from the cart */
  @Delete(':id/items/:productId')
  removeItem(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ): Cart {
    return this.cartService.removeItem(id, productId);
  }

  /** FDD-12: Calculate the subtotal of the cart */
  @Get(':id/subtotal')
  subtotal(@Param('id') id: string): { subtotal: number } {
    return { subtotal: this.cartService.calculateSubtotal(id) };
  }
}
