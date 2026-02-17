import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { Language, translations } from '../translations';
import { Mail, Lock, User, ArrowLeft, ArrowRight } from 'lucide-react';

interface RegisterProps {
    isDarkMode: boolean;
    lang: Language;
}

const Register: React.FC<RegisterProps> = ({ isDarkMode, lang }) => {
    const navigate = useNavigate();

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'instructor' | 'parent'>('student');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API delay
        setTimeout(() => {
            setLoading(false);
            // In a real app, this would create a user in Supabase
            // For now, we mock success and redirect to dashboard
            navigate(`/dashboard/${role}`);
        }, 1500);
    };

    return (
        <div className={`min-h-screen flex flex-col justify-center items-center p-6 ${isDarkMode ? 'bg-[#00172D] text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl ${isDarkMode ? 'bg-[#002b4d] border border-white/5' : 'bg-white border border-slate-100'}`}>

                <div className="flex justify-center mb-6">
                    <Logo isDarkMode={isDarkMode} className="transform scale-125" />
                </div>

                <h2 className="text-3xl font-bold text-center mb-2">{lang === 'en' ? 'Create Account' : 'إنشاء حساب جديد'}</h2>
                <p className="text-center opacity-60 mb-6">{lang === 'en' ? 'Join Pioneers Chess Academy today' : 'انضم إلى أكاديمية الرواد للشطرنج اليوم'}</p>

                {/* Role Selector */}
                <div className="flex p-1 bg-black/5 dark:bg-white/5 rounded-xl mb-6">
                    {(['student', 'instructor', 'parent'] as const).map((r) => (
                        <button
                            key={r}
                            onClick={() => setRole(r)}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all capitalize ${role === r
                                ? 'bg-lime-500 text-[#00172D] shadow-lg'
                                : 'opacity-60 hover:opacity-100'}`}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-80">{lang === 'en' ? 'Full Name' : 'الاسم الكامل'}</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full py-4 pl-12 pr-4 rounded-xl border-2 focus:outline-none transition-all ${isDarkMode
                                    ? 'bg-white/5 border-white/10 focus:border-lime-500'
                                    : 'bg-slate-50 border-slate-200 focus:border-lime-500'}`}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-80">{lang === 'en' ? 'Email Address' : 'البريد الإلكتروني'}</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full py-4 pl-12 pr-4 rounded-xl border-2 focus:outline-none transition-all ${isDarkMode
                                    ? 'bg-white/5 border-white/10 focus:border-lime-500'
                                    : 'bg-slate-50 border-slate-200 focus:border-lime-500'}`}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-80">{lang === 'en' ? 'Password' : 'كلمة المرور'}</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full py-4 pl-12 pr-4 rounded-xl border-2 focus:outline-none transition-all ${isDarkMode
                                    ? 'bg-white/5 border-white/10 focus:border-lime-500'
                                    : 'bg-slate-50 border-slate-200 focus:border-lime-500'}`}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-lime-500 hover:bg-lime-400 text-[#00172D] font-black py-4 rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-lime-500/25 active:scale-95 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : (lang === 'en' ? 'Sign Up' : 'إنشاء حساب')}
                        {!loading && (lang === 'en' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />)}
                    </button>
                </form>

                <p className="text-center mt-6 opacity-60 text-sm">
                    {lang === 'en' ? "Already have an account?" : "لديك حساب بالفعل؟"}
                    <Link to="/login" className="font-bold underline text-lime-500 hover:text-lime-400 ml-1">
                        {lang === 'en' ? 'Sign In' : 'سجل الدخول'}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
