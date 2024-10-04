import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const HaveReserveDialog = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="col-span-2" type="button" variant="outline">
          Ya tengo un turno
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Ya tengo un turno</DrawerTitle>
          <DrawerDescription>
            A continuación ingrese el número de reserva
          </DrawerDescription>
        </DrawerHeader>
        <form className="px-4">
          <Input placeholder="#000001" />
        </form>
        <DrawerFooter>
          <Button>Buscar</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const WhereWeAreDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="col-span-2" type="button" variant="outline">
          Dónde estamos
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Dónde estamos</AlertDialogTitle>
          <AlertDialogDescription>
            Acá va una imágen del mapa con la dirección.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
