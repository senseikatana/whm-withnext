import { NextResponse } from "next/server";
import insforge from "../lib/insforge";

export async function handleGet(table: string) {
	try {
		const { data, error } = await insforge.database
			.from(table)
			.select()
			.order("id", { ascending: true });

		if (error) {
			return NextResponse.json({ success: false, error: error.message }, { status: 500 });
		}

		return NextResponse.json({ success: true, data: { items: data ?? [] } });
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return NextResponse.json({ success: false, error: message }, { status: 500 });
	}
}

export async function handlePost(table: string, request: Request) {
	try {
		const body = await request.json();
		const { data, error } = await insforge.database.from(table).insert([body]);

		if (error) {
			return NextResponse.json({ success: false, error: error.message }, { status: 500 });
		}

		return NextResponse.json({ success: true, data: data?.[0] ?? null });
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return NextResponse.json({ success: false, error: message }, { status: 500 });
	}
}

export async function handlePut(table: string, id: string, request: Request) {
	try {
		const body = await request.json();
		const { data, error } = await insforge.database.from(table).update(body).eq("id", Number(id));

		if (error) {
			return NextResponse.json({ success: false, error: error.message }, { status: 500 });
		}

		return NextResponse.json({ success: true, data: data?.[0] ?? null });
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return NextResponse.json({ success: false, error: message }, { status: 500 });
	}
}

export async function handleDelete(table: string, id: string) {
	try {
		const { error } = await insforge.database.from(table).delete().eq("id", Number(id));

		if (error) {
			return NextResponse.json({ success: false, error: error.message }, { status: 500 });
		}

		return NextResponse.json({ success: true });
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return NextResponse.json({ success: false, error: message }, { status: 500 });
	}
}
