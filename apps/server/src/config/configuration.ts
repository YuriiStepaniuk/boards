const configuration = () => ({
  env: process.env.NODE_ENV,

  port: parseInt(process.env.PORT ?? '3001'),
  clientPort: parseInt(process.env.CLIENT_PORT ?? '3000'),

  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
});

export default configuration;
export type ConfigType = ReturnType<typeof configuration>;
