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
  number: number
  date: Date | string
  user_name: string
  user_email?: string
  user_phone: string
  status: keyof typeof RESERVE_STATUS
  payment_status: keyof typeof PAYMENT_STATUS
  payment_id: string
  created_at?: Date | string
  updated_at?: Date | string

  whatsapp_message_status?: number
}
