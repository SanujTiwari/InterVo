import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  profile: null,
  token: localStorage.getItem('intervo_token'),
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        profile: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('intervo_token');
    if (token) {
      const savedUser = localStorage.getItem('intervo_user');
      if (savedUser) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: JSON.parse(savedUser), token },
        });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Fetch profile when authenticated
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        dispatch({ type: 'SET_PROFILE', payload: data.data });
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    if (state.isAuthenticated && !state.profile) {
      fetchProfile();
    }
  }, [state.isAuthenticated, state.profile]);

  const login = (user, token, refreshToken) => {
    localStorage.setItem('intervo_token', token);
    localStorage.setItem('intervo_refresh_token', refreshToken);
    localStorage.setItem('intervo_user', JSON.stringify(user));
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
  };

  const logout = () => {
    const refreshToken = localStorage.getItem('intervo_refresh_token');
    if (refreshToken) {
      api.post('/auth/logout', { refreshToken }).catch(() => {});
    }
    localStorage.removeItem('intervo_token');
    localStorage.removeItem('intervo_refresh_token');
    localStorage.removeItem('intervo_user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (user) => {
    localStorage.setItem('intervo_user', JSON.stringify(user));
    dispatch({ type: 'SET_USER', payload: user });
  };

  const refreshProfile = async () => {
    try {
      const { data } = await api.get('/users/profile');
      dispatch({ type: 'SET_PROFILE', payload: data.data });
      return data.data;
    } catch (err) {
      console.error('Error refreshing profile:', err);
    }
  };

  const updateProfile = (profileData) => {
    dispatch({ type: 'SET_PROFILE', payload: profileData });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser, refreshProfile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
