import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Video, BookOpen, User, MapPin, Plus, Calendar as CalendarIcon, X } from 'lucide-react';

const API_URL = 'http://localhost:5001/api/classes';

interface CalendarPageProps {
    role?: string;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ role = 'student' }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

    // Determine userId based on role
    const userIds: Record<string, string> = { student: 'u2', instructor: 'u1', parent: 'u5', admin: '' };
    const userId = userIds[role] || '';

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const url = role === 'admin'
                    ? `${API_URL}?role=admin`
                    : `${API_URL}?role=${role}&userId=${userId}`;
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    setClasses(data.classes);
                }
            } catch (error) {
                console.error('Failed to fetch classes', error);
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, [role]);

    // Calendar logic
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentDate);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDay(null);
    };
    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDay(null);
    };
    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDay(today.getDate());
    };

    const isToday = (day: number) => {
        const today = new Date();
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    const getClassesForDay = (day: number) => {
        return classes.filter(c => {
            const classDate = new Date(c.startTime);
            return classDate.getDate() === day &&
                classDate.getMonth() === currentDate.getMonth() &&
                classDate.getFullYear() === currentDate.getFullYear();
        });
    };

    const selectedDayClasses = selectedDay ? getClassesForDay(selectedDay) : [];
    const selectedDate = selectedDay
        ? new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay)
        : null;

    // Count total events this month
    const totalEventsThisMonth = Array.from({ length: days }).reduce((acc: number, _, i) => acc + getClassesForDay(i + 1).length, 0);

    const handleJoin = (link: string) => {
        if (link) window.open(link, '_blank');
    };

    // Get status color
    const getStatusColor = (cls: any) => {
        const now = new Date();
        const start = new Date(cls.startTime);
        const end = new Date(cls.endTime);
        if (now >= start && now <= end && cls.status !== 'completed') return { bg: 'bg-red-500', text: 'LIVE', dot: 'bg-red-500' };
        if (cls.status === 'completed') return { bg: 'bg-emerald-100 text-emerald-700', text: 'Completed', dot: 'bg-emerald-500' };
        if (cls.status === 'cancelled') return { bg: 'bg-red-100 text-red-600', text: 'Cancelled', dot: 'bg-red-500' };
        return { bg: 'bg-blue-100 text-blue-700', text: 'Scheduled', dot: 'bg-blue-500' };
    };

    if (loading) return (
        <div className="flex items-center justify-center h-96">
            <div className="text-center space-y-3">
                <div className="w-12 h-12 border-4 border-lime-500 border-r-transparent rounded-full animate-spin mx-auto"></div>
                <p className="font-bold opacity-50">Loading calendar...</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
                        <CalendarIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black">Academy Calendar</h1>
                        <p className="text-sm opacity-50">{totalEventsThisMonth} events this month</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={goToToday}
                        className="px-4 py-2 rounded-xl bg-lime-500 text-slate-900 font-bold text-sm hover:bg-lime-400 transition-all shadow-sm"
                    >
                        Today
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Grid */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-blue-100/60 shadow-sm overflow-hidden">
                        {/* Month Navigation */}
                        <div className="px-6 py-5 flex items-center justify-between border-b border-blue-50">
                            <div className="flex items-center gap-3">
                                <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-blue-50 transition-colors">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <h2 className="text-xl font-black min-w-[200px] text-center">
                                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </h2>
                                <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-blue-50 transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Day Names Header */}
                        <div className="grid grid-cols-7 border-b border-blue-50">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                <div key={d} className="py-3 text-center text-xs font-bold uppercase tracking-wider opacity-40">
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7">
                            {/* Empty slots */}
                            {Array.from({ length: firstDay }).map((_, i) => (
                                <div key={`e-${i}`} className="min-h-[100px] border-b border-r border-blue-50/50 bg-blue-50/20"></div>
                            ))}

                            {/* Days */}
                            {Array.from({ length: days }).map((_, i) => {
                                const day = i + 1;
                                const dayClasses = getClassesForDay(day);
                                const today = isToday(day);
                                const isSelected = selectedDay === day;
                                const dayOfWeek = (firstDay + i) % 7;
                                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                                return (
                                    <div
                                        key={day}
                                        onClick={() => setSelectedDay(day)}
                                        className={`min-h-[100px] border-b border-r border-blue-50/50 p-2 cursor-pointer transition-all relative group
                                            ${isSelected ? 'bg-indigo-50 ring-2 ring-inset ring-indigo-400' : ''}
                                            ${today && !isSelected ? 'bg-lime-50/50' : ''}
                                            ${isWeekend && !isSelected && !today ? 'bg-blue-50/20' : ''}
                                            ${!isSelected ? 'hover:bg-blue-50/50' : ''}
                                        `}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`text-sm font-bold inline-flex items-center justify-center w-7 h-7 rounded-full
                                                ${today ? 'bg-lime-500 text-white' : ''}
                                                ${isSelected && !today ? 'bg-indigo-500 text-white' : ''}
                                                ${!today && !isSelected ? 'opacity-70' : ''}
                                            `}>
                                                {day}
                                            </span>
                                            {dayClasses.length > 0 && !isSelected && (
                                                <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded-full">
                                                    {dayClasses.length}
                                                </span>
                                            )}
                                        </div>

                                        {/* Event dots/previews */}
                                        <div className="space-y-1">
                                            {dayClasses.slice(0, 3).map((c, idx) => {
                                                const status = getStatusColor(c);
                                                return (
                                                    <div
                                                        key={c.id}
                                                        className={`text-[10px] px-2 py-1 rounded-lg truncate font-medium
                                                            ${status.text === 'LIVE'
                                                                ? 'bg-red-500 text-white animate-pulse'
                                                                : c.status === 'completed'
                                                                    ? 'bg-emerald-100 text-emerald-700'
                                                                    : 'bg-indigo-100 text-indigo-700'
                                                            }`}
                                                        title={c.title}
                                                    >
                                                        {new Date(c.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {c.title}
                                                    </div>
                                                );
                                            })}
                                            {dayClasses.length > 3 && (
                                                <div className="text-[10px] text-center opacity-50 font-bold">
                                                    +{dayClasses.length - 3} more
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Fill remaining cells to complete the grid row */}
                            {Array.from({ length: (7 - ((firstDay + days) % 7)) % 7 }).map((_, i) => (
                                <div key={`f-${i}`} className="min-h-[100px] border-b border-r border-blue-50/50 bg-blue-50/20"></div>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-4 mt-4 px-2">
                        <div className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="opacity-60">Live Now</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                            <span className="opacity-60">Scheduled</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            <span className="opacity-60">Completed</span>
                        </div>
                    </div>
                </div>

                {/* Day Detail Panel */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl border border-blue-100/60 shadow-sm p-6 sticky top-24">
                        {selectedDay && selectedDate ? (
                            <>
                                {/* Selected Day Header */}
                                <div className="mb-6">
                                    <p className="text-sm font-bold text-indigo-500 uppercase tracking-wider">
                                        {dayNames[selectedDate.getDay()]}
                                    </p>
                                    <h3 className="text-3xl font-black">
                                        {monthNames[selectedDate.getMonth()]} {selectedDay}
                                    </h3>
                                    <p className="text-sm opacity-50 mt-1">
                                        {selectedDayClasses.length} {selectedDayClasses.length === 1 ? 'class' : 'classes'} scheduled
                                    </p>
                                </div>

                                {/* Classes for selected day */}
                                {selectedDayClasses.length > 0 ? (
                                    <div className="space-y-4">
                                        {selectedDayClasses.map(cls => {
                                            const status = getStatusColor(cls);
                                            const start = new Date(cls.startTime);
                                            const end = new Date(cls.endTime);
                                            const now = new Date();
                                            const isLive = now >= start && now <= end && cls.status !== 'completed';
                                            const meetLink = cls.meetLink || cls.google_meet_link;

                                            return (
                                                <div
                                                    key={cls.id}
                                                    className={`p-4 rounded-2xl border transition-all hover:shadow-md ${isLive
                                                        ? 'border-red-200 bg-red-50/50 ring-1 ring-red-200'
                                                        : 'border-blue-100/60 hover:border-blue-200'
                                                        }`}
                                                >
                                                    {/* Status */}
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${status.text === 'LIVE'
                                                            ? 'bg-red-500 text-white animate-pulse'
                                                            : status.bg
                                                            }`}>
                                                            {status.text === 'LIVE' && <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-1 animate-ping"></span>}
                                                            {status.text}
                                                        </span>
                                                    </div>

                                                    {/* Title & Course */}
                                                    <h4 className="font-black text-base mb-1">{cls.title}</h4>
                                                    <p className="text-xs font-bold text-indigo-500 mb-3 flex items-center gap-1">
                                                        <BookOpen className="w-3 h-3" />
                                                        {cls.courseName}
                                                    </p>

                                                    {/* Time */}
                                                    <div className="flex items-center gap-2 text-sm opacity-60 mb-4">
                                                        <Clock className="w-4 h-4" />
                                                        <span>
                                                            {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            {' — '}
                                                            {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>

                                                    {/* Attendance badge for completed */}
                                                    {cls.status === 'completed' && cls.attendance && (
                                                        <div className={`mb-3 text-xs font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 ${cls.attendance === 'present'
                                                            ? 'bg-emerald-100 text-emerald-700'
                                                            : 'bg-red-100 text-red-600'
                                                            }`}>
                                                            {cls.attendance === 'present' ? '✓ Present' : '✗ Absent'}
                                                        </div>
                                                    )}

                                                    {/* Join Button */}
                                                    {meetLink && cls.status !== 'completed' && (
                                                        <button
                                                            onClick={() => handleJoin(meetLink)}
                                                            className={`w-full flex items-center justify-center gap-2 font-bold py-2.5 px-4 rounded-xl transition-all text-sm ${isLive
                                                                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-95'
                                                                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                                                                }`}
                                                        >
                                                            <Video className="w-4 h-4" />
                                                            {isLive ? 'Join Now' : 'Join Class'}
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p className="font-bold opacity-50">No classes</p>
                                        <p className="text-sm opacity-30 mt-1">This day is free</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <CalendarIcon className="w-16 h-16 mx-auto mb-4 opacity-15" />
                                <p className="font-bold opacity-50">Select a day</p>
                                <p className="text-sm opacity-30 mt-1">Click on a date to see details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
