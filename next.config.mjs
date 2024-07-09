/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: `${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
                port: '',
                pathname: '/**',
            },
        ],
    },
    // output: 'standalone',

    // eslint: {
    //     ignoreDuringBuilds: true,
    // },
    // typescript: {
    //     ignoreBuildErrors: true,
    // },
}

export default nextConfig
