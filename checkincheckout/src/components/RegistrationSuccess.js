import React from "react";
import { useNavigate } from "react-router-dom";

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="container text-center mt-5 p-4">
      <h2 className="text-success mb-3">Registration Successful!</h2>
      <p className="mb-4">
        Your account has been created successfully. You can now log in to access your account.
      </p>
      <button className="btn btn-primary" onClick={handleLoginRedirect}>
        Go to Login
      </button>
    </div>
  );
};

export default RegistrationSuccess;
