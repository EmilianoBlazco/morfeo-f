'use client'

import withLayout from "@/hocs/withLayout";
import Payroll from '@/components/self/views/app/payroll';

const payrollPage = () => {
    return (
        <>
            <div className="flex min-h-full">
                <Payroll/>
            </div>
        </>
    )
}

export default withLayout(payrollPage);