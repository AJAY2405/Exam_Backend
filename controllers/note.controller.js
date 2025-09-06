import { Note } from "../models/note.model.js";
import cloudinary from "../utils/cloudinary.js";

// Upload Note (PDF)
export const uploadNote = async (req, res) => {
  try {
    const file = req.file;
    console.log(file);

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // ✅ Only allow PDFs
    if (file.mimetype !== "application/pdf") {
      return res
        .status(400)
        .json({ success: false, message: "Only PDF files are allowed" });
    }

    // Helper function to upload Buffer to Cloudinary
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "notes",
            use_filename: true,
            unique_filename: false,
            format: "pdf", // ensures file has .pdf
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });
    };

    const result = await uploadToCloudinary();

    const note = await Note.create({
      title: req.body.title,
      pdfUrl: result.secure_url,
      uploadedBy: req.id, // taken from auth middleware
    });

    res.status(201).json({ success: true, note });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("uploadedBy", "name email");
    res.json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
