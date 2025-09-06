import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [
    {
      question: String,
      options: { A: String, B: String, C: String, D: String },
      correctAnswer: String,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Test", testSchema);
