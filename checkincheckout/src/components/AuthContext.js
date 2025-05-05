import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    // Initialize token from localStorage safely
    try {
      return localStorage.getItem('token') || null;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (token) {
          // Verify token exists before decoding
          if (typeof token !== 'string' || token.trim() === '') {
            throw new Error('Invalid token format');
          }

          const decoded = jwtDecode(token);
          
          // Verify token hasn't expired
          if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            throw new Error('Token expired');
          }

          // Set user with fallback values
          setUser({
            id: decoded.id || '',
            role: decoded.role || 'user',
            nom: decoded.nom  || '',
            prenom: decoded.prenom  || '',
            email: decoded.email
          });
        }
      } catch (error) {
        console.error('Authentication initialization error:', error);
        // Clear invalid token
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    };

    initializeAuth();
  }, [token]);

  const login = (newToken) => {
    try {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const hasRole = (requiredRole) => {
    if (!user?.role) return false;
    return user.role.toLowerCase() === requiredRole.toLowerCase();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};