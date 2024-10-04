"use client"

import { Button } from "./ui/button"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { cn } from "@/lib/utils"
import logo from "@/assets/logo.png"
import { useRouter } from "next/navigation"

type TProps = {
  logoSize?: string
  className?: string
  backButton?: boolean
}

export default function Header({ className, logoSize, backButton }: TProps) {
  const { back } = useRouter()

  return (
    <header className={className}>
      {backButton && (
        <Button onClick={back} size="icon" variant="secondary">
          <ChevronLeftIcon className="size-6" />
        </Button>
      )}
      <Image
        src={logo}
        alt="Logo de LaveCAR"
        className={cn("object-contain w-fit", logoSize ?? "h-10")}
      />
    </header>
  )
}
