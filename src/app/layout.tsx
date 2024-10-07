import "./globals.css"

import type { Metadata } from "next"
import { Toaster } from "sonner"

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
      <body className="antialiased min-h-dvh">
        {children}
        <Toaster theme="system" />
      </body>
    </html>
  )
}
