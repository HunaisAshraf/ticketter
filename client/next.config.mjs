/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, { dev }) => {
  //   if (dev) {
  //     config.devServer.hot = true; // Enable HMR in webpack dev server
  //   }
  //   return config;
  // },
};

export default nextConfig;

// webpack: (config, { isServer }) => {
//   // Modify webpack configuration for both client and server
//   if (!isServer) {
//     config.watchOptions = {
//       ...config.watchOptions,
//       poll: 300, // Enable polling with a 300ms interval
//     };
//   }
//   return config;
// },
