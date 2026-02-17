import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Language, translations } from '../translations';
import { Mail, Lock, ArrowLeft, ArrowRight } from 'lucide-react';

interface LoginProps {
    isDarkMode: boolean;
    lang: Language;
}

const Login: React.FC<LoginProps> = ({ isDarkMode, lang }) => {
    const navigate = useNavigate();
    const t = translations[lang]; // You might need to add specific login translations later

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'instructor' | 'admin' | 'parent'>('student');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // JOKER ADMIN CHECK
        if (email === 'admin' && password === 'admin0') {
            navigate('/dashboard/admin');
            return;
        }

        // TODO: Implement actual login logic with Supabase
        console.log('Logging in as:', role);
        navigate(`/dashboard/${role}`);
    };

    return (
        <div className={`min-h-screen flex flex-col justify-center items-center p-6 ${isDarkMode ? 'bg-[#00172D] text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl ${isDarkMode ? 'bg-[#002b4d] border border-white/5' : 'bg-white border border-slate-100'}`}>

                <div className="flex justify-center mb-8">
                    <Logo isDarkMode={isDarkMode} className="transform scale-125" />
                </div>

                <h2 className="text-3xl font-bold text-center mb-2">{lang === 'en' ? 'Welcome Back' : 'مرحباً بعودتك'}</h2>
                <p className="text-center opacity-60 mb-8">{lang === 'en' ? 'Sign in to access your portal' : 'سجل الدخول للوصول إلى لوحة التحكم'}</p>

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

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-80">{lang === 'en' ? 'Email Address' : 'البريد الإلكتروني'}</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                            <input
                                type="text"
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

                    <button type="submit" className="w-full bg-lime-500 hover:bg-lime-400 text-[#00172D] font-black py-4 rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-lime-500/25 active:scale-95 flex items-center justify-center gap-2">
                        {lang === 'en' ? 'Sign In' : 'تسجيل الدخول'}
                        {lang === 'en' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                    </button>
                </form>

                <p className="text-center mt-6 opacity-60 text-sm">
                    {lang === 'en' ? "Don't have an account?" : "ليس لديك حساب؟"}
                    <button onClick={() => navigate('/register')} className="font-bold underline text-lime-500 hover:text-lime-400 mx-1">
                        {lang === 'en' ? 'Register Now' : 'سجل الآن'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
