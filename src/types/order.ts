export type OrderStatus = "pending" | "paid" | "completed" | "cancelled" | "refunded"
export type PaymentMethod = "alipay" | "wechat" | "creditcard" | "other"

export interface Order {
  id: string
  orderNumber: string
  userId: string
  userName: string
  ticketId: string
  shipName: string
  routeName: string
  departurePort: string
  arrivalPort: string
  departureTime: string
  seatNumber: string
  price: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  paymentTime?: string
  passengerName: string
  passengerPhone: string
  passengerIdCard: string
  createdAt: string
  updatedAt: string
  refundReason?: string
} 