/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
                port: '',
            },
            {
                protocol: 'http',
                hostname: 'edyth-buymeboba.s3.us-east-2.amazonaws.com',
            }
        ],
    },
};

export default nextConfig;
