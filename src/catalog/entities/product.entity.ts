/**
 * Product entity — Catalog Management area
 * Class Owner: Catalog team (Chief Programmer: Ana Morales)
 *
 * Related Jira: FDD-2 (Epic) / FDD-7 first feature implementing this entity.
 */
export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  available: boolean;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
