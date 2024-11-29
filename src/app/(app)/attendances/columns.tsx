"use client";

import {format} from "date-fns";
import {es} from "date-fns/locale";
import {ColumnDef} from "@tanstack/react-table";
import {UploadButton} from "@components/self/ui/data-table/upload-button";
import {CircleCheck, CircleX} from "lucide-react";

export type Absences = {
    id: number;
    status: string;
    created_at: string;
};

export const columns: ColumnDef<Absences>[] = [
    {
        accessorKey: "created_at",
        header: "Fecha de falta",
        cell: (info) => {
            const date = new Date(info.getValue() as string);
            return format(date, "EEEE d 'de' MMMM", {locale: es});
        },
    },
    {
        accessorKey: "created_at_year",
        header: "Año",
        cell: (info) => {
            const date = new Date(info.row.original.created_at as string);
            return format(date, "yyyy");
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "shift",
        header: "Turno",
        cell: (info) => {
            const date = new Date(info.row.original.created_at as string);
            const hours = date.getHours();

            if (hours >= 8 && hours < 12) {
                return "Mañana";
            } else if (hours >= 16 && hours < 20) {
                return "Tarde";
            }
            return "Fuera de turno";
        },
    },
    {
        id: "actions",
        header: "Cargar Justificativo",
        cell: ({row}) => {
            const isAbsent = row.original.status === "Ausente";
            const isJustified = row.original.status === "Justificado";
            const attendanceId = row.original.id;

            // Obtener la fecha de creación y calcular la diferencia en horas
            const createdAt = new Date(row.original.created_at);
            const now = new Date();
            const hoursDifference = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

            return isAbsent && hoursDifference <= 72 ? (
                <UploadButton attendanceId={attendanceId} status={isJustified} />
            ) : isJustified ? (
                <span className="text-green-600 flex justify-center items-center">
                <CircleCheck />
            </span>
            ) : isAbsent && hoursDifference >= 72 ?(
                <span className="text-red-500 flex justify-center items-center">
                <CircleX />
            </span>
            ) : (
                <span className="text-gray-400">-</span>
            );
        },
    }
];
