"use client"

import { cn } from "@/lib/utils"

type TProps = {
  height?: `h-${string}`
}

export default function Map({ height }: TProps) {
  return (
    <iframe
      src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Calle%2014%201200,%20La%20Plata,%20Argentina+(LaveCAR)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      allowFullScreen={true}
      className={cn("rounded-xl w-full", height ?? "grow")}
      loading={"lazy"}
      referrerPolicy={"no-referrer-when-downgrade"}
    ></iframe>
  )
}
