import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import CalendarCheck from "@/components/icons/calendar-check"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Paragraph from "@/components/ui/paragraph"
import Screen from "@/components/ui/screen"
import Title from "@/components/ui/title"

export default function Reserve() {
  return (
    <Screen style={{ minHeight: `calc(100svh - 56px` }} className="gap-8">
      <section className="space-y-4">
        <Title>Reservar</Title>
        <Paragraph>
          Seleccione la fecha y complete los siguientes datos
        </Paragraph>
      </section>
      <Calendar mode="single" className="rounded-md border" />
      <form className="w-full flex flex-col gap-4 grow">
        <div className="flex items-center justify-between gap-12 w-full mb-4">
          <Label>Horario</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione un horario" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="horario1">Horario 1</SelectItem>
              <SelectItem value="horario2">Horario 2</SelectItem>
              <SelectItem value="horario3">Horario 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-11 w-full">
          <Label>Nombre</Label>
          <Input placeholder="Gianluca Bredice" />
        </div>
        <div className="flex items-center justify-between gap-11 w-full">
          <Label>Email</Label>
          <Input placeholder="ejemplo@gmail.com" />
        </div>
        <div className="flex items-center justify-between gap-11 w-full">
          <Label>Teléfono</Label>
          <Input placeholder="+54 2281 12-4325" />
        </div>
        <Button type="submit" className="space-x-2 mt-auto">
          <CalendarCheck size={16} color="#ffffff" />
          <span>Reservar</span>
        </Button>
      </form>
    </Screen>
  )
}
