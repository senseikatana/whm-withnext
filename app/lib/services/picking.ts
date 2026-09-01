import type { PickingTask } from "../seeds/picking";
import { createCrudService } from "./base";

export const pickingService = createCrudService<PickingTask>("picking");
