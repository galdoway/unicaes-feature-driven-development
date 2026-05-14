import { Test, TestingModule } from '@nestjs/testing';
import { CatalogService } from './catalog.service';

/**
 * Unit tests — FDD-7: List the available products of the catalog
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
});
