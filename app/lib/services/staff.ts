import type { Staff } from "../seeds/staff";
import { createCrudService } from "./base";

export const staffService = createCrudService<Staff>("staff");
