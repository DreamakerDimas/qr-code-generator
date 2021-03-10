const serverIP = 'localhost';
const serverPort = 4000;

export const BASE_URL = `http://${serverIP}:${serverPort}/`;
export const ACCESS_TOKEN = 'accessToken';
export const ROLES = { USER: 'USER', ADMIN: 'ADMIN' };
export const ADMIN_PANEL_STATES = {
  CREATE_USER: 'CREATE_USER',
  FIND_USER: 'FIND_USER',
  ALL_USERS: 'ALL_USERS',
};
