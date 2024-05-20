import express from "express";
import {
  createTable,
  getTableDetails,
  getAllTables,
  deleteTable,
} from "../controllers/table.js";

const router = express.Router();

// API Check
router.use("/healthcheck", (req, res) => {
    res.send(`APIs are running smoothly`);
  });
router.post("/create", createTable);
router.get("/getAll", getAllTables);
router.get("/:name", getTableDetails);
// router.put('/:id', updateEntity);
router.delete("/:name", deleteTable);

export default router;
