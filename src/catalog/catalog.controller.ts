import { Controller, Get } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { Product } from './entities/product.entity';

/**
 * Catalog Controller — exposes the FDD features of the Catalog area (Epic FDD-2).
 */
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  /** FDD-7: List the available products of the catalog */
  @Get('products')
  list(): Product[] {
    return this.catalogService.listAvailable();
  }
}
