import Result from "../models/Result.js";
import Test from "../models/test_model.js";

// Create test
export const createTest = async (req, res) => {
  try {
    const test = new Test(req.body);
    await test.save();
    res.status(201).json({ message: "Test created successfully", test });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tests
export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// GET /api/v1/tests/teacher/:teacherId


export const getTestsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    // console.log("Backend Teacher ID:", teacherId); // 👈 add this

    const tests = await Test.find({ teacher: teacherId });
    // console.log("Backend Found Tests:", tests); // 👈 add this

    res.json({ tests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getTestSubmissions = async (req, res) => {
  try {
    const { id } = req.params;

    const submissions = await Result.find({ test: id });

    res.status(200).json({ submissions });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

