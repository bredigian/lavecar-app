import { RedirectType, redirect } from "next/navigation"

import IncomesContainer from "@/components/incomes-container"
import Paragraph from "@/components/ui/paragraph"
import Screen from "@/components/ui/screen"
import { SkeletonIncomesContainer } from "@/components/skeletons"
import { Suspense } from "react"
import Title from "@/components/ui/title"
import { cookies } from "next/headers"
import { verifySession } from "@/services/auth.service"

export default async function Finaces() {
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
      style={{ minHeight: "calc(100svh - 184px)" }}
      className="items-start"
      authData={data}
    >
      <Title>Ingresos</Title>
      <Paragraph>En esta pantalla verás el historial de ingresos.</Paragraph>
      <Suspense fallback={<SkeletonIncomesContainer />}>
        <IncomesContainer />
      </Suspense>
    </Screen>
  )
}
