import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CatalogService } from '../catalog/catalog.service';

/**
 * Unit tests — Cart Service
 *  - FDD-10: Add a product to the cart
 */
describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, CatalogService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  describe('FDD-10: addItem()', () => {
    it('adds a product that exists in the catalog', () => {
      const cart = service.addItem('cart-1', { productId: 'p1', quantity: 2 });
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].productId).toBe('p1');
      expect(cart.items[0].quantity).toBe(2);
    });

    it('increments quantity if the product is already in the cart', () => {
      service.addItem('cart-2', { productId: 'p1', quantity: 1 });
      const cart = service.addItem('cart-2', { productId: 'p1', quantity: 3 });
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(4);
    });

    it('throws BadRequestException when quantity is 0 or negative', () => {
      expect(() =>
        service.addItem('cart-3', { productId: 'p1', quantity: 0 }),
      ).toThrow(BadRequestException);
      expect(() =>
        service.addItem('cart-3', { productId: 'p1', quantity: -1 }),
      ).toThrow(BadRequestException);
    });

    it('throws NotFoundException when the product is not in the catalog', () => {
      expect(() =>
        service.addItem('cart-4', { productId: 'invalid', quantity: 1 }),
      ).toThrow(NotFoundException);
    });
  });
});
