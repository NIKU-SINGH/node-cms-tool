import express from "express";
import cors from "cors";
// import logger from "./utils/logger";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = Number(process.env.PORT) || 8080;
const APPID = process.env.APPID || 1111;
const HOST = "0.0.0.0";

app.listen(PORT, () => {
    // logger.info(`Server listening at ${HOST}:${PORT} and saying hello from ${APPID}`);
    console.log(`Server listening at ${HOST}:${PORT} and saying hello from ${APPID}`);
  });

  