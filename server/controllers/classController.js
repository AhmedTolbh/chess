const { createClient } = require('@supabase/supabase-js');
const { createMeeting } = require('../services/meetService');

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;
let isSupabaseConfigured = false;

if (supabaseUrl && supabaseKey && supabaseUrl.startsWith('http')) {
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
        isSupabaseConfigured = true;
    } catch (e) {
        console.warn('⚠️  Supabase client init failed in controller:', e.message);
    }
}

if (!isSupabaseConfigured) {
    console.log('⚠️  Supabase not configured. Using In-Memory Fallback mode.');
}

// In-Memory Fallback Store with REALISTIC demo data
const NOW = Date.now();
const HOUR = 3600000;
const DAY = 86400000;

const localClasses = [
    // Class happening RIGHT NOW (so Join button works!)
    {
        id: 'demo-live',
        title: 'Live: Opening Strategies',
        courseName: 'Opening Mastery',
        startTime: new Date(NOW - 10 * 60000).toISOString(), // Started 10 mins ago
        endTime: new Date(NOW + 50 * 60000).toISOString(),   // Ends in 50 mins
        meetLink: 'https://meet.google.com/abc-defg-hij',
        status: 'scheduled',
        instructor_id: 'u1',
        student_id: 'u2',
        attendance: null
    },
    // Class starting in 1 hour
    {
        id: 'demo-soon',
        title: 'Tactical Patterns Workshop',
        courseName: 'Intermediate Tactics',
        startTime: new Date(NOW + HOUR).toISOString(),
        endTime: new Date(NOW + 2 * HOUR).toISOString(),
        meetLink: 'https://meet.google.com/xyz-uvwx-yz',
        status: 'scheduled',
        instructor_id: 'u1',
        student_id: 'u3',
        attendance: null
    },
    // Tomorrow class
    {
        id: 'demo-tomorrow',
        title: 'Endgame Fundamentals',
        courseName: 'Endgame Mastery',
        startTime: new Date(NOW + DAY).toISOString(),
        endTime: new Date(NOW + DAY + HOUR).toISOString(),
        meetLink: 'https://meet.google.com/end-game-01',
        status: 'scheduled',
        instructor_id: 'u1',
        student_id: 'u2',
        attendance: null
    },
    // Day after tomorrow
    {
        id: 'demo-upcoming',
        title: 'Pawn Structure Analysis',
        courseName: 'Advanced Strategy',
        startTime: new Date(NOW + 2 * DAY).toISOString(),
        endTime: new Date(NOW + 2 * DAY + HOUR).toISOString(),
        meetLink: 'https://meet.google.com/pawn-str-01',
        status: 'scheduled',
        instructor_id: 'u1',
        student_id: 'u4',
        attendance: null
    },
    // Next week
    {
        id: 'demo-nextweek',
        title: 'Rook Endgames Deep Dive',
        courseName: 'Endgame Mastery',
        startTime: new Date(NOW + 5 * DAY).toISOString(),
        endTime: new Date(NOW + 5 * DAY + HOUR).toISOString(),
        meetLink: 'https://meet.google.com/rook-end-01',
        status: 'scheduled',
        instructor_id: 'u1',
        student_id: 'u2',
        attendance: null
    },
    // Completed classes (yesterday, 2 days ago, etc.)
    {
        id: 'demo-past-1',
        title: 'Knight Forks & Pins',
        courseName: 'Beginner Tactics',
        startTime: new Date(NOW - DAY).toISOString(),
        endTime: new Date(NOW - DAY + HOUR).toISOString(),
        meetLink: 'https://meet.google.com/past-01',
        status: 'completed',
        instructor_id: 'u1',
        student_id: 'u2',
        attendance: 'present'
    },
    {
        id: 'demo-past-2',
        title: 'Sicilian Defense Basics',
        courseName: 'Opening Mastery',
        startTime: new Date(NOW - 2 * DAY).toISOString(),
        endTime: new Date(NOW - 2 * DAY + HOUR).toISOString(),
        meetLink: 'https://meet.google.com/past-02',
        status: 'completed',
        instructor_id: 'u1',
        student_id: 'u3',
        attendance: 'present'
    },
    {
        id: 'demo-past-3',
        title: 'Queen\'s Gambit Theory',
        courseName: 'Opening Mastery',
        startTime: new Date(NOW - 3 * DAY).toISOString(),
        endTime: new Date(NOW - 3 * DAY + HOUR).toISOString(),
        meetLink: 'https://meet.google.com/past-03',
        status: 'completed',
        instructor_id: 'u1',
        student_id: 'u2',
        attendance: 'absent'
    },
    {
        id: 'demo-past-4',
        title: 'Checkmate Patterns',
        courseName: 'Beginner Tactics',
        startTime: new Date(NOW - 5 * DAY).toISOString(),
        endTime: new Date(NOW - 5 * DAY + HOUR).toISOString(),
        meetLink: 'https://meet.google.com/past-04',
        status: 'completed',
        instructor_id: 'u1',
        student_id: 'u4',
        attendance: 'present'
    }
];

// In-Memory Users (with subscription/group info for students)
const localUsers = [
    { id: 'u1', name: 'Ahmed Al-Masri', role: 'instructor', email: 'ahmed@pioneers.com', avatar: 'https://i.pravatar.cc/150?u=ahmed', phone: '+966501234567', joinDate: '2025-09-01', specialization: 'Openings & Middlegame' },
    { id: 'u8', name: 'Youssef Khalil', role: 'instructor', email: 'youssef@pioneers.com', avatar: 'https://i.pravatar.cc/150?u=youssef', phone: '+966503456789', joinDate: '2025-09-15', specialization: 'Endgames & Strategy' },
    { id: 'u2', name: 'Sara Al-Rashid', role: 'student', email: 'sara@gmail.com', avatar: 'https://i.pravatar.cc/150?u=sara', phone: '+966509876543', joinDate: '2025-10-15', rating: 1250, parentId: 'u5', groupId: 'grp-1', subscriptionType: 'group', subscriptionStatus: 'active', enrollmentDate: '2025-10-15' },
    { id: 'u3', name: 'Omar Hassan', role: 'student', email: 'omar@gmail.com', avatar: 'https://i.pravatar.cc/150?u=omar', phone: '+966507654321', joinDate: '2025-11-01', rating: 980, parentId: 'u6', groupId: 'grp-1', subscriptionType: 'group', subscriptionStatus: 'active', enrollmentDate: '2025-11-01' },
    { id: 'u4', name: 'Layla Mahmoud', role: 'student', email: 'layla@gmail.com', avatar: 'https://i.pravatar.cc/150?u=layla', phone: '+966502345678', joinDate: '2026-01-05', rating: 1100, parentId: 'u5', groupId: 'grp-3', subscriptionType: 'individual', subscriptionStatus: 'active', enrollmentDate: '2026-01-05' },
    { id: 'u9', name: 'Ali Nasser', role: 'student', email: 'ali@gmail.com', avatar: 'https://i.pravatar.cc/150?u=ali', phone: '+966504567890', joinDate: '2025-12-01', rating: 1050, parentId: 'u6', groupId: 'grp-2', subscriptionType: 'group', subscriptionStatus: 'active', enrollmentDate: '2025-12-01' },
    { id: 'u10', name: 'Noor Ahmed', role: 'student', email: 'noor@gmail.com', avatar: 'https://i.pravatar.cc/150?u=noor', phone: '+966505678901', joinDate: '2026-01-20', rating: 850, groupId: 'grp-2', subscriptionType: 'group', subscriptionStatus: 'trial', enrollmentDate: '2026-01-20' },
    { id: 'u11', name: 'Rami Suleiman', role: 'student', email: 'rami@gmail.com', avatar: 'https://i.pravatar.cc/150?u=rami', phone: '+966506789012', joinDate: '2026-02-01', rating: 920, groupId: 'grp-4', subscriptionType: 'individual', subscriptionStatus: 'active', enrollmentDate: '2026-02-01' },
    { id: 'u5', name: 'Khalid Al-Rashid', role: 'parent', email: 'khalid@gmail.com', avatar: 'https://i.pravatar.cc/150?u=khalid', phone: '+966508888888', joinDate: '2025-10-15', children: ['u2', 'u4'] },
    { id: 'u6', name: 'Fatima Hassan', role: 'parent', email: 'fatima@gmail.com', avatar: 'https://i.pravatar.cc/150?u=fatima', phone: '+966507777777', joinDate: '2025-11-01', children: ['u3', 'u9'] },
    { id: 'u7', name: 'Admin User', role: 'admin', email: 'admin@pioneers.com', avatar: 'https://i.pravatar.cc/150?u=admin', phone: '+966500000000', joinDate: '2025-01-01' },
];

// In-Memory Groups
const localGroups = [
    {
        id: 'grp-1', code: 'GRP-OPN-01', name: 'Opening Mastery - Group A',
        type: 'group', instructor_id: 'u1', course_id: 'course-1',
        maxStudents: 4, students: ['u2', 'u3'],
        schedule: 'Sun, Tue, Thu — 4:00 PM', monthlyFee: 450,
        status: 'active', createdAt: '2025-10-01'
    },
    {
        id: 'grp-2', code: 'GRP-TAC-01', name: 'Beginner Tactics - Group B',
        type: 'group', instructor_id: 'u1', course_id: 'course-3',
        maxStudents: 6, students: ['u9', 'u10'],
        schedule: 'Mon, Wed — 5:00 PM', monthlyFee: 350,
        status: 'active', createdAt: '2025-12-01'
    },
    {
        id: 'grp-3', code: 'IND-END-01', name: 'Endgame Mastery - Layla (1:1)',
        type: 'individual', instructor_id: 'u8', course_id: 'course-2',
        maxStudents: 1, students: ['u4'],
        schedule: 'Sat — 3:00 PM', monthlyFee: 600,
        status: 'active', createdAt: '2026-01-05'
    },
    {
        id: 'grp-4', code: 'IND-STR-01', name: 'Advanced Strategy - Rami (1:1)',
        type: 'individual', instructor_id: 'u8', course_id: 'course-5',
        maxStudents: 1, students: ['u11'],
        schedule: 'Tue, Thu — 6:00 PM', monthlyFee: 750,
        status: 'active', createdAt: '2026-02-01'
    },
    {
        id: 'grp-5', code: 'GRP-INT-01', name: 'Intermediate Tactics - Group C',
        type: 'group', instructor_id: 'u8', course_id: 'course-4',
        maxStudents: 5, students: [],
        schedule: 'Sun, Wed — 6:00 PM', monthlyFee: 400,
        status: 'pending', createdAt: '2026-02-10'
    }
];

// In-Memory Courses
const localCourses = [
    { id: 'course-1', name: 'Opening Mastery', description: 'Master all major chess openings', level: 'Intermediate', instructor_id: 'u1', students: ['u2', 'u3'], totalClasses: 12, completedClasses: 3, price: 150 },
    { id: 'course-2', name: 'Endgame Mastery', description: 'Deep dive into endgame techniques', level: 'Advanced', instructor_id: 'u8', students: ['u4'], totalClasses: 8, completedClasses: 1, price: 200 },
    { id: 'course-3', name: 'Beginner Tactics', description: 'Learn forks, pins, skewers and more', level: 'Beginner', instructor_id: 'u1', students: ['u9', 'u10'], totalClasses: 10, completedClasses: 2, price: 100 },
    { id: 'course-4', name: 'Intermediate Tactics', description: 'Advanced tactical patterns and combinations', level: 'Intermediate', instructor_id: 'u8', students: [], totalClasses: 10, completedClasses: 0, price: 175 },
    { id: 'course-5', name: 'Advanced Strategy', description: 'Positional play and strategic thinking', level: 'Advanced', instructor_id: 'u8', students: ['u11'], totalClasses: 6, completedClasses: 0, price: 250 },
];

// =================== ENDPOINTS ===================

const scheduleClass = async (req, res) => {
    const { title, courseId, instructorId, studentId, startTime, endTime } = req.body;

    try {
        const meetLink = await createMeeting(title, startTime, endTime);

        if (isSupabaseConfigured) {
            const { data, error } = await supabase
                .from('classes')
                .insert([{
                    title,
                    course_id: courseId || null,
                    instructor_id: instructorId,
                    start_time: startTime,
                    end_time: endTime,
                    google_meet_link: meetLink,
                    status: 'scheduled'
                }])
                .select();
            if (error) throw error;
            return res.status(201).json({ message: 'Class scheduled (DB)', class: data[0] });
        }

        // Fallback
        const newClass = {
            id: 'local-' + Date.now(),
            title,
            courseName: 'Custom Course',
            instructor_id: instructorId,
            student_id: studentId || null,
            startTime,
            endTime,
            meetLink,
            status: 'scheduled',
            attendance: null
        };
        localClasses.push(newClass);
        res.status(201).json({ message: 'Class scheduled (Local)', class: newClass });

    } catch (error) {
        console.error('Schedule Error:', error);
        res.status(500).json({ error: error.message });
    }
};

const getClasses = async (req, res) => {
    const { role, userId } = req.query;

    try {
        if (isSupabaseConfigured) {
            let query = supabase.from('classes').select('*');
            if (role === 'instructor') query = query.eq('instructor_id', userId);
            const { data, error } = await query.order('start_time', { ascending: true });
            if (error) throw error;
            return res.json({ message: 'Returning classes (DB)', classes: data });
        }

        // Fallback - filter by role
        let filtered = localClasses;
        if (role === 'instructor' && userId) {
            filtered = localClasses.filter(c => c.instructor_id === userId);
        } else if (role === 'student' && userId) {
            filtered = localClasses.filter(c => c.student_id === userId || !c.student_id);
        } else if (role === 'parent' && userId) {
            const parent = localUsers.find(u => u.id === userId);
            if (parent && parent.children) {
                filtered = localClasses.filter(c => parent.children.includes(c.student_id));
            }
        }
        res.json({ message: 'Returning classes (Local)', classes: filtered });

    } catch (error) {
        console.error('Get Classes Error:', error);
        res.status(500).json({ error: error.message });
    }
};

const markAttendance = async (req, res) => {
    const { classId, status } = req.body;

    try {
        if (isSupabaseConfigured) {
            const { data, error } = await supabase
                .from('classes')
                .update({ status: 'completed' })
                .eq('id', classId)
                .select();
            if (error) throw error;
            return res.json({ message: 'Attendance marked (DB)', class: data[0] });
        }

        // Fallback
        const classIndex = localClasses.findIndex(c => c.id === classId);
        if (classIndex !== -1) {
            localClasses[classIndex].attendance = status;
            localClasses[classIndex].status = 'completed';
            res.json({ message: 'Attendance marked (Local)', class: localClasses[classIndex] });
        } else {
            res.status(404).json({ error: 'Class not found' });
        }

    } catch (error) {
        console.error('Attendance Error:', error);
        res.status(500).json({ error: error.message });
    }
};

const getPayroll = async (req, res) => {
    const { instructorId } = req.query;
    const hourlyRate = 25;

    try {
        let completedClasses = [];

        if (isSupabaseConfigured) {
            const { data, error } = await supabase
                .from('classes')
                .select('*')
                .eq('instructor_id', instructorId)
                .eq('status', 'completed');
            if (error) throw error;
            completedClasses = data;
        } else {
            completedClasses = localClasses.filter(c =>
                c.instructor_id === instructorId && c.status === 'completed'
            );
        }

        const totalHours = completedClasses.length;
        const totalAmount = totalHours * hourlyRate;

        res.json({
            instructorId,
            totalHours,
            hourlyRate,
            totalAmount,
            history: completedClasses
        });

    } catch (error) {
        console.error('Payroll Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// New Endpoints
const getStats = async (req, res) => {
    const totalUsers = localUsers.length;
    const students = localUsers.filter(u => u.role === 'student');
    const instructors = localUsers.filter(u => u.role === 'instructor');
    const parents = localUsers.filter(u => u.role === 'parent');
    const totalClasses = localClasses.length;
    const completedClasses = localClasses.filter(c => c.status === 'completed').length;
    const scheduledClasses = localClasses.filter(c => c.status === 'scheduled').length;
    const totalCourses = localCourses.length;
    const revenue = localCourses.reduce((acc, c) => acc + (c.price * c.students.length), 0);

    res.json({
        totalUsers,
        totalStudents: students.length,
        totalInstructors: instructors.length,
        totalParents: parents.length,
        totalClasses,
        completedClasses,
        scheduledClasses,
        totalCourses,
        revenue,
        attendanceRate: 75 // percentage
    });
};

const getUsers = async (req, res) => {
    const { role } = req.query;
    let filtered = localUsers;
    if (role) {
        filtered = localUsers.filter(u => u.role === role);
    }
    res.json({ users: filtered });
};

const getCourses = async (req, res) => {
    const { instructorId, studentId } = req.query;
    let filtered = localCourses;
    if (instructorId) {
        filtered = localCourses.filter(c => c.instructor_id === instructorId);
    }
    if (studentId) {
        filtered = localCourses.filter(c => c.students.includes(studentId));
    }
    res.json({ courses: filtered });
};

// ============ GROUP ENDPOINTS ============

const getGroups = async (req, res) => {
    const { instructorId, type, status } = req.query;
    let filtered = localGroups;
    if (instructorId) filtered = filtered.filter(g => g.instructor_id === instructorId);
    if (type) filtered = filtered.filter(g => g.type === type);
    if (status) filtered = filtered.filter(g => g.status === status);

    // Enrich with instructor name and student details
    const enriched = filtered.map(g => {
        const instructor = localUsers.find(u => u.id === g.instructor_id);
        const course = localCourses.find(c => c.id === g.course_id);
        const studentDetails = g.students.map(sid => {
            const s = localUsers.find(u => u.id === sid);
            return s ? { id: s.id, name: s.name, avatar: s.avatar, rating: s.rating, subscriptionStatus: s.subscriptionStatus } : null;
        }).filter(Boolean);

        return {
            ...g,
            instructorName: instructor ? instructor.name : 'Unassigned',
            instructorAvatar: instructor ? instructor.avatar : null,
            instructorSpecialization: instructor ? instructor.specialization : null,
            courseName: course ? course.name : 'No Course',
            courseLevel: course ? course.level : null,
            studentDetails,
            occupancy: `${g.students.length}/${g.maxStudents}`
        };
    });

    res.json({ groups: enriched });
};

const createGroup = async (req, res) => {
    const { name, type, instructor_id, course_id, maxStudents, schedule, monthlyFee } = req.body;
    const prefix = type === 'individual' ? 'IND' : 'GRP';
    const count = localGroups.filter(g => g.type === type).length + 1;
    const code = `${prefix}-${String(count).padStart(3, '0')}`;
    const newGroup = {
        id: 'grp-' + Date.now(),
        code,
        name,
        type,
        instructor_id,
        course_id,
        maxStudents: type === 'individual' ? 1 : (maxStudents || 4),
        students: [],
        schedule: schedule || 'TBD',
        monthlyFee: monthlyFee || 0,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0]
    };
    localGroups.push(newGroup);
    res.status(201).json({ message: 'Group created', group: newGroup });
};

const updateGroup = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const idx = localGroups.findIndex(g => g.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Group not found' });
    localGroups[idx] = { ...localGroups[idx], ...updates };
    res.json({ message: 'Group updated', group: localGroups[idx] });
};

const addStudentToGroup = async (req, res) => {
    const { groupId } = req.params;
    const { studentId } = req.body;
    const gIdx = localGroups.findIndex(g => g.id === groupId);
    if (gIdx === -1) return res.status(404).json({ error: 'Group not found' });
    const group = localGroups[gIdx];
    if (group.students.length >= group.maxStudents) return res.status(400).json({ error: 'Group is full' });
    if (group.students.includes(studentId)) return res.status(400).json({ error: 'Student already in group' });

    group.students.push(studentId);
    // Update student's groupId
    const sIdx = localUsers.findIndex(u => u.id === studentId);
    if (sIdx !== -1) {
        localUsers[sIdx].groupId = groupId;
        localUsers[sIdx].subscriptionType = group.type;
    }
    res.json({ message: 'Student added to group', group });
};

const removeStudentFromGroup = async (req, res) => {
    const { groupId, studentId } = req.params;
    const gIdx = localGroups.findIndex(g => g.id === groupId);
    if (gIdx === -1) return res.status(404).json({ error: 'Group not found' });
    localGroups[gIdx].students = localGroups[gIdx].students.filter(s => s !== studentId);
    // Clear student's groupId
    const sIdx = localUsers.findIndex(u => u.id === studentId);
    if (sIdx !== -1) {
        localUsers[sIdx].groupId = null;
    }
    res.json({ message: 'Student removed from group', group: localGroups[gIdx] });
};

module.exports = { scheduleClass, getClasses, markAttendance, getPayroll, getStats, getUsers, getCourses, getGroups, createGroup, updateGroup, addStudentToGroup, removeStudentFromGroup };
