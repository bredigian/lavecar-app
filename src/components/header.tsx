import { Button } from "./ui/button"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import logo from "@/assets/logo.png"

type TProps = {
  logoSize?: string
  className?: string
  backButton?: boolean
}

export default function Header({ className, logoSize, backButton }: TProps) {
  return (
    <header className={className}>
      {backButton && (
        <Link href={"/"}>
          <Button size="icon" variant="secondary">
            <ChevronLeftIcon className="size-6" />
          </Button>
        </Link>
      )}
      <Image
        src={logo}
        alt="Logo de LaveCAR"
        className={cn("object-contain w-fit", logoSize ?? "h-10")}
      />
    </header>
  )
}
