'use client'

import { ColumnDef } from "@tanstack/react-table"
//Definir con zod
export type Absences = {
    id: string
    status: string
    created_at: string
}

export const columns: ColumnDef<Absences>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: info => info.getValue(),  // Muestra el valor de la celda.
    },
    {
        accessorKey: "created_at",
        header: "Fecha de falta",
        cell: info => info.getValue(),  // Muestra el valor de la celda.
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: info => info.getValue(),  // Muestra el valor de la celda.
    },
]
