"use client";

import {FC, ReactNode} from "react";

interface FilterCardProps {
    children: ReactNode;
}

const FilterCard: FC<FilterCardProps> = ({ children }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 space-y-4">
            {children}
        </div>
    );
};

export default FilterCard;
