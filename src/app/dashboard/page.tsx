import { RedirectType, redirect } from "next/navigation"

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
    <Screen style={{ minHeight: `calc(100svh - 69px` }}>
      <Title>Admin dashboard</Title>
    </Screen>
  )
}
