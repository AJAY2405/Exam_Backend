// routes/testRoutes.js
import express from "express";
import { getTestSubmissions } from "../controllers/test_controller.js";

const router = express.Router();

router.get("/:id/submissions", getTestSubmissions);

export default router;
