"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
                                        className,
                                        value,
                                        onDateChange,
                                    }: React.HTMLAttributes<HTMLDivElement> & {
    value: { from: Date | undefined; to: Date | undefined };
    onDateChange: (value: DateRange | undefined) => void;
}) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {value?.from ? (
                            value.to ? (
                                <>
                                    {format(value.from, "dd/MM/yyyy")} -{" "}
                                    {format(value.to, "dd/MM/yyyy")}
                                </>
                            ) : (
                                format(value.from, "dd/MM/yyyy")
                            )
                        ) : (
                            <span>Selecciona una fecha</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={value?.from}
                        selected={value}
                        onSelect={onDateChange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
