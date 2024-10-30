'use client'

import withLayout from "@/hocs/withLayout";
import {useAuth} from "@/context/AuthContext";
import withRole from "@/hocs/withRole";

const DashboardComponent = () => {

    const { user } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>
            <h1>Bienvenido, {user?.name}</h1>
            {user?.role?.includes('Director') && <p>Este contenido es solo para administradores.</p>}
            {user?.role?.includes('user') && <p>Este contenido es para usuarios estándar.</p>}
        </div>

    )

}

export default withLayout(withRole(['Director', 'Admin'])(DashboardComponent));