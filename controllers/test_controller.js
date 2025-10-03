// import Result from "../models/Result.js";
// import Test from "../models/test_model.js";

// // Create test
// export const createTest = async (req, res) => {
//   try {
//     const test = new Test(req.body);
//     await test.save();
//     res.status(201).json({ message: "Test created successfully", test });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all tests
// export const getAllTests = async (req, res) => {
//   try {
//     const tests = await Test.find();
//     res.json(tests);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };




// // GET /api/v1/tests/teacher/:teacherId


// export const getTestsByTeacher = async (req, res) => {
//   try {
//     const { teacherId } = req.params;
//     // console.log("Backend Teacher ID:", teacherId); // 👈 add this

//     const tests = await Test.find({ teacher: teacherId });
//     // console.log("Backend Found Tests:", tests); // 👈 add this

//     res.json({ tests });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// export const getTestSubmissions = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const submissions = await Result.find({ test: id });

//     res.status(200).json({ submissions });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };






















import Test from "../models/test_model.js";
import Result from "../models/Result.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// Create test with optional question images
export const createTest = async (req, res) => {
  try {
    let { title, description, teacher, questions } = req.body;

    // parse JSON string if frontend sends it as form-data
    if (typeof questions === "string") {
      questions = JSON.parse(questions);
    }

    // handle question images (optional)
    if (req.files && req.files["images"]) {
      const uploadedImages = await Promise.all(
        req.files["images"].map(async (file) => {
          const fileUri = getDataUri(file);
          const upload = await cloudinary.uploader.upload(fileUri.content, {
            folder: "tests/questions",
          });
          return upload.secure_url;
        })
      );

      // attach uploaded image URLs to corresponding questions
      questions = questions.map((q, index) => ({
        ...q,
        image: uploadedImages[index] || null,
      }));
    }

    const test = new Test({
      title,
      description,
      teacher,
      questions,
    });

    await test.save();
    res.status(201).json({ message: "Test created successfully", test });
  } catch (error) {
    console.error(error);
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

// Get tests by teacher
export const getTestsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const tests = await Test.find({ teacher: teacherId });
    res.json({ tests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get test submissions
export const getTestSubmissions = async (req, res) => {
  try {
    const { id } = req.params;
    const submissions = await Result.find({ test: id });
    res.status(200).json({ submissions });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
