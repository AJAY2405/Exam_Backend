import Notice from "../models/Notice.js";

export const createNotice = async (req, res) => {
  try {
    const notice = await Notice.create({
      title: req.body.title,
      message: req.body.message,
      createdBy: req.user ? req.user._id : null, // avoid crash
    });
    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ error: "Failed to create notice" });
  }
};

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notices" });
  }
};
