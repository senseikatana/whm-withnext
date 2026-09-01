export interface Staff {
	id: number;
	name: string;
	role: string;
	zone: string;
	status: string;
	created_at?: string;
	updated_at?: string;
}

export const SEED_STAFF: Omit<Staff, "id" | "created_at" | "updated_at">[] = [
	{
		name: "Juan García",
		role: "Administrador",
		zone: "Oficina",
		status: "Activo",
	},
	{ name: "María López", role: "Operario", zone: "Zona B", status: "En Ruta" },
	{ name: "Carlos Ruiz", role: "Operario", zone: "Zona A", status: "Activo" },
	{
		name: "Ana Martínez",
		role: "Operario",
		zone: "Zona C",
		status: "Inactivo",
	},
];
