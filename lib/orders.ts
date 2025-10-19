import { executeQuery } from './database';

export interface Order {
  id: number;
  userId?: number;
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  siteType: string;
  objectives: string;
  additionalInfo?: string;
  logoUrl?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  autoProgressDate?: string;
  estimatedCompletion?: string;
  monthlyPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  userId?: number;
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  siteType: string;
  objectives: string;
  additionalInfo?: string;
  logoUrl?: string;
}

export interface UpdateOrderData {
  status?: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  autoProgressDate?: string;
  estimatedCompletion?: string;
  additionalInfo?: string;
}

export interface OrderFilters {
  status?: string;
  siteType?: string;
  userId?: number;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export async function createOrder(orderData: CreateOrderData): Promise<Order> {
  const {
    userId,
    organizationName,
    contactName,
    email,
    phone,
    whatsapp,
    siteType,
    objectives,
    additionalInfo,
    logoUrl
  } = orderData;

  const result = await executeQuery(
    `INSERT INTO orders (
      user_id, organization_name, contact_name, email, phone, whatsapp,
      site_type, objectives, additional_info, logo_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [userId || null, organizationName, contactName, email, phone, whatsapp || null, 
     siteType, objectives, additionalInfo || null, logoUrl || null]
  ) as any;

  return getOrderById(result.insertId);
}

export async function getOrderById(orderId: number): Promise<Order> {
  const orders = await executeQuery(
    `SELECT id, user_id, organization_name, contact_name, email, phone, whatsapp,
            site_type, objectives, additional_info, logo_url, status,
            auto_progress_date, estimated_completion, monthly_price,
            created_at, updated_at
     FROM orders WHERE id = ?`,
    [orderId]
  ) as any[];

  if (orders.length === 0) {
    throw new Error('Commande non trouvée');
  }

  return mapOrderFromDb(orders[0]);
}

export async function getAllOrders(filters: OrderFilters = {}): Promise<Order[]> {
  let query = `
    SELECT id, user_id, organization_name, contact_name, email, phone, whatsapp,
           site_type, objectives, additional_info, logo_url, status,
           auto_progress_date, estimated_completion, monthly_price,
           created_at, updated_at
    FROM orders WHERE 1=1
  `;
  const params: any[] = [];

  // Appliquer les filtres
  if (filters.status) {
    query += ' AND status = ?';
    params.push(filters.status);
  }

  if (filters.siteType) {
    query += ' AND site_type = ?';
    params.push(filters.siteType);
  }

  if (filters.userId) {
    query += ' AND user_id = ?';
    params.push(filters.userId);
  }

  if (filters.dateFrom) {
    query += ' AND created_at >= ?';
    params.push(filters.dateFrom);
  }

  if (filters.dateTo) {
    query += ' AND created_at <= ?';
    params.push(filters.dateTo);
  }

  if (filters.search) {
    query += ' AND (organization_name LIKE ? OR contact_name LIKE ? OR email LIKE ?)';
    const searchTerm = `%${filters.search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  query += ' ORDER BY created_at DESC';

  const orders = await executeQuery(query, params) as any[];
  return orders.map(mapOrderFromDb);
}

export async function getOrdersByUserId(userId: number): Promise<Order[]> {
  return getAllOrders({ userId });
}

export async function updateOrder(orderId: number, updateData: UpdateOrderData): Promise<Order> {
  const updates: string[] = [];
  const params: any[] = [];

  if (updateData.status !== undefined) {
    updates.push('status = ?');
    params.push(updateData.status);
  }

  if (updateData.autoProgressDate !== undefined) {
    updates.push('auto_progress_date = ?');
    params.push(updateData.autoProgressDate);
  }

  if (updateData.estimatedCompletion !== undefined) {
    updates.push('estimated_completion = ?');
    params.push(updateData.estimatedCompletion);
  }

  if (updateData.additionalInfo !== undefined) {
    updates.push('additional_info = ?');
    params.push(updateData.additionalInfo);
  }

  if (updates.length === 0) {
    throw new Error('Aucune donnée à mettre à jour');
  }

  params.push(orderId);

  await executeQuery(
    `UPDATE orders SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    params
  );

  return getOrderById(orderId);
}

export async function deleteOrder(orderId: number): Promise<void> {
  const result = await executeQuery(
    'DELETE FROM orders WHERE id = ?',
    [orderId]
  ) as any;

  if (result.affectedRows === 0) {
    throw new Error('Commande non trouvée');
  }
}

export async function getOrderStatistics(): Promise<{
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
}> {
  const stats = await executeQuery(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
      SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as inProgress,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
    FROM orders
  `) as any[];

  return {
    total: stats[0].total,
    pending: stats[0].pending,
    inProgress: stats[0].inProgress,
    completed: stats[0].completed,
    cancelled: stats[0].cancelled
  };
}

export async function bulkUpdateOrderStatus(
  orderIds: number[],
  newStatus: 'pending' | 'in-progress' | 'completed' | 'cancelled'
): Promise<number> {
  if (orderIds.length === 0) {
    return 0;
  }

  const placeholders = orderIds.map(() => '?').join(',');
  const result = await executeQuery(
    `UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders})`,
    [newStatus, ...orderIds]
  ) as any;

  return result.affectedRows;
}

export async function getOrdersWithAutoProgress(): Promise<Order[]> {
  const orders = await executeQuery(`
    SELECT id, user_id, organization_name, contact_name, email, phone, whatsapp,
           site_type, objectives, additional_info, logo_url, status,
           auto_progress_date, estimated_completion, monthly_price,
           created_at, updated_at
    FROM orders 
    WHERE auto_progress_date IS NOT NULL 
    AND auto_progress_date <= NOW() 
    AND status = 'pending'
  `) as any[];

  return orders.map(mapOrderFromDb);
}

function mapOrderFromDb(dbOrder: any): Order {
  return {
    id: dbOrder.id,
    userId: dbOrder.user_id,
    organizationName: dbOrder.organization_name,
    contactName: dbOrder.contact_name,
    email: dbOrder.email,
    phone: dbOrder.phone,
    whatsapp: dbOrder.whatsapp,
    siteType: dbOrder.site_type,
    objectives: dbOrder.objectives,
    additionalInfo: dbOrder.additional_info,
    logoUrl: dbOrder.logo_url,
    status: dbOrder.status,
    autoProgressDate: dbOrder.auto_progress_date,
    estimatedCompletion: dbOrder.estimated_completion,
    monthlyPrice: parseFloat(dbOrder.monthly_price),
    createdAt: dbOrder.created_at,
    updatedAt: dbOrder.updated_at
  };
}