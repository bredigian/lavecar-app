"use client"

import { TSimpleWorkhour, TWorkhour } from "@/types/workhours.types"
import { TWeekday, TWeekdayRange } from "@/types/weekdays.types"

import { Switch } from "./ui/switch"
import { TGeneratedWeekdays } from "@/lib/weekdays"
import { handleWorkhourStatus } from "@/services/workhours.service"
import revalidate from "@/lib/actions"
import { toast } from "sonner"

type TProps = {
  workhourItem: TSimpleWorkhour
  workhoursEnabled: TWeekday[]
  weekday: TGeneratedWeekdays
}

export default function WeekdaySwitch({
  workhourItem,
  workhoursEnabled,
  weekday,
}: TProps) {
  const isEnabled = workhoursEnabled
    .find((item) => item.weekday === weekday.value)
    ?.workhours.find(
      (workhour) =>
        workhour.hour === workhourItem.hour &&
        workhour.time === workhourItem.time
    )

  const handleStatus = async () => {
    try {
      const { hour, time } = workhourItem
      const payload: TWorkhour = {
        id: isEnabled?.id ?? undefined,
        hour,
        time,
        weekday: weekday.value as TWeekdayRange,
        isEnabled: isEnabled ? true : false,
      }
      await handleWorkhourStatus(payload)
      await revalidate("workhours")
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
        toast.error(e.message)
      }
    }
  }

  return (
    <div key={weekday.string} className="flex items-center gap-2">
      <span className="opacity-50">{weekday.string}.</span>
      <Switch
        defaultChecked={isEnabled ? true : false}
        onCheckedChange={handleStatus}
      />
    </div>
  )
}
