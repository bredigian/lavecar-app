"use client"

import { DrawerClose, DrawerFooter } from "./ui/drawer"

import { Button } from "./ui/button"
import { DollarSign } from "lucide-react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"
import { TWashing } from "@/types/washes.types"
import { Textarea } from "./ui/textarea"
import { create } from "@/services/washes.service"
import revalidate from "@/lib/actions"
import { toast } from "sonner"
import { useForm } from "react-hook-form"

type TProps = { handleDialog: () => void }

export const AddWashingForm = ({ handleDialog }: TProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TWashing>()

  const onSubmit = async (values: TWashing) => {
    try {
      await create(values)
      await revalidate("washes")

      toast.success("Se agregó un tipo de lavado.")

      handleDialog()
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full px-4"
    >
      <div className="flex flex-col justify-center gap-2 w-full relative">
        <Label>Nombre</Label>
        <Input
          {...register("name", {
            required: { value: true, message: "El nombre es requerido." },
            minLength: {
              value: 4,
              message: "Debe contener al menos 4 carateres.",
            },
            pattern: {
              value: /^\S.*\S$|^\S$/,
              message:
                "El nombre contiene espacios en blanco al principio y/o al final.",
            },
          })}
          autoComplete="off"
          placeholder="Tipo de lavado 1"
        />
        {errors?.name && (
          <small className="text-red-500">{errors.name.message}</small>
        )}
      </div>
      <div className="flex flex-col justify-center gap-2 w-full relative">
        <Label>Descripción</Label>
        <Textarea
          {...register("description", {
            minLength: {
              value: 16,
              message: "Debe contener al menos 16 carateres.",
            },
            pattern: {
              value: /^\S.*\S$|^\S$/,
              message:
                "La descripción contiene espacios en blanco al principio y/o al final.",
            },
          })}
          autoComplete="off"
          className="text-sm resize-none min-h-24"
        />
        {errors?.description && (
          <small className="text-red-500">{errors.description.message}</small>
        )}
      </div>
      <div className="flex flex-col justify-center gap-2 w-full relative">
        <Label>Precio</Label>
        <div className="relative flex items-center">
          <DollarSign className="absolute ml-2" size={16} />
          <Input
            {...register("price", {
              required: { value: true, message: "El precio es requerido." },
            })}
            type="number"
            autoComplete="off"
            className="pl-7"
          />
        </div>
        {errors?.price && (
          <small className="text-red-500">{errors.price.message}</small>
        )}
      </div>
      <DrawerFooter className="w-full px-0">
        <DrawerClose asChild>
          <Button variant="outline" className="w-full">
            Cancelar
          </Button>
        </DrawerClose>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="space-x-2 w-full"
        >
          {isSubmitting && <ReloadIcon className="size-4 animate-spin" />}
          <span>{!isSubmitting ? "Agregar" : "Agregando"}</span>
        </Button>
      </DrawerFooter>
    </form>
  )
}
