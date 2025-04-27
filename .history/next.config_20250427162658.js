const path = require('path')

// module.exports = {
//   env: {
//     NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
//     NEXT_PUBLIC_TINYMCE_API_KEY: process.env.NEXT_PUBLIC_TINYMCE_API_KEY,
//     NEXT_PUBLIC_COMPANY_DB: process.env.NEXT_PUBLIC_COMPANY_DB,
//     NEXT_PUBLIC_COMPANY_PASSWORD: process.env.NEXT_PUBLIC_COMPANY_PASSWORD,
//     NEXT_PUBLIC_COMPANY_USERNAME: process.env.NEXT_PUBLIC_COMPANY_USERNAME,
//     NEXT_PUBLIC_LOGIN_URL: process.env.NEXT_PUBLIC_LOGIN_URL,
//     NEXT_PUBLIC_SAP_ODBC_CONNECTION_STRING:process.env.NEXT_PUBLIC_SAP_ODBC_CONNECTION_STRING,
//   },
//   trailingSlash: true,
//   reactStrictMode: false,
//   experimental: {
//     esmExternals: false,
//     jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
//   },
//   webpack: config => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
//     }

//     return config
//   }
// }

// const path = require('path');
//
// module.exports = {
//   env: {
//     NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
//     NEXT_PUBLIC_TINYMCE_API_KEY: process.env.NEXT_PUBLIC_TINYMCE_API_KEY,
//     NEXT_PUBLIC_COMPANY_DB: process.env.NEXT_PUBLIC_COMPANY_DB,
//     NEXT_PUBLIC_COMPANY_PASSWORD: process.env.NEXT_PUBLIC_COMPANY_PASSWORD,
//     NEXT_PUBLIC_COMPANY_USERNAME: process.env.NEXT_PUBLIC_COMPANY_USERNAME,
//     NEXT_PUBLIC_LOGIN_URL: process.env.NEXT_PUBLIC_LOGIN_URL,
//     NEXT_PUBLIC_SAP_ODBC_CONNECTION_STRING: process.env.NEXT_PUBLIC_SAP_ODBC_CONNECTION_STRING,
//   },
//   trailingSlash: true,
//   reactStrictMode: false,
//   experimental: {
//     esmExternals: false,
//     jsconfigPaths: true, // enables it for both jsconfig.json and tsconfig.json
//   },
//   webpack: config => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision'),
//     };
//
//     // ❌ fs module ko remove kar raha hai taake Next.js ka build fail na ho
//     config.resolve.fallback = {
//       ...config.resolve.fallback,
//       fs: false,
//     };
//
//     return config;
//   },
// };
