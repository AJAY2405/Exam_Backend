import express from 'express';
import { addStudent, removeStudent, getStudents } from '../controllers/studentController.js';

const router = express.Router();

router.post('/:classId/add', addStudent);
router.delete('/:classId/remove/:studentId', removeStudent);
router.get('/:classId', getStudents);

export default router;
