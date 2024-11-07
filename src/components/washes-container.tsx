import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

import { getWashes } from "@/services/washes.service"

export default async function WashesContainer() {
  const data = await getWashes()

  if (data instanceof Error)
    return <span className="leading-none">{data.message}</span>

  if (data.length === 0)
    return (
      <span className="">No se encontraron tipos de lavados registrados.</span>
    )

  return (
    <ul className="flex flex-col gap-4 w-full">
      {data.map((item) => {
        const price = item.price.toLocaleString("es-AR")

        return (
          <li key={item.id}>
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
      })}
    </ul>
  )
}
