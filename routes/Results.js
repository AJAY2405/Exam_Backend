// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import express from "express";
// import Result from "../models/Result.js";
// import Test from "../models/test_model.js";

// const router = express.Router();

// router.get("/teacher/results", isAuthenticated, async (req, res) => {
//   try {
//     const results = await Result.find()
//       .populate("test", "title description")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, results });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Error fetching teacher results" });
//   }
// });

// export default router;




