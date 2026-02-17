import React, { useState, useEffect } from 'react';
import { Users, Calendar, CheckCircle, XCircle, GraduationCap, Clock, TrendingUp, BookOpen, Star } from 'lucide-react';

const API_URL = 'http://localhost:5001/api/classes';

const ParentDashboard: React.FC = () => {
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const PARENT_ID = 'u5';

    // Mock children data (would come from API in production)
    const children = [
        { id: 'u2', name: 'Sara Al-Rashid', rating: 1250, avatar: 'https://i.pravatar.cc/150?u=sara' },
        { id: 'u4', name: 'Layla Mahmoud', rating: 1100, avatar: 'https://i.pravatar.cc/150?u=layla' },
    ];

    const [selectedChild, setSelectedChild] = useState(children[0].id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}?role=parent&userId=${PARENT_ID}`);
                if (res.ok) {
                    const data = await res.json();
                    setClasses(data.classes);
                }
            } catch (error) {
                console.error("Failed to fetch", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const childClasses = classes.filter(c => c.student_id === selectedChild);
    const completedClasses = childClasses.filter(c => c.status === 'completed');
    const scheduledClasses = childClasses.filter(c => c.status === 'scheduled');
    const presentCount = completedClasses.filter(c => c.attendance === 'present').length;
    const attendanceRate = completedClasses.length > 0 ? Math.round((presentCount / completedClasses.length) * 100) : 100;
    const child = children.find(c => c.id === selectedChild);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-3">
                <div className="w-12 h-12 border-4 border-purple-500 border-r-transparent rounded-full animate-spin mx-auto"></div>
                <p className="font-bold opacity-50">Loading parent portal...</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30">
                    <Users className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-2xl font-black">Parent Portal</h1>
                    <p className="opacity-50 text-sm">Monitor your child's chess education</p>
                </div>
            </div>

            {/* Child Selector */}
            <div className="flex gap-4">
                {children.map(c => (
                    <button
                        key={c.id}
                        onClick={() => setSelectedChild(c.id)}
                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${selectedChild === c.id
                            ? 'border-purple-500 bg-purple-50 shadow-lg shadow-purple-500/10'
                            : 'border-blue-100 hover:border-purple-300'
                            }`}
                    >
                        <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full" />
                        <div className="text-left">
                            <p className="font-bold">{c.name}</p>
                            <p className="text-sm text-purple-500 font-bold flex items-center gap-1">
                                <Star className="w-3 h-3" /> Rating: {c.rating}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-blue-100/60">
                    <div className="flex items-center gap-3 mb-1">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-bold opacity-60">Upcoming</span>
                    </div>
                    <p className="text-3xl font-black">{scheduledClasses.length}</p>
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
                        <BookOpen className="w-5 h-5 text-purple-500" />
                        <span className="text-sm font-bold opacity-60">Completed</span>
                    </div>
                    <p className="text-3xl font-black">{completedClasses.length}</p>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg shadow-purple-500/20">
                    <div className="flex items-center gap-3 mb-1">
                        <TrendingUp className="w-5 h-5 opacity-80" />
                        <span className="text-sm font-bold opacity-80">Rating</span>
                    </div>
                    <p className="text-3xl font-black">{child?.rating}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Classes */}
                <div className="p-6 rounded-2xl bg-white border border-blue-100/60">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        Upcoming Classes for {child?.name.split(' ')[0]}
                    </h3>
                    {scheduledClasses.length > 0 ? (
                        <div className="space-y-3">
                            {scheduledClasses.map((c: any) => (
                                <div key={c.id} className="p-4 rounded-xl bg-blue-50/30 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-sm">{c.title}</h4>
                                        <p className="text-xs opacity-50 mt-1 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(c.startTime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                            {' • '}
                                            {new Date(c.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">{c.courseName}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center opacity-50">
                            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No upcoming classes</p>
                        </div>
                    )}
                </div>

                {/* Attendance History */}
                <div className="p-6 rounded-2xl bg-white border border-blue-100/60">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Attendance Record
                    </h3>
                    {completedClasses.length > 0 ? (
                        <div className="space-y-2">
                            {completedClasses.map((c: any) => (
                                <div key={c.id} className="p-3 rounded-xl flex items-center justify-between border border-blue-100/60">
                                    <div>
                                        <h4 className="font-bold text-sm">{c.title}</h4>
                                        <p className="text-xs opacity-50">{new Date(c.startTime).toLocaleDateString()}</p>
                                    </div>
                                    {c.attendance === 'present' ? (
                                        <span className="flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs font-bold">
                                            <CheckCircle className="w-3 h-3" /> Present
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-red-500 bg-red-100 px-3 py-1 rounded-full text-xs font-bold">
                                            <XCircle className="w-3 h-3" /> Absent
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center opacity-50">
                            <p className="text-sm">No completed classes yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ParentDashboard;
