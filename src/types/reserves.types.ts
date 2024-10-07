export enum RESERVE_STATUS {
  PENDING = "Pendiente",
  COMPLETED = "Completado",
  CANCELLED = "Cancelado",
}

export enum PAYMENT_STATUS {
  PENDING = "Pago pendiente",
  APPROVED = "Pago aprobado",
  REJECTED = "Pago rechazado",
  CANCELLED = "Pago cancelado",
}

export type TReserve = {
  id?: string
  date: Date | string
  user_name: string
  user_email: string
  user_phone: string
  status: keyof RESERVE_STATUS
  payment_status: keyof PAYMENT_STATUS
  created_at?: Date
  updated_at?: Date
}
