import type { Product } from "../seeds/products";
import { createCrudService } from "./base";

export const productsService = createCrudService<Product>("products");
