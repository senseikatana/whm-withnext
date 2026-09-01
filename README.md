# WarehouseFlow SGA

Sistema de Gestión de Almacén (SGA) enterprise construido con Next.js 16, React 19, Tailwind CSS 4 e InsForge como backend.

## Descripción

WarehouseFlow es una aplicación web completa para la gestión de operaciones de almacén que incluye:

- **Dashboard operativo** con KPIs en tiempo real
- **Gestión de inventario** con clases ABC y ubicaciones
- **Recepción y expedición** de mercancía
- **Picking por voz** guiado por IA
- **Gestión de rutas** internas
- **Agente WhatsApp** con IA conversacional
- **Integración SAP** ERP
- **CRM de clientes** y proveedores
- **Gestión de personal** y turnos
- **Simulador PDA** para terminales handheld

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16.2 (App Router) |
| UI | React 19.2, Tailwind CSS 4, Lucide Icons |
| Backend | InsForge (PostgreSQL, Auth, Storage) |
| Lenguaje | TypeScript 5.9 |
| Linting | Biome 2.5 |
| Package Manager | Bun |
| IA | Gemini API (opcional) |

## Requisitos previos

- [Bun](https://bun.sh/) ≥ 1.0
- [InsForge CLI](https://insforge.dev) (para gestión del backend)
- Node.js ≥ 18 (para InsForge CLI)

## Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd whm-withnext

# Instalar dependencias
bun install

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales de InsForge

# Ejecutar en desarrollo
bun dev
```

## Variables de entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `NEXT_PUBLIC_INSFORGE_URL` | URL del proyecto InsForge | Sí |
| `NEXT_PUBLIC_INSFORGE_ANON_KEY` | Anon key de InsForge | Sí |

## Scripts disponibles

```bash
bun dev          # Servidor de desarrollo
bun build        # Build de producción
bun start        # Servidor de producción
bun lint         # Verificar errores con Biome
bun lint:fix     # Corregir errores automáticamente
bun format       # Verificar formato
bun format:fix   # Corregir formato automáticamente
bun check        # Verificar lint + formato
bun check:fix    # Corregir todo automáticamente
```

## Estructura del proyecto

```
whm-withnext/
├── app/
│   ├── App.tsx                    # Componente principal de la aplicación
│   ├── page.tsx                   # Entry point (Next.js)
│   ├── layout.tsx                 # Layout raíz
│   ├── globals.css                # Estilos globales (Tailwind)
│   ├── components/                # Componentes UI modulares
│   │   ├── CrudView.tsx           # Tabla CRUD genérica con filtros y batch delete
│   │   ├── DesktopDashboardView.tsx # Dashboard principal
│   │   ├── KpiCard.tsx            # Tarjeta de KPI
│   │   ├── SidebarItem.tsx        # Item del sidebar
│   │   ├── VoicePickingView.tsx   # Picking guiado por voz
│   │   ├── RoutesView.tsx         # Gestión de rutas
│   │   ├── WhatsAppAgentView.tsx  # Agente WhatsApp IA
│   │   ├── SapIntegrationView.tsx # Integración SAP
│   │   └── MobileAppSimulator.tsx # Simulador PDA
│   ├── lib/                       # Lógica de negocio
│   │   ├── insforge.ts            # Cliente InsForge SDK
│   │   ├── seeds/                 # Datos semilla
│   │   │   ├── products.ts
│   │   │   ├── customers.ts
│   │   │   ├── orders.ts
│   │   │   ├── picking.ts
│   │   │   └── staff.ts
│   │   └── services/              # Servicios CRUD
│   │       ├── base.ts            # Servicio base genérico
│   │       ├── products.ts
│   │       ├── customers.ts
│   │       ├── orders.ts
│   │       ├── picking.ts
│   │       └── staff.ts
│   └── utils/                     # Utilidades
│       ├── gemini-api.ts          # Helper para Gemini API
│       └── sku-generator.ts       # Generador de SKUs
├── migrations/                    # Migraciones de base de datos
├── public/                        # Assets estáticos
├── biome.json                     # Configuración de Biome
├── postcss.config.mjs             # Configuración de PostCSS
├── tsconfig.json                  # Configuración de TypeScript
└── package.json
```

## Base de datos

El proyecto usa InsForge (PostgreSQL) con las siguientes tablas:

| Tabla | Descripción |
|-------|-------------|
| `products` | Inventario de productos con SKU, stock y ubicación |
| `customers` | Clientes y proveedores |
| `orders` | Órdenes de entrada (recepción) y salida (expedición) |
| `picking` | Tareas de picking asignadas a operarios |
| `staff` | Personal del almacén y sus roles |

### Migraciones

```bash
# Crear nueva migración
bunx @insforge/cli db migrations new <nombre>

# Aplicar migraciones pendientes
bunx @insforge/cli db migrations up --all

# Ejecutar query directa
bunx @insforge/cli db query "SELECT * FROM products"
```

## Despliegue

### InsForge (recomendado)

```bash
# Build local
bun build

# Desplegar frontend
bunx @insforge/cli deployments deploy .next
```

### Vercel

```bash
# Instalar Vercel CLI
bun add -g vercel

# Desplegar
vercel
```

## Contribuir

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para las guías de contribución.

## Changelog

Ver [CHANGELOG.md](./CHANGELOG.md) para el historial de cambios.

## Licencia

© 2026 ESINSA — WarehouseFlow SGA. Todos los derechos reservados.
