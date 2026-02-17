import React, { useState } from 'react';
import { X, Calendar, Clock, Link as LinkIcon } from 'lucide-react';

interface CreateClassModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    instructorId: string;
}

const CreateClassModal: React.FC<CreateClassModalProps> = ({ isOpen, onClose, onSuccess, instructorId }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('60'); // minutes
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const startDateTime = new Date(`${date}T${time}`);
        const endDateTime = new Date(startDateTime.getTime() + parseInt(duration) * 60000);

        try {
            const response = await fetch('http://localhost:5001/api/classes/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    courseId: 'course-123', // Hardcoded for demo
                    instructorId,
                    startTime: startDateTime.toISOString(),
                    endTime: endDateTime.toISOString(),
                }),
            });

            if (response.ok) {
                onSuccess();
                onClose();
            } else {
                alert('Failed to schedule class');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 opacity-50 hover:opacity-100">
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-xl font-bold mb-6">Schedule New Class</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold opacity-70 mb-1">Class Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full p-3 rounded-xl bg-blue-50/30 border border-blue-100"
                            placeholder="e.g. Advanced Tactics"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold opacity-70 mb-1">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    className="w-full p-3 pl-10 rounded-xl bg-blue-50/30 border border-blue-100"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold opacity-70 mb-1">Time</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                                <input
                                    type="time"
                                    value={time}
                                    onChange={e => setTime(e.target.value)}
                                    className="w-full p-3 pl-10 rounded-xl bg-blue-50/30 border border-blue-100"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold opacity-70 mb-1">Duration (Minutes)</label>
                        <select
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                            className="w-full p-3 rounded-xl bg-blue-50/30 border border-blue-100"
                        >
                            <option value="30">30 Minutes</option>
                            <option value="45">45 Minutes</option>
                            <option value="60">60 Minutes</option>
                            <option value="90">90 Minutes</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-lime-500 hover:bg-lime-400 text-[#1a1a2e] font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                        >
                            {loading ? 'Creating Link...' : 'Schedule Class & Generate Link'}
                        </button>
                        <p className="text-xs text-center mt-3 opacity-60">
                            This will automatically generate a Google Meet link protected by our system.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateClassModal;
