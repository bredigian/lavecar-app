import { RedirectType, redirect } from "next/navigation"

import Screen from "@/components/ui/screen"
import Title from "@/components/ui/title"
import { cookies } from "next/headers"
import { verifySession } from "@/services/auth.service"

export default async function DashboardWorkhours() {
  const access_token = cookies().get("access_token")
  if (!access_token) redirect("/", RedirectType.replace)

  const data = await verifySession(access_token.value)

  if (data instanceof Error)
    redirect(
      `/?session=${access_token.value}&expired=true&message=${data.message}`,
      RedirectType.push
    )

  return (
    <Screen authData={data}>
      <Title>Horarios</Title>
    </Screen>
  )
}
