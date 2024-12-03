"use client"

import {ColumnDef} from "@tanstack/react-table";
import {format, parseISO} from "date-fns";
import {es} from "date-fns/locale";
import {ViewButton} from "@components/self/ui/data-table/view-button";

export type VerifyLicenseType = {
    id: number;
    employee_name: string;
    status: string;
    start_date: string;
    end_date: string;
    duration_days: number;
    justification_file: string;
    created_at: string;
};

export const columns: ColumnDef<VerifyLicenseType>[] = [
    {
        accessorKey: "employee_name",
        header: "Empleado",
        cell: (row) => {
            console.log(row);
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "start_date",
        header: "Fecha de inicio",
        cell: (info) => {
            const date = parseISO(info.getValue() as string); // Parseamos directamente el string
            return format(date, "EEEE d 'de' MMMM", { locale: es });
        },
    },
    {
        accessorKey: "end_date",
        header: "Fecha de fin",
        cell: (info) => {
            const date = parseISO(info.getValue() as string); // Parseamos directamente el string
            return format(date, "EEEE d 'de' MMMM", { locale: es });
        },
    },
    {
        accessorKey: "duration_days",
        header: "Duración (dias)",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "created_at",
        header: "Asignado el",
        cell: (info) =>{
            const date = parseISO(info.getValue() as string);
            return format(date, "EEEE d 'de' MMMM, yyyy", { locale: es });
        },
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const { justification_file, id } = row.original;

            return (
                <div className="flex justify-center">
                    <ViewButton fileUrl={justification_file} justificationId={id} />
                </div>
            );
        },
    }
];