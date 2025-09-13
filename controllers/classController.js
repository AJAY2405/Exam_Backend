import Class from '../models/Class.js';

export const createClass = async (req, res) => {
    try {
        const newClass = new Class({ name: req.body.name });
        await newClass.save();
        res.status(201).json(newClass);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('students');
        res.json(classes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
