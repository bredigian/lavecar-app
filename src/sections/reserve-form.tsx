"use client"

import { Controller, useForm } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn, toTimeString } from "@/lib/utils"
import { getReserveDetail, reserve } from "@/services/reserves.service"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import CalendarCheck from "@/components/icons/calendar-check"
import { DateTime } from "luxon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"
import { TReserve } from "@/types/reserves.types"
import { TWeekdayWithAssignedReserves } from "@/types/weekdays.types"
import { TWorkhour } from "@/types/workhours.types"
import revalidate from "@/lib/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6]

type TProps = {
  weekdays: TWeekdayWithAssignedReserves[]
}

export const ReserveForm = ({ weekdays }: TProps) => {
  const { push } = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    watch,
  } = useForm<TReserve>()

  const [workhour, setWorkhour] = useState<string | undefined>(undefined)
  const [workhourError, setWorkhourError] = useState(false)

  const [month, setMonth] = useState<Date>(new Date())
  const [disabledDates, setDisabledDates] = useState<string[]>([])

  const [assignedReservesOfDay, setAssignedReservesOfDay] = useState<
    TReserve[]
  >([])

  const [workhoursOfDay, setWorkhoursOfDay] = useState<TWorkhour[]>([])

  useEffect(() => {
    const selectedDate = DateTime.fromJSDate(month).set({ hour: 0, minute: 0 })
    const lastDateOfMonth = selectedDate.endOf("month")

    const dates = []
    for (let index = selectedDate.day; index <= lastDateOfMonth.day; index++) {
      const date = DateTime.local(
        selectedDate.year,
        selectedDate.month,
        index
      ).setLocale("es-AR")

      dates.push(date.toISO())
    }

    const datesWithAssignedShifts = dates.map((date) => {
      const shifts = weekdays
        .find(
          (item) => item.weekday === DateTime.fromISO(date as string).weekday
        )
        ?.reserves?.filter(
          (item) =>
            DateTime.fromISO(item.date as string)
              .set({ hour: 0, minute: 0 })
              .toMillis() === DateTime.fromISO(date as string).toMillis()
        )
        .map((shift) =>
          DateTime.fromISO(shift.date as string)
            .setLocale("es-AR")
            .toISO()
        )

      return { date, shifts }
    })

    const completeDates = datesWithAssignedShifts
      .filter((date) => (date?.shifts?.length as number) > 0)
      .map((date) => {
        const workhoursEnabledByWeekday = weekdays
          .find(
            (day) =>
              day.weekday === DateTime.fromISO(date.date as string).weekday
          )
          ?.workhours.map(({ hour, time }) => ({ hour, time }))

        const isComplete = workhoursEnabledByWeekday?.every(({ hour, time }) =>
          date.shifts?.includes(
            DateTime.fromISO(date.date as string)
              .set({ hour: hour as number, minute: time as number })
              .setLocale("es-AR")
              .toISO()
          )
        )

        return { ...date, complete: isComplete }
      })
      .filter((item) => item.complete as boolean)

    setDisabledDates(completeDates?.map((item) => item.date as string))
  }, [month])

  const onSubmit = async (values: TReserve) => {
    if (!workhour) {
      setWorkhourError(true)
      return
    }

    const [hour, minute] = workhour.split(":").map((item) => Number(item))

    const date = DateTime.fromJSDate(values.date as Date)
      .setZone("America/Argentina/Buenos_Aires")
      .set({ hour, minute })
      .toUTC()
      .toJSDate()

    const payload: TReserve = {
      ...values,
      date,
      status: "PENDING",
      payment_status: "PENDING",
    }

    try {
      const { id, whatsapp_message_status } = await reserve(payload)
      await revalidate("reserves")
      push(`/reserve/${id}?message_status=${whatsapp_message_status}`)
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4 grow"
    >
      <Controller
        control={control}
        name="date"
        rules={{
          required: { value: true, message: "La fecha es requerida." },
        }}
        render={({ field }) => (
          <div className="flex flex-col gap-2 w-full">
            <Calendar
              mode="single"
              initialFocus={false}
              selected={field.value as Date}
              onSelect={field.onChange}
              className="rounded-md border w-fit place-self-center"
              onMonthChange={(value) => {
                const isPast = value.getTime() < Date.now()
                setMonth(!isPast ? value : new Date())
              }}
              onDayClick={(value) => {
                const date = DateTime.fromJSDate(value)
                const day = weekdays.find(
                  (weekday) => weekday.weekday === date.weekday
                )
                setAssignedReservesOfDay(day?.reserves as TReserve[])
                setWorkhoursOfDay(day?.workhours as TWorkhour[])
              }}
              fromMonth={DateTime.now().toJSDate()}
              toMonth={DateTime.now().plus({ months: 1 }).toJSDate()}
              disabled={[
                ...disabledDates.map((item) => new Date(item)),
                {
                  before: new Date(),
                  after: DateTime.now().plus({ days: 7 }).toJSDate(),
                },
                {
                  dayOfWeek: WEEKDAYS.filter((day) => {
                    if (
                      weekdays.find((weekday) => {
                        if (day === 0) return weekday.weekday === 7
                        return weekday.weekday === day
                      })
                    )
                      return false
                    return true
                  }),
                },
              ]}
            />
            {errors?.date && (
              <small className="text-red-500">{errors.date.message}</small>
            )}
          </div>
        )}
      />
      <div className="flex flex-col gap-2 w-full">
        <div
          className={cn(
            "flex items-center justify-between gap-12 w-full",
            !workhourError ? "my-4" : "mt-4"
          )}
        >
          <Label>Horario</Label>
          <Select
            onValueChange={(value) => {
              setWorkhour(value)
              setWorkhourError(false)
            }}
            value={workhour}
            disabled={!watch("date") ? true : false}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione un horario" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {workhoursOfDay.map((workhour) => {
                const { hour, time } = workhour
                const parsedHour = toTimeString(hour)
                const parsedTime = toTimeString(time)
                const toString = `${parsedHour}:${parsedTime}`

                const date = DateTime.fromJSDate(getValues("date") as Date)
                  .setZone("America/Argentina/Buenos_Aires")
                  .set({
                    hour,
                    minute: time,
                  })

                const isAssigned = assignedReservesOfDay.find((reserve) => {
                  const reserveDate = DateTime.fromISO(reserve.date as string)
                  return reserveDate.toMillis() === date.toMillis()
                })

                return (
                  <SelectItem
                    disabled={isAssigned ? true : false}
                    key={toString}
                    value={toString}
                  >
                    {toString}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
        {workhourError && (
          <small className="text-red-500 mb-4">El horario es requerido.</small>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between gap-11 w-full">
          <Label>Nombre</Label>
          <Input
            {...register("user_name", {
              required: { value: true, message: "El nombre es requerido." },
              minLength: {
                value: 6,
                message: "Debe contener al menos 6 caracteres.",
              },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/,
                message: "Debe contener al menos 2 palabras.",
              },
            })}
            placeholder="Gianluca Bredice"
          />
        </div>
        {errors?.user_name && (
          <small className="text-red-500">{errors.user_name.message}</small>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between gap-11 w-full">
          <Label>Email</Label>
          <Input
            {...register("user_email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "El email no es válido.",
              },
            })}
            placeholder="(opcional) ejemplo@gmail.com"
          />
        </div>
        {errors?.user_email && (
          <small className="text-red-500">{errors.user_email.message}</small>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between gap-11 w-full">
          <Label>Teléfono</Label>
          <Input
            {...register("user_phone", {
              required: { value: true, message: "El teléfono es requerido." },
              minLength: {
                value: 12,
                message: "Debe contener al menos 12 caracteres.",
              },
              pattern: {
                value: /^\+?[0-9]+(\s[0-9]+)*(\s[0-9]+-[0-9]+)?$/,
                message: "El formato no es válido.",
              },
            })}
            placeholder="+54 2281 12-4325"
          />
        </div>
        {errors?.user_phone && (
          <small className="text-red-500">{errors.user_phone.message}</small>
        )}
      </div>
      <Button
        disabled={isSubmitting}
        type="submit"
        className="space-x-2 mt-auto"
      >
        {!isSubmitting ? (
          <CalendarCheck size={16} color="#ffffff" />
        ) : (
          <ReloadIcon className="animate-spin size-4" />
        )}
        <span>{!isSubmitting ? "Reservar" : "Reservando"}</span>
      </Button>
    </form>
  )
}

type THaveReserve = {
  number: TReserve["number"]
}

export const HaveReserveForm = () => {
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<THaveReserve>()

  const onSubmit = async (values: THaveReserve) => {
    try {
      const { id } = (await getReserveDetail(
        Number(values.number),
        true
      )) as TReserve
      push(`/reserve/${id}`)
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 space-y-4">
      <div className="flex flex-col gap-2 w-full">
        <Label>Núm. de reserva</Label>
        <Input
          {...register("number", {
            required: { value: true, message: "El número es requerido." },
          })}
          type="number"
          placeholder="000001"
        />
        {errors?.number && (
          <small className="text-red-500">{errors.number.message}</small>
        )}
      </div>
      <Button
        disabled={isSubmitting}
        className="w-full space-x-2"
        type="submit"
      >
        {isSubmitting && <ReloadIcon className="size-4 animate-spin" />}
        <span>{!isSubmitting ? "Buscar" : "Buscando"}</span>
      </Button>
    </form>
  )
}
