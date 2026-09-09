import axiosInstance from './axiosInstance';

//  انشاء Otp
export const sendSignUpOtpApi = (data) => {
    return axiosInstance.post('/auth/send-signup-otp', data);
};

//  إكمال إنشاء الحساب 
export const completeSignUpApi = (userData) => {
    return axiosInstance.post('/auth/complete-signup', userData);
};

// Login 
export const loginApi = (credentials) => {
    return axiosInstance.post('/auth/login', credentials);
};
// code forgetpass
export const forgotPasswordApi = (data) => {
    return axiosInstance.post('/auth/forgot-password', data);
};
//Reset pass
export const resetPasswordApi = (data) => {
    return axiosInstance.post('/auth/reset-password', data);
};

// logout
export const logoutApi = () => {
    return axiosInstance.post('/auth/logout');
};