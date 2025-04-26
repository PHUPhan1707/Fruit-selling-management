import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { useDispatch } from 'react-redux'
import { forgotPasswordThunk, verifyCodeThunk, resetPasswordThunk } from '../../redux/userReducer/userThunk'

const ResetPasswordPage = () => {
    const [step, setStep] = useState(1); // Step 1: Email, Step 2: Verification Code, Step 3: New Password
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Step 1: Request password reset
    const handleSendResetCode = async () => {
        setError('');
        setLoading(true);

        if (!email) {
            setError('Email is required');
            setLoading(false);
            return;
        }

        try {
            await dispatch(forgotPasswordThunk(email)).unwrap();
            setStep(2);
        } catch (err) {
            console.error('Error sending reset code:', err);
            setError(err || 'Failed to send verification code');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify code
    const handleVerifyCode = async () => {
        setError('');
        setLoading(true);

        if (!verificationCode) {
            setError('Verification code is required');
            setLoading(false);
            return;
        }

        try {
            await dispatch(verifyCodeThunk(verificationCode)).unwrap();
            setStep(3);
        } catch (err) {
            console.error('Error verifying code:', err);
            setError(err || 'Invalid verification code');
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Reset password
    const handleResetPassword = async () => {
        setError('');
        setLoading(true);

        if (!newPassword || !confirmPassword) {
            setError('Both password fields are required');
            setLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate password strength
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            setError('Password must be at least 8 characters and include at least one uppercase letter, one special character, and one number');
            setLoading(false);
            return;
        }

        try {
            await dispatch(resetPasswordThunk({ code: verificationCode, newPassword })).unwrap();
            navigate('/auth/login');
        } catch (err) {
            console.error('Error resetting password:', err);
            setError(err || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    // Request new verification code
    const handleResendCode = async () => {
        setLoading(true);
        try {
            await dispatch(forgotPasswordThunk(email)).unwrap();
        } catch (err) {
            console.error('Error resending code:', err);
            setError(err || 'Failed to resend verification code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full" style={{
            backgroundImage: 'url(/src/assets/background_login.jpg)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="flex bg-[rgb(255,255,255)] shadow-lg rounded-lg overflow-hidden w-[70rem] h-[35rem]">
                <div className="w-2/3 bg-cover bg-center"
                    style={{ backgroundImage: "url('/src/assets/bg-login.png')" }}></div>

                <div className="w-1/2 p-8 flex flex-col justify-center bg-white text-green-900 z-10">
                    <div className="text-center">
                        <img className="mx-auto rounded-full" src="/src/assets/sumbol.png" alt="Logo" width="80" />
                        <h1 className="text-3xl font-bold mt-2">Manach</h1>
                        <p className="text-sm mb-6">Password Recovery</p>
                    </div>

                    {step === 1 && (
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center border border-[rgb(70,255,91)] rounded-md bg-green-100 px-4 py-3">
                                <i className="fa fa-envelope text-lg text-green-900"></i>
                                <input
                                    type="email"
                                    className="bg-transparent w-full text-green-900 text-lg outline-none pl-4"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div className="mt-6 text-center">
                                <button
                                    className="bg-green-600 w-full py-3 rounded-md text-white text-lg font-bold hover:bg-green-700 disabled:bg-green-300"
                                    onClick={handleSendResetCode}
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Reset Code'}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center border border-[rgb(70,255,91)] rounded-md bg-green-100 px-4 py-3">
                                <i className="fa fa-key text-lg text-green-900"></i>
                                <input
                                    type="text"
                                    className="bg-transparent w-full text-green-900 text-lg outline-none pl-4"
                                    placeholder="Enter verification code"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div className="mt-6 text-center">
                                <button
                                    className="bg-green-600 w-full py-3 rounded-md text-white text-lg font-bold hover:bg-green-700 disabled:bg-green-300"
                                    onClick={handleVerifyCode}
                                    disabled={loading}
                                >
                                    {loading ? 'Verifying...' : 'Verify Code'}
                                </button>
                            </div>

                            <div className="mt-2 text-center">
                                <button
                                    className="text-green-600 underline"
                                    onClick={handleResendCode}
                                    disabled={loading}
                                >
                                    Resend verification code
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center border border-[rgb(70,255,91)] rounded-md bg-green-100 px-4 py-3">
                                <i className="fa fa-lock text-lg text-green-900"></i>
                                <input
                                    type="password"
                                    className="bg-transparent w-full text-green-900 text-lg outline-none pl-4"
                                    placeholder="New password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center border border-[rgb(70,255,91)] rounded-md bg-green-100 px-4 py-3">
                                <i className="fa fa-lock text-lg text-green-900"></i>
                                <input
                                    type="password"
                                    className="bg-transparent w-full text-green-900 text-lg outline-none pl-4"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div className="mt-6 text-center">
                                <button
                                    className="bg-green-600 w-full py-3 rounded-md text-white text-lg font-bold hover:bg-green-700 disabled:bg-green-300"
                                    onClick={handleResetPassword}
                                    disabled={loading}
                                >
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Back button */}
                    <div className="mt-4 text-center">
                        <NavLink to="/auth/login" className="text-green-900">
                            Back to Login
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;

