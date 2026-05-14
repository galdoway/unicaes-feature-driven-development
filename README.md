# e-commerce-api — Demo Feature Driven Development (FDD)

API de e-commerce desarrollada como demo de la metodología **Feature Driven Development** para la materia Metodologías Ágiles (UNICAES).

## Visión general

El sistema se divide en 5 **áreas de negocio** (Epics en Jira) y cada área agrupa **features** pequeñas y valiosas que se entregan iterativamente.

| Área de Negocio | Módulo NestJS | Chief Programmer |
|---|---|---|
| Gestión de Catálogo | `src/catalog/` | Ana Morales |
| Gestión de Carrito | `src/cart/` | Carlos Ramírez |
| Gestión de Usuarios | `src/users/` | Laura Mejía |
| Gestión de Pedidos | `src/orders/` | Diego Castro |
| Procesamiento de Pagos | `src/payments/` | Sofía Reyes |

## Mapeo FDD ↔ NestJS

| Concepto FDD | Equivalente en NestJS |
|---|---|
| Área de negocio (Epic) | `Module` |
| Feature | Endpoint/método del controller |
| Class Owner | Responsable del Service / Entity |
| Modelo de dominio | Entities + DTOs |
| Code Inspection | Pull Request review |
| Promote to Build | Merge a `main` |

## Los 6 hitos por feature

Cada feature pasa por estos hitos antes de considerarse entregada (pesos acumulados):

| # | Hito | Peso | % acumulado |
|---|---|---|---|
| 1 | Domain Walkthrough | 1% | 1% |
| 2 | Design | 40% | 41% |
| 3 | Design Inspection | 3% | 44% |
| 4 | Code | 45% | 89% |
| 5 | Code Inspection | 10% | 99% |
| 6 | Promote to Build | 1% | 100% |

## Stack

- **Framework:** NestJS 11
- **Lenguaje:** TypeScript
- **Package manager:** pnpm
- **Testing:** Jest
- **Tracking:** Jira (proyecto FDD)

## Setup

```bash
pnpm install
```

## Ejecutar

```bash
# desarrollo
pnpm run start:dev

# producción
pnpm run start:prod
```

## Tests

```bash
# unit
pnpm test

# e2e
pnpm run test:e2e

# coverage
pnpm run test:cov
```

## Convenciones

- **Branches:** `feature/FDD-{n}-{descripcion-corta}` (ej. `feature/FDD-10-add-product-to-cart`)
- **Commits:** prefijo `FDD-{n}:` para auto-linkear a Jira (ej. `FDD-10: add cart service`)
- **PRs:** 1 PR por feature. Mergear = "Promote to Build" en FDD.

## Tablero Jira

[unicaes-feature-driven-development.atlassian.net](https://unicaes-feature-driven-development.atlassian.net/jira/software/projects/FDD/boards)
