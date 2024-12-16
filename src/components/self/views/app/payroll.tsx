"use client"

import { useState, useMemo, useEffect } from "react"
import { CalendarIcon, UserIcon, ClockIcon, AlertTriangleIcon, PrinterIcon, UsersIcon, Loader } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useAuth } from "@/context/AuthContext"
import { userAttendances } from "@/api/attendance/attendances"

type AttendanceData = {
    id: number;
    user_id: number;
    entry_time: string;
    exit_time: string;
    status: string;
    created_at: string;
    updated_at: string;
};

export default function AttendanceSummaryMonthly() {
    const { user } = useAuth()
    const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([])
    const [selectedMonth, setSelectedMonth] = useState<string>("2024-01")
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const entriesPerPage = 50

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                setLoading(true)
                setError(null)
                try {
                    const response = await userAttendances()
                    console.log(response.data)
                    const absences = (Array.isArray(response.data[0]) ? response.data[0] : response.data) as AttendanceData[]
                    setAttendanceData(absences)
                } catch (error) {
                    setError("Error fetching attendance data")
                    console.error("Error fetching attendance data:", error)
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchData()
    }, [user])

    const monthlyData = useMemo(() => {
        return attendanceData.filter(entry => entry.entry_time?.startsWith(selectedMonth))
    }, [selectedMonth, attendanceData])

    const monthlySummary = useMemo(() => {
        const summary = {
            totalEntries: monthlyData.length,
            presentCount: monthlyData.filter(entry => entry.status === "Presente").length,
            lateCount: monthlyData.filter(entry => entry.status === "Tardanza").length,
            absentCount: monthlyData.filter(entry => entry.status === "Ausente").length,
            justifiedCount: monthlyData.filter(entry => entry.status === "Justificado").length,
            uniqueEmployees: new Set(monthlyData.map(entry => entry.user_id)).size,
        }
        return summary
    }, [monthlyData])

    const totalPages = Math.ceil(monthlyData.length / entriesPerPage)

    const paginatedData = monthlyData.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    )

    const months = [
        { value: "2024-01", label: "Enero 2024" },
        { value: "2024-02", label: "Febrero 2024" },
        { value: "2024-03", label: "Marzo 2024" },
        { value: "2024-04", label: "Abril 2024" },
        { value: "2024-05", label: "Mayo 2024" },
        { value: "2024-06", label: "Junio 2024" },
        { value: "2024-07", label: "Julio 2024" },
        { value: "2024-08", label: "Agosto 2024" },
        { value: "2024-09", label: "Septiembre 2024" },
        { value: "2024-10", label: "Octubre 2024" },
        { value: "2024-11", label: "Noviembre 2024" },
        { value: "2024-12", label: "Diciembre 2024" },
    ]

    const handlePrint = () => {
        window.print()
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const renderPaginationItems = () => {
        const items = []
        const maxVisiblePages = 5
        const halfVisiblePages = Math.floor(maxVisiblePages / 2)

        let startPage = Math.max(currentPage - halfVisiblePages, 1)
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(endPage - maxVisiblePages + 1, 1)
        }

        if (startPage > 1) {
            items.push(
                <PaginationItem key="first">
                    <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
                </PaginationItem>
            )
            if (startPage > 2) {
                items.push(<PaginationEllipsis key="ellipsis-start" />)
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink onClick={() => handlePageChange(i)} isActive={currentPage === i}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(<PaginationEllipsis key="ellipsis-end" />)
            }
            items.push(
                <PaginationItem key="last">
                    <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
                </PaginationItem>
            )
        }

        return items
    }

    if (loading) {
        return <Loader />
    }

    if (error || monthlyData.length === 0) {
        return null
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Resumen de Asistencias</h1>
                <div className="flex items-center space-x-4">
                    <Select onValueChange={(value) => { setSelectedMonth(value); setCurrentPage(1); }} defaultValue="2024-01">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Seleccionar mes" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Mes</SelectLabel>
                                {months.map((month) => (
                                    <SelectItem key={month.value} value={month.value}>
                                        {month.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button onClick={handlePrint} className="print:hidden">
                        <PrinterIcon className="mr-2 h-4 w-4" /> Imprimir
                    </Button>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">
                {months.find(m => m.value === selectedMonth)?.label}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Registros</CardTitle>
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{monthlySummary.totalEntries}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Empleados Activos</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{monthlySummary.uniqueEmployees}</div>
                        <p className="text-xs text-muted-foreground">
                            de 120 empleados
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Presentes</CardTitle>
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{monthlySummary.presentCount}</div>
                        <p className="text-xs text-muted-foreground">
                            {((monthlySummary.presentCount / monthlySummary.totalEntries) * 100).toFixed(1)}% del total
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tardanzas</CardTitle>
                        <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{monthlySummary.lateCount}</div>
                        <p className="text-xs text-muted-foreground">
                            {((monthlySummary.lateCount / monthlySummary.totalEntries) * 100).toFixed(1)}% del total
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ausencias</CardTitle>
                        <AlertTriangleIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{monthlySummary.absentCount + monthlySummary.justifiedCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Justificadas: {monthlySummary.justifiedCount} ({((monthlySummary.justifiedCount / (monthlySummary.absentCount + monthlySummary.justifiedCount)) * 100).toFixed(1)}%)
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Usuario ID</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Hora de Entrada</TableHead>
                                <TableHead>Hora de Salida</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.map((entry) => (
                                <TableRow key={entry.id}>
                                    <TableCell>{entry.id}</TableCell>
                                    <TableCell>{entry.user_id}</TableCell>
                                    <TableCell>{new Date(entry.entry_time).toLocaleDateString()}</TableCell>
                                    <TableCell>{entry.entry_time ? new Date(entry.entry_time).toLocaleTimeString() : "N/A"}</TableCell>
                                    <TableCell>{entry.exit_time ? new Date(entry.exit_time).toLocaleTimeString() : "N/A"}</TableCell>
                                    <TableCell>{entry.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Mostrando {paginatedData.length} de {monthlyData.length} entradas (Página {currentPage} de {totalPages})
                        </p>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                    />
                                </PaginationItem>
                                {renderPaginationItems()}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}