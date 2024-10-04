import Image from "next/image"
import { cn } from "@/lib/utils"
import logo from "@/assets/logo.png"

type TProps = {
  logoSize?: string
  className?: string
}

export default function Header({ className, logoSize }: TProps) {
  return (
    <header className={className}>
      <Image
        src={logo}
        alt="Logo de LaveCAR"
        className={cn("object-contain", logoSize ?? "h-10")}
      />
    </header>
  )
}
