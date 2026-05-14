import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CatalogService } from '../catalog/catalog.service';

/**
 * Unit tests — Cart Service
 *  - FDD-10: Add a product to the cart
 *  - FDD-11: Remove a product from the cart
 *  - FDD-12: Calculate the subtotal of the cart
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

  describe('FDD-11: removeItem()', () => {
    it('removes an item that exists in the cart', () => {
      service.addItem('cart-rm', { productId: 'p1', quantity: 1 });
      service.addItem('cart-rm', { productId: 'p2', quantity: 1 });
      const cart = service.removeItem('cart-rm', 'p1');
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].productId).toBe('p2');
    });

    it('throws NotFoundException if the product is not in the cart', () => {
      service.addItem('cart-rm2', { productId: 'p1', quantity: 1 });
      expect(() => service.removeItem('cart-rm2', 'p2')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('FDD-12: calculateSubtotal()', () => {
    it('returns 0 for an empty cart', () => {
      const subtotal = service.calculateSubtotal('empty-cart');
      expect(subtotal).toBe(0);
    });

    it('sums price × quantity across all items', () => {
      // p1 = 1299.99, p2 = 25.5
      service.addItem('cart-sum', { productId: 'p1', quantity: 1 });
      service.addItem('cart-sum', { productId: 'p2', quantity: 2 });
      const subtotal = service.calculateSubtotal('cart-sum');
      // 1299.99 + (25.5 × 2) = 1350.99
      expect(subtotal).toBe(1350.99);
    });

    it('returns a number with 2-decimal precision', () => {
      service.addItem('cart-precision', { productId: 'p2', quantity: 3 });
      const subtotal = service.calculateSubtotal('cart-precision');
      // 25.5 × 3 = 76.5
      expect(subtotal).toBe(76.5);
      expect(Number.isFinite(subtotal)).toBe(true);
    });
  });
});
