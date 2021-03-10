import http from '../interceptor';

export const loginRequest = (data) => http.post('auth/login', data);

export const getProfile = () => http.get('profile');

export const updateProfile = (data) => http.put('profile', data);

export const getMyCodesRequest = () => http.get('links');

export const createQRCode = (data) => http.post('links', data);
