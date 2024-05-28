/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // 기존 설정
    config.cache = false;

    // 새로운 설정 추가
    if (isServer) {
      console.log("Webpack config for server", config);
    }

    return config;
  },
  // webpack: (config, options) => {
  //   config.cache = false;
  //   return config;
  // },
};

export default nextConfig;
