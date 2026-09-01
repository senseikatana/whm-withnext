const DEFAULT_SYSTEM_INSTRUCTION =
	"Eres el consultor logístico y asistente experto AI de WarehouseFlow. Tus respuestas deben ser sumamente profesionales, concisas y directas.";

const RETRY_DELAYS = [1000, 2000, 4000];

/**
 * Calls the Gemini API with automatic retry logic.
 * Falls back to mock responses when no API key is configured.
 */
export async function callGeminiAPI(
	prompt: string,
	systemInstruction: string = DEFAULT_SYSTEM_INSTRUCTION,
): Promise<string> {
	const apiKey =
		typeof window !== "undefined"
			? localStorage.getItem("gemini_api_key") || ""
			: "";

	if (!apiKey) {
		return getMockResponse(prompt);
	}

	const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
	const payload = {
		contents: [{ parts: [{ text: prompt }] }],
		systemInstruction: { parts: [{ text: systemInstruction }] },
	};

	for (let i = 0; i <= RETRY_DELAYS.length; i++) {
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!response.ok) throw new Error(`API Error: ${response.status}`);
			const data = await response.json();
			return (
				data.candidates?.[0]?.content?.parts?.[0]?.text ||
				"Sin respuesta del modelo."
			);
		} catch (err) {
			if (i === RETRY_DELAYS.length) {
				console.error("Gemini API Error:", err);
				return "Error al comunicar con Gemini API.";
			}
			await new Promise((res) => setTimeout(res, RETRY_DELAYS[i]));
		}
	}

	return "Error al comunicar con Gemini API.";
}

/**
 * Provides mock responses when no Gemini API key is configured.
 */
function getMockResponse(prompt: string): string {
	const lower = prompt.toLowerCase();

	// Simulate delay
	if (lower.includes("json")) {
		if (lower.includes("inventory") || lower.includes("products")) {
			return JSON.stringify({
				sku: `SKU-${Math.floor(100 + Math.random() * 900)}`,
				name: "Producto IA Generado",
				category: "Almacenaje",
				stock: 120,
				minStock: 20,
				location: "A-05-01",
				price: 45.0,
			});
		}
		if (lower.includes("crm") || lower.includes("cliente")) {
			return JSON.stringify({
				code: `CUST0${Math.floor(10 + Math.random() * 90)}`,
				name: "Empresa Logística IA",
				type: "Cliente",
				email: "ia@empresalogistica.com",
				phone: "+34 600 000 000",
				status: "Activo",
			});
		}
		if (lower.includes("order") || lower.includes("orden")) {
			return JSON.stringify({
				orderNumber: `PED-2026-${Math.floor(100 + Math.random() * 900)}`,
				customerName: "Mercadona S.A.",
				status: "Pendiente",
				priority: "normal",
				totalItems: 6,
				totalValue: 850.0,
			});
		}
		return JSON.stringify({ ok: true });
	}

	if (lower.includes("ruta")) {
		return "Optimización IA sugerida: La ruta más corta para picking es de Dock A -> Pasillo A-02 -> Rack Level 3 -> Consolidador A. Esto ahorra un 22% de tiempo de recorrido.";
	}

	if (lower.includes("whatsapp")) {
		return "Hola, sí. Su pedido ya está listo para despacho en el Muelle de Carga C. Puede ingresar con el camión ahora.";
	}

	return "Simulación de Asistente IA de WarehouseFlow: Se sugiere optimizar la ubicación de la categoría Palets debido a una alta tasa de rotación (Clase A).";
}
