import { AuthAsAdminDialog } from "./home-dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cookies } from "next/headers"
import { verifySession } from "@/services/auth.service"

export default async function AdminAccess() {
  const access_token = cookies().get("access_token")
  const session = access_token ? await verifySession(access_token.value) : null

  if (session === null || session instanceof Error) return <AuthAsAdminDialog />

  return (
    <Link href={"/dashboard"}>
      <Button>Ir al Dashboard</Button>
    </Link>
  )
}
