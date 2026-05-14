import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
}
