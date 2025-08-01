export interface NotificationType {
  _id: string;
  type:
    | "order_placed"
    | "order_cancelled"
    | "payment_failed"
    | "refund_requested"
    | "stock_low"
    | "new_review"
    | "contact_message"
    | "other";
  title: string; // e.g., "New Order Received"
  message: string; // e.g., "Order #12345 has been placed"
  link?: string; // e.g., "/admin/orders/12345" (click করলে যেখানে যাবে)
  relatedId?: string; // Optional: orderId, productId, etc.
  isRead: boolean;
  adminId: string; // future-proof: multiple admin হলে কাজে লাগবে
  createdAt: Date;
  updatedAt?: Date;
}
