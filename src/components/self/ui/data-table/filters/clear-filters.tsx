"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {Eraser} from "lucide-react";

interface ClearFiltersProps {
    onClear: () => void;
}

const ClearFilters: React.FC<ClearFiltersProps> = ({ onClear }) => {
    return (
        <Button variant="outline" onClick={onClear} className="border-blue-300 text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500">
            <Eraser /> Limpiar filtros
        </Button>


    );
};

export default ClearFilters;