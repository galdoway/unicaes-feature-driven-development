import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';

/**
 * Catalog Service — Catalog Management area (Epic FDD-2).
 *
 * Features owned by this service:
 *  - FDD-7: List the available products of the catalog (implemented in this PR)
 *  - FDD-8: Search products by category (pending)
 *  - FDD-9: View product details (pending)
 */
@Injectable()
export class CatalogService {
  // In-memory store for the demo
  private readonly products: Product[] = [
    new Product({
      id: 'p1',
      name: 'Laptop Pro 14',
      description: 'High-end laptop',
      price: 1299.99,
      category: 'electronics',
      stock: 10,
      available: true,
    }),
    new Product({
      id: 'p2',
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse',
      price: 25.5,
      category: 'electronics',
      stock: 50,
      available: true,
    }),
    new Product({
      id: 'p3',
      name: 'Office Chair',
      description: 'Ergonomic office chair',
      price: 199.0,
      category: 'furniture',
      stock: 0,
      available: false,
    }),
  ];

  /**
   * FDD-7: List the available products of the catalog
   *
   * Acceptance criteria:
   *  - Returns the list of products with `available = true`
   *  - Includes id, name, price, category, stock
   */
  listAvailable(): Product[] {
    return this.products.filter((p) => p.available);
  }
}
