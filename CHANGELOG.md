# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adherido a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] — 2026-09-01

### Añadido

#### Backend — InsForge
- Integración completa con InsForge como backend (PostgreSQL, Auth, Storage)
- Cliente SDK inicializado en `app/lib/insforge.ts`
- Migración de base de datos con 5 tablas: `products`, `customers`, `orders`, `picking`, `staff`
- Datos semilla para todas las tablas
- Servicios CRUD genéricos con operaciones: list, getById, create, update, remove, removeBatch

#### UI — Filtros y Batch Delete
- Filtros de búsqueda por texto en CrudView
- Filtros por dropdown para campos de tipo `select` (status, categoría, tipo)
- Contador de filtros activos con badge
- Checkbox multi-select en tabla con "select all"
- Barra de batch delete con confirmación
- Integración de batch delete en todas las vistas CRUD

#### Dashboard
- Estado vacío cuando no hay datos: mensaje informativo + contadores en 0
- KPI cards muestran "—" cuando no hay datos
- Gráfico y logs ocultos hasta tener datos reales

#### Documentación
- README.md completo con stack, estructura, scripts y despliegue
- CONTRIBUTING.md con guías de desarrollo, convenciones y flujo de trabajo
- CHANGELOG.md (este archivo)

### Cambiado

- Migrado de Firebase a InsForge como backend
- Migrado de Vite a Next.js 16 (App Router)
- Componentes modularizados en `app/components/`
- Dashboard usa datos reales en vez de hardcoded

### Eliminado

- Firebase y todas sus dependencias
- Archivos Vite leftover (`main.tsx`, `index.css`, `App.css`, `index.html`)
- `firebase-debug.log` (añadido a `.gitignore`)
- Convex dependencies (no se usaban)

### Corregido

- Biome.json actualizado a schema 2.5.11 con migración automática
- PostCSS simplificado para Tailwind CSS v4
- Errores de TypeScript en todos los archivos
- Accibilidad: keyboard handlers en elementos interactivos
- SSR: `localStorage` protegido contra acceso en servidor

## [0.0.1] — 2026-07-26

### Añadido
- Inicialización del proyecto con Next.js 16
- Configuración base de Tailwind CSS 4
- Estructura de componentes modular
- Integración inicial con Firebase (posteriormente eliminada)
