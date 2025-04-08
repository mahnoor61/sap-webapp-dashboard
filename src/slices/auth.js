import {createSlice} from '@reduxjs/toolkit';

const localStorageAvailable = typeof window !== 'undefined' && window.localStorage;

const initialState = localStorageAvailable
  ? JSON.parse(localStorage.getItem('authState')) || {
  isAuthenticated: false,
  user: {},
  token: '',
  sessionId: ''
}
  : {
    isAuthenticated: false,
    user: {},
    token: '',
    sessionId: ''
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const {token, sessionId} = action.payload;
      state.token = token;
      state.sessionId = sessionId;
      state.isAuthenticated = true;
      state.user = action.payload;


      if (localStorageAvailable) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('authState', JSON.stringify(state));
      }

    },
    logout: (state) => {
      if (localStorageAvailable) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('sessionId');
        localStorage.removeItem('authState');
      }

      state.isAuthenticated = false;
      state.user = {};
      state.token = '';
      state.sessionId = '';
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      if (localStorageAvailable) {
        localStorage.setItem('authState', JSON.stringify(state));
      }
    },
  },
});

export const {login, logout, updateUser} = authSlice.actions;

export default authSlice.reducer;
