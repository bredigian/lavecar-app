"use client"

import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { EnterIcon, ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"
import { DateTime } from "luxon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TUser } from "@/types/auth.types"
import { signin } from "@/services/auth.service"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { userStore } from "@/store/user.store"

export const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUser>()

  const { setUserdata } = userStore()
  const { push } = useRouter()

  const onSubmit = async (values: TUser) => {
    try {
      const { access_token, userdata, expires_in } = await signin(values)

      Cookies.set("access_token", access_token, {
        expires: DateTime.fromISO(expires_in as string).toJSDate(),
      })
      setUserdata(userdata)

      push("/dashboard")
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-full">
        <Label>Nombre de usuario</Label>
        <Input
          {...register("user_name", {
            required: { value: true, message: "El usuario es requerido." },
            pattern: {
              value: /^[a-zA-Z0-9](?:[a-zA-Z0-9._]{1,14}[a-zA-Z0-9])?$/,
              message: "El usuario no es válido.",
            },
            minLength: {
              value: 4,
              message: "Debe contener al menos 4 caracteres.",
            },
            maxLength: {
              value: 15,
              message: "Se permite hasta 15 caracteres.",
            },
          })}
          type="text"
          placeholder="Administrador"
        />
        {errors?.user_name && (
          <small className="text-red-500">{errors.user_name.message}</small>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label>Contraseña</Label>
        <Input
          {...register("password", {
            required: { value: true, message: "La contraseña es requerida." },
          })}
          type="password"
          placeholder="Contraseña"
        />
        {errors?.password && (
          <small className="text-red-500">{errors.password.message}</small>
        )}
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Cerrar</AlertDialogCancel>
        <Button disabled={isSubmitting} type="submit" className="space-x-2">
          {!isSubmitting ? (
            <EnterIcon className="size-4" />
          ) : (
            <ReloadIcon className="size-4 animate-spin" />
          )}
          <span>{!isSubmitting ? "Iniciar sesión" : "Autenticando"}</span>
        </Button>
      </AlertDialogFooter>
    </form>
  )
}
