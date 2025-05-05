
export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; // true if token exists
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };