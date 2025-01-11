/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "it_will_be_the_other_page_images",
      },
    ],
  },
};

export default nextConfig;
