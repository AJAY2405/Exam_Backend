// import express from "express";
// import { createTest, getAllTests, getTestsByTeacher, getTestSubmissions } from "../controllers/test_controller.js";

// const router = express.Router();

// router.post("/", createTest);
// router.get("/", getAllTests);
// router.get("/teacher/:teacherId", getTestsByTeacher); // GET /api/v1/tests/teacher/:teacherId
// router.get("/:id/submissions", getTestSubmissions);

// export default router;









import express from "express";
import {
  createTest,
  getAllTests,
  getTestsByTeacher,
  getTestSubmissions,
} from "../controllers/test_controller.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// POST with optional pdf + images
router.post("/", upload, createTest);

router.get("/", getAllTests);
router.get("/teacher/:teacherId", getTestsByTeacher);
router.get("/:id/submissions", getTestSubmissions);

export default router;
