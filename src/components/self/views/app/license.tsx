'use client'

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import CurrentLicenseCard from '@/components/self/ui/currentLicenseCard';
import RequestLicenseCard from '@/components/self/ui/requestLicenseCard';

const currentLicenses = [
    {
        type: "Licencia por Enfermedad",
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-12-15'),
    },
    {
        type: "Licencia por Estudios",
        startDate: new Date('2024-08-01'),
        endDate: new Date('2024-08-15'),
    }
];

export default function LicenseManagement() {
    return (
        <div className="container px-4 py-12 bg-white">
            <Tabs defaultValue="current" className="w-full">
                <TabsList
                    className="flex justify-start pt-8 pb-[18px] bg-white border-t border-b border-gray-300 rounded-none">
                    <TabsTrigger
                        value="current"
                        className={cn(
                            "px-4 py-2 text-sm font-medium text-gray-500 transition-colors",
                            "border-b-2 border-transparent",
                            "data-[state=active]:text-black data-[state=active]:border-b-black data-[state=active]:shadow-none rounded-none",
                            "hover:text-black",
                            "focus:outline-none"
                        )}
                    >
                        Licencia Actual
                    </TabsTrigger>
                    <TabsTrigger
                        value="request"
                        className={cn(
                            "px-4 py-2 text-sm font-medium text-gray-500 transition-colors",
                            "border-b-2 border-transparent",
                            "data-[state=active]:text-black data-[state=active]:border-black data-[state=active]:shadow-none rounded-none",
                            "hover:text-black",
                            "focus:outline-none"
                        )}
                    >
                        Solicitar Licencia
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="current" className="mt-8">
                    <CurrentLicenseCard currentLicenses={currentLicenses} />
                </TabsContent>
                <TabsContent value="request" className="mt-8">
                    <RequestLicenseCard/>
                </TabsContent>
            </Tabs>
        </div>
    );
}