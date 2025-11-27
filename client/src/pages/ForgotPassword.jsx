import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { FiMail, FiAlertCircle, FiCheckCircle, FiArrowLeft, FiLock } from 'react-icons/fi';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/auth/forgot-password', { email });
            setSuccess(true);
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to send reset email. Please try again.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070)',
                        filter: 'brightness(0.3)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-red-900/30 to-black/80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Back to Login */}
                <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all mb-8 group backdrop-blur-sm bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:border-red-500/50"
                >
                    <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Login</span>
                </Link>

                <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                    {!success ? (
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                                    {/* Animated Ring */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-pink-600 opacity-30 animate-ping"></div>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-pink-600 opacity-50 blur-xl"></div>
                                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-pink-600 flex items-center justify-center shadow-lg shadow-red-600/50">
                                        <FiLock className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-4xl font-black mb-3 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                                    Forgot Password?
                                </h2>
                                <p className="text-gray-300 text-lg">
                                    Don't worry, we've got you covered
                                </p>
                                <p className="text-gray-400 text-sm mt-2">
                                    Enter your email and we'll send you reset instructions
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/50 rounded-xl flex items-center space-x-3 text-red-300 animate-shake">
                                    <FiAlertCircle className="flex-shrink-0 w-5 h-5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold mb-3 text-gray-200">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity blur"></div>
                                        <div className="relative flex items-center">
                                            <FiMail className="absolute left-4 text-gray-400 group-focus-within:text-red-400 transition-colors z-10" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    setError('');
                                                }}
                                                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                                                placeholder="Enter your email"
                                                required
                                                autoComplete="email"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="relative w-full group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative py-4 font-bold text-white flex items-center justify-center gap-2">
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending Magic Link...
                                            </>
                                        ) : (
                                            <>
                                                <FiMail className="w-5 h-5" />
                                                Send Reset Link
                                            </>
                                        )}
                                    </div>
                                </button>
                            </form>

                            {/* Additional Links */}
                            <div className="mt-8 text-center">
                                <p className="text-gray-400 text-sm">
                                    Remember your password?{' '}
                                    <Link to="/login" className="text-red-400 hover:text-red-300 font-semibold transition-colors">
                                        Sign in here
                                    </Link>
                                </p>
                            </div>
                        </>
                    ) : (
                        /* Success Message */
                        <div className="text-center py-8 animate-fadeIn">
                            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 opacity-30 animate-ping"></div>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 opacity-50 blur-xl"></div>
                                <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-600/50">
                                    <FiCheckCircle className="w-12 h-12 text-white" />
                                </div>
                            </div>

                            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                                Check Your Inbox!
                            </h2>

                            <p className="text-gray-300 mb-3 text-lg">
                                We've sent password reset instructions to:
                            </p>

                            <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 mb-8">
                                <p className="text-white font-bold text-xl">
                                    {email}
                                </p>
                            </div>

                            <div className="p-5 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl mb-8">
                                <p className="text-blue-300 text-sm leading-relaxed">
                                    <strong className="block mb-2">📧 Didn't receive the email?</strong>
                                    Check your spam folder or{' '}
                                    <button
                                        onClick={() => {
                                            setSuccess(false);
                                            setEmail('');
                                        }}
                                        className="underline hover:text-blue-200 transition-colors font-semibold"
                                    >
                                        try another email address
                                    </button>
                                </p>
                            </div>

                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-red-600/30 text-white"
                            >
                                <FiArrowLeft className="w-5 h-5" />
                                Back to Login
                            </Link>
                        </div>
                    )}
                </div>

                {/* Help Text */}
                {!success && (
                    <div className="mt-6 text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-gray-400 text-sm">
                            Need help?{' '}
                            <a href="mailto:support@showq.com" className="text-red-400 hover:text-red-300 font-semibold transition-colors">
                                Contact Support
                            </a>
                        </p>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }

                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-20px) translateX(10px); }
                }

                .particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: linear-gradient(135deg, #ef4444, #ec4899);
                    border-radius: 50%;
                    opacity: 0.3;
                    animation: float 6s ease-in-out infinite;
                }

                .particle-1 {
                    top: 20%;
                    left: 20%;
                    animation-delay: 0s;
                }

                .particle-2 {
                    top: 60%;
                    right: 20%;
                    animation-delay: 2s;
                }

                .particle-3 {
                    bottom: 20%;
                    left: 50%;
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default ForgotPassword;
