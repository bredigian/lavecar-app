import { RedirectType, redirect } from "next/navigation"

import Navbar from "@/components/navbar"
import Screen from "@/components/ui/screen"
import Title from "@/components/ui/title"
import { cookies } from "next/headers"
import { verifySession } from "@/services/auth.service"

export default async function AdminDashboard() {
  const token_id = cookies().get("token_id")
  if (!token_id) redirect("/", RedirectType.replace)

  const data = await verifySession(token_id.value)

  if (data instanceof Error)
    redirect(`/?session=${token_id.value}&expired=true`, RedirectType.push)

  return (
    <Screen>
      <Title>Admin Dashboard</Title>
      <Navbar />
    </Screen>
  )
}
