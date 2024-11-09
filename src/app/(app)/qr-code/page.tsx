'use client'

import withLayout from "@/hocs/withLayout";
import QRCodeView from '@/components/self/views/app/qrGenerate';

const QrCodePage = () => {

    return (
        <>
            <div className="flex justify-center items-center min-h-full">
                <QRCodeView qrData={"Ariel"}/>
            </div>
        </>
    )
}

export default withLayout(QrCodePage);