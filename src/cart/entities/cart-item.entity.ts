/**
 * CartItem entity — Cart Management area (Epic FDD-3)
 * Class Owner: Cart team (Chief Programmer: Carlos Ramírez)
 */
export class CartItem {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;

  constructor(partial: Partial<CartItem>) {
    Object.assign(this, partial);
  }

  /** Subtotal for this single line item (price × quantity, 2 decimals) */
  lineSubtotal(): number {
    return Number((this.unitPrice * this.quantity).toFixed(2));
  }
}
