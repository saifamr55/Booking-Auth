import {
    sendSignUpOtpApi,
    completeSignUpApi,
    loginApi,
    forgotPasswordApi,
    resetPasswordApi,
    logoutApi
} from '../api/authApi';

export const authService = {
    // 1. خطوة 1: إرسال OTP للتسجيل
    sendSignUpOtp: async (email) => {
        const response = await sendSignUpOtpApi({ email });
        return response.data;
    },

    // 2. خطوة 2: إنشاء الحساب نهائياً
    completeSignUp: async ({ name, email, password, phone, otp }) => {
        const response = await completeSignUpApi({ name, email, password, phone, otp });
        if (response.data?.data?.accessToken) {
            localStorage.setItem('accessToken', response.data.data.accessToken);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);
        }
        return response.data;
    },

    // 3. تسجيل الدخول
    login: async (credentials) => {
        const response = await loginApi(credentials);
        if (response.data?.data?.accessToken) {
            localStorage.setItem('accessToken', response.data.data.accessToken);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);
        }
        return response.data;
    },

    // 4. نسيان كلمة السر
    forgotPassword: async (email) => {
        const response = await forgotPasswordApi({ email });
        return response.data;
    },

    // 5. تعيين كلمة السر الجديدة مع كود الـ OTP
    resetPassword: async ({ email, otp, newPassword }) => {
        const response = await resetPasswordApi({ email, otp, newPassword });
        return response.data;
    },

    // 6. تسجيل الخروج
    logout: async () => {
        try {
            await logoutApi();
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    }
};

