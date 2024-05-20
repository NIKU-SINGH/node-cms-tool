import { Sequelize } from "sequelize";
import logger from "../utils/logger.js";

const sequelize = new Sequelize(
  "postgres",
  "postgres", // "username",
  "password", // "password",
  {
    host: "db",
    dialect: "postgres",
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connection to Database has been established successfully.");
    return sequelize;
  } catch (error) {
    logger.info(`Unable to connect to the database: ${error}`);
  }
};

export { sequelize, connectToDatabase };
