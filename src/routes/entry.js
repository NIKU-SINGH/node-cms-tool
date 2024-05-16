import express from "express";

const router = express.Router();

// API Check
router.use("/healthcheck", (req, res) => {
  res.send(`APIs are running smoothly`);
});



export default router;
