"use client";

import {format, parseISO} from "date-fns";
import { es } from "date-fns/locale";
import { ColumnDef } from "@tanstack/react-table";
import {ViewButton} from "@components/self/ui/data-table/view-button"; // Asegúrate de importar tu componente modal

export type ApproveJustification = {
    id: number;
    employee_name: string;
    attendance_date: string;
    status: string;
    assigned_at: string;
    file_url: string; // Agregar el campo de la URL del archivo
};

export const columns: ColumnDef<ApproveJustification>[] = [
    {
        accessorKey: "employee_name",
        header: "Empleado",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "attendance_date",
        header: "Fecha de falta",
        cell: (info) => {
            const date = parseISO(info.getValue() as string); // Parseamos directamente el string
            return format(date, "EEEE d 'de' MMMM", { locale: es });
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "assigned_at",
        header: "Asignado el",
        cell: (info) => {
            const date = parseISO(info.getValue() as string);
            return format(date, "EEEE d 'de' MMMM, yyyy", { locale: es });
        },
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const { file_url, id } = row.original;

            return (
                <div className="flex justify-center">
                    <ViewButton fileUrl={file_url} justificationId={id} />
                </div>
            );
        },
    }
];