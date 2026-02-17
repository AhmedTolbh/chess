import React, { useState, useEffect } from 'react';
import { Users, BookOpen, DollarSign, Activity, Shield, Calendar, GraduationCap, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const API_URL = 'http://localhost:5001/api/classes';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'classes' | 'courses'>('overview');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, usersRes, classesRes, coursesRes] = await Promise.all([
                    fetch(`${API_URL}/stats`),
                    fetch(`${API_URL}/users`),
                    fetch(`${API_URL}?role=admin`),
                    fetch(`${API_URL}/courses`)
                ]);
                if (statsRes.ok) setStats(await statsRes.json());
                if (usersRes.ok) setUsers((await usersRes.json()).users);
                if (classesRes.ok) setClasses((await classesRes.json()).classes);
                if (coursesRes.ok) setCourses((await coursesRes.json()).courses);
            } catch (error) {
                console.error("Failed to fetch admin data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-3">
                <div className="w-12 h-12 border-4 border-red-500 border-r-transparent rounded-full animate-spin mx-auto"></div>
                <p className="font-bold opacity-50">Loading admin portal...</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30">
                    <Shield className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-2xl font-black">Admin Control Center</h1>
                    <p className="opacity-50 text-sm">Manage your academy from one place</p>
                </div>
            </div>

            {/* Stats Row */}
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20">
                        <Users className="w-6 h-6 mb-2 opacity-80" />
                        <p className="text-3xl font-black">{stats.totalStudents}</p>
                        <p className="text-sm opacity-80">Students</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20">
                        <GraduationCap className="w-6 h-6 mb-2 opacity-80" />
                        <p className="text-3xl font-black">{stats.totalInstructors}</p>
                        <p className="text-sm opacity-80">Instructors</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20">
                        <DollarSign className="w-6 h-6 mb-2 opacity-80" />
                        <p className="text-3xl font-black">${stats.revenue}</p>
                        <p className="text-sm opacity-80">Revenue</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/20">
                        <Activity className="w-6 h-6 mb-2 opacity-80" />
                        <p className="text-3xl font-black">{stats.attendanceRate}%</p>
                        <p className="text-sm opacity-80">Attendance</p>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-blue-50/40 rounded-xl w-fit">
                {(['overview', 'users', 'classes', 'courses'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab
                            ? 'bg-white shadow-sm'
                            : 'opacity-50 hover:opacity-100'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Quick Stats Card */}
                    <div className="p-6 rounded-2xl bg-white border border-blue-100/60">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-lime-500" />
                            Academy Overview
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-blue-100/60">
                                <span className="opacity-70">Total Users</span>
                                <span className="font-black">{stats.totalUsers}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-blue-100/60">
                                <span className="opacity-70">Active Courses</span>
                                <span className="font-black">{stats.totalCourses}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-blue-100/60">
                                <span className="opacity-70">Completed Classes</span>
                                <span className="font-black text-green-500">{stats.completedClasses}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-blue-100/60">
                                <span className="opacity-70">Scheduled Classes</span>
                                <span className="font-black text-blue-500">{stats.scheduledClasses}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="opacity-70">Parent Accounts</span>
                                <span className="font-black">{stats.totalParents}</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="p-6 rounded-2xl bg-white border border-blue-100/60">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            Recent Classes
                        </h3>
                        <div className="space-y-3">
                            {classes.slice(0, 6).map((c: any) => (
                                <div key={c.id} className="flex items-center justify-between py-2 border-b border-blue-100/60 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${c.status === 'completed' ? 'bg-green-500' : c.status === 'scheduled' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                                        <div>
                                            <p className="font-bold text-sm">{c.title}</p>
                                            <p className="text-xs opacity-50">{c.courseName}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold capitalize ${c.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {c.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="bg-white rounded-2xl border border-blue-100/60 overflow-hidden">
                    <div className="p-4 border-b border-blue-100/60 flex justify-between items-center">
                        <h3 className="font-bold">All Users ({users.length})</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-sm opacity-60 border-b border-blue-100/60">
                                    <th className="p-4 font-bold">User</th>
                                    <th className="p-4 font-bold">Role</th>
                                    <th className="p-4 font-bold">Email</th>
                                    <th className="p-4 font-bold">Joined</th>
                                    <th className="p-4 font-bold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u: any) => (
                                    <tr key={u.id} className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full" />
                                                <span className="font-bold text-sm">{u.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${u.role === 'admin' ? 'bg-red-100 text-red-700' :
                                                    u.role === 'instructor' ? 'bg-purple-100 text-purple-700' :
                                                        u.role === 'student' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-green-100 text-green-700'
                                                }`}>{u.role}</span>
                                        </td>
                                        <td className="p-4 text-sm opacity-70">{u.email}</td>
                                        <td className="p-4 text-sm opacity-70">{u.joinDate}</td>
                                        <td className="p-4">
                                            <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                                                <CheckCircle className="w-3 h-3" /> Active
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'classes' && (
                <div className="bg-white rounded-2xl border border-blue-100/60 overflow-hidden">
                    <div className="p-4 border-b border-blue-100/60">
                        <h3 className="font-bold">All Classes ({classes.length})</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-sm opacity-60 border-b border-blue-100/60">
                                    <th className="p-4 font-bold">Title</th>
                                    <th className="p-4 font-bold">Course</th>
                                    <th className="p-4 font-bold">Date</th>
                                    <th className="p-4 font-bold">Status</th>
                                    <th className="p-4 font-bold">Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map((c: any) => (
                                    <tr key={c.id} className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-bold text-sm">{c.title}</td>
                                        <td className="p-4 text-sm opacity-70">{c.courseName}</td>
                                        <td className="p-4 text-sm opacity-70">{new Date(c.startTime).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${c.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {c.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm">
                                            {c.attendance === 'present' ? (
                                                <span className="text-green-600 font-bold">✓ Present</span>
                                            ) : c.attendance === 'absent' ? (
                                                <span className="text-red-500 font-bold">✗ Absent</span>
                                            ) : (
                                                <span className="opacity-40">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'courses' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((c: any) => (
                        <div key={c.id} className="p-6 rounded-2xl bg-white border border-blue-100/60 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                                            c.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                                                'bg-purple-100 text-purple-700'
                                        }`}>{c.level}</span>
                                    <h3 className="text-lg font-black mt-2">{c.name}</h3>
                                </div>
                                <span className="text-2xl font-black text-lime-500">${c.price}</span>
                            </div>
                            <p className="text-sm opacity-60 mb-4">{c.description}</p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="flex items-center gap-1 opacity-60">
                                    <Users className="w-4 h-4" />
                                    {c.students.length} students
                                </span>
                                <span className="flex items-center gap-1 opacity-60">
                                    <BookOpen className="w-4 h-4" />
                                    {c.totalClasses} classes
                                </span>
                            </div>
                            <div className="mt-3 h-1.5 rounded-full bg-blue-100/50 overflow-hidden">
                                <div className="h-full bg-lime-500 rounded-full" style={{ width: `${(c.completedClasses / c.totalClasses) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
