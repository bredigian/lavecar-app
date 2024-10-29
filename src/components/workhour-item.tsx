import { Card, CardContent } from "./ui/card"

import { TSimpleWorkhour } from "@/types/workhours.types"
import { TWeekday } from "@/types/weekdays.types"
import WeekdaySwitch from "./weekday-switch"
import { generateWeekdays } from "@/lib/weekdays"
import { toTimeString } from "@/lib/utils"

type TProps = {
  item: TSimpleWorkhour
  workhoursEnabled: TWeekday[]
}

export default function WorkhourItem({ item, workhoursEnabled }: TProps) {
  const weekdays = generateWeekdays({ length: "short" })

  const workhourToString = `${toTimeString(item.hour)}:${toTimeString(
    item.time
  )}`

  const [hour, minutes] = workhourToString.split(":")

  return (
    <li key={workhourToString} className="w-full">
      <Card className="w-full">
        <CardContent className="pt-6 flex items-start justify-between">
          <div className="flex flex-col items-end text-6xl">
            <span>{hour}</span>
            <span>{minutes}</span>
          </div>
          <ul className="flex flex-col gap-2 items-end">
            {weekdays.map((weekday) => (
              <WeekdaySwitch
                key={`${weekday.string}_${workhourToString}`}
                weekday={weekday}
                workhourItem={item}
                workhoursEnabled={workhoursEnabled}
              />
            ))}
          </ul>
        </CardContent>
      </Card>
    </li>
  )
}
