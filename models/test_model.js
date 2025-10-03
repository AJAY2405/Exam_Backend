// import mongoose from "mongoose";

// const testSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   questions: [
//     {
//       question: String,
//       options: { A: String, B: String, C: String, D: String },
//       correctAnswer: String,
//     },
//   ],
// }, { timestamps: true });

// export default mongoose.model("Test", testSchema);












import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },

    questions: [
      {
        question: String,
        options: {
          A: String,
          B: String,
          C: String,
          D: String,
        },
        correctAnswer: String,
        image: {
          type: String,   // Cloudinary URL
          default: null,  // ⬅️ optional
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Test", testSchema);
