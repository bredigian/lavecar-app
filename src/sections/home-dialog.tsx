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
import { HaveReserveForm } from "./reserve-form"

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
        <HaveReserveForm />
        <DrawerFooter className="pt-2">
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
