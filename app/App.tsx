"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Package,
  ArrowDownToLine,
  Send,
  Users,
  Mic,
  Route,
  MessageCircle,
  Cpu,
  Smartphone,
  Bot,
  Globe,
  Database,
  X,
  Loader2,
  LayoutDashboard,
  Search,
} from "lucide-react";

// Import modular components
import SidebarItem from "./components/SidebarItem";
import DesktopDashboardView from "./components/DesktopDashboardView";
import CrudView from "./components/CrudView";
import VoicePickingView from "./components/VoicePickingView";
import RoutesView from "./components/RoutesView";
import WhatsAppAgentView from "./components/WhatsAppAgentView";
import SapIntegrationView from "./components/SapIntegrationView";
import MobileAppSimulator from "./components/MobileAppSimulator";

// initial mock/fallback data matching backend seed database
const INITIAL_PRODUCTS = [
  {
    id: 1,
    sku: "SKU-001",
    name: "Palet Europeo 120x80",
    category: "Palets",
    stock: 450,
    minStock: 100,
    location: "A-01-01",
    price: 12.5,
  },
  {
    id: 2,
    sku: "SKU-002",
    name: "Caja Cartón 60x40x40",
    category: "Embalaje",
    stock: 2500,
    minStock: 500,
    location: "A-02-03",
    price: 1.2,
  },
  {
    id: 3,
    sku: "SKU-003",
    name: "Film Estirable 500mm",
    category: "Embalaje",
    stock: 180,
    minStock: 50,
    location: "B-05-02",
    price: 18.9,
  },
  {
    id: 4,
    sku: "SKU-004",
    name: "Etiquetas Térmicas 100x150",
    category: "Etiquetado",
    stock: 95,
    minStock: 30,
    location: "B-03-01",
    price: 25.0,
  },
  {
    id: 5,
    sku: "SKU-005",
    name: "Cinta Adhesiva 50mm",
    category: "Embalaje",
    stock: 8,
    minStock: 20,
    location: "A-04-02",
    price: 2.5,
  },
  {
    id: 6,
    sku: "SKU-006",
    name: "Transpaleta Manual 2500kg",
    category: "Equipamiento",
    stock: 12,
    minStock: 5,
    location: "C-01-01",
    price: 285.0,
  },
  {
    id: 8,
    sku: "SKU-008",
    name: "Contenedor Plástico 60L",
    category: "Almacenaje",
    stock: 320,
    minStock: 100,
    location: "B-08-03",
    price: 15.5,
  },
  {
    id: 9,
    sku: "SKU-009",
    name: "Guantes Trabajo Talla L",
    category: "EPI",
    stock: 145,
    minStock: 50,
    location: "A-06-04",
    price: 28.0,
  },
  {
    id: 11,
    sku: "SKU-011",
    name: "Scanner Código Barras",
    category: "Tecnología",
    stock: 25,
    minStock: 10,
    location: "C-05-02",
    price: 85.0,
  },
  {
    id: 12,
    sku: "SKU-012",
    name: "PDA Industrial Zebra",
    category: "Tecnología",
    stock: 18,
    minStock: 8,
    location: "C-05-03",
    price: 1250.0,
  },
];

const INITIAL_CUSTOMERS = [
  {
    id: 1,
    code: "CUST001",
    name: "Mercadona S.A.",
    type: "Cliente",
    email: "pedidos@mercadona.es",
    phone: "+34 900 123 456",
    status: "Activo",
  },
  {
    id: 2,
    code: "CUST002",
    name: "Carrefour España",
    type: "Cliente",
    email: "compras@carrefour.es",
    phone: "+34 900 234 567",
    status: "Activo",
  },
  {
    id: 3,
    code: "CUST003",
    name: "El Corte Inglés",
    type: "Cliente",
    email: "logistica@elcorteingles.es",
    phone: "+34 900 345 678",
    status: "Activo",
  },
  {
    id: 4,
    code: "SUPP001",
    name: "Distribuciones García SL",
    type: "Proveedor",
    email: "ventas@distgarcia.com",
    phone: "+34 963 123 456",
    status: "Activo",
  },
  {
    id: 5,
    code: "SUPP002",
    name: "Logística Martínez",
    type: "Proveedor",
    email: "info@logmartinez.es",
    phone: "+34 932 234 567",
    status: "Activo",
  },
];

const INITIAL_ORDERS = [
  {
    id: 1,
    orderNumber: "PED-2026-001",
    customerName: "Mercadona S.A.",
    status: "Pendiente",
    priority: "high",
    totalItems: 3,
    totalValue: 1850.5,
  },
  {
    id: 2,
    orderNumber: "PED-2026-002",
    customerName: "Carrefour España",
    status: "Picking",
    priority: "normal",
    totalItems: 5,
    totalValue: 3250.0,
  },
  {
    id: 3,
    orderNumber: "PED-2026-003",
    customerName: "El Corte Inglés",
    status: "Pendiente",
    priority: "normal",
    totalItems: 2,
    totalValue: 890.0,
  },
  {
    id: 4,
    orderNumber: "PED-2026-004",
    customerName: "Mercadona S.A.",
    status: "Packing",
    priority: "high",
    totalItems: 4,
    totalValue: 2100.0,
  },
  {
    id: 5,
    orderNumber: "PED-2026-005",
    customerName: "Carrefour España",
    status: "Despachado",
    priority: "normal",
    totalItems: 6,
    totalValue: 4500.0,
  },
  {
    id: 6,
    orderNumber: "PED-2026-006",
    customerName: "El Corte Inglés",
    status: "Pendiente",
    priority: "high",
    totalItems: 8,
    totalValue: 6750.0,
  },
  {
    id: 7,
    orderNumber: "REC-2026-001",
    customerName: "Distribuciones García SL",
    status: "Pendiente",
    priority: "normal",
    totalItems: 12,
    totalValue: 1450.0,
  },
  {
    id: 8,
    orderNumber: "REC-2026-002",
    customerName: "Logística Martínez",
    status: "Completado",
    priority: "normal",
    totalItems: 24,
    totalValue: 3800.0,
  },
];

const INITIAL_PICKING = [
  {
    id: 1,
    taskNumber: "PICK-001",
    orderNumber: "PED-2026-001",
    assignedTo: "Carlos Ruiz",
    zone: "A",
    status: "Pendiente",
    totalItems: 3,
    pickedItems: 0,
  },
  {
    id: 2,
    taskNumber: "PICK-002",
    orderNumber: "PED-2026-002",
    assignedTo: "María López",
    zone: "B",
    status: "En Proceso",
    totalItems: 5,
    pickedItems: 2,
  },
  {
    id: 3,
    taskNumber: "PICK-003",
    orderNumber: "PED-2026-003",
    assignedTo: "Carlos Ruiz",
    zone: "C",
    status: "Pendiente",
    totalItems: 2,
    pickedItems: 0,
  },
];

const INITIAL_STAFF = [
  {
    id: 1,
    name: "Juan García",
    role: "Administrador",
    status: "Activo",
    zone: "Oficina",
  },
  {
    id: 2,
    name: "María López",
    role: "Operario",
    status: "En Ruta",
    zone: "Zona B",
  },
  {
    id: 3,
    name: "Carlos Ruiz",
    role: "Operario",
    status: "Activo",
    zone: "Zona A",
  },
  {
    id: 4,
    name: "Ana Martínez",
    role: "Operario",
    status: "Inactivo",
    zone: "Zona C",
  },
];

const INITIAL_WHATSAPP = [
  {
    id: 1,
    sender: "Chofer - Luis (Transportista)",
    message: "Hola, estoy llegando con el camión al muelle B. ¿Está libre?",
    time: "16:02",
    responseByAI:
      "Hola Luis, sí, el muelle B está libre para descarga. Te espera el operario Carlos.",
  },
  {
    id: 2,
    sender: "Supervisor - Ramón",
    message: "Necesitamos reubicar los palets de la zona C a la A urgente.",
    time: "15:45",
    responseByAI:
      "Mensaje recibido Ramón. Se han generado tareas prioritarias para el equipo.",
  },
];

const INITIAL_SAP_LOGS = [
  {
    id: 1,
    timestamp: "16:20:11",
    event: "Sincronización de Stock SKU-001 exitosa",
    type: "info",
  },
  {
    id: 2,
    timestamp: "16:15:34",
    event: "SAP ERP importó orden de venta PED-2026-006",
    type: "info",
  },
  {
    id: 3,
    timestamp: "16:00:22",
    event: "Error temporal en conexión SAP RFC. Reintentando...",
    type: "warning",
  },
];

