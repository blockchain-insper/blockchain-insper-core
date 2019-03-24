export default {
    type: "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "5432", 10),
    username: process.env.DATABASE_USER || "aronakamoto",
    password: process.env.DATABASE_PASSWORD || "3412",
    database: "bisdk",
    logging: ["error"],
  
    // TODO: Enable migrations before production
    synchronize: true,
  
    // IMPORTANT: Path should be relative to root
    entities: ["./api/models/**/*.ts"],
    cli: {
      // IMPORTANT: Path should be relative to root
      entitiesDir: "./api/models"}
  };
  