# Clean Architecture 가이드

> Robert C. Martin (Uncle Bob)의 Clean Architecture 원칙과 SpacePro MES 적용 방안

---

## 📌 핵심 원칙

### Clean Architecture의 목표
- **프레임워크 독립성**: UI, DB, 외부 라이브러리에 종속되지 않음
- **테스트 용이성**: 비즈니스 로직을 독립적으로 테스트 가능
- **UI 독립성**: UI 변경이 비즈니스 로직에 영향 없음
- **DB 독립성**: PostgreSQL → MongoDB 변경 시에도 로직 유지
- **외부 에이전시 독립성**: 외부 서비스 변경에 유연하게 대응

---

## 🔄 계층 구조 (The Dependency Rule)

```
┌─────────────────────────────────────────────────────────────┐
│                     Frameworks & Drivers                     │
│              (Web, UI, DB, Devices, External I/F)            │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                   Interface Adapters                     │ │
│  │          (Controllers, Gateways, Presenters)             │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │              Application Business Rules              │ │ │
│  │  │                    (Use Cases)                       │ │ │
│  │  │  ┌─────────────────────────────────────────────────┐ │ │ │
│  │  │  │          Enterprise Business Rules              │ │ │ │
│  │  │  │                 (Entities)                      │ │ │ │
│  │  │  └─────────────────────────────────────────────────┘ │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

     ★ 의존성 방향: 항상 안쪽(내부)을 향함 ★
```

---

## 📁 4개 레이어 상세

### 1. Entities (엔티티) - 가장 내부
```typescript
// 핵심 비즈니스 규칙, 외부 변화에 영향받지 않음
interface WorkOrder {
  id: string;
  itemCode: string;
  quantity: number;
  dueDate: Date;
  status: WorkOrderStatus;
  
  // 비즈니스 규칙 메서드
  isOverdue(): boolean;
  calculateLeadTime(): number;
}
```

### 2. Use Cases (유스케이스) - 애플리케이션 로직
```typescript
// 애플리케이션 고유 비즈니스 규칙
interface CreateWorkOrderUseCase {
  execute(input: CreateWorkOrderInput): Promise<WorkOrder>;
}

interface ScheduleProductionUseCase {
  execute(orders: WorkOrder[], machines: Machine[]): Promise<Schedule>;
}
```

### 3. Interface Adapters (인터페이스 어댑터) - 변환 계층
```typescript
// Controller: 외부 → UseCase 변환
// Presenter: UseCase → 외부 변환
// Gateway: DB/외부 서비스 접근

class WorkOrderController {
  constructor(private createUseCase: CreateWorkOrderUseCase) {}
  
  async create(req: Request): Promise<Response> {
    const input = this.mapToInput(req.body);
    const result = await this.createUseCase.execute(input);
    return this.mapToResponse(result);
  }
}
```

### 4. Frameworks & Drivers (프레임워크) - 최외각
```typescript
// Next.js, Prisma, React, PostgreSQL 등
// 구체적인 기술 스택 구현
```

---

## 🏭 SpacePro MES 적용 구조

```
/Project/spacepro/
│
├── src/
│   ├── domain/                      # ⭐ Entities Layer
│   │   ├── entities/
│   │   │   ├── WorkOrder.ts         # 작업지시 엔티티
│   │   │   ├── Machine.ts           # 설비 엔티티
│   │   │   ├── Process.ts           # 공정 엔티티
│   │   │   ├── Item.ts              # 품목 엔티티
│   │   │   └── Schedule.ts          # 스케줄 엔티티
│   │   │
│   │   ├── value-objects/
│   │   │   ├── OrderId.ts           # 값 객체
│   │   │   ├── Quantity.ts
│   │   │   └── TimeRange.ts
│   │   │
│   │   └── repositories/            # Repository 인터페이스
│   │       ├── IWorkOrderRepository.ts
│   │       ├── IMachineRepository.ts
│   │       └── IScheduleRepository.ts
│   │
│   ├── application/                 # ⭐ Use Cases Layer
│   │   ├── use-cases/
│   │   │   ├── work-order/
│   │   │   │   ├── CreateWorkOrderUseCase.ts
│   │   │   │   ├── UpdateWorkOrderUseCase.ts
│   │   │   │   └── GetWorkOrderListUseCase.ts
│   │   │   │
│   │   │   ├── scheduling/
│   │   │   │   ├── OptimizeScheduleUseCase.ts
│   │   │   │   └── RescheduleUseCase.ts
│   │   │   │
│   │   │   └── production/
│   │   │       ├── TrackInUseCase.ts
│   │   │       └── TrackOutUseCase.ts
│   │   │
│   │   ├── dto/                     # Data Transfer Objects
│   │   │   ├── WorkOrderDTO.ts
│   │   │   └── ScheduleDTO.ts
│   │   │
│   │   └── services/                # Application Services
│   │       ├── SchedulingService.ts
│   │       └── NotificationService.ts
│   │
│   ├── infrastructure/              # ⭐ Frameworks Layer
│   │   ├── persistence/
│   │   │   ├── prisma/
│   │   │   │   ├── PrismaWorkOrderRepository.ts
│   │   │   │   └── PrismaMachineRepository.ts
│   │   │   └── mappers/
│   │   │       ├── WorkOrderMapper.ts
│   │   │       └── MachineMapper.ts
│   │   │
│   │   ├── external/
│   │   │   ├── or-tools/
│   │   │   │   └── ORToolsScheduler.ts
│   │   │   └── notification/
│   │   │       └── SlackNotifier.ts
│   │   │
│   │   └── config/
│   │       └── database.ts
│   │
│   └── presentation/                # ⭐ Interface Adapters Layer
│       ├── controllers/
│       │   ├── WorkOrderController.ts
│       │   └── ScheduleController.ts
│       │
│       ├── presenters/
│       │   ├── WorkOrderPresenter.ts
│       │   └── SchedulePresenter.ts
│       │
│       └── api/                     # Next.js API Routes
│           └── work-orders/
│               └── route.ts
│
├── app/                             # Next.js App Router (UI)
│   ├── (dashboard)/
│   ├── production/
│   └── plan/
│
└── components/                      # React UI Components
    ├── layout/
    └── widgets/
```

