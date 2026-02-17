import React, { useState, useEffect } from 'react';
import ClassCard from '../../components/dashboard/ClassCard';
import CalendarView from '../../components/dashboard/CalendarView';
import CreateClassModal from '../../components/dashboard/CreateClassModal';
import { CreditCard, Users, Clock, Plus, Calendar, BookOpen, Video, TrendingUp } from 'lucide-react';

const API_URL = 'http://localhost:5001/api/classes';

const InstructorDashboard: React.FC = () => {
    const [classes, setClasses] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const INSTRUCTOR_ID = 'u1';

    const fetchData = async () => {
        try {
            const [classRes, studentRes, courseRes] = await Promise.all([
                fetch(`${API_URL}?role=instructor&userId=${INSTRUCTOR_ID}`),
                fetch(`${API_URL}/users?role=student`),
                fetch(`${API_URL}/courses?instructorId=${INSTRUCTOR_ID}`)
            ]);
            if (classRes.ok) setClasses((await classRes.json()).classes);
            if (studentRes.ok) setStudents((await studentRes.json()).users);
            if (courseRes.ok) setCourses((await courseRes.json()).courses);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const now = new Date();
    const liveClasses = classes.filter(c => new Date(c.startTime) <= now && new Date(c.endTime) >= now && c.status !== 'completed');
    const scheduledClasses = classes.filter(c => c.status === 'scheduled');
    const completedClasses = classes.filter(c => c.status === 'completed');
    const hourlyRate = 25;
    const totalEarnings = completedClasses.length * hourlyRate;

    const handleJoin = (link: string) => window.open(link, '_blank');

    const handleAttendance = async (id: string, status: 'present' | 'absent') => {
        try {
            const res = await fetch(`${API_URL}/attendance`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ classId: id, status })
            });
            if (res.ok) fetchData();
        } catch (error) {
            console.error("Error marking attendance", error);
        }
    };

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
                <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/30 relative overflow-hidden">
                    <div className="relative flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                <Video className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm font-bold opacity-80 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                                    CLASS IN PROGRESS
                                </p>
                                <h2 className="text-2xl font-black">{liveClasses[0].title}</h2>
                            </div>
                        </div>
                        <button
                            onClick={() => handleJoin(liveClasses[0].meetLink)}
                            className="bg-white text-indigo-700 font-black py-3 px-8 rounded-2xl hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-lg"
                        >
                            Start Teaching →
                        </button>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-blue-100/60">
                    <div className="flex items-center gap-3 mb-1">
                        <Users className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-bold opacity-60">Students</span>
                    </div>
                    <p className="text-3xl font-black">{students.length}</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-blue-100/60">
                    <div className="flex items-center gap-3 mb-1">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <span className="text-sm font-bold opacity-60">Scheduled</span>
                    </div>
                    <p className="text-3xl font-black">{scheduledClasses.length}</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-blue-100/60">
                    <div className="flex items-center gap-3 mb-1">
                        <BookOpen className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-bold opacity-60">Courses</span>
                    </div>
                    <p className="text-3xl font-black">{courses.length}</p>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                    <div className="flex items-center gap-3 mb-1">
                        <CreditCard className="w-5 h-5 opacity-80" />
                        <span className="text-sm font-bold opacity-80">Earnings</span>
                    </div>
                    <p className="text-3xl font-black">${totalEarnings}</p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Schedule */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <h2 className="text-xl font-black">Classes</h2>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
                                className="flex items-center gap-2 text-sm font-bold text-lime-500 hover:text-lime-400 transition-colors bg-lime-500/10 px-4 py-2 rounded-xl"
                            >
                                <Calendar className="w-4 h-4" />
                                {viewMode === 'list' ? 'Calendar' : 'List'}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 bg-lime-500 hover:bg-lime-400 text-[#1a1a2e] font-bold py-2 px-4 rounded-xl transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                Schedule Class
                            </button>
                        </div>
                    </div>

                    {viewMode === 'list' ? (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            {scheduledClasses.length > 0 ? (
                                scheduledClasses.map((session: any) => (
                                    <ClassCard
                                        key={session.id}
                                        session={session}
                                        role="instructor"
                                        onJoin={handleJoin}
                                        onMarkAttendance={handleAttendance}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full p-12 rounded-2xl border border-dashed border-blue-200 flex flex-col items-center justify-center opacity-70">
                                    <Calendar className="w-10 h-10 mb-2 opacity-50" />
                                    <p className="font-bold">No upcoming classes</p>
                                    <p className="text-sm opacity-50">Click "Schedule Class" to create one</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <CalendarView classes={classes} onJoin={handleJoin} />
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* My Students */}
                    <div className="p-6 rounded-2xl bg-white border border-blue-100/60">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-500" />
                            My Students
                        </h3>
                        <div className="space-y-3">
                            {students.map((s: any) => (
                                <div key={s.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50/30 transition-colors">
                                    <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm truncate">{s.name}</p>
                                        <p className="text-xs opacity-50">{s.email}</p>
                                    </div>
                                    {s.rating && (
                                        <span className="text-xs font-bold text-lime-600 bg-lime-100 px-2 py-0.5 rounded-full">{s.rating}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* My Courses */}
                    <div className="p-6 rounded-2xl bg-white border border-blue-100/60">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-green-500" />
                            My Courses
                        </h3>
                        <div className="space-y-3">
                            {courses.map((c: any) => (
                                <div key={c.id} className="p-3 rounded-xl bg-blue-50/30">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-sm">{c.name}</h4>
                                        <span className="text-xs opacity-50">{c.students.length} students</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-blue-100/50 overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${(c.completedClasses / c.totalClasses) * 100}%` }}></div>
                                    </div>
                                    <p className="text-xs opacity-50 mt-1">{c.completedClasses}/{c.totalClasses} classes</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <CreateClassModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchData}
                instructorId={INSTRUCTOR_ID}
            />
        </div>
    );
};

export default InstructorDashboard;
