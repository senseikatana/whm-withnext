export const typeDefs = `#graphql
  scalar DateTime

  type Product {
    id: Int!
    sku: String!
    name: String!
    category: String!
    stock: Int!
    min_stock: Int!
    location: String!
    price: Float!
    created_at: DateTime
    updated_at: DateTime
  }

  type Customer {
    id: Int!
    code: String!
    name: String!
    type: String!
    email: String!
    phone: String!
    status: String!
    created_at: DateTime
    updated_at: DateTime
  }

  type Order {
    id: Int!
    order_number: String!
    customer_name: String!
    status: String!
    priority: String!
    total_items: Int!
    total_value: Float!
    created_at: DateTime
    updated_at: DateTime
  }

  type PickingTask {
    id: Int!
    task_number: String!
    order_number: String!
    assigned_to: String!
    zone: String!
    status: String!
    total_items: Int!
    picked_items: Int!
    created_at: DateTime
    updated_at: DateTime
  }

  type Staff {
    id: Int!
    name: String!
    role: String!
    zone: String!
    status: String!
    created_at: DateTime
    updated_at: DateTime
  }

  type UserProfile {
    id: ID!
    email: String!
    name: String!
    role: String!
    zone: String!
    phone: String!
    is_active: Boolean!
    last_login: DateTime
  }

  type DashboardStats {
    totalProducts: Int!
    totalOrders: Int!
    totalCustomers: Int!
    totalStaff: Int!
    criticalStock: Int!
    pendingOrders: Int!
    activePicking: Int!
  }

  type Query {
    # Products
    products(limit: Int, offset: Int, category: String, search: String): [Product!]!
    product(id: Int!): Product

    # Customers
    customers(limit: Int, offset: Int, type: String, search: String): [Customer!]!
    customer(id: Int!): Customer

    # Orders
    orders(limit: Int, offset: Int, status: String, priority: String, search: String): [Order!]!
    order(id: Int!): Order
    inboundOrders(limit: Int): [Order!]!
    outboundOrders(limit: Int): [Order!]!

    # Picking
    pickingTasks(limit: Int, offset: Int, status: String): [PickingTask!]!
    pickingTask(id: Int!): PickingTask

    # Staff
    staff(limit: Int, offset: Int, role: String, status: String): [Staff!]!
    staffMember(id: Int!): Staff

    # Dashboard
    dashboardStats: DashboardStats!

    # Users
    userProfiles(limit: Int, role: String): [UserProfile!]!
  }

  input ProductInput {
    sku: String
    name: String!
    category: String!
    stock: Int
    min_stock: Int
    location: String
    price: Float
  }

  input CustomerInput {
    code: String
    name: String!
    type: String!
    email: String
    phone: String
    status: String
  }

  input OrderInput {
    order_number: String
    customer_name: String!
    status: String
    priority: String
    total_items: Int
    total_value: Float
  }

  input PickingTaskInput {
    task_number: String
    order_number: String!
    assigned_to: String!
    zone: String!
    status: String
    total_items: Int
    picked_items: Int
  }

  input StaffInput {
    name: String!
    role: String!
    zone: String
    status: String
  }

  type Mutation {
    # Products
    createProduct(input: ProductInput!): Product!
    updateProduct(id: Int!, input: ProductInput!): Product!
    deleteProduct(id: Int!): Boolean!
    deleteProducts(ids: [Int!]!): Boolean!

    # Customers
    createCustomer(input: CustomerInput!): Customer!
    updateCustomer(id: Int!, input: CustomerInput!): Customer!
    deleteCustomer(id: Int!): Boolean!

    # Orders
    createOrder(input: OrderInput!): Order!
    updateOrder(id: Int!, input: OrderInput!): Order!
    deleteOrder(id: Int!): Boolean!
    deleteOrders(ids: [Int!]!): Boolean!

    # Picking
    createPickingTask(input: PickingTaskInput!): PickingTask!
    updatePickingTask(id: Int!, input: PickingTaskInput!): PickingTask!
    deletePickingTask(id: Int!): Boolean!

    # Staff
    createStaff(input: StaffInput!): Staff!
    updateStaff(id: Int!, input: StaffInput!): Staff!
    deleteStaff(id: Int!): Boolean!
    deleteStaffMembers(ids: [Int!]!): Boolean!
  }
`;
