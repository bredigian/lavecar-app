import { RedirectType, redirect } from "next/navigation"

import Paragraph from "@/components/ui/paragraph"
import Screen from "@/components/ui/screen"
import { SkeletonWorkhoursContainer } from "@/components/skeletons"
import { Suspense } from "react"
import Title from "@/components/ui/title"
import WorkhoursContainer from "@/components/workhours-container"
import { cookies } from "next/headers"
import { verifySession } from "@/services/auth.service"

export default async function DashboardWorkhours() {
  const access_token = cookies().get("access_token")
  if (!access_token) redirect("/", RedirectType.replace)

  const session = await verifySession(access_token.value)
  if (session instanceof Error)
    redirect(
      `/?session=${access_token.value}&expired=true&message=${session.message}`,
      RedirectType.push
    )

  return (
    <Screen authData={session} className="items-start gap-8">
      <section>
        <Title>Horarios</Title>
        <Paragraph>
          Administra los horarios de trabajo por día semanal
        </Paragraph>
      </section>
      <Suspense fallback={<SkeletonWorkhoursContainer />}>
        <WorkhoursContainer />
      </Suspense>
    </Screen>
  )
}
