import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Video } from 'lucide-react';

interface CalendarViewProps {
    classes: any[];
    onJoin: (link: string) => void;
    isDarkMode?: boolean;
}

const CalendarView: React.FC<CalendarViewProps> = ({ classes, onJoin, isDarkMode = false }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentDate);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
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

    return (
        <div className={`p-6 rounded-3xl shadow-sm border ${isDarkMode ? 'bg-[#334155] border-slate-600/30' : 'bg-white border-blue-100/60'}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black flex items-center gap-2">
                    {monthNames[currentDate.getMonth()]}
                    <span className="opacity-50 font-medium">{currentDate.getFullYear()}</span>
                </h2>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-slate-600/40' : 'hover:bg-blue-50/40'}`}>
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextMonth} className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-slate-600/40' : 'hover:bg-blue-50/40'}`}>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Grid Header */}
            <div className="grid grid-cols-7 mb-4 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-sm font-bold opacity-50 py-2">{day}</div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
                {/* Empty slots for previous month */}
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square"></div>
                ))}

                {/* Days */}
                {Array.from({ length: days }).map((_, i) => {
                    const day = i + 1;
                    const dayClasses = getClassesForDay(day);
                    const hasClasses = dayClasses.length > 0;
                    const today = isToday(day);

                    return (
                        <div
                            key={day}
                            className={`relative aspect-square rounded-2xl p-2 border transition-all group ${today
                                ? 'border-lime-500 bg-lime-500/5'
                                : isDarkMode ? 'border-slate-600/30 hover:border-white/20' : 'border-blue-100/60 hover:border-blue-100'
                                }`}
                        >
                            <span className={`text-sm font-bold block mb-1 ${today ? 'text-lime-500' : 'opacity-70'}`}>
                                {day}
                            </span>

                            {/* Class Indicators (Dots) */}
                            <div className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100%-24px)] custom-scrollbar">
                                {dayClasses.map((c, idx) => (
                                    <div
                                        key={c.id}
                                        onClick={() => onJoin(c.google_meet_link || c.meetLink)}
                                        className={`text-[10px] p-1.5 rounded-lg truncate cursor-pointer transition-colors ${c.status === 'completed'
                                                ? 'bg-blue-100/50 text-slate-600'
                                                : c.status === 'scheduled'
                                                    ? 'bg-lime-500 text-[#1a1a2e] font-bold hover:bg-lime-400'
                                                    : 'bg-red-100 text-red-600'
                                            }`}
                                        title={`${c.title} (${new Date(c.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`}
                                    >
                                        {new Date(c.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarView;
