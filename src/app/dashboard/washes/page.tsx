import { RedirectType, redirect } from "next/navigation"

import { AddWashingDialog } from "@/components/washing-dialog"
import Paragraph from "@/components/ui/paragraph"
import Screen from "@/components/ui/screen"
import { Suspense } from "react"
import Title from "@/components/ui/title"
import WashesContainer from "@/components/washes-container"
import { cookies } from "next/headers"
import { verifySession } from "@/services/auth.service"

export default async function Washes() {
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
      className="items-start gap-8"
      authData={data}
    >
      <Title>Lavados</Title>
      <Paragraph disableMarginTop>
        Administra los diferentes tipos de lavados que ofrece tu negocio.
      </Paragraph>
      <AddWashingDialog />
      <Suspense fallback={<></>}>
        <WashesContainer />
      </Suspense>
    </Screen>
  )
}
