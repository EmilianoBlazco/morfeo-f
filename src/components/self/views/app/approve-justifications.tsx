"use client";

import { useState, useEffect } from "react";
import withLayout from "@/hocs/withLayout";
import FilterCard from "@components/self/ui/data-table/filters/filter-card";
import { DataTable } from "@components/self/ui/data-table/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { verify_justifications } from "@/api/attendance/verify-justifications";
import { ApproveJustification, columns } from "@/app/(app)/approve-justifications/columns";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import StatusFilter from "@components/self/ui/data-table/filters/StatusFilter";
import ClearFilters from "@components/self/ui/data-table/filters/clear-filters";
import { isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";

export const ApproveJustificationsComponent = () => {
    const { user } = useAuth();
    const [justifications, setJustifications] = useState<ApproveJustification[]>([]);
    const [filteredData, setFilteredData] = useState<ApproveJustification[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleDateChange = (range: DateRange | undefined) => {
        setDateRange({
            from: range?.from || undefined,
            to: range?.to || undefined,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                setIsLoading(true);
                try {
                    const { data } = await verify_justifications({ id: user.id });
                    const justifications = data as ApproveJustification[];

                    console.log(justifications);

                    setJustifications(justifications);
                    setFilteredData(justifications);

                    const uniqueStatuses = Array.from(
                        new Set(justifications.map((j) => j.status))
                    );
                    setStatuses(uniqueStatuses);
                } catch (error) {
                    console.error("Error fetching justifications:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [user]);

    useEffect(() => {
        const applyFilters = () => {
            const filtered = justifications.filter((j) => {
                const attendanceDate = new Date(j.attendance_date); // Convertimos correctamente a Date
                const matchesDateRange =
                    dateRange?.from && dateRange?.to
                        ? isWithinInterval(attendanceDate, {
                            start: new Date(dateRange.from.setHours(0, 0, 0, 0)),
                            end: new Date(dateRange.to.setHours(23, 59, 59, 999)),
                        })
                        : true;

                const matchesStatus = selectedStatus
                    ? j.status.toLowerCase() === selectedStatus.toLowerCase()
                    : true;

                return matchesDateRange && matchesStatus;
            });

            setFilteredData(filtered);
        };

        applyFilters();
    }, [justifications, dateRange, selectedStatus]);

    const clearFilters = () => {
        setDateRange({ from: undefined, to: undefined });
        setSelectedStatus(null);
        setFilteredData(justifications);
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
            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center p-4 border rounded-md"
                        >
                            <Skeleton className="h-16 w-1/5" />
                            <Skeleton className="h-16 w-1/5" />
                            <Skeleton className="h-16 w-1/5" />
                            <Skeleton className="h-16 w-1/5" />
                        </div>
                    ))}
                </div>
            ) : (
                <DataTable columns={columns} data={filteredData} />
            )}
        </div>
    );
};

export default withLayout(ApproveJustificationsComponent);
