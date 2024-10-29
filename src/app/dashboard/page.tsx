import { RedirectType, redirect } from "next/navigation"

import DashboardHome from "@/sections/dashboard-home"
import Screen from "@/components/ui/screen"
import { cookies } from "next/headers"
import { verifySession } from "@/services/auth.service"

export default async function AdminDashboard() {
  const access_token = cookies().get("access_token")
  if (!access_token) redirect("/", RedirectType.replace)

  const data = await verifySession(access_token.value)

  if (data instanceof Error)
    redirect(
      `/?session=${access_token.value}&expired=true&message=${data.message}`,
      RedirectType.push
    )

  return (
    <Screen
      style={{ minHeight: `calc(100svh - 184px` }}
      className="items-start"
      authData={data}
    >
      <DashboardHome />
    </Screen>
  )
}
