import React, { useState, useEffect } from 'react';
import {  Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

    if (token) {
      // If token exists, make a request to the protected URL
      axios.get('https://interview-plus.onrender.com/api/protected', {
        headers: {
          'x-access-token': token
        }
      })
      .then(response => {
        // If request succeeds, set isAuthenticated to true
        setIsAuthenticated(true);
      })
      .catch(error => {
        // If request fails, handle error (e.g., token expired)
        console.error('Error:', error);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      // If no token exists, user is not authenticated
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  // Render the route only if the user is authenticated, otherwise redirect to login page
  return loading ? null : isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
