const configuration = () => ({
  env: process.env.NODE_ENV,

  port: Number(process.env.PORT),
  clientPort: Number(process.env.CLIENT_PORT),

  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
});

export default configuration;
export type ConfigType = ReturnType<typeof configuration>;
