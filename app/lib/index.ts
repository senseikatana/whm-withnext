// Core
export * from "./apollo";
export * from "./auth-context";
export * from "./auth";
export * from "./insforge";
export * from "./queries";
export * from "./storage";

// APIs (API Manager pattern)
export { initWarehouseApi, productsApi, customersApi, ordersApi, pickingApi, staffApi } from "./apis";
export { graphqlQuery, loadDashboard, loadInventoryWithAlerts, loadOrderDetail } from "./apis";
export type { Product as ApiProduct, Customer as ApiCustomer, Order as ApiOrder, PickingTask as ApiPickingTask, Staff as ApiStaff } from "./apis";

// Seeds
export { SEED_CUSTOMERS } from "./seeds/customers";
export { SEED_ORDERS } from "./seeds/orders";
export { SEED_PICKING } from "./seeds/picking";
export { SEED_PRODUCTS } from "./seeds/products";
export { SEED_STAFF } from "./seeds/staff";
export { SEED_USER_PROFILES, ROLE_PERMISSIONS, ROLE_DESCRIPTIONS } from "./seeds/users";
export type { UserRole, UserProfile } from "./seeds/users";

// Services
export { ApiError } from "./services/api-error";
export { ApiManager, api } from "./services/api-manager";
export type { ApiConfig, ApiResponse, RequestOptions } from "./services/api-manager";
export { createCrudService } from "./services/base";
export { productsService } from "./services/products";
export { customersService } from "./services/customers";
export { ordersService } from "./services/orders";
export { pickingService } from "./services/picking";
export { staffService } from "./services/staff";
export { slugify, uniqueSlug, productSlug, orderSlug, isValidSlug } from "./services/slugify.service";
