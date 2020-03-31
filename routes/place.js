import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("gell all places");
});

export default router;
