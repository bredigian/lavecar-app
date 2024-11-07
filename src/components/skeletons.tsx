import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

import { Button } from "./ui/button"
import Link from "next/link"
import { Separator } from "./ui/separator"
import { Skeleton } from "./ui/skeleton"
import { cn } from "@/lib/utils"

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

export const SkeletonIncomeItem = ({ isForHome }: { isForHome?: boolean }) => (
  <li className={cn("flex flex-col w-full", !isForHome ? "gap-2" : "gap-4")}>
    <Skeleton className="w-32 h-2" />
    <div className="flex items-center justify-between w-full">
      <Skeleton className={cn("h-4", !isForHome ? "w-48" : "w-36")} />
      <Skeleton className={cn("h-4", !isForHome ? "w-24" : "w-20")} />
    </div>
  </li>
)

export const SkeletonIncomesContainer = () => (
  <section className="mt-8 w-full space-y-8">
    <article className="w-full space-y-4">
      <div className="flex items-center justify-center">
        <Separator className="max-w-24" />
        <Skeleton className="w-24 h-2" />
        <Separator className="max-w-24" />
      </div>
      <ul className="space-y-8">
        <SkeletonIncomeItem />
        <SkeletonIncomeItem />
      </ul>
    </article>
    <article className="w-full space-y-4">
      <div className="flex items-center justify-center">
        <Separator className="max-w-24" />
        <Skeleton className="w-24 h-2" />
        <Separator className="max-w-24" />
      </div>
      <ul className="space-y-8">
        <SkeletonIncomeItem />
        <SkeletonIncomeItem />
      </ul>
    </article>
    <article className="w-full space-y-4">
      <div className="flex items-center justify-center">
        <Separator className="max-w-24" />
        <Skeleton className="w-24 h-2" />
        <Separator className="max-w-24" />
      </div>
      <ul className="space-y-8">
        <SkeletonIncomeItem />
        <SkeletonIncomeItem />
      </ul>
    </article>
  </section>
)

export const SkeletonDashboardIncomesContainer = () => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>Ingresos semanal</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="flex flex-col gap-6 w-full">
        <SkeletonIncomeItem isForHome />
        <SkeletonIncomeItem isForHome />
        <SkeletonIncomeItem isForHome />
        <SkeletonIncomeItem isForHome />
      </ul>
    </CardContent>
    <CardFooter>
      <Link href={"/dashboard/finances"} className="w-full">
        <Button className="w-full" variant={"secondary"}>
          Ver todos los ingresos
        </Button>
      </Link>
    </CardFooter>
  </Card>
)
