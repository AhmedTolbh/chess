const express = require('express');
const router = express.Router();
const { scheduleClass, getClasses, markAttendance, getPayroll, getStats, getUsers, getCourses, getGroups, createGroup, updateGroup, addStudentToGroup, removeStudentFromGroup } = require('../controllers/classController');

router.post('/schedule', scheduleClass);
router.get('/', getClasses);
router.post('/attendance', markAttendance);
router.get('/payroll', getPayroll);
router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/courses', getCourses);

// Group management routes
router.get('/groups', getGroups);
router.post('/groups', createGroup);
router.put('/groups/:id', updateGroup);
router.post('/groups/:groupId/students', addStudentToGroup);
router.delete('/groups/:groupId/students/:studentId', removeStudentFromGroup);

module.exports = router;
