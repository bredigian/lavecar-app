import { TReserve } from "./reserves.types"

type TPaymentItem = {
  id: TReserve["id"]
  title: string
  description: string
  quantity: number
  unit_price: number
}

type TPaymentPayer = {
  phone: { number: TReserve["user_phone"] }
  email: TReserve["user_email"]
  name: TReserve["user_name"]
}

type TPreferenceBackUrls = {
  success: string
  pending: string
  failure: string
}

export type TPreferenceBody = {
  auto_return?: string
  back_urls?: TPreferenceBackUrls
  items: TPaymentItem[]
  payer: TPaymentPayer
  notification_url?: string
  init_point?: string
  sandbox_init_point?: string
}
