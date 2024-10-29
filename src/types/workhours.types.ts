import { TWeekdayRange } from "./weekdays.types"
import { UUID } from "crypto"

export type TSimpleWorkhour = {
  hour: number
  time: number
}

export interface TWorkhour extends TSimpleWorkhour {
  id?: UUID
  weekday?: TWeekdayRange
  isEnabled?: boolean
}
