import {ReactNode} from 'react';

export default function GuestLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <main className='py-20'>{children}</main>
            <footer className="bg-gray-900 text-white py-10 h-full">
                Guesst Footer
            </footer>
        </>
    );
}
