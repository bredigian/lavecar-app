import { TWeekdayRange } from "./weekdays.types"
import { UUID } from "crypto"

export type TWorkhour = {
  id?: UUID
  hour: number
  time: number
  weekday?: TWeekdayRange
}
