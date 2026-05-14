import { BadRequestException, Injectable } from '@nestjs/common';
import { CatalogService } from '../catalog/catalog.service';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { AddItemDto } from './dto/add-item.dto';

/**
 * Cart Service — Cart Management area (Epic FDD-3).
 *
 * Features owned by this service:
 *  - FDD-10: Add a product to the cart (implemented in this PR)
 *  - FDD-11: Remove a product from the cart (pending)
 *  - FDD-12: Calculate the subtotal of the cart (pending)
 */
@Injectable()
export class CartService {
  // In-memory store keyed by cart id
  private readonly carts = new Map<string, Cart>();

  constructor(private readonly catalogService: CatalogService) {}

  /** Helper: get or create a cart by id (used by all cart features) */
  getOrCreate(cartId: string, userId = 'demo-user'): Cart {
    if (!this.carts.has(cartId)) {
      this.carts.set(cartId, new Cart({ id: cartId, userId, items: [] }));
    }
    return this.carts.get(cartId)!;
  }

  /**
   * FDD-10: Add a product to the cart
   *
   * Acceptance criteria:
   *  - Adds the product if it exists in the catalog
   *  - If the product is already in the cart, increments the quantity
   *  - Validates that quantity > 0
   */
  addItem(cartId: string, dto: AddItemDto): Cart {
    if (dto.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    // Validates the product exists in the catalog (throws 404 if not)
    const product = this.catalogService.findById(dto.productId);

    const cart = this.getOrCreate(cartId);
    const existing = cart.items.find((i) => i.productId === product.id);

    if (existing) {
      existing.quantity += dto.quantity;
    } else {
      cart.items.push(
        new CartItem({
          productId: product.id,
          name: product.name,
          unitPrice: product.price,
          quantity: dto.quantity,
        }),
      );
    }
    return cart;
  }
}
