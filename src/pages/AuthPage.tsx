import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Phone, Loader2 } from 'lucide-react';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    // Auth State
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!otpSent) {
                // Step 1: Send OTP
                const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

                const { error } = await supabase.auth.signInWithOtp({
                    phone: formattedPhone,
                    options: {
                        data: {
                            // Only attach metadata on sign up
                            full_name: !isLogin ? fullName : undefined,
                        },
                    },
                });

                if (error) throw error;
                setOtpSent(true);
            } else {
                // Step 2: Verify OTP
                const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
                const { data, error } = await supabase.auth.verifyOtp({
                    phone: formattedPhone,
                    token: otp,
                    type: 'sms',
                });

                if (error) throw error;

                if (data.session && data.user) {
                    await checkUserRole(data.user.id);
                }
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const checkUserRole = async (userId: string) => {
        try {
            const { data: profile } = await supabase
                .from('profiles')
                .select('is_admin')
                .eq('id', userId)
                .single();

            if (profile?.is_admin) {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            // Fallback if profile fetch fails (e.g., first login lag), go to dashboard
            navigate('/dashboard');
        }
    };

    const resetForm = () => {
        setError(null);
        setOtpSent(false);
        setOtp('');
        // Keep phone number for convenience
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-700">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                        {isLogin ? 'Sign in with your phone number' : 'Join us to find your dream job'}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">

                    {/* Full Name - Only for Sign Up and if NOT verifying OTP yet */}
                    {!isLogin && !otpSent && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                            <input
                                type="text"
                                required={!isLogin}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                    )}

                    {/* Phone Number / OTP Inputs */}
                    {!otpSent ? (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium z-10 select-none">
                                    {phoneNumber.startsWith('+') ? '' : '+91 '}
                                </span>
                                <input
                                    type="tel"
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9+]/g, ''))}
                                    className={`w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${!phoneNumber.startsWith('+') ? 'pl-12' : ''}`}
                                    placeholder="9876543210"
                                />
                                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            </div>
                            <p className="mt-2 text-xs text-slate-500">
                                We'll send you a verification code via SMS.
                            </p>
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Enter Verification Code
                            </label>
                            <input
                                type="text"
                                required={otpSent}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-center tracking-widest text-lg font-bold"
                                placeholder="123456"
                                maxLength={6}
                                autoFocus
                            />
                            <div className="flex justify-between items-center mt-2">
                                <button
                                    type="button"
                                    onClick={() => setOtpSent(false)}
                                    className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                >
                                    Wrong number?
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOtpSent(false)}
                                    className="text-xs text-primary font-medium hover:underline"
                                >
                                    Resend Code
                                </button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-1">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 mt-4 rounded-xl bg-primary text-white font-bold text-base hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {otpSent ? 'Verifying...' : 'Sending OTP...'}
                            </>
                        ) : (
                            otpSent ? 'Verify & Continue' : 'Get OTP'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            resetForm();
                        }}
                        className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                    >
                        {isLogin ? "Don't have an account? Create Account" : "Already have an account? Sign In"}
                    </button>
                </div>
            </div>
        </div>
    );
}
