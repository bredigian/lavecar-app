import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

import { TWashing } from "@/types/washes.types"

type TProps = {
  item: TWashing
}

export default function WashingItem({ item }: TProps) {
  const price = item.price.toLocaleString("es-AR")

  return (
    <li>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
          <CardDescription>
            {item.description || "Sin descripción."}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <span className="text-2xl font-medium">${price}</span>
        </CardFooter>
      </Card>
    </li>
  )
}
