"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Info } from "luxon"

export default function WeekdayPicker() {
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const handleFilter = (value: string) => {
    const parsedValue = value.trim()
    const params = new URLSearchParams(searchParams)
    if (parsedValue) params.set("weekday", parsedValue.toLowerCase())
    else params.delete("weekday")

    replace(`${pathname}?${params.toString()}`)
  }

  const weekdays = Info.weekdays("long", { locale: "es-AR" }).map(
    (weekday, index) => {
      const string = weekday
        .charAt(0)
        .toUpperCase()
        .concat(weekday.substring(1))
      return { value: index + 1, string }
    }
  )

  const weekdayParam = searchParams?.get("weekday")
  const defaultValue = weekdayParam
    ? weekdays.find(
        (weekday) => weekday.value.toString() === weekdayParam.toString()
      )
    : undefined

  return (
    <Select
      defaultValue={defaultValue ? defaultValue.value.toString() : undefined}
      onValueChange={(value) => handleFilter(value)}
    >
      <SelectTrigger id="filter" className="w-full">
        <SelectValue placeholder="Seleccione una día" />
      </SelectTrigger>
      <SelectContent>
        {weekdays.map((weekday) => (
          <SelectItem
            key={weekday.value + weekday.string}
            value={weekday.value.toString()}
          >
            {weekday.string}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
