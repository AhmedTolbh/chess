import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, BookOpen, User, DollarSign, GraduationCap, Shield, Bell, ChevronDown, Menu, X } from 'lucide-react';
import Logo from '../components/Logo';
import { Language } from '../translations';

interface DashboardLayoutProps {
    isDarkMode: boolean;
    lang: Language;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ isDarkMode, lang }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Determine role from path
    const pathParts = location.pathname.split('/');
    const role = pathParts[2] || 'student';

    // Role-based display
    const roleConfig: Record<string, { title: string; icon: any; color: string; userName: string }> = {
        student: { title: 'Student Portal', icon: GraduationCap, color: 'text-blue-500', userName: 'Sara Al-Rashid' },
        instructor: { title: 'Instructor Portal', icon: BookOpen, color: 'text-lime-500', userName: 'Ahmed Al-Masri' },
        admin: { title: 'Admin Portal', icon: Shield, color: 'text-red-500', userName: 'Admin User' },
        parent: { title: 'Parent Portal', icon: Users, color: 'text-purple-500', userName: 'Khalid Al-Rashid' },
    };

    const currentRole = roleConfig[role] || roleConfig.student;
    const RoleIcon = currentRole.icon;

    // Role-based menu
    const getMenuItems = () => {
        const base = [
            { icon: LayoutDashboard, label: 'Overview', path: `/dashboard/${role}` },
        ];

        switch (role) {
            case 'student':
                return [
                    ...base,
                    { icon: Calendar, label: 'Calendar', path: `/dashboard/${role}/calendar` },
                    { icon: BookOpen, label: 'My Courses', path: `/dashboard/${role}` },
                ];
            case 'instructor':
                return [
                    ...base,
                    { icon: Calendar, label: 'Calendar', path: `/dashboard/${role}/calendar` },
                    { icon: Users, label: 'My Students', path: `/dashboard/${role}` },
                    { icon: DollarSign, label: 'Financials', path: `/dashboard/${role}/financials` },
                ];
            case 'admin':
                return [
                    ...base,
                    { icon: Calendar, label: 'Calendar', path: `/dashboard/${role}/calendar` },
                    { icon: Shield, label: 'Governance', path: `/dashboard/${role}/governance` },
                    { icon: Users, label: 'Users', path: `/dashboard/${role}` },
                    { icon: BookOpen, label: 'Courses', path: `/dashboard/${role}` },
                ];
            case 'parent':
                return [
                    ...base,
                    { icon: Calendar, label: 'Calendar', path: `/dashboard/${role}/calendar` },
                    { icon: GraduationCap, label: "Child's Progress", path: `/dashboard/${role}` },
                ];
            default:
                return base;
        }
    };

    const menuItems = getMenuItems();

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 text-slate-800">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`w-72 fixed h-full z-40 transition-all border-r flex flex-col bg-white border-blue-100 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                {/* Logo + Close */}
                <div className="p-6 flex items-center justify-between">
                    <Logo isDarkMode={isDarkMode} className="scale-90 origin-left" />
                    <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Role Badge */}
                <div className="mx-4 mb-6 p-3 rounded-2xl flex items-center gap-3 bg-blue-50/50">
                    <div className="p-2 rounded-xl bg-white shadow-sm">
                        <RoleIcon className={`w-5 h-5 ${currentRole.color}`} />
                    </div>
                    <div>
                        <p className="text-sm font-black">{currentRole.userName}</p>
                        <p className={`text-xs font-bold ${currentRole.color}`}>{currentRole.title}</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map((item, idx) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={idx}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                    ? 'bg-lime-500 text-slate-900 font-bold shadow-lg shadow-lime-500/20'
                                    : 'opacity-70 hover:opacity-100 hover:bg-blue-50'}`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom section */}
                <div className="p-4 space-y-2">
                    {/* Role Switcher (Dev/Demo mode) */}
                    <div className="p-3 rounded-xl bg-blue-50/50">
                        <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold mb-2">Switch Role (Demo)</p>
                        <div className="grid grid-cols-2 gap-1">
                            {['student', 'instructor', 'admin', 'parent'].map(r => (
                                <button
                                    key={r}
                                    onClick={() => { navigate(`/dashboard/${r}`); setSidebarOpen(false); }}
                                    className={`text-xs font-bold py-1.5 px-2 rounded-lg capitalize transition-all ${role === r
                                        ? 'bg-lime-500 text-slate-900'
                                        : 'hover:bg-blue-100/50 opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/login')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium opacity-70 hover:opacity-100 hover:bg-red-500/10 hover:text-red-500`}
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 lg:ml-72 min-h-screen`}>
                {/* Top Bar */}
                <header className="sticky top-0 z-20 px-6 py-4 flex justify-between items-center border-b backdrop-blur-xl bg-white/80 border-blue-100/60">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-xl font-black">{currentRole.title}</h1>
                            <p className="text-sm opacity-50">Welcome back, {currentRole.userName}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2.5 rounded-xl transition-colors hover:bg-blue-50">
                            <Bell className="w-5 h-5 opacity-60" />
                            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></div>
                        </button>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-lime-100 text-lime-700">
                            {currentRole.userName.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-8 animate-fade-in-up">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
