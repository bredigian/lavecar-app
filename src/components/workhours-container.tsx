import { getEnabledWorkhours, getWorkhours } from "@/services/workhours.service"

import WorkhourItem from "./workhour-item"

export default async function WorkhoursContainer() {
  const workhours = await getWorkhours()
  const workhoursEnabled = await getEnabledWorkhours()

  if (workhours instanceof Error || workhoursEnabled instanceof Error)
    return (
      <ul>
        {(workhours as Error).message ?? (workhoursEnabled as Error).message}
      </ul>
    )

  return (
    <ul className="space-y-4 w-full">
      {workhours.map((item) => (
        <WorkhourItem
          key={`${item.hour + item.time}`}
          item={item}
          workhoursEnabled={workhoursEnabled}
        />
      ))}
    </ul>
  )
}
