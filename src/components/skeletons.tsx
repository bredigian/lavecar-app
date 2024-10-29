import { Card, CardContent } from "./ui/card"

import { Skeleton } from "./ui/skeleton"

export const SkeletonWorkhourItem = () => (
  <Card>
    <CardContent className="flex items-start w-full justify-between pt-6 h-[264px]">
      <Skeleton className="w-20 h-28" />
      <aside className="space-y-4">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-20 h-4" />
      </aside>
    </CardContent>
  </Card>
)

export const SkeletonWorkhoursContainer = () => (
  <ul className="space-y-4 w-full">
    <SkeletonWorkhourItem />
    <SkeletonWorkhourItem />
    <SkeletonWorkhourItem />
    <SkeletonWorkhourItem />
  </ul>
)
