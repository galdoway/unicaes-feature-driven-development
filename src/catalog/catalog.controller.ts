import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { Product } from './entities/product.entity';

/**
 * Catalog Controller — exposes the FDD features of the Catalog area (Epic FDD-2).
 */
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  /**
   * FDD-7: List the available products of the catalog
   * FDD-8: Search products by category (when ?category= is provided)
   */
  @Get('products')
  list(@Query('category') category?: string): Product[] {
    if (category) {
      return this.catalogService.searchByCategory(category);
    }
    return this.catalogService.listAvailable();
  }

  /** FDD-9: View the details of a product */
  @Get('products/:id')
  findOne(@Param('id') id: string): Product {
    return this.catalogService.findById(id);
  }
}
