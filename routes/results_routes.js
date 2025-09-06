import express from "express";
import Result from "../models/Result.js";
import Test from "../models/test_model.js";

const router = express.Router();

// ✅ Get all tests (just test titles & descriptions)
router.get("/tests", async (req, res) => {
  try {
    const tests = await Test.find().select("title description totalMarks");
    res.json({ success: true, tests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching tests" });
  }
});

// ✅ Get all student submissions for one test
router.get("/tests/:id", async (req, res) => {
  try {
    const results = await Result.find({ test: req.params.id })
      .populate("test", "title description totalMarks") // only populate test, not student
      .sort({ createdAt: -1 });
      console.log(results)

    // Format data (no need to populate student since you store name/email already)
    const formattedResults = results.map(r => ({
      _id: r._id,
      studentName: r.studentName,
      studentEmail: r.studentEmail,
      score: r.score,
      percentage: r.percentage,
      submittedAt: r.submittedAt,
    }));

    res.json({ success: true, results: formattedResults });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching submissions" });
  }
});

export default router;
