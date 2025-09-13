import express from "express";
import { createNotice, getNotices } from "../controllers/noticeController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/create", isAuthenticated,createNotice);
router.get("/all", isAuthenticated, getNotices);

export default router;  // ✅ instead of module.exports
