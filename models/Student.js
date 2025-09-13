// import mongoose from 'mongoose';

// const studentSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     rollno: { type: String, required: true },
//     mobile: { type: String },
//     fatherName: { type: String }
// });

// const Student = mongoose.model('Student', studentSchema);

// export default Student;





import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollno: { type: String, required: true },
    mobile: { type: String },
    fatherName: { type: String },
    aadharNo: { type: String, required: true, unique: true }, // Unique Aadhar number
    dob: { type: Date, required: true } // Date of birth
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
