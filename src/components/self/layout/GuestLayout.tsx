import {ReactNode} from 'react';

export default function GuestLayout({children}: { children: ReactNode }) {
    return (
        <>
            <main>
                {children}
            </main>
        </>
    );
}
