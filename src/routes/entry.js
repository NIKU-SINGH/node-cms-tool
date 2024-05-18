import express from "express";
import {
    addEntryToTable,
    getAllEntries,
    // removeEntry,
  } from "../controllers/entry.js";

const router = express.Router();

// API Check
router.use("/healthcheck", (req, res) => {
  res.send(`APIs are running smoothly`);
});

router.post("/:tableName", addEntryToTable);
router.get("/getAll", getAllEntries);
// router.delete("/remove:id",removeEntry)


export default router;
