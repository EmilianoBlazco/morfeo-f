"use client";

import { FC } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface StatusFilterProps {
    statuses: string[];
    selectedStatus: string | null;
    onFilter: (status: string | null) => void;
}

const StatusFilter: FC<StatusFilterProps> = ({ statuses, selectedStatus, onFilter }) => {
    // Maneja el cambio de selección en el Select de ShadCN
    const handleSelectChange = (status: string | null) => {
        onFilter(status);
    };

    return (
        <Select value={selectedStatus ?? "all"} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Estados</SelectLabel>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                            {status}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default StatusFilter;
