import { RedirectType, redirect } from "next/navigation"

import Screen from "@/components/ui/screen"
import Title from "@/components/ui/title"
import { cookies } from "next/headers"
import { verifySession } from "@/services/auth.service"

export default async function DashboardWorkhours() {
  const token_id = cookies().get("token_id")
  if (!token_id) redirect("/", RedirectType.replace)

  const data = await verifySession(token_id.value)

  if (data instanceof Error)
    redirect(
      `/?session=${token_id.value}&expired=true&message=${data.message}`,
      RedirectType.push
    )

  return (
    <Screen authData={data}>
      <Title>Horarios</Title>
    </Screen>
  )
}
