import React from 'react';
import { Calendar, Clock, Video, CheckCircle, XCircle, Users } from 'lucide-react';

interface ClassCardProps {
    session: any;
    role: 'student' | 'instructor' | 'parent';
    onJoin?: (link: string) => void;
    onMarkAttendance?: (id: string, status: 'present' | 'absent') => void;
}

const ClassCard: React.FC<ClassCardProps> = ({ session, role, onJoin, onMarkAttendance }) => {
    const startTime = new Date(session.startTime);
    const endTime = new Date(session.endTime);
    const now = new Date();

    // Joinable: 60 mins before start until end time
    const isJoinable = now >= new Date(startTime.getTime() - 60 * 60000) && now <= endTime && session.status !== 'completed';
    const isLive = now >= startTime && now <= endTime && session.status !== 'completed';
    const isPast = now > endTime || session.status === 'completed';

    // Countdown
    const getCountdown = () => {
        const diff = startTime.getTime() - now.getTime();
        if (diff <= 0) return null;
        const hours = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        if (hours > 24) return `in ${Math.floor(hours / 24)}d`;
        if (hours > 0) return `in ${hours}h ${mins}m`;
        return `in ${mins}m`;
    };

    const dateStr = startTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const timeStr = `${startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    const meetLink = session.meetLink || session.google_meet_link;

    return (
        <div className={`p-5 rounded-2xl border transition-all hover:shadow-lg relative overflow-hidden ${isPast
            ? 'bg-blue-50/30 border-blue-100'
            : isLive
                ? 'bg-gradient-to-br from-lime-50 to-green-50 border-lime-300 shadow-lg shadow-lime-500/10'
                : 'bg-white border-blue-100'
            }`}>
            {/* LIVE indicator */}
            {isLive && (
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-black animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    LIVE NOW
                </div>
            )}

            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-lime-600 mb-1 block">
                        {session.courseName}
                    </span>
                    <h3 className="text-lg font-bold">{session.title}</h3>
                </div>
                {!isLive && (
                    <div className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${session.status === 'completed' ? 'bg-green-100 text-green-700' :
                        session.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                        }`}>
                        {session.status}
                    </div>
                )}
            </div>

            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm opacity-70">
                    <Calendar className="w-4 h-4" />
                    <span>{dateStr}</span>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-70">
                    <Clock className="w-4 h-4" />
                    <span>{timeStr}</span>
                    {!isPast && getCountdown() && (
                        <span className="ml-auto text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                            {getCountdown()}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {isLive && meetLink ? (
                    <button
                        onClick={() => onJoin?.(meetLink)}
                        className="flex-1 bg-lime-500 hover:bg-lime-400 text-[#1a1a2e] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-500/20 hover:shadow-lime-500/40 hover:scale-[1.02] active:scale-95"
                    >
                        <Video className="w-5 h-5" />
                        Join Now
                    </button>
                ) : isJoinable && meetLink ? (
                    <button
                        onClick={() => onJoin?.(meetLink)}
                        className="flex-1 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                        <Video className="w-4 h-4" />
                        Join Class
                    </button>
                ) : isPast ? (
                    <div className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-blue-50/40 text-sm">
                        {session.attendance === 'present' ? (
                            <span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle className="w-4 h-4" />Present</span>
                        ) : session.attendance === 'absent' ? (
                            <span className="flex items-center gap-1 text-red-500 font-bold"><XCircle className="w-4 h-4" />Absent</span>
                        ) : (
                            <span className="opacity-50">Class Ended</span>
                        )}
                    </div>
                ) : (
                    <button disabled className="flex-1 bg-blue-50/40 text-blue-300 font-bold py-2 px-4 rounded-xl cursor-not-allowed text-sm">
                        {getCountdown() ? `Starts ${getCountdown()}` : 'Upcoming'}
                    </button>
                )}

                {role === 'instructor' && (isJoinable || isLive) && session.status !== 'completed' && (
                    <div className="flex gap-2">
                        <button onClick={() => onMarkAttendance?.(session.id, 'present')} title="Mark Present" className="p-2.5 rounded-xl bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                            <CheckCircle className="w-5 h-5" />
                        </button>
                        <button onClick={() => onMarkAttendance?.(session.id, 'absent')} title="Mark Absent" className="p-2.5 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                            <XCircle className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassCard;
