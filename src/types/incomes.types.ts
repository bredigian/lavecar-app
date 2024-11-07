import { TReserve } from "./reserves.types"

export type TIncome = {
  id: string
  date: Date | string
  value: number
  reserve_id: TReserve["id"]
  reserve?: TReserve
}
