import React, { useState, useEffect } from 'react';
import ClassCard from '../../components/dashboard/ClassCard';
import CalendarView from '../../components/dashboard/CalendarView';
import { Trophy, Target, Clock, TrendingUp, Calendar, BookOpen, CheckCircle, Video, Star } from 'lucide-react';

const API_URL = 'http://localhost:5001/api/classes';

const StudentDashboard: React.FC = () => {
    const [classes, setClasses] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const STUDENT_ID = 'u2';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [classRes, courseRes] = await Promise.all([
                    fetch(`${API_URL}?role=student&userId=${STUDENT_ID}`),
                    fetch(`${API_URL}/courses?studentId=${STUDENT_ID}`)
                ]);
                if (classRes.ok) {
                    const data = await classRes.json();
                    setClasses(data.classes);
                }
                if (courseRes.ok) {
                    const data = await courseRes.json();
                    setCourses(data.courses);
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const now = new Date();
    const liveClasses = classes.filter(c => new Date(c.startTime) <= now && new Date(c.endTime) >= now && c.status !== 'completed');
    const upcomingClasses = classes.filter(c => c.status !== 'completed' && c.status !== 'cancelled' && new Date(c.startTime) > now);
    const completedClasses = classes.filter(c => c.status === 'completed');
    const presentCount = completedClasses.filter(c => c.attendance === 'present').length;
    const attendanceRate = completedClasses.length > 0 ? Math.round((presentCount / completedClasses.length) * 100) : 100;

    const handleJoin = (link: string) => window.open(link, '_blank');

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-3">
                <div className="w-12 h-12 border-4 border-lime-500 border-r-transparent rounded-full animate-spin mx-auto"></div>
                <p className="font-bold opacity-50">Loading your portal...</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* LIVE Class Banner */}
            {liveClasses.length > 0 && (
                <div className="p-6 rounded-3xl bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500 text-white shadow-2xl shadow-lime-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
                    <div className="relative flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                <Video className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm font-bold opacity-80 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                                    LIVE NOW
                                </p>
                                <h2 className="text-2xl font-black">{liveClasses[0].title}</h2>
                                <p className="text-sm opacity-80">{liveClasses[0].courseName}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleJoin(liveClasses[0].meetLink)}
                            className="bg-white text-green-700 font-black py-3 px-8 rounded-2xl hover:bg-green-50 transition-all hover:scale-105 active:scale-95 shadow-lg"
                        >
                            Join Class →
                        </button>
                    </div>
                </div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-lime-400 to-lime-600 text-[#1a1a2e] shadow-lg shadow-lime-500/20">
                    <div className="flex items-center gap-3 mb-1">
                        <Trophy className="w-5 h-5 opacity-80" />
                        <span className="text-sm font-bold opacity-80">Rating</span>
                    </div>
                    <p className="text-3xl font-black">1,250</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-blue-100/60">
                    <div className="flex items-center gap-3 mb-1">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-bold opacity-60">Courses</span>
                    </div>
                    <p className="text-3xl font-black">{courses.length}</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-blue-100/60">
                    <div className="flex items-center gap-3 mb-1">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-bold opacity-60">Attendance</span>
                    </div>
                    <p className="text-3xl font-black">{attendanceRate}%</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-blue-100/60">
                    <div className="flex items-center gap-3 mb-1">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <span className="text-sm font-bold opacity-60">Upcoming</span>
                    </div>
                    <p className="text-3xl font-black">{upcomingClasses.length}</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Schedule Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black">Your Schedule</h2>
                        <button
                            onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
                            className="flex items-center gap-2 text-sm font-bold text-lime-500 hover:text-lime-400 transition-colors bg-lime-500/10 px-4 py-2 rounded-xl"
                        >
                            <Calendar className="w-4 h-4" />
                            {viewMode === 'list' ? 'Calendar View' : 'List View'}
                        </button>
                    </div>

                    {viewMode === 'list' ? (
                        <div className="space-y-4">
                            {upcomingClasses.length > 0 ? (
                                upcomingClasses.map((session: any) => (
                                    <ClassCard key={session.id} session={session} role="student" onJoin={handleJoin} />
                                ))
                            ) : (
                                <div className="p-12 rounded-2xl border border-dashed border-blue-200 flex flex-col items-center justify-center opacity-70">
                                    <Calendar className="w-10 h-10 mb-2 opacity-50" />
                                    <p className="font-bold">No upcoming classes</p>
                                    <p className="text-sm opacity-50">Your schedule is clear!</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <CalendarView classes={classes} onJoin={handleJoin} />
                    )}

                    {/* Class History */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Recent History</h3>
                        <div className="bg-white rounded-2xl border border-blue-100/60 overflow-hidden">
                            {completedClasses.length > 0 ? (
                                completedClasses.slice(0, 5).map((session: any) => (
                                    <div key={session.id} className="p-4 border-b border-blue-100/60 last:border-0 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold">{session.title}</h4>
                                            <p className="text-sm opacity-60">{new Date(session.startTime).toLocaleDateString()}</p>
                                        </div>
                                        {session.attendance === 'present' ? (
                                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" /> Present
                                            </span>
                                        ) : session.attendance === 'absent' ? (
                                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">Absent</span>
                                        ) : (
                                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">Completed</span>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center opacity-50 text-sm">No completed classes yet.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Enrolled Courses */}
                    <div className="p-6 rounded-2xl bg-white border border-blue-100/60">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-500" />
                            My Courses
                        </h3>
                        <div className="space-y-3">
                            {courses.map((course: any) => (
                                <div key={course.id} className="p-3 rounded-xl bg-blue-50/30">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-sm">{course.name}</h4>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                                                course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-purple-100 text-purple-700'
                                            }`}>{course.level}</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-blue-100/50 overflow-hidden">
                                        <div className="h-full bg-lime-500 rounded-full transition-all" style={{ width: `${(course.completedClasses / course.totalClasses) * 100}%` }}></div>
                                    </div>
                                    <p className="text-xs opacity-50 mt-1">{course.completedClasses}/{course.totalClasses} classes completed</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="p-6 rounded-2xl bg-blue-50/30 border border-blue-100/60">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-lime-500" />
                            Skill Progress
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Tactics', progress: 85, color: 'bg-lime-500' },
                                { name: 'Endgames', progress: 45, color: 'bg-blue-500' },
                                { name: 'Openings', progress: 60, color: 'bg-purple-500' },
                                { name: 'Strategy', progress: 30, color: 'bg-orange-500' },
                            ].map(skill => (
                                <div key={skill.name}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="opacity-70">{skill.name}</span>
                                        <span className="font-bold">{skill.progress}%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-blue-100/50 overflow-hidden">
                                        <div className={`h-full ${skill.color} rounded-full`} style={{ width: `${skill.progress}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
