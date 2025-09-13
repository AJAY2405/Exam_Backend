// import Class from '../models/Class.js';
// import Student from '../models/Student.js';

// // Add student to class
// export const addStudent = async (req, res) => {
//     try {
//         const { classId } = req.params;
//         const { name, rollno, mobile, fatherName } = req.body;

//         const student = new Student({ name, rollno, mobile, fatherName });
//         await student.save();

//         const cls = await Class.findById(classId);
//         if (!cls) {
//             return res.status(404).json({ error: "Class not found" });
//         }

//         cls.students.push(student._id);
//         await cls.save();

//         res.status(201).json(student);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// // Remove student from class
// export const removeStudent = async (req, res) => {
//     try {
//         const { classId, studentId } = req.params;

//         await Class.findByIdAndUpdate(classId, {
//             $pull: { students: studentId }
//         });

//         await Student.findByIdAndDelete(studentId);

//         res.json({ message: 'Student removed' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Get students in class
// export const getStudents = async (req, res) => {
//     try {
//         const { classId } = req.params;
//         const cls = await Class.findById(classId).populate('students');
//         if (!cls) {
//             return res.status(404).json({ error: "Class not found" });
//         }
//         res.json(cls.students);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };






import Class from '../models/Class.js';
import Student from '../models/Student.js';

// Add student to class
export const addStudent = async (req, res) => {
    try {
        const { classId } = req.params;
        const { name, rollno, mobile, fatherName, aadharNo, dob } = req.body;

        const student = new Student({ 
            name, 
            rollno, 
            mobile, 
            fatherName, 
            aadharNo, 
            dob 
        });
        await student.save();

        const cls = await Class.findById(classId);
        if (!cls) {
            return res.status(404).json({ error: "Class not found" });
        }

        cls.students.push(student._id);
        await cls.save();

        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Remove student from class
export const removeStudent = async (req, res) => {
    try {
        const { classId, studentId } = req.params;

        await Class.findByIdAndUpdate(classId, {
            $pull: { students: studentId }
        });

        await Student.findByIdAndDelete(studentId);

        res.json({ message: 'Student removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get students in class
export const getStudents = async (req, res) => {
    try {
        const { classId } = req.params;
        const cls = await Class.findById(classId).populate('students');
        if (!cls) {
            return res.status(404).json({ error: "Class not found" });
        }
        res.json(cls.students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
