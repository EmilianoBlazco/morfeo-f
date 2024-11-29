'use client'

import withLayout from "@/hocs/withLayout";
import {useAuth} from "@/context/AuthContext";
import QRCodeView from '@/components/self/views/app/qrGenerate';

const QrCodePage = () => {
    const {user} = useAuth();

    return (
        <>
            <div className="flex justify-center items-center min-h-full">
                <QRCodeView qrData={JSON.stringify({id: user?.id, dni: user?.dni, name: user?.name})}/>
            </div>
        </>
    )
}

export default withLayout(QrCodePage);