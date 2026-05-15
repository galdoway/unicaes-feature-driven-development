# Modelo de Dominio — Demo FDD E-commerce

Diagramas UML del sistema en Mermaid. Generados como parte de la **Etapa 1 de FDD: Develop Overall Model**.

## 1. Modelo global completo (5 áreas de negocio)

Este es el modelo que se construiría en la Etapa 1 de FDD con los expertos del dominio, antes de empezar a codificar. Incluye las 5 áreas: Catálogo, Carrito, Usuarios, Pedidos y Pagos.

```mermaid
classDiagram
    %% ===== Catalog Management (Epic FDD-2) =====
    class Product {
        +string id
        +string name
        +string description
        +number price
        +string category
        +number stock
        +boolean available
    }

    %% ===== Cart Management (Epic FDD-3) =====
    class Cart {
        +string id
        +string userId
        +CartItem[] items
    }

    class CartItem {
        +string productId
        +string name
        +number unitPrice
        +number quantity
        +lineSubtotal() number
    }

    %% ===== User Management (Epic FDD-4) =====
    class User {
        +string id
        +string email
        +string passwordHash
        +string name
        +Date createdAt
    }

    %% ===== Order Management (Epic FDD-5) =====
    class Order {
        +string id
        +string userId
        +OrderItem[] items
        +number subtotal
        +number tax
        +number discount
        +number total
        +OrderStatus status
        +Date createdAt
    }

    class OrderItem {
        +string productId
        +string name
        +number unitPrice
        +number quantity
    }

    class Coupon {
        +string code
        +number percentage
        +Date expiresAt
        +boolean used
    }

    class OrderStatus {
        <<enumeration>>
        PENDING
        PAID
        SHIPPED
        DELIVERED
        CANCELLED
    }

    %% ===== Payment Processing (Epic FDD-6) =====
    class Payment {
        +string id
        +string orderId
        +number amount
        +PaymentMethod method
        +PaymentStatus status
        +Date processedAt
    }

    class CreditCard {
        +string maskedNumber
        +string holder
        +string expiry
    }

    class Receipt {
        +string id
        +string paymentId
        +string pdfUrl
        +Date generatedAt
    }

    class PaymentMethod {
        <<enumeration>>
        CREDIT_CARD
        DEBIT_CARD
        TRANSFER
    }

    class PaymentStatus {
        <<enumeration>>
        PENDING
        APPROVED
        REJECTED
    }

    %% ===== Relationships =====
    User "1" --> "0..*" Cart : owns
    User "1" --> "0..*" Order : places
    Cart "1" *-- "0..*" CartItem : contains
    CartItem "many" ..> "1" Product : references
    Order "1" *-- "1..*" OrderItem : contains
    OrderItem "many" ..> "1" Product : references
    Order "0..1" ..> "0..1" Coupon : applies
    Order "1" --> "0..*" Payment : paid by
    Payment "0..1" *-- "0..1" CreditCard : uses
    Payment "1" --> "0..1" Receipt : generates
```

## 2. Modelo actual implementado (Catalog + Cart)

Esto es lo que está actualmente en el código (PRs #1-#7 mergeados).

```mermaid
classDiagram
    direction LR

    class Product {
        +string id
        +string name
        +string description
        +number price
        +string category
        +number stock
        +boolean available
    }

    class CatalogService {
        -Product[] products
        +listAvailable() Product[]
        +searchByCategory(category) Product[]
        +findById(id) Product
    }

    class CatalogController {
        +list(category?) Product[]
        +findOne(id) Product
    }

    class Cart {
        +string id
        +string userId
        +CartItem[] items
    }

    class CartItem {
        +string productId
        +string name
        +number unitPrice
        +number quantity
        +lineSubtotal() number
    }

    class AddItemDto {
        +string productId
        +number quantity
    }

    class CartService {
        -Map carts
        -CatalogService catalogService
        +getOrCreate(cartId, userId) Cart
        +addItem(cartId, dto) Cart
        +removeItem(cartId, productId) Cart
        +calculateSubtotal(cartId) number
    }

    class CartController {
        +getCart(id) Cart
        +addItem(id, dto) Cart
        +removeItem(id, productId) Cart
        +subtotal(id) object
    }

    CatalogController --> CatalogService : uses
    CatalogService --> Product : manages
    CartController --> CartService : uses
    CartService --> CatalogService : depends on
    CartService --> Cart : manages
    Cart "1" *-- "0..*" CartItem : contains
    CartService ..> AddItemDto : receives
    CartItem ..> Product : references
```

## 3. Mapeo FDD ↔ NestJS

Diagrama conceptual que muestra cómo los conceptos de FDD se mapean a la arquitectura de NestJS.

```mermaid
flowchart LR
    subgraph FDD["Conceptos FDD"]
        direction TB
        BA["Área de Negocio<br/>(Epic)"]
        F["Feature"]
        CO["Class Owner"]
        DM["Modelo de Dominio"]
        CI["Code Inspection"]
        PB["Promote to Build"]
    end

    subgraph NestJS["Implementación NestJS"]
        direction TB
        M["@Module"]
        EP["Endpoint del<br/>@Controller"]
        SRV["@Injectable Service"]
        ENT["Entity + DTO"]
        PR["Pull Request<br/>Review"]
        MERGE["Merge a main"]
    end

    BA --> M
    F --> EP
    CO --> SRV
    DM --> ENT
    CI --> PR
    PB --> MERGE
```

## 4. Flujo de una Feature por los 6 hitos FDD

Diagrama de estados que muestra el ciclo de vida de una feature en FDD.

```mermaid
stateDiagram-v2
    [*] --> ToDo : Feature created
    ToDo --> DomainWalkthrough : Chief Programmer<br/>schedules session
    DomainWalkthrough --> Design : 1% complete
    Design --> DesignInspection : 41% complete
    DesignInspection --> Code : 44% complete
    Code --> CodeInspection : 89% complete<br/>(Pull Request opened)
    CodeInspection --> PromoteToBuild : 99% complete<br/>(PR approved)
    PromoteToBuild --> Done : 100% complete<br/>(merged to main)
    Done --> [*]

    Design --> Design : Iteration<br/>(if inspection fails)
    Code --> Code : Iteration<br/>(if review fails)
```

## 5. Arquitectura de módulos NestJS (actual)

```mermaid
flowchart TB
    AppModule[AppModule]

    subgraph done["✅ Done — 100%"]
        CatalogModule[CatalogModule<br/>FDD-2]
        CartModule[CartModule<br/>FDD-3]
    end

    subgraph pending["⚪ To Do — 0%"]
        UsersModule[UsersModule<br/>FDD-4]
        OrdersModule[OrdersModule<br/>FDD-5]
        PaymentsModule[PaymentsModule<br/>FDD-6]
    end

    AppModule --> CatalogModule
    AppModule --> CartModule
    AppModule --> UsersModule
    AppModule --> OrdersModule
    AppModule --> PaymentsModule

    CartModule -.depends on.-> CatalogModule
    OrdersModule -.future.-> CartModule
    OrdersModule -.future.-> UsersModule
    PaymentsModule -.future.-> OrdersModule

    classDef doneStyle fill:#d4edda,stroke:#28a745,color:#000
    classDef todoStyle fill:#f8f9fa,stroke:#6c757d,color:#000
    class CatalogModule,CartModule doneStyle
    class UsersModule,OrdersModule,PaymentsModule todoStyle
```
