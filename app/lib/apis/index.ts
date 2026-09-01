export { initWarehouseApi, productsApi, customersApi, ordersApi, pickingApi, staffApi } from "./warehouse.api";
export type { Product, Customer, Order, PickingTask, Staff } from "./warehouse.api";
export { graphqlQuery, loadDashboard, loadInventoryWithAlerts, loadOrderDetail } from "./graphql-client";
