import "./globals.css"

import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import { Toaster } from "sonner"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "LaveCAR",
  description: "LaveCAR. Sistema de reservas de turnos para lavadero de autos.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={cn("antialiased min-h-dvh", GeistSans.className)}>
        {children}
        <Toaster theme="system" />
      </body>
    </html>
  )
}
