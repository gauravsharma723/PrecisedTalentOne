const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // or navigate using React Router
};



export default logout;