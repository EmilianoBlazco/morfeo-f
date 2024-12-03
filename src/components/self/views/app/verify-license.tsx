"use client"

import withLayout from "@/hocs/withLayout";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {get_supervisor_request} from "@/api/license/licenses";
import {columns, VerifyLicenseType} from "@/app/(app)/license/verify-license/columns";
import {DataTable} from "@components/self/ui/data-table/data-table";
import {isWithinInterval} from "date-fns";
import {DateRange} from "react-day-picker";
import {DatePickerWithRange} from "@components/ui/date-picker-with-range";
import StatusFilter from "@components/self/ui/data-table/filters/StatusFilter";
import ClearFilters from "@components/self/ui/data-table/filters/clear-filters";
import FilterCard from "@components/self/ui/data-table/filters/filter-card";

export const VerifiyLicenseComponent = () => {

    const { user } = useAuth();
    const [licenses_requests, setLicensesRequests] = useState<VerifyLicenseType[]>([]);
    const [filteredData, setFilteredData] = useState<VerifyLicenseType[]>([]);
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [statuses, setStatuses] = useState<string[]>([]);
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
                    const data = await get_supervisor_request();
                    const licenses_requests = data as VerifyLicenseType[];

                    console.log("just",licenses_requests);

                    setLicensesRequests(licenses_requests);
                    setFilteredData(licenses_requests);

                    const uniqueStatuses = Array.from(
                        new Set(licenses_requests.map((j) => j.status))
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
            const filtered = licenses_requests.filter((j) => {
                const assignedDate = new Date(j.created_at); // Convertimos correctamente a Date
                const matchesDateRange =
                    dateRange?.from && dateRange?.to
                        ? isWithinInterval(assignedDate, {
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
    }, [licenses_requests, dateRange, selectedStatus]);

    const clearFilters = () => {
        setDateRange({ from: undefined, to: undefined });
        setSelectedStatus(null);
        setFilteredData(licenses_requests);
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
            <DataTable columns={columns} data={filteredData}/>
        </div>
    )
}

export default withLayout(VerifiyLicenseComponent);