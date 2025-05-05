import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {  // Changed from 'unauthorized' to 'Unauthorized'
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container text-center mt-5 p-4">
      <h2 className="text-danger mb-3">Unauthorized Access</h2>
      <p className="mb-4">
        Your account doesn't have the required privileges for this page.
      </p>
      <button 
        className="btn btn-primary" 
        onClick={handleLoginRedirect}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Unauthorized;  // Fixed export to match component name