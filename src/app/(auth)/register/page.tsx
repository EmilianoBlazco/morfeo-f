'use client'

import Register from "@/components/auth/register";
import withLayout from "@/lib/withLayout";


const RegisterPage = () => {

    return (
        <Register />
    );
}

export default withLayout(RegisterPage);