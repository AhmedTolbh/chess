import { User, Class, Course } from '../types';

export const mockUsers = [
    {
        id: 'u1',
        name: 'Ahmed Instructor',
        role: 'instructor',
        email: 'ahmed@pioneers.com',
        avatar: 'https://i.pravatar.cc/150?u=a',
    },
    {
        id: 'u2',
        name: 'Sara Student',
        role: 'student',
        email: 'sara@gmail.com',
        avatar: 'https://i.pravatar.cc/150?u=s',
    }
];

export const mockClasses = [
    {
        id: 'c1',
        title: 'Advanced Opening Theory',
        instructorId: 'u1',
        studentId: 'u2', // In a real DB this would be a join table
        startTime: new Date(Date.now() + 1000 * 60 * 30).toISOString(), // Starts in 30 mins
        endTime: new Date(Date.now() + 1000 * 60 * 90).toISOString(),
        meetLink: 'https://meet.google.com/abc-defg-hij',
        status: 'scheduled',
        courseName: 'Mastering the Sicilian'
    },
    {
        id: 'c2',
        title: 'Endgame Fundamentals',
        instructorId: 'u1',
        studentId: 'u2',
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
        endTime: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
        meetLink: 'https://meet.google.com/xyz-uvwx-yz',
        status: 'completed',
        courseName: 'Endgame Mastery'
    },
    {
        id: 'c3',
        title: 'Tactical Patterns II',
        instructorId: 'u1',
        studentId: 'u2',
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // In 2 days
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60).toISOString(),
        meetLink: null, // Link not generated yet
        status: 'scheduled',
        courseName: 'Tactics for Intermediates'
    }
];

export const mockStats = {
    student: {
        classesAttended: 12,
        puzzlesSolved: 145,
        currentRating: 1250,
        nextClassIn: '30 mins'
    },
    instructor: {
        classesGiven: 45,
        studentsTaught: 8,
        hoursThisMonth: 22.5,
        upcomingClasses: 3
    }
};
