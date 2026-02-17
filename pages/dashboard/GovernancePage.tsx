import React, { useState, useEffect } from 'react';
import { Users, UserCheck, BookOpen, Shield, Hash, Crown, ChevronDown, Plus, X, User, GraduationCap, AlertCircle } from 'lucide-react';

const API_URL = 'http://localhost:5001/api/classes';

const GovernancePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'groups' | 'subscriptions' | 'instructors'>('groups');
    const [groups, setGroups] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        Promise.all([
            fetch(`${API_URL}/groups`).then(r => r.json()),
            fetch(`${API_URL}/users`).then(r => r.json()),
            fetch(`${API_URL}/courses`).then(r => r.json()),
        ]).then(([groupsData, usersData, coursesData]) => {
            setGroups(groupsData.groups);
            setUsers(usersData.users);
            setCourses(coursesData.courses);
        }).catch(console.error).finally(() => setLoading(false));
    }, []);

    const students = users.filter(u => u.role === 'student');
    const instructors = users.filter(u => u.role === 'instructor');
    const groupTypeGroups = groups.filter(g => g.type === 'group');
    const individualGroups = groups.filter(g => g.type === 'individual');
    const activeGroups = groups.filter(g => g.status === 'active');
    const totalRevenue = groups.reduce((sum, g) => sum + (g.monthlyFee * g.students.length), 0);

    const tabs = [
        { id: 'groups' as const, icon: Users, label: 'Groups', count: groups.length },
        { id: 'subscriptions' as const, icon: UserCheck, label: 'Subscriptions', count: students.length },
        { id: 'instructors' as const, icon: Crown, label: 'Instructors', count: instructors.length },
    ];

    if (loading) return (
        <div className="flex items-center justify-center h-96">
            <div className="text-center space-y-3">
                <div className="w-12 h-12 border-4 border-indigo-500 border-r-transparent rounded-full animate-spin mx-auto"></div>
                <p className="font-bold opacity-50">Loading governance data...</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30">
                        <Shield className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black">Academy Governance</h1>
                        <p className="text-sm opacity-50">Groups, subscriptions & instructor assignments</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    New Group
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-blue-100/60">
                    <p className="text-sm font-bold opacity-50 mb-1">Group Classes</p>
                    <p className="text-2xl font-black text-violet-600">{groupTypeGroups.length}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-blue-100/60">
                    <p className="text-sm font-bold opacity-50 mb-1">Individual (1:1)</p>
                    <p className="text-2xl font-black text-indigo-600">{individualGroups.length}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-blue-100/60">
                    <p className="text-sm font-bold opacity-50 mb-1">Active Groups</p>
                    <p className="text-2xl font-black text-emerald-600">{activeGroups.length}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-blue-100/60">
                    <p className="text-sm font-bold opacity-50 mb-1">Monthly Revenue</p>
                    <p className="text-2xl font-black text-amber-600">${totalRevenue}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-blue-100/60 pb-1">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-bold text-sm transition-all ${activeTab === tab.id
                            ? 'bg-white border border-b-0 border-blue-100/60 text-violet-600 -mb-[1px]'
                            : 'opacity-50 hover:opacity-80'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-violet-100 text-violet-600' : 'bg-blue-50'}`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in-up">
                {activeTab === 'groups' && (
                    <div className="space-y-4">
                        {groups.map(group => (
                            <div key={group.id} className="bg-white rounded-2xl border border-blue-100/60 overflow-hidden transition-all hover:shadow-md">
                                {/* Group Header */}
                                <div
                                    className="p-5 cursor-pointer flex items-center gap-4"
                                    onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
                                >
                                    {/* Code Badge */}
                                    <div className={`px-3 py-2 rounded-xl text-xs font-black tracking-wider ${group.type === 'individual'
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'bg-violet-100 text-violet-700'
                                        }`}>
                                        <Hash className="w-3 h-3 inline mr-1" />
                                        {group.code}
                                    </div>

                                    {/* Group Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-black text-base truncate">{group.name}</h3>
                                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                                            <span className="text-xs opacity-50 flex items-center gap-1">
                                                <BookOpen className="w-3 h-3" /> {group.courseName}
                                            </span>
                                            <span className="text-xs opacity-50 flex items-center gap-1">
                                                <Crown className="w-3 h-3" /> {group.instructorName}
                                            </span>
                                            <span className="text-xs opacity-50">📅 {group.schedule}</span>
                                        </div>
                                    </div>

                                    {/* Type Badge */}
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${group.type === 'individual'
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'bg-violet-50 text-violet-600'
                                        }`}>
                                        {group.type === 'individual' ? '1:1 Individual' : `Group (${group.occupancy})`}
                                    </span>

                                    {/* Status */}
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${group.status === 'active'
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {group.status}
                                    </span>

                                    {/* Fee */}
                                    <span className="text-sm font-black text-violet-600 min-w-[80px] text-right">
                                        ${group.monthlyFee}/mo
                                    </span>

                                    <ChevronDown className={`w-5 h-5 opacity-40 transition-transform ${expandedGroup === group.id ? 'rotate-180' : ''}`} />
                                </div>

                                {/* Expanded Details */}
                                {expandedGroup === group.id && (
                                    <div className="border-t border-blue-100/60 p-5 bg-blue-50/20 animate-fade-in-up">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Instructor */}
                                            <div>
                                                <h4 className="text-xs font-bold uppercase tracking-wider opacity-40 mb-3">Assigned Instructor</h4>
                                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-blue-100/60">
                                                    <img src={group.instructorAvatar} className="w-10 h-10 rounded-full" alt="" />
                                                    <div>
                                                        <p className="font-bold text-sm">{group.instructorName}</p>
                                                        <p className="text-xs opacity-50">{group.instructorSpecialization}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Course */}
                                            <div>
                                                <h4 className="text-xs font-bold uppercase tracking-wider opacity-40 mb-3">Course & Level</h4>
                                                <div className="p-3 bg-white rounded-xl border border-blue-100/60">
                                                    <p className="font-bold text-sm">{group.courseName}</p>
                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${group.courseLevel === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                                                            group.courseLevel === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                                                                'bg-red-100 text-red-600'
                                                        }`}>{group.courseLevel}</span>
                                                </div>
                                            </div>

                                            {/* Students */}
                                            <div className="md:col-span-2">
                                                <h4 className="text-xs font-bold uppercase tracking-wider opacity-40 mb-3">
                                                    Enrolled Students ({group.studentDetails.length}/{group.maxStudents})
                                                </h4>
                                                {group.studentDetails.length > 0 ? (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        {group.studentDetails.map((s: any) => (
                                                            <div key={s.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-blue-100/60">
                                                                <img src={s.avatar} className="w-8 h-8 rounded-full" alt="" />
                                                                <div className="flex-1">
                                                                    <p className="font-bold text-sm">{s.name}</p>
                                                                    <p className="text-xs opacity-50">Rating: {s.rating}</p>
                                                                </div>
                                                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${s.subscriptionStatus === 'active' ? 'bg-emerald-100 text-emerald-700' :
                                                                        s.subscriptionStatus === 'trial' ? 'bg-amber-100 text-amber-700' :
                                                                            'bg-red-100 text-red-600'
                                                                    }`}>
                                                                    {s.subscriptionStatus}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-6 bg-white rounded-xl border border-dashed border-blue-200 text-center">
                                                        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                                        <p className="text-sm opacity-50">No students enrolled yet</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'subscriptions' && (
                    <div className="bg-white rounded-2xl border border-blue-100/60 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-blue-100/60 bg-blue-50/30">
                                    <th className="text-left p-4 text-xs font-bold uppercase tracking-wider opacity-40">Student</th>
                                    <th className="text-left p-4 text-xs font-bold uppercase tracking-wider opacity-40">Group Code</th>
                                    <th className="text-left p-4 text-xs font-bold uppercase tracking-wider opacity-40">Type</th>
                                    <th className="text-left p-4 text-xs font-bold uppercase tracking-wider opacity-40">Status</th>
                                    <th className="text-left p-4 text-xs font-bold uppercase tracking-wider opacity-40">Rating</th>
                                    <th className="text-left p-4 text-xs font-bold uppercase tracking-wider opacity-40">Enrolled</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => {
                                    const group = groups.find(g => g.id === student.groupId);
                                    return (
                                        <tr key={student.id} className="border-b border-blue-50 last:border-0 hover:bg-blue-50/20 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={student.avatar} className="w-9 h-9 rounded-full" alt="" />
                                                    <div>
                                                        <p className="font-bold text-sm">{student.name}</p>
                                                        <p className="text-xs opacity-40">{student.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {group ? (
                                                    <span className="font-mono text-xs font-bold bg-violet-100 text-violet-700 px-2.5 py-1 rounded-lg">
                                                        {group.code}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs opacity-30">—</span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${student.subscriptionType === 'individual'
                                                        ? 'bg-indigo-100 text-indigo-700'
                                                        : 'bg-violet-100 text-violet-700'
                                                    }`}>
                                                    {student.subscriptionType === 'individual' ? '1:1' : 'Group'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${student.subscriptionStatus === 'active'
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : student.subscriptionStatus === 'trial'
                                                            ? 'bg-amber-100 text-amber-700'
                                                            : 'bg-red-100 text-red-600'
                                                    }`}>
                                                    {student.subscriptionStatus}
                                                </span>
                                            </td>
                                            <td className="p-4 font-bold text-sm text-lime-600">{student.rating}</td>
                                            <td className="p-4 text-xs opacity-50">{student.enrollmentDate}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'instructors' && (
                    <div className="grid gap-6">
                        {instructors.map(instructor => {
                            const instructorGroups = groups.filter(g => g.instructor_id === instructor.id);
                            const totalStudents = instructorGroups.reduce((sum, g) => sum + g.students.length, 0);
                            const groupCount = instructorGroups.filter(g => g.type === 'group').length;
                            const individualCount = instructorGroups.filter(g => g.type === 'individual').length;
                            const monthlyEarnings = instructorGroups.reduce((sum, g) => sum + (g.monthlyFee * g.students.length), 0);

                            return (
                                <div key={instructor.id} className="bg-white rounded-2xl border border-blue-100/60 overflow-hidden">
                                    {/* Instructor Header */}
                                    <div className="p-6 flex items-center gap-4">
                                        <img src={instructor.avatar} className="w-14 h-14 rounded-2xl border-2 border-violet-200" alt="" />
                                        <div className="flex-1">
                                            <h3 className="font-black text-lg">{instructor.name}</h3>
                                            <p className="text-sm opacity-50">{instructor.specialization}</p>
                                        </div>
                                        <div className="grid grid-cols-4 gap-6 text-center">
                                            <div>
                                                <p className="text-xl font-black text-violet-600">{instructorGroups.length}</p>
                                                <p className="text-[10px] font-bold uppercase opacity-40">Groups</p>
                                            </div>
                                            <div>
                                                <p className="text-xl font-black text-indigo-600">{totalStudents}</p>
                                                <p className="text-[10px] font-bold uppercase opacity-40">Students</p>
                                            </div>
                                            <div>
                                                <p className="text-xl font-black text-emerald-600">{groupCount}G / {individualCount}I</p>
                                                <p className="text-[10px] font-bold uppercase opacity-40">Type Split</p>
                                            </div>
                                            <div>
                                                <p className="text-xl font-black text-amber-600">${monthlyEarnings}</p>
                                                <p className="text-[10px] font-bold uppercase opacity-40">Revenue</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Instructor's Groups */}
                                    {instructorGroups.length > 0 && (
                                        <div className="border-t border-blue-100/60 p-4 bg-blue-50/20">
                                            <h4 className="text-xs font-bold uppercase tracking-wider opacity-40 mb-3 px-2">Assigned Groups</h4>
                                            <div className="space-y-2">
                                                {instructorGroups.map(g => (
                                                    <div key={g.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-blue-100/60">
                                                        <span className={`text-xs font-black px-2.5 py-1 rounded-lg font-mono ${g.type === 'individual' ? 'bg-indigo-100 text-indigo-700' : 'bg-violet-100 text-violet-700'
                                                            }`}>
                                                            {g.code}
                                                        </span>
                                                        <span className="font-bold text-sm flex-1">{g.name}</span>
                                                        <span className="text-xs opacity-50">{g.schedule}</span>
                                                        <span className="text-xs font-bold text-violet-600">{g.occupancy}</span>
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${g.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                                            }`}>
                                                            {g.status}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Create Group Modal */}
            {showCreateModal && (
                <CreateGroupModal
                    instructors={instructors}
                    courses={courses}
                    onClose={() => setShowCreateModal(false)}
                    onCreated={(newGroup) => {
                        setGroups(prev => [...prev, newGroup]);
                        setShowCreateModal(false);
                    }}
                />
            )}
        </div>
    );
};

// - - - Create Group Modal - - -
interface CreateGroupModalProps {
    instructors: any[];
    courses: any[];
    onClose: () => void;
    onCreated: (group: any) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ instructors, courses, onClose, onCreated }) => {
    const [form, setForm] = useState({
        name: '', type: 'group', instructor_id: '', course_id: '', maxStudents: 4, schedule: '', monthlyFee: 0
    });
    const [creating, setCreating] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        try {
            const res = await fetch(`${API_URL}/groups`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) onCreated(data.group);
        } catch (err) {
            console.error(err);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black">Create New Group</h2>
                    <button onClick={onClose} className="p-2 hover:bg-blue-50 rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider opacity-50 mb-1 block">Group Name</label>
                        <input
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all font-medium"
                            placeholder="e.g. Opening Mastery - Group B"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider opacity-50 mb-1 block">Type</label>
                            <select
                                value={form.type}
                                onChange={e => setForm({ ...form, type: e.target.value, maxStudents: e.target.value === 'individual' ? 1 : 4 })}
                                className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-violet-400 outline-none font-medium bg-white"
                            >
                                <option value="group">Group</option>
                                <option value="individual">Individual (1:1)</option>
                            </select>
                        </div>
                        {form.type === 'group' && (
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider opacity-50 mb-1 block">Max Students</label>
                                <input
                                    type="number"
                                    min={2}
                                    max={10}
                                    value={form.maxStudents}
                                    onChange={e => setForm({ ...form, maxStudents: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-violet-400 outline-none font-medium"
                                />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider opacity-50 mb-1 block">Instructor</label>
                            <select
                                value={form.instructor_id}
                                onChange={e => setForm({ ...form, instructor_id: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-violet-400 outline-none font-medium bg-white"
                                required
                            >
                                <option value="">Select instructor</option>
                                {instructors.map(i => (
                                    <option key={i.id} value={i.id}>{i.name} — {i.specialization}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider opacity-50 mb-1 block">Course</label>
                            <select
                                value={form.course_id}
                                onChange={e => setForm({ ...form, course_id: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-violet-400 outline-none font-medium bg-white"
                                required
                            >
                                <option value="">Select course</option>
                                {courses.map(c => (
                                    <option key={c.id} value={c.id}>{c.name} ({c.level})</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider opacity-50 mb-1 block">Schedule</label>
                            <input
                                value={form.schedule}
                                onChange={e => setForm({ ...form, schedule: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-violet-400 outline-none font-medium"
                                placeholder="e.g. Mon, Wed — 5 PM"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider opacity-50 mb-1 block">Monthly Fee ($)</label>
                            <input
                                type="number"
                                min={0}
                                value={form.monthlyFee}
                                onChange={e => setForm({ ...form, monthlyFee: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-violet-400 outline-none font-medium"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={creating}
                        className="w-full bg-violet-500 hover:bg-violet-600 text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-violet-500/20 disabled:opacity-50"
                    >
                        {creating ? 'Creating...' : 'Create Group'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GovernancePage;
