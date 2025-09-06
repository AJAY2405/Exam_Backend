import express from "express";
import { createTest, getAllTests, getTestsByTeacher, getTestSubmissions } from "../controllers/test_controller.js";

const router = express.Router();

router.post("/", createTest);
router.get("/", getAllTests);
router.get("/teacher/:teacherId", getTestsByTeacher); // GET /api/v1/tests/teacher/:teacherId
router.get("/:id/submissions", getTestSubmissions);

export default router;
