import { CartItem } from './cart-item.entity';

/**
 * Cart entity — Cart Management area (Epic FDD-3)
 * Class Owner: Cart team (Chief Programmer: Carlos Ramírez)
 */
export class Cart {
  id: string;
  userId: string;
  items: CartItem[] = [];

  constructor(partial: Partial<Cart>) {
    Object.assign(this, partial);
    this.items = this.items ?? [];
  }
}
