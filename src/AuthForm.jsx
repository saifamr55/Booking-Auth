import React, { useState } from 'react';
import './AuthForm.css';
import OtpModal from './OtpModal';
import ResetPasswordModal from './ResetPasswordModal';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);
    const [isOtpOpen, setIsOtpOpen] = useState(false);
    const [isResetPassOpen, setIsResetPassOpen] = useState(false);
    const [otpFlow, setOtpFlow] = useState('signup');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    //  تخزين الرسائل لكل حقل
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // phone is 11 digit
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '');
            if (numericValue.length <= 11) {
                setFormData({ ...formData, phone: numericValue });
            }
            return;
        }

        setFormData({ ...formData, [name]: value });
        // delete message error 
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };
    // التحقق من المدخلات
    const validateForm = () => {
        let newErrors = {};

        //التحقق من البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'This field is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        //التحقق من كلمة السر
        if (!formData.password) {
            newErrors.password = 'This field is required';
        } else if (!isLogin) {

            const strongPasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
            if (!strongPasswordRegex.test(formData.password)) {
                newErrors.password = 'The password must be at least 8 characters long (letters, numbers, and special characters like @#$)';
            }
        }


        if (!isLogin) {
            if (!formData.fullName) {
                newErrors.fullName = 'Full name is required.';
            }

            // التحقق من رقم الهاتف (11 رقم)
            if (!formData.phone) {
                newErrors.phone = 'Phone number is required.';
            } else if (formData.phone.length !== 11) {
                newErrors.phone = 'The phone number must consist of exactly 11 digits';
            }

            // التحقق من تطابق كلمة السر
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'The passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (isLogin) {
            console.log('Login Payload:', {
                email: formData.email,
                password: formData.password,
                rememberMe
            });
        } else {
            setOtpFlow('signup');
            setIsOtpOpen(true);
        }
    };

    const handleForgotPasswordClick = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            setErrors({ ...errors, email: 'Please enter a valid email address first to send the recovery code.' });
            return;
        }
        setOtpFlow('forgot_password');
        setIsOtpOpen(true);
    };

    return (
        <>
            <div className="auth-container">
                <div className="auth-card">
                    <h2>{isLogin ? 'Login' : 'Sign UP'}</h2>
                    <p className="subtitle">
                        {isLogin
                            ? 'Welcome back!Please enter your details to login'
                            : 'Create your account to get started'}
                    </p>

                    <form onSubmit={handleSubmit} noValidate>
                        {!isLogin && (
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={errors.fullName ? 'input-error' : ''}
                                />
                                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                            </div>
                        )}

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'input-error' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="01xxxxxxxxx"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={errors.phone ? 'input-error' : ''}
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>
                        )}

                        <div className="form-group">
                            <div className="label-wrapper">
                                <label>Password</label>
                                {isLogin && (
                                    <span className="forgot-pass" onClick={handleForgotPasswordClick}>
                                        Forgot Password?
                                    </span>
                                )}
                            </div>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'input-error' : ''}
                            />
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={errors.confirmPassword ? 'input-error' : ''}
                                />
                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                            </div>
                        )}

                        {isLogin && (
                            <div className="remember-me-group">
                                <label className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    Remember me
                                </label>
                            </div>
                        )}

                        <button type="submit" className="submit-btn">
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="toggle-text">
                        {isLogin ? (
                            <p>
                                Don't have an account?{' '}
                                <span onClick={() => { setIsLogin(false); setErrors({}); }}>Sign Up</span>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{' '}
                                <span onClick={() => { setIsLogin(true); setErrors({}); }}>Login</span>
                            </p>
                        )}
                    </div>
                </div>

                <OtpModal
                    isOpen={isOtpOpen}
                    email={formData.email}
                    onClose={() => setIsOtpOpen(false)}
                    onVerify={() => {
                        setIsOtpOpen(false);
                        if (otpFlow === 'forgot_password') setIsResetPassOpen(true);
                    }}
                />

                <ResetPasswordModal
                    isOpen={isResetPassOpen}
                    email={formData.email}
                    onClose={() => setIsResetPassOpen(false)}
                    onSubmitNewPassword={() => {
                        setIsResetPassOpen(false);
                        setIsLogin(true);
                    }}
                />
            </div>
        </>
    );
};

export default AuthForm;