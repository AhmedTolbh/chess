import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Loader2, CheckCircle, AlertCircle, Search, User, Phone, BookOpen, GraduationCap, MessageSquare } from 'lucide-react';
import { Language, translations } from '../translations';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
    lang: Language;
    preselectedPlan?: string;
}

interface CountryData {
    name: string;
    dial_code: string;
    code: string;
    flag: string;
}

const COUNTRIES: CountryData[] = [
    { name: "Saudi Arabia", dial_code: "966", code: "SA", flag: "🇸🇦" },
    { name: "Egypt", dial_code: "20", code: "EG", flag: "🇪🇬" },
    { name: "United Arab Emirates", dial_code: "971", code: "AE", flag: "🇦🇪" },
    { name: "Kuwait", dial_code: "965", code: "KW", flag: "🇰🇼" },
    { name: "Qatar", dial_code: "974", code: "QA", flag: "🇶🇦" },
    { name: "Bahrain", dial_code: "973", code: "BH", flag: "🇧🇭" },
    { name: "Oman", dial_code: "968", code: "OM", flag: "🇴🇲" },
    { name: "Jordan", dial_code: "962", code: "JO", flag: "🇯🇴" },
    { name: "Iraq", dial_code: "964", code: "IQ", flag: "🇮🇶" },
    { name: "Lebanon", dial_code: "961", code: "LB", flag: "🇱🇧" },
    { name: "Syria", dial_code: "963", code: "SY", flag: "🇸🇾" },
    { name: "Palestine", dial_code: "970", code: "PS", flag: "🇵🇸" },
    { name: "Yemen", dial_code: "967", code: "YE", flag: "🇾🇪" },
    { name: "Libya", dial_code: "218", code: "LY", flag: "🇱🇾" },
    { name: "Tunisia", dial_code: "216", code: "TN", flag: "🇹🇳" },
    { name: "Algeria", dial_code: "213", code: "DZ", flag: "🇩🇿" },
    { name: "Morocco", dial_code: "212", code: "MA", flag: "🇲🇦" },
    { name: "Sudan", dial_code: "249", code: "SD", flag: "🇸🇩" },
    { name: "Somalia", dial_code: "252", code: "SO", flag: "🇸🇴" },
    { name: "Mauritania", dial_code: "222", code: "MR", flag: "🇲🇷" },
    { name: "Turkey", dial_code: "90", code: "TR", flag: "🇹🇷" },
    { name: "Pakistan", dial_code: "92", code: "PK", flag: "🇵🇰" },
    { name: "India", dial_code: "91", code: "IN", flag: "🇮🇳" },
    { name: "United States", dial_code: "1", code: "US", flag: "🇺🇸" },
    { name: "United Kingdom", dial_code: "44", code: "GB", flag: "🇬🇧" },
    { name: "France", dial_code: "33", code: "FR", flag: "🇫🇷" },
    { name: "Germany", dial_code: "49", code: "DE", flag: "🇩🇪" },
    { name: "Canada", dial_code: "1", code: "CA", flag: "🇨🇦" },
    { name: "Australia", dial_code: "61", code: "AU", flag: "🇦🇺" },
    { name: "Malaysia", dial_code: "60", code: "MY", flag: "🇲🇾" },
    { name: "Indonesia", dial_code: "62", code: "ID", flag: "🇮🇩" },
    { name: "Bangladesh", dial_code: "880", code: "BD", flag: "🇧🇩" },
    { name: "Nigeria", dial_code: "234", code: "NG", flag: "🇳🇬" },
    { name: "South Africa", dial_code: "27", code: "ZA", flag: "🇿🇦" },
];

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, isDarkMode, lang, preselectedPlan }) => {
    const t = translations[lang].registration;
    const modalRef = useRef<HTMLDivElement>(null);

    // Form state
    const [childName, setChildName] = useState('');
    const [age, setAge] = useState('');
    const [level, setLevel] = useState('');
    const [plan, setPlan] = useState(preselectedPlan || '');
    const [parentName, setParentName] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');

    // Country code state
    const [selectedCountry, setSelectedCountry] = useState<CountryData>(COUNTRIES[0]);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [countrySearch, setCountrySearch] = useState('');
    const [detectedCountry, setDetectedCountry] = useState('');

    // UI state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<string[]>([]);

    // Auto-detect country on mount
    useEffect(() => {
        if (isOpen) {
            detectCountry();
        }
    }, [isOpen]);

    // Update plan when preselectedPlan changes
    useEffect(() => {
        if (preselectedPlan) setPlan(preselectedPlan);
    }, [preselectedPlan]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    // Close country dropdown on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (showCountryDropdown && !(e.target as Element)?.closest('.country-dropdown-container')) {
                setShowCountryDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [showCountryDropdown]);

    const detectCountry = async () => {
        try {
            const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
            const data = await res.json();
            if (data.country_code) {
                const found = COUNTRIES.find(c => c.code === data.country_code);
                if (found) {
                    setSelectedCountry(found);
                    setDetectedCountry(data.country_name || found.name);
                }
            }
        } catch {
            // Fallback: keep default (Saudi Arabia)
        }
    };

    const resetForm = () => {
        setChildName('');
        setAge('');
        setLevel('');
        setPlan(preselectedPlan || '');
        setParentName('');
        setPhone('');
        setNotes('');
        setErrors([]);
        setSubmitStatus('idle');
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);
        setIsSubmitting(true);

        try {
            const res = await fetch(`${API_BASE}/api/registrations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    childName,
                    age: parseInt(age),
                    level,
                    plan,
                    parentName,
                    phone,
                    countryCode: selectedCountry.dial_code,
                    country: detectedCountry || selectedCountry.name,
                    notes,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrors(data.errors || [data.message || t.error_generic]);
                setSubmitStatus('error');
            } else {
                setSubmitStatus('success');
            }
        } catch {
            setErrors([t.error_network]);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredCountries = COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
        c.dial_code.includes(countrySearch)
    );

    if (!isOpen) return null;

    const inputClasses = `w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none text-base ${isDarkMode
            ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-lime-500 focus:bg-white/10'
            : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-lime-500 focus:bg-lime-50/30'
        }`;

    const labelClasses = `block text-sm font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`;

    const selectClasses = `w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none text-base appearance-none cursor-pointer ${isDarkMode
            ? 'bg-white/5 border-white/10 text-white focus:border-lime-500 focus:bg-white/10'
            : 'bg-white border-slate-200 text-slate-900 focus:border-lime-500 focus:bg-lime-50/30'
        }`;

    // Success state
    if (submitStatus === 'success') {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={handleClose}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
                <div
                    className={`relative w-full max-w-md rounded-3xl p-10 text-center transform animate-fade-in-up ${isDarkMode ? 'bg-[#0B1F3A] border border-white/10' : 'bg-white shadow-2xl'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-lime-500/20 flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-lime-500" />
                    </div>
                    <h3 className={`text-2xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {t.success_title}
                    </h3>
                    <p className={`text-base mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {t.success_desc}
                    </p>
                    <button
                        onClick={handleClose}
                        className="bg-lime-500 hover:bg-lime-400 text-[#00172D] font-black px-8 py-3.5 rounded-xl text-base transition-all hover:scale-105"
                    >
                        {t.success_close}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={handleClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <div
                ref={modalRef}
                className={`relative w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden transform animate-fade-in-up ${isDarkMode ? 'bg-[#0B1F3A] border border-white/10' : 'bg-white shadow-2xl'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`sticky top-0 z-10 px-8 py-6 border-b ${isDarkMode ? 'border-white/10 bg-[#0B1F3A]' : 'border-slate-100 bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {t.title} <span className="text-lime-500">{t.title_accent}</span>
                            </h2>
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.subtitle}</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${isDarkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
                                }`}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)] px-8 py-6 space-y-5">
                    {/* Error messages */}
                    {errors.length > 0 && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                {errors.map((err, i) => (
                                    <p key={i} className="text-red-500 text-sm font-medium">{err}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Child Name */}
                    <div>
                        <label className={labelClasses}>
                            <span className="inline-flex items-center gap-2"><User className="w-4 h-4" /> {t.child_name}</span>
                        </label>
                        <input
                            type="text"
                            value={childName}
                            onChange={(e) => setChildName(e.target.value)}
                            placeholder={t.child_name_placeholder}
                            className={inputClasses}
                            required
                            dir="auto"
                        />
                    </div>

                    {/* Age + Level Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClasses}>{t.age}</label>
                            <input
                                type="number"
                                min={5}
                                max={18}
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder={t.age_placeholder}
                                className={inputClasses}
                                required
                            />
                        </div>
                        <div className="relative">
                            <label className={labelClasses}>
                                <span className="inline-flex items-center gap-2"><GraduationCap className="w-4 h-4" /> {t.level}</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                    className={selectClasses}
                                    required
                                >
                                    <option value="">{t.level_placeholder}</option>
                                    <option value="beginner">{t.level_beginner}</option>
                                    <option value="intermediate">{t.level_intermediate}</option>
                                    <option value="advanced">{t.level_advanced}</option>
                                </select>
                                <ChevronDown className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${lang === 'ar' ? 'left-4' : 'right-4'} ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                            </div>
                        </div>
                    </div>

                    {/* Preferred Plan */}
                    <div className="relative">
                        <label className={labelClasses}>
                            <span className="inline-flex items-center gap-2"><BookOpen className="w-4 h-4" /> {t.plan}</span>
                        </label>
                        <div className="relative">
                            <select
                                value={plan}
                                onChange={(e) => setPlan(e.target.value)}
                                className={selectClasses}
                                required
                            >
                                <option value="">{t.plan_placeholder}</option>
                                <option value="group">{t.plan_group}</option>
                                <option value="private">{t.plan_private}</option>
                            </select>
                            <ChevronDown className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${lang === 'ar' ? 'left-4' : 'right-4'} ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                        </div>
                    </div>

                    {/* Parent Name */}
                    <div>
                        <label className={labelClasses}>
                            <span className="inline-flex items-center gap-2"><User className="w-4 h-4" /> {t.parent_name}</span>
                        </label>
                        <input
                            type="text"
                            value={parentName}
                            onChange={(e) => setParentName(e.target.value)}
                            placeholder={t.parent_name_placeholder}
                            className={inputClasses}
                            required
                            dir="auto"
                        />
                    </div>

                    {/* Phone with Country Code */}
                    <div>
                        <label className={labelClasses}>
                            <span className="inline-flex items-center gap-2"><Phone className="w-4 h-4" /> {t.phone}</span>
                        </label>
                        <div className="flex gap-2">
                            {/* Country Code Picker */}
                            <div className="relative country-dropdown-container flex-shrink-0" style={{ width: '140px' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                    className={`w-full flex items-center gap-2 px-3 py-3.5 rounded-xl border-2 transition-all duration-300 text-base ${isDarkMode
                                            ? 'bg-white/5 border-white/10 text-white hover:border-lime-500'
                                            : 'bg-white border-slate-200 text-slate-900 hover:border-lime-500'
                                        }`}
                                >
                                    <span className="text-lg">{selectedCountry.flag}</span>
                                    <span className="font-bold text-sm">+{selectedCountry.dial_code}</span>
                                    <ChevronDown className="w-3 h-3 ml-auto opacity-50" />
                                </button>

                                {/* Dropdown */}
                                {showCountryDropdown && (
                                    <div className={`absolute top-full mt-2 w-72 rounded-xl border-2 overflow-hidden shadow-2xl z-50 ${isDarkMode ? 'bg-[#0B1F3A] border-white/10' : 'bg-white border-slate-200'
                                        } ${lang === 'ar' ? 'right-0' : 'left-0'}`}>
                                        <div className={`p-3 border-b ${isDarkMode ? 'border-white/10' : 'border-slate-100'}`}>
                                            <div className="relative">
                                                <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
                                                <input
                                                    type="text"
                                                    value={countrySearch}
                                                    onChange={(e) => setCountrySearch(e.target.value)}
                                                    placeholder={t.search_country}
                                                    className={`w-full py-2 rounded-lg text-sm outline-none ${isDarkMode ? 'bg-white/5 text-white placeholder-slate-500' : 'bg-slate-50 text-slate-900 placeholder-slate-400'
                                                        } ${lang === 'ar' ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
                                                    autoFocus
                                                />
                                            </div>
                                        </div>
                                        <div className="max-h-56 overflow-y-auto">
                                            {filteredCountries.map((country) => (
                                                <button
                                                    key={country.code}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedCountry(country);
                                                        setShowCountryDropdown(false);
                                                        setCountrySearch('');
                                                    }}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all ${selectedCountry.code === country.code
                                                            ? 'bg-lime-500/10 text-lime-500'
                                                            : isDarkMode ? 'text-slate-300 hover:bg-white/5' : 'text-slate-700 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <span className="text-lg">{country.flag}</span>
                                                    <span className="font-medium flex-1 text-start">{country.name}</span>
                                                    <span className="opacity-50">+{country.dial_code}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Phone input */}
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                placeholder={t.phone_placeholder}
                                className={`${inputClasses} flex-1`}
                                required
                                dir="ltr"
                            />
                        </div>
                        {detectedCountry && (
                            <p className={`text-xs mt-1.5 flex items-center gap-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                ✨ {t.detected}: {detectedCountry}
                            </p>
                        )}
                    </div>

                    {/* Notes */}
                    <div>
                        <label className={labelClasses}>
                            <span className="inline-flex items-center gap-2"><MessageSquare className="w-4 h-4" /> {t.notes}</span>
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder={t.notes_placeholder}
                            rows={3}
                            className={`${inputClasses} resize-none`}
                            dir="auto"
                        />
                    </div>

                    {/* Submit */}
                    <div className={`sticky bottom-0 pt-4 pb-2 ${isDarkMode ? 'bg-[#0B1F3A]' : 'bg-white'}`}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-lime-500 hover:bg-lime-400 disabled:opacity-50 disabled:cursor-not-allowed text-[#00172D] font-black py-4 rounded-2xl text-lg transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(132,204,22,0.4)] flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {t.submitting}
                                </>
                            ) : (
                                t.submit
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationModal;
