/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000", // El puerto donde está corriendo tu servidor Laravel
                pathname: "/storage/**", // Ruta pública para acceder a tus archivos
            },
        ],
    },
};

export default nextConfig;