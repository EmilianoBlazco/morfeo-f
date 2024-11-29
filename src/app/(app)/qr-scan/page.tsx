'use client'

import withLayout from "@/hocs/withLayout";
import QrScanView from '@/components/self/views/app/qrScan';

const QrScanPage = () => {

    return (
        <>
            <div className="flex justify-center items-center min-h-full">
                <QrScanView/>
            </div>
        </>
    )
}

export default withLayout(QrScanPage);