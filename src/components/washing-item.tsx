import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"
import { DeleteWashingDialog } from "./washing-dialog"
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
          <div className="flex items-center justify-between w-full">
            <CardTitle>{item.name}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size={"icon"} variant={"outline"}>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-2">
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <DeleteWashingDialog id={item.id} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
