/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "salt.tikicdn.com",
            "firebasestorage.googleapis.com",
            "vcdn.tikicdn.com",
        ],
    },
};

module.exports = nextConfig;