// Helper to get Gemini API key (SSR-safe)
const getGeminiApiKey = () =>
  typeof window !== "undefined" ? localStorage.getItem("gemini_api_key") || "" : "";

// callGeminiAPI helper
const callGeminiAPI = async (
  prompt: string,
  systemInstruction = "Eres el consultor logístico y asistente experto AI de WarehouseFlow. Tus respuestas deben ser sumamente profesionales, concisas y directas.",
) => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    await new Promise((res) => setTimeout(res, 800));
    if (prompt.toLowerCase().includes("json")) {
      if (prompt.includes("inventory")) {
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
      if (prompt.includes("crm") || prompt.includes("cliente")) {
        return JSON.stringify({
          code: `CUST0${Math.floor(10 + Math.random() * 90)}`,
          name: "Empresa Logística IA",
          type: "Cliente",
          email: "ia@empresalogistica.com",
          phone: "+34 600 000 000",
          status: "Activo",
        });
      }
      if (prompt.includes("order") || prompt.includes("orden")) {
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
    if (prompt.toLowerCase().includes("ruta")) {
      return "Optimización IA sugerida: La ruta más corta para picking es de Dock A -> Pasillo A-02 -> Rack Level 3 -> Consolidador A. Esto ahorra un 22% de tiempo de recorrido.";
    }
    if (prompt.toLowerCase().includes("whatsapp")) {
      return "Hola, sí. Su pedido ya está listo para despacho en el Muelle de Carga C. Puede ingresar con el camión ahora.";
    }
    return "Simulación de Asistente IA de WarehouseFlow: Se sugiere optimizar la ubicación de la categoría Palets debido a una alta tasa de rotación (Clase A).";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("API Error");
    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sin respuesta del modelo."
    );
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "Error al comunicar con Gemini API.";
  }
};

const translations = {
  es: {
    dashboard: "Panel General",
    inventory: "Inventario & Stock",
    crm: "Clientes & CRM",
    inOrders: "Entradas (Inbounds)",
    outOrders: "Salidas (Outbounds)",
    picking: "Picking por Voz (IA)",
    routes: "Rutas Internas",
    whatsapp: "Agente WhatsApp AI",
    sap: "SAP ERP Integration",
    users: "Equipo y Operarios",
    search: "Buscar en base de datos...",
    welcome: "WarehouseFlow SGA",
    currentShift: "Turno Activo · Muelles A, B y C Operativos",
    compRate: "Tasa de Servicio",
    inToday: "Recepciones Hoy",
    pendingDisp: "Despachos Pdtes.",
    lowStock: "Artículos Críticos",
    accuracy: "Precisión Stock",
    activeOrders: "Órdenes Activas",
    objective: "Objetivo",
    add: "Añadir",
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    actions: "Acciones",
    welcomeAuth: "Acceso WarehouseFlow",
    copyright: "© 2026 WarehouseFlow · WMS Enterprise Solution",
    viewMode: "Modo de Vista",
    adminView: "Administrador (Escritorio)",
    operatorView: "Operario (Handheld PDA)",
  },
  en: {
    dashboard: "Dashboard",
    inventory: "Inventory & Stock",
    crm: "CRM & Clients",
    inOrders: "Inbound Orders",
    outOrders: "Outbound Orders",
    picking: "AI Voice Picking",
    routes: "Internal Routes",
    whatsapp: "WhatsApp AI Agent",
    sap: "SAP ERP Integration",
    users: "Team & Operators",
    search: "Search database records...",
    welcome: "WarehouseFlow WMS",
    currentShift: "Active Shift · Docks A, B, and C Operational",
    compRate: "Service Level",
    inToday: "Inbounds Today",
    pendingDisp: "Pending Shippings",
    lowStock: "Critical Stock",
    accuracy: "Stock Accuracy",
    activeOrders: "Active Orders",
    objective: "Target",
    add: "Add New",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    actions: "Actions",
    welcomeAuth: "WarehouseFlow Login",
    copyright: "© 2026 WarehouseFlow · WMS Enterprise Solution",
    viewMode: "View Mode",
    adminView: "Manager (Desktop)",
    operatorView: "Operator (Handheld PDA)",
  },
};