---

## 💡 주요 구현 패턴

### 1. Dependency Injection (의존성 주입)

```typescript
// domain/repositories/IWorkOrderRepository.ts
interface IWorkOrderRepository {
  findById(id: string): Promise<WorkOrder | null>;
  findByDateRange(start: Date, end: Date): Promise<WorkOrder[]>;
  save(order: WorkOrder): Promise<void>;
}

// infrastructure/persistence/PrismaWorkOrderRepository.ts
class PrismaWorkOrderRepository implements IWorkOrderRepository {
  constructor(private prisma: PrismaClient) {}
  
  async findById(id: string): Promise<WorkOrder | null> {
    const data = await this.prisma.workOrder.findUnique({ where: { id } });
    return data ? WorkOrderMapper.toDomain(data) : null;
  }
}

// application/use-cases/CreateWorkOrderUseCase.ts
class CreateWorkOrderUseCase {
  constructor(
    private workOrderRepo: IWorkOrderRepository,  // 인터페이스에 의존
    private notifier: INotificationService
  ) {}
  
  async execute(input: CreateWorkOrderInput): Promise<WorkOrder> {
    const order = WorkOrder.create(input);
    await this.workOrderRepo.save(order);
    await this.notifier.notify(`새 작업지시: ${order.id}`);
    return order;
  }
}
```

### 2. Mapper Pattern (데이터 변환)

```typescript
// infrastructure/persistence/mappers/WorkOrderMapper.ts
class WorkOrderMapper {
  // DB 모델 → 도메인 엔티티
  static toDomain(raw: PrismaWorkOrder): WorkOrder {
    return new WorkOrder({
      id: new OrderId(raw.id),
      itemCode: raw.item_code,
      quantity: new Quantity(raw.qty),
      dueDate: raw.due_date,
      status: raw.status as WorkOrderStatus,
    });
  }
  
  // 도메인 엔티티 → DB 모델
  static toPersistence(order: WorkOrder): Prisma.WorkOrderCreateInput {
    return {
      id: order.id.value,
      item_code: order.itemCode,
      qty: order.quantity.value,
      due_date: order.dueDate,
      status: order.status,
    };
  }
}
```

### 3. Use Case Input/Output

```typescript
// application/dto/CreateWorkOrderDTO.ts
interface CreateWorkOrderInput {
  itemCode: string;
  quantity: number;
  dueDate: Date;
  priority?: number;
}

interface CreateWorkOrderOutput {
  id: string;
  status: string;
  createdAt: Date;
}

// Controller에서 사용
async function createWorkOrder(req: NextRequest) {
  const input: CreateWorkOrderInput = await req.json();
  const result = await useCase.execute(input);
  return NextResponse.json(result);
}
```

---

## 🎯 OR-Tools 통합 (Clean Architecture 적용)

```
┌─────────────────────────────────────────────────────────────┐
│                     presentation/                            │
│   ScheduleController.optimize(request) → SchedulePresenter  │
└──────────────────────────────┬──────────────────────────────┘
                               │ DTO
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     application/                             │
│   OptimizeScheduleUseCase                                    │
│     - ISchedulingService (interface)                         │
│     - IWorkOrderRepository (interface)                       │
└──────────────────────────────┬──────────────────────────────┘
                               │ Domain Objects
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     domain/                                  │
│   Schedule, WorkOrder, Machine entities                      │
│   ISchedulingService (port interface)                        │
└─────────────────────────────────────────────────────────────┘
                               ▲
                               │ implements
┌─────────────────────────────────────────────────────────────┐
│                     infrastructure/                          │
│   ORToolsSchedulingService                                   │
│     - Python microservice 호출                               │
│     - OR-Tools CP-SAT 활용                                   │
└─────────────────────────────────────────────────────────────┘
```

```typescript
// domain/services/ISchedulingService.ts (Port)
interface ISchedulingService {
  optimize(orders: WorkOrder[], machines: Machine[]): Promise<Schedule>;
}

// infrastructure/external/ORToolsSchedulingService.ts (Adapter)
class ORToolsSchedulingService implements ISchedulingService {
  constructor(private httpClient: HttpClient) {}
  
  async optimize(orders: WorkOrder[], machines: Machine[]): Promise<Schedule> {
    const response = await this.httpClient.post('/scheduling/optimize', {
      orders: orders.map(o => o.toDTO()),
      machines: machines.map(m => m.toDTO()),
    });
    return Schedule.fromDTO(response.data);
  }
}
```

---

## ✅ 장점 및 효과

| 장점 | 설명 |
|------|------|
| **테스트 용이성** | UseCase 단위로 Mock 주입하여 테스트 |
| **유지보수성** | 변경 영향 범위 최소화 |
| **확장성** | 새 기능 추가 시 기존 코드 수정 최소화 |
| **팀 협업** | 계층별로 독립적 개발 가능 |
| **기술 교체 용이** | DB, 외부 서비스 교체 시 infrastructure만 수정 |

---

## 🔗 참고 자료

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [The Clean Architecture in TypeScript](https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic/)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)

---

**작성일**: 2024-12-18
