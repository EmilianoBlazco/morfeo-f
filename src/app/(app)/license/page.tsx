'use client'

import withLayout from "@/hocs/withLayout";
import License from '@/components/self/views/app/license';

const LicensePage = () => {
    return (
        <>
            <div className="flex min-h-full">
                <License/>
            </div>
        </>
    )
}

export default withLayout(LicensePage);