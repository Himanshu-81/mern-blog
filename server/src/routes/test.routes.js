import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("hello this is only the first test route");
});

export default router;
