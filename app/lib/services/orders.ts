import type { Order } from "../seeds/orders";
import { createCrudService } from "./base";

export const ordersService = createCrudService<Order>("orders");
