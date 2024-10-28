"use client"

import { CalendarClockIcon, ClockIcon, HomeIcon } from "lucide-react"

import Link from "next/link"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

type TRoute = {
  label: string
  path: `/${string}`
  icon: ReactNode
}

const ROUTES: TRoute[] = [
  { label: "Inicio", path: "/dashboard", icon: <HomeIcon /> },
  { label: "Turnos", path: "/dashboard/reserves", icon: <CalendarClockIcon /> },
  { label: "Horarios", path: "/dashboard/workhours", icon: <ClockIcon /> },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 flex items-center w-full justify-center gap-12 py-4">
      {ROUTES.map((route) => (
        <Link
          href={route.path}
          key={route.path}
          className={cn(
            "flex flex-col gap-2 items-center min-w-16",
            pathname === route.path
              ? "opacity-100"
              : pathname.includes(route.path) && route.label === "Turnos"
              ? "opacity-100"
              : "opacity-50"
          )}
        >
          {route.icon}
          <span className="text-sm font-medium">{route.label}</span>
        </Link>
      ))}
    </nav>
  )
}