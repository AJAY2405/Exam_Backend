// routes/studentTestRoutes.js
import express from "express";
import Test from "../models/test_model.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import Result from "../models/Result.js";
const router = express.Router();

// studentTestRoutes.js
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const tests = await Test.find().select("title description createdAt");
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific test by ID (with questions)
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).lean();
    if (!test) return res.status(404).json({ message: "Test not found" });

    res.json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit test

// router.post("/:id/submit", isAuthenticated, async (req, res) => {
//   try {
//     const { answers } = req.body; // e.g. ["A", "C", "B"]
//     const test = await Test.findById(req.params.id).lean();

//     if (!test) return res.status(404).json({ message: "Test not found" });

//     let score = 0;
//     const correctAnswers = [];

//     test.questions.forEach((q, i) => {
//       correctAnswers.push(q.correctAnswer); // push "A" / "B" / "C" / "D"
//       if (answers[i] === q.correctAnswer) score++;
//     });

//     res.json({
//       totalQuestions: test.questions.length,
//       score,
//       percentage: (score / test.questions.length) * 100,
//       correctAnswers, // 👈 ["B", "D", "A", ...]
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });




// Submit test
router.post("/:id/submit", isAuthenticated, async (req, res) => {
  try {
    const { answers, studentName, studentEmail } = req.body;
    const test = await Test.findById(req.params.id);

    if (!test) return res.status(404).json({ message: "Test not found" });

    let score = 0;
    const correctAnswers = [];

    test.questions.forEach((q, i) => {
      correctAnswers.push(q.correctAnswer);
      if (answers[i] === q.correctAnswer) score++;
    });

    const percentage = (score / test.questions.length) * 100;

    // ✅ Save in Results collection instead of Test
    const result = new Result({
      test: test._id,
      studentName,
      studentEmail,
      score,
      percentage,
    });

    await result.save();

    res.json({
      totalQuestions: test.questions.length,
      score,
      percentage,
      correctAnswers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get all submissions for a test
// router.get("/:id/submissions", isAuthenticated, async (req, res) => {
//   try {
//     const submissions = await Result.find({ test: req.params.id }).sort({ submittedAt: -1 });
//     console.log(submissions)
// if (submissions.length === 0) {
//   return res.status(404).json({ message: "No submissions found" });
// }

//     res.json({ submissions });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });



// ✅ Get all submissions for a specific test





export default router;
