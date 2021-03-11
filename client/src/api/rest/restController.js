import http from '../interceptor';

// auth
export const loginRequest = (data) => http.post('auth/login', data);

// profile
export const getProfile = () => http.get('profile');
export const updateProfile = (data) => http.put('profile', data);

// QR codes
export const getMyCodesRequest = () => http.get('links/user');
export const createQRCode = (data) => http.post('links/user', data);
export const updateMyCode = (data) => http.put('links/user', data);
export const deleteMyCode = (data) => http.delete(`links/user/${data}`);

// admin: users
export const getUsers = () => http.get('users');
export const getUserById = (data) => http.get(`users/${data}`);
export const createUser = (data) => http.post('users', data);
export const updateUser = (data) => http.put(`users/${data.id}`, data.body);
export const deleteUser = (data) => http.delete(`users/${data}`);

// admin: user_codes
export const getUserCodes = (data) => http.get(`links/admin/${data}`);
export const createUserCode = (data) => http.post('links/admin', data);
export const updateUserCodeStatus = (data) => http.put('links/admin', data);
export const deleteUserCode = (data) =>
  http.delete(`links/admin/${data.userId}/${data.id}`);
