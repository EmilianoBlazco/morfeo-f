"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { userAttendances } from "@/api/attendance/attendances";
import { Absences, columns } from "@/app/(app)/attendances/columns";
import StatusFilter from "@components/self/ui/data-table/filters/StatusFilter";
import { DataTable } from "@components/self/ui/data-table/data-table";
import withLayout from "@/hocs/withLayout";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { isWithinInterval } from "date-fns";
import ClearFilters from "@components/self/ui/data-table/filters/clear-filters";
import {DateRange} from "react-day-picker";
import FilterCard from "@components/self/ui/data-table/filters/filter-card";

const AttendancesComponent = () => {
    const { user } = useAuth();
    const [data, setData] = useState<Absences[]>([]);
    const [filteredData, setFilteredData] = useState<Absences[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const handleDateChange = (range: DateRange | undefined) => {
        setDateRange({
            from: range?.from || undefined,
            to: range?.to || undefined,
        });
    };


    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const response = await userAttendances({ id: user.id });
                    const absences = (Array.isArray(response.data[0]) ? response.data[0] : response.data) as Absences[];
                    setData(absences);
                    setFilteredData(absences);

                    const uniqueStatuses = Array.from(new Set(absences.map((d) => d.status)));
                    setStatuses(uniqueStatuses);
                } catch (error) {
                    console.error("Error fetching absences:", error);
                }
            }
        };

        fetchData();
    }, [user]);

    useEffect(() => {
        const applyFilters = () => {
            const filtered = data.filter((d) => {
                const createdAt = new Date(d.created_at);
                const matchesDateRange =
                    dateRange.from && dateRange.to
                        ? isWithinInterval(createdAt, {
                            start: new Date(dateRange.from.setHours(0, 0, 0, 0)), // Inicio del día
                            end: new Date(dateRange.to.setHours(23, 59, 59, 999)), // Fin del día
                        })
                        : true;
                const matchesStatus = selectedStatus ? d.status === selectedStatus : true;
                return matchesDateRange && matchesStatus;
            });

            setFilteredData(filtered);
        };

        applyFilters();
    }, [data, dateRange, selectedStatus]);

    const clearFilters = () => {
        setDateRange({ from: undefined, to: undefined });
        setSelectedStatus(null);
        setFilteredData(data);
    };

    return (
        <div className="container mx-auto py-10 space-y-4">
            <FilterCard>
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <DatePickerWithRange
                        className="w-[300px]"
                        value={dateRange}
                        onDateChange={handleDateChange}
                    />
                    <StatusFilter
                        statuses={statuses}
                        selectedStatus={selectedStatus}
                        onFilter={setSelectedStatus}
                    />
                    <ClearFilters onClear={clearFilters} />
                </div>
            </FilterCard>
            <DataTable columns={columns} data={filteredData} />
        </div>
    );
};

export default withLayout(AttendancesComponent);