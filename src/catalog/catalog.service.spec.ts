import { Test, TestingModule } from '@nestjs/testing';
import { CatalogService } from './catalog.service';

/**
 * Unit tests — Catalog Service features
 *  - FDD-7: List the available products of the catalog
 *  - FDD-8: Search products by category
 */
describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogService],
    }).compile();

    service = module.get<CatalogService>(CatalogService);
  });

  describe('FDD-7: listAvailable()', () => {
    it('returns only products where available = true', () => {
      const result = service.listAvailable();
      expect(result.every((p) => p.available === true)).toBe(true);
    });

    it('includes id, name, price, category and stock fields', () => {
      const result = service.listAvailable();
      expect(result.length).toBeGreaterThan(0);
      const first = result[0];
      expect(first.id).toBeDefined();
      expect(first.name).toBeDefined();
      expect(typeof first.price).toBe('number');
      expect(first.category).toBeDefined();
      expect(typeof first.stock).toBe('number');
    });

    it('does not include unavailable products', () => {
      const result = service.listAvailable();
      expect(result.find((p) => p.id === 'p3')).toBeUndefined();
    });
  });

  describe('FDD-8: searchByCategory()', () => {
    it('returns products matching the given category exactly', () => {
      const result = service.searchByCategory('electronics');
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((p) => p.category === 'electronics')).toBe(true);
    });

    it('returns an empty list when category does not exist', () => {
      const result = service.searchByCategory('non-existing-category');
      expect(result).toEqual([]);
    });
  });
});
