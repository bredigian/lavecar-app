import WashingItem from "./washing-item"
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
      {data.map((item) => (
        <WashingItem key={item.id} item={item} />
      ))}
    </ul>
  )
}
