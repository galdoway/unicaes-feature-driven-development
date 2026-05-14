import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

/**
 * Catalog Module — FDD Business Area "Gestión de Catálogo" (Epic FDD-2)
 *
 * Chief Programmer: Ana Morales
 * Class Owners: Product, Catalog
 *
 * Features:
 *  - FDD-7: List the available products of the catalog
 *  - FDD-8: Search products by category
 *  - FDD-9: View product details
 */
@Module({
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}