export default function App() {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [lang, setLang] = useState<"es" | "en">("es");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Database status flag (connected to local sqlite vs offline mockup)
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [dbState, setDbState] = useState({
    products: INITIAL_PRODUCTS,
    customers: INITIAL_CUSTOMERS,
    orders: INITIAL_ORDERS,
    picking: INITIAL_PICKING,
    staff: INITIAL_STAFF,
    whatsapp: INITIAL_WHATSAPP,
    sapLogs: INITIAL_SAP_LOGS,
  });

  const [loading, setLoading] = useState<boolean>(false);

  // Gemini Modal Configuration
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(getGeminiApiKey());
  const [hasApiKey, setHasApiKey] = useState(!!getGeminiApiKey());

  const t = translations[lang];

  // API fetches with fallback logic
  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Products
      const prodRes = await fetch("/api/products");
      const prodJson = await prodRes.json();

      // 2. Fetch Customers
      const custRes = await fetch("/api/customers");
      const custJson = await custRes.json();

      // 3. Fetch Orders
      const orderRes = await fetch("/api/orders");
      const orderJson = await orderRes.json();

      // 4. Fetch Picking Tasks
      const pickRes = await fetch("/api/picking-tasks");
      const pickJson = await pickRes.json();

      setDbState((prev) => ({
        ...prev,
        products: prodJson.success ? prodJson.data.items : prev.products,
        customers: custJson.success ? custJson.data.items : prev.customers,
        orders: orderJson.success ? orderJson.data.items : prev.orders,
        picking: pickJson.success ? pickJson.data.items : prev.picking,
      }));
      setIsBackendConnected(true);
    } catch (e) {
      console.warn(
        "Could not connect to SQLite backend. Operating in local fallback mode.",
        e,
      );
      setIsBackendConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter outOrders (client type or order status) and inOrders (supplier type)
  const filteredInOrders = useMemo(() => {
    return dbState.orders.filter(
      (o) =>
        o.orderNumber.startsWith("REC") ||
        o.customerName.toLowerCase().includes("garcía") ||
        o.customerName.toLowerCase().includes("martínez") ||
        o.customerName.toLowerCase().includes("distribuciones") ||
        o.customerName.toLowerCase().includes("logística"),
    );
  }, [dbState.orders]);

  const filteredOutOrders = useMemo(() => {
    return dbState.orders.filter((o) => !filteredInOrders.includes(o));
  }, [dbState.orders, filteredInOrders]);

  // Handle Saves / Creates
  const handleSave = async (entity: string, data: any, id: number | null) => {
    setLoading(true);
    try {
      let endpoint = "";
      if (entity === "products") endpoint = "/products";
      else if (entity === "customers") endpoint = "/customers";
      else if (entity === "orders") endpoint = "/orders";
      else if (entity === "picking") endpoint = "/picking-tasks";

      if (isBackendConnected && endpoint) {
        const method = id ? "PUT" : "POST";
        const url = id ? `/api${endpoint}/${id}` : `/api${endpoint}`;

        // adapt data for backend schema if needed
        const payload = { ...data };
        if (entity === "products") {
          payload.stock = Number(payload.stock || 0);
          payload.minStock = Number(payload.minStock || 10);
          payload.price = Number(payload.price || 0);
        } else if (entity === "orders") {
          payload.totalItems = Number(payload.totalItems || 0);
          payload.totalValue = Number(payload.totalValue || 0);
        }

        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          loadData();
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error("API error while saving, updating locally", e);
    }

    // Local Fallback State Update
    if (id) {
      setDbState((prev) => {
        const targetList = (prev as any)[entity];
        const updatedList = targetList.map((item: any) =>
          item.id === id ? { ...item, ...data } : item,
        );
        return { ...prev, [entity]: updatedList };
      });
    } else {
      const newId = Math.floor(1000 + Math.random() * 9000);
      setDbState((prev) => {
        const targetList = (prev as any)[entity];
        return { ...prev, [entity]: [...targetList, { id: newId, ...data }] };
      });
    }
    setLoading(false);
  };

  // Handle Deletes
  const handleDelete = async (entity: string, id: number) => {
    setLoading(true);
    try {
      let endpoint = "";
      if (entity === "products") endpoint = "/products";
      else if (entity === "customers") endpoint = "/customers";
      else if (entity === "orders") endpoint = "/orders";
      else if (entity === "picking") endpoint = "/picking-tasks";

      if (isBackendConnected && endpoint) {
        const res = await fetch(`/api${endpoint}/${id}`, { method: "DELETE" });
        const json = await res.json();
        if (json.success) {
          loadData();
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error("API error while deleting, removing locally", e);
    }

    setDbState((prev) => {
      const targetList = (prev as any)[entity];
      return {
        ...prev,
        [entity]: targetList.filter((item: any) => item.id !== id),
      };
    });
    setLoading(false);
  };

  // Handle Batch Deletes
  const handleBatchDelete = async (entity: string, ids: number[]) => {
    setLoading(true);
    setDbState((prev) => {
      const targetList = (prev as any)[entity];
      return {
        ...prev,
        [entity]: targetList.filter((item: any) => !ids.includes(item.id)),
      };
    });
    setLoading(false);
  };

  // AI Lote mock generator
  const handleInjectMock = async (entity: string) => {
    setLoading(true);
    try {
      const prompt = `Genera un objeto JSON válido para un registro de la tabla "${entity}". 
      Invéntate datos realistas de logística B2B. Claves obligatorias:
      ${entity === "products" ? "sku, name, category, stock, minStock, location, price" : ""}
      ${entity === "customers" ? "code, name, type (Cliente o Proveedor), email, phone, status (Activo)" : ""}
      ${entity === "orders" ? "orderNumber (ej. PED-2026-999), customerName, status (Pendiente), totalItems, totalValue" : ""}
      Devuelve ÚNICAMENTE el JSON sin formatear con markdown ni bloques de código.`;

      const res = await callGeminiAPI(
        prompt,
        "Eres un generador de datos JSON válidos de WMS.",
      );
      const cleanedJson = res
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const generatedObj = JSON.parse(cleanedJson);

      await handleSave(entity, generatedObj, null);
    } catch (e) {
      // Manual mock data injection if no AI or parsing error
      if (entity === "products") {
        const randomNum = Math.floor(100 + Math.random() * 900);
        await handleSave(
          "products",
          {
            sku: `SKU-${randomNum}`,
            name: `Caja SKU-${randomNum} Premium`,
            category: "Embalaje",
            stock: Math.floor(Math.random() * 500),
            minStock: 20,
            location: `B-0${Math.floor(1 + Math.random() * 8)}-0${Math.floor(1 + Math.random() * 5)}`,
            price: parseFloat((Math.random() * 30).toFixed(2)),
          },
          null,
        );
      } else if (entity === "customers") {
        const randomNum = Math.floor(10 + Math.random() * 89);
        await handleSave(
          "customers",
          {
            code: `CUST0${randomNum}`,
            name: `Supermercados Alcampo S.A. ${randomNum}`,
            type: "Cliente",
            email: `logistica@alcampo${randomNum}.es`,
            phone: "+34 900 777 888",
            status: "Activo",
          },
          null,
        );
      } else if (entity === "orders") {
        const randomNum = Math.floor(100 + Math.random() * 899);
        await handleSave(
          "orders",
          {
            orderNumber: `PED-2026-${randomNum}`,
            customerName: "Carrefour España",
            status: "Pendiente",
            priority: "normal",
            totalItems: Math.floor(1 + Math.random() * 15),
            totalValue: parseFloat((Math.random() * 4000).toFixed(2)),
          },
          null,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Save Gemini API Key
  const handleSaveApiKey = () => {
    localStorage.setItem("gemini_api_key", tempApiKey);
    setHasApiKey(!!tempApiKey);
    setIsApiKeyModalOpen(false);
  };

  // Global search filtering
  const searchFilteredProducts = useMemo(() => {
    return dbState.products.filter(
      (p) =>
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [dbState.products, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* Top Banner / Navigation */}
      <header className="bg-[#050811] border-b border-slate-800/80 shrink-0 sticky top-0 z-40 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-600/30">
            <Package size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
              WarehouseFlow{" "}
              <span className="bg-indigo-900/60 text-indigo-300 text-[10px] uppercase font-bold py-0.5 px-2 rounded-full border border-indigo-700/50">
                SGA
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              {t.currentShift}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-xs md:max-w-md hidden sm:block">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 placeholder-slate-500 transition-all duration-200"
          />
        </div>

        <div className="flex items-center space-x-4">
          {/* SQLite DB Status Indicator */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#0b0f19] border border-slate-800 rounded-lg text-xs font-semibold">
            <Database
              size={14}
              className={
                isBackendConnected ? "text-emerald-500" : "text-amber-500"
              }
            />
            <span className="hidden md:inline">
              {isBackendConnected ? "Servidor SQLite" : "Mock Offline"}
            </span>
          </div>

          {/* Gemini AI Key button */}
          <button
            onClick={() => setIsApiKeyModalOpen(true)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              hasApiKey
                ? "bg-indigo-950/60 text-indigo-300 border-indigo-800/80 hover:bg-indigo-900/40"
                : "bg-amber-955/65 text-amber-300 border-amber-800/80 hover:bg-amber-900/40"
            }`}
          >
            <Bot
              size={14}
              className={hasApiKey ? "text-indigo-400" : "text-amber-400"}
            />
            <span>{hasApiKey ? "Gemini Activo" : "Conectar IA"}</span>
          </button>

          {/* View selector toggle */}
          <div className="flex bg-[#0b0f19] border border-slate-800 rounded-xl p-1 shrink-0">
            <button
              onClick={() => setViewMode("desktop")}
              className={`p-2 rounded-lg transition-all ${viewMode === "desktop" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
              title="Escritorio WMS"
            >
              <LayoutDashboard size={18} />
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`p-2 rounded-lg transition-all ${viewMode === "mobile" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
              title="Terminal PDA Móvil"
            >
              <Smartphone size={18} />
            </button>
          </div>

          {/* Language selection */}
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="p-2.5 bg-[#0b0f19] border border-slate-800 rounded-xl hover:text-white text-slate-400 transition"
            title="Cambiar Idioma"
          >
            <Globe size={18} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {viewMode === "desktop" ? (
          <>
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-[#050811] border-r border-slate-800/80 p-4 shrink-0 hidden md:flex flex-col justify-between overflow-y-auto">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-3">
                  Módulos SGA
                </p>
                <SidebarItem
                  icon={LayoutDashboard}
                  label={t.dashboard}
                  active={activeTab === "dashboard"}
                  onClick={() => setActiveTab("dashboard")}
                />
                <SidebarItem
                  icon={Package}
                  label={t.inventory}
                  active={activeTab === "inventory"}
                  onClick={() => setActiveTab("inventory")}
                  badge={dbState.products.length}
                />
                <SidebarItem
                  icon={ArrowDownToLine}
                  label={t.inOrders}
                  active={activeTab === "inbound"}
                  onClick={() => setActiveTab("inbound")}
                  badge={filteredInOrders.length}
                />
                <SidebarItem
                  icon={Send}
                  label={t.outOrders}
                  active={activeTab === "outbound"}
                  onClick={() => setActiveTab("outbound")}
                  badge={filteredOutOrders.length}
                />
                <SidebarItem
                  icon={Mic}
                  label={t.picking}
                  active={activeTab === "picking"}
                  onClick={() => setActiveTab("picking")}
                />

                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mt-6 mb-3">
                  Inteligencia
                </p>
                <SidebarItem
                  icon={Route}
                  label={t.routes}
                  active={activeTab === "routes"}
                  onClick={() => setActiveTab("routes")}
                />
                <SidebarItem
                  icon={MessageCircle}
                  label={t.whatsapp}
                  active={activeTab === "whatsapp"}
                  onClick={() => setActiveTab("whatsapp")}
                />

                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mt-6 mb-3">
                  Configuración
                </p>
                <SidebarItem
                  icon={Users}
                  label={t.users}
                  active={activeTab === "users"}
                  onClick={() => setActiveTab("users")}
                />
                <SidebarItem
                  icon={Cpu}
                  label={t.sap}
                  active={activeTab === "sap"}
                  onClick={() => setActiveTab("sap")}
                />
              </div>

              <div className="p-4 bg-slate-900/20 rounded-2xl border border-slate-800 text-[10px] text-slate-500 font-semibold uppercase text-center tracking-wide">
                {t.copyright}
              </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#050811] border-t border-slate-800 h-16 flex justify-around items-center px-2 z-30">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex flex-col items-center p-2 ${activeTab === "dashboard" ? "text-indigo-400" : "text-slate-500"}`}
              >
                <LayoutDashboard size={20} />
                <span className="text-[9px] mt-0.5">{t.dashboard}</span>
              </button>
              <button
                onClick={() => setActiveTab("inventory")}
                className={`flex flex-col items-center p-2 relative ${activeTab === "inventory" ? "text-indigo-400" : "text-slate-500"}`}
              >
                <Package size={20} />
                <span className="text-[9px] mt-0.5">{t.inventory}</span>
              </button>
              <button
                onClick={() => setActiveTab("picking")}
                className={`flex flex-col items-center p-2 ${activeTab === "picking" ? "text-indigo-400" : "text-slate-500"}`}
              >
                <Mic size={20} />
                <span className="text-[9px] mt-0.5">{t.picking}</span>
              </button>
              <button
                onClick={() => setActiveTab("whatsapp")}
                className={`flex flex-col items-center p-2 ${activeTab === "whatsapp" ? "text-indigo-400" : "text-slate-500"}`}
              >
                <MessageCircle size={20} />
                <span className="text-[9px] mt-0.5">WhatsApp</span>
              </button>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 bg-[#0b0f19] overflow-y-auto p-6 md:p-8 pb-24 md:pb-8">
              {loading && (
                <div className="fixed inset-0 bg-[#050811]/45 backdrop-blur-xs flex items-center justify-center z-50">
                  <Loader2 className="animate-spin text-indigo-500" size={40} />
                </div>
              )}

              {activeTab === "dashboard" && (
                <DesktopDashboardView
                  dbState={dbState}
                  filteredIn={filteredInOrders}
                  filteredOut={filteredOutOrders}
                  t={t}
                />
              )}
              {activeTab === "inventory" && (
                <CrudView
                  entityKey="products"
                  title="Inventario de Productos"
                  data={searchQuery ? searchFilteredProducts : dbState.products}
                  fields={[
                    { key: "sku", label: "SKU", type: "text" },
                    { key: "name", label: "Nombre", type: "text" },
                    {
                      key: "category",
                      label: "Categoría",
                      type: "select",
                      options: [
                        "Palets",
                        "Embalaje",
                        "Etiquetado",
                        "Equipamiento",
                        "Almacenaje",
                        "EPI",
                        "Tecnología",
                        "Herramientas",
                      ],
                    },
                    { key: "stock", label: "Stock Actual", type: "number" },
                    { key: "minStock", label: "Stock Mínimo", type: "number" },
                    {
                      key: "location",
                      label: "Ubicación (Pasillo-Rack-Nivel)",
                      type: "text",
                    },
                    { key: "price", label: "Precio (€)", type: "number" },
                  ]}
                  onSave={(d: any, id: any) => handleSave("products", d, id)}
                  onDelete={(id: any) => handleDelete("products", id)}
                  onBatchDelete={(ids: number[]) => handleBatchDelete("products", ids)}
                  onInject={() => handleInjectMock("products")}
                  t={t}
                />
              )}
              {activeTab === "inbound" && (
                <CrudView
                  entityKey="orders"
                  title="Recepciones - Entrada de Mercancía"
                  data={filteredInOrders}
                  fields={[
                    {
                      key: "orderNumber",
                      label: "Nº Orden de Entrada",
                      type: "text",
                    },
                    { key: "customerName", label: "Proveedor", type: "text" },
                    {
                      key: "status",
                      label: "Estado",
                      type: "select",
                      options: [
                        "Pendiente",
                        "Control de Calidad",
                        "Completado",
                      ],
                    },
                    {
                      key: "totalItems",
                      label: "Bultos Totales",
                      type: "number",
                    },
                    { key: "totalValue", label: "Valor (€)", type: "number" },
                  ]}
                  onSave={(d: any, id: any) => handleSave("orders", d, id)}
                  onDelete={(id: any) => handleDelete("orders", id)}
                  onBatchDelete={(ids: number[]) => handleBatchDelete("orders", ids)}
                  onInject={() => handleInjectMock("orders")}
                  t={t}
                />
              )}
              {activeTab === "outbound" && (
                <CrudView
                  entityKey="orders"
                  title="Expediciones - Envío de Pedidos"
                  data={filteredOutOrders}
                  fields={[
                    {
                      key: "orderNumber",
                      label: "Nº Pedido Cliente",
                      type: "text",
                    },
                    { key: "customerName", label: "Cliente", type: "text" },
                    {
                      key: "status",
                      label: "Estado",
                      type: "select",
                      options: [
                        "Pendiente",
                        "Picking",
                        "Packing",
                        "Despachado",
                        "Completado",
                      ],
                    },
                    {
                      key: "totalItems",
                      label: "Total Bultos",
                      type: "number",
                    },
                    { key: "totalValue", label: "Valor (€)", type: "number" },
                  ]}
                  onSave={(d: any, id: any) => handleSave("orders", d, id)}
                  onDelete={(id: any) => handleDelete("orders", id)}
                  onBatchDelete={(ids: number[]) => handleBatchDelete("orders", ids)}
                  onInject={() => handleInjectMock("orders")}
                  t={t}
                />
              )}
              {activeTab === "picking" && (
                <VoicePickingView
                  pickingTasks={dbState.picking}
                  products={dbState.products}
                />
              )}
              {activeTab === "routes" && <RoutesView />}
              {activeTab === "whatsapp" && (
                <WhatsAppAgentView
                  chats={dbState.whatsapp}
                  setDbState={setDbState}
                />
              )}
              {activeTab === "users" && (
                <CrudView
                  entityKey="staff"
                  title="Personal & Turnos de Almacén"
                  data={dbState.staff}
                  fields={[
                    { key: "name", label: "Nombre Operario", type: "text" },
                    {
                      key: "role",
                      label: "Rol",
                      type: "select",
                      options: ["Administrador", "Operario", "Supervisor"],
                    },
                    { key: "zone", label: "Zona Asignada", type: "text" },
                    {
                      key: "status",
                      label: "Estado Operativo",
                      type: "select",
                      options: ["Activo", "Inactivo", "En Ruta"],
                    },
                  ]}
                  onSave={(d: any, id: any) => handleSave("staff", d, id)}
                  onDelete={(id: any) => handleDelete("staff", id)}
                  onBatchDelete={(ids: number[]) => handleBatchDelete("staff", ids)}
                  onInject={() => handleInjectMock("staff")}
                  t={t}
                />
              )}
              {activeTab === "sap" && (
                <SapIntegrationView
                  logs={dbState.sapLogs}
                  setDbState={setDbState}
                />
              )}
            </main>
          </>
        ) : (
          /* Handheld PDA View Simulator */
          <main className="flex-1 bg-[#050811] flex justify-center items-center p-4 overflow-y-auto">
            <div className="w-full max-w-[390px] h-[750px] bg-[#0b0f19] rounded-[3rem] border-[10px] border-[#050811] relative overflow-hidden flex flex-col shadow-2xl shadow-indigo-950/20">
              {/* PDA Top Screen Header */}
              <div className="bg-indigo-600 text-white px-5 pt-7 pb-4 shrink-0 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Smartphone size={16} />
                  <span className="font-extrabold text-sm tracking-wider">
                    PDA-02 Terminal
                  </span>
                </div>
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              </div>

              {/* PDA Emulator body */}
              <div className="flex-1 overflow-y-auto bg-[#0b0f19] flex flex-col">
                <MobileAppSimulator
                  dbState={dbState}
                  setDbState={setDbState}
                  handleSave={handleSave}
                  handleDelete={handleDelete}
                  isConnected={isBackendConnected}
                />
              </div>
            </div>
          </main>
        )}
      </div>

      {/* Gemini API Key Modal */}
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 bg-[#050811]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-400">
                <Bot size={20} /> Conectar Inteligencia Artificial
              </h3>
              <button
                onClick={() => setIsApiKeyModalOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Introduce tu clave API de Gemini. Se guardará de forma local en tu
              navegador para habilitar la generación de respuestas reales y
              autocompletado en el SGA.
            </p>
            <input
              type="password"
              placeholder="Gemini API Key (AIzaSy...)"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              className="w-full bg-[#050811] border border-slate-800 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-650 outline-none focus:border-indigo-500 mb-4"
            />
            <div className="flex justify-end space-x-3 text-sm">
              <button
                onClick={() => {
                  setTempApiKey("");
                  localStorage.removeItem("gemini_api_key");
                  setHasApiKey(false);
                  setIsApiKeyModalOpen(false);
                }}
                className="px-4 py-2 border border-slate-800 hover:bg-slate-800 rounded-xl text-slate-400"
              >
                Limpiar Clave
              </button>
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
