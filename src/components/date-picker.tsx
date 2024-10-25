"use client"

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { DateTime } from "luxon"
import { useState } from "react"

type TProps = {
  dateParam: string
}

export default function DatePicker({ dateParam }: TProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const [open, setOpen] = useState(false)

  const handlePickDate = (value: string) => {
    const parsedValue = value.trim()
    const params = new URLSearchParams(searchParams)
    if (parsedValue) params.set("date", value.toLowerCase())
    else params.delete("date")

    setOpen(false)

    replace(`${pathname}?${params.toString()}`)
  }

  const date = searchParams.get("date") ?? dateParam

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="w-full">
          {DateTime.fromISO(date)
            .setZone("America/Argentina/Buenos_Aires")
            .setLocale("es-AR")
            .toLocaleString(DateTime.DATE_SHORT)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 mt-2">
        <Calendar
          mode="single"
          initialFocus
          selected={DateTime.fromISO(date).toJSDate()}
          onSelect={(value) =>
            handlePickDate(
              DateTime.fromJSDate(value as Date)
                .setZone("America/Argentina/Buenos_Aires")
                .setLocale("es-AR")
                .toISODate() as string
            )
          }
        />
      </PopoverContent>
    </Popover>
  )
}
