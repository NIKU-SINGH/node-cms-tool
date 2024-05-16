import express from "express";
import cors from "cors";
import logger from "./utils/logger.js";
import dotenv from 'dotenv';
import {connectToDatabase} from "./connectors/db.js";

// Routes
import entityRoute from "./routes/entity.js";
import entryRoute from "./routes/entry.js";
import userRoute from "./routes/users.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// dotenv.config({path: path.join(__dirname, '..', '.env')});
const PORT = Number(process.env.PORT) || 8080;
const APPID = process.env.APPID || 1111;
const HOST = "0.0.0.0";

// Connectiong to Database
connectToDatabase();

app.use("/api/v1/entity", entityRoute);
app.use("/api/v1/entry", entryRoute);
app.use("/api/v1/users",userRoute);


app.listen(PORT, () => {
    logger.info(`Server listening at ${HOST}:${PORT} and saying hello from ${APPID}`);
    // console.log(`Server listening at ${HOST}:${PORT} and saying hello from ${APPID}`);
  });

  