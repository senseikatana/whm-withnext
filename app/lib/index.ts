// Core

export type {
    Customer as ApiCustomer,
    Order as ApiOrder,
    PickingTask as ApiPickingTask,
    Product as ApiProduct,
    Staff as ApiStaff
} from "./apis";
// APIs (API Manager pattern)
export {
    customersApi,
    graphqlQuery,
    initWarehouseApi,
    loadDashboard,
    loadInventoryWithAlerts,
    loadOrderDetail,
    ordersApi,
    pickingApi,
    productsApi,
    staffApi
} from "./apis";
export * from "./apollo";
export * from "./auth";
export * from "./auth-context";
export * from "./insforge";
export * from "./queries";
// Seeds
export { SEED_CUSTOMERS } from "./seeds/customers";
export { SEED_ORDERS } from "./seeds/orders";
export { SEED_PICKING } from "./seeds/picking";
export { SEED_PRODUCTS } from "./seeds/products";
export { SEED_STAFF } from "./seeds/staff";
export { ROLE_DESCRIPTIONS, ROLE_PERMISSIONS, SEED_USER_PROFILES } from "./seeds/users";
export type { UserProfile, UserRole } from "./seeds/users";
// Services
export { ErrorsService } from ("./services/api-error");

export { api, ApiManager } from "./services/api-manager";
export type { ApiConfig, ApiResponse, RequestOptions } from "./services/api-manager";
export { createCrudService } from "./services/base";
export { customersService } from "./services/customers";
export { ordersService } from "./services/orders";
export { pickingService } from "./services/picking";
export { productsService } from "./services/products";
export {
    isValidSlug,
    orderSlug,
    productSlug,
    slugify,
    uniqueSlug
} from "./services/slugify.service";
export { staffService } from "./services/staff";
export * from "./storage";

