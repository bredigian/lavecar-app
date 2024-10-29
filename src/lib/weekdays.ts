import { Info, StringUnitLength } from "luxon"

type TProps = {
  length: StringUnitLength
}

export type TGeneratedWeekdays = { value: number; string: string }

export const generateWeekdays = ({ length }: TProps) =>
  Info.weekdays(length, { locale: "es-AR" }).map((weekday, index) => {
    const string = weekday.charAt(0).toUpperCase().concat(weekday.substring(1))

    return { value: index + 1, string }
  }) as TGeneratedWeekdays[]
