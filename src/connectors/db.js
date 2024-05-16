// import pg from 'pg'
// const { Pool, Client } = pg

// const pool = new Pool({
// 	// user: process.env.DB_USER,
// 	// password: process.env.DB_PASSWORD,
// 	// host: process.env.DB_HOST,
// 	// port: process.env.DB_PORT,
// 	// database: process.env.DB_NAME,
// 	user: "username",
// 	password: "password",
// 	host: "0.0.0.0",
// 	port: 5432,
// 	database: "vahanDB",
// });

// export default pool

import { Sequelize } from "sequelize";
import logger from "../utils/logger.js";

const sequelize = new Sequelize(
  "vahanDB",
  "postgres", // "username",
  "password", // "password",
  {   
    host : "0.0.0.0",
    dialect : "postgres",
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");
    return sequelize;
  } catch (error) {
    logger.info("Unable to connect to the database:", error);
  }
};

export  {sequelize, connectToDatabase};
