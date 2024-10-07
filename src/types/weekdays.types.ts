import { TReserve } from "./reserves.types"
import { TWorkhour } from "./workhours.types"

export type TWeekdayRange = 1 | 2 | 3 | 4 | 5 | 6 | 7

export type TWeekday = {
  weekday: TWeekdayRange
  workhours: TWorkhour[]
}

export interface TWeekdayWithAssignedReserves extends TWeekday {
  reserves: TReserve[]
}
