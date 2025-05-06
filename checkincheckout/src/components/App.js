import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import WelcomeContent from "./WelcomeContent";
import LogInSignup from "./LogInSignup";
import Dashboard from "./Dashboard";
import RegistrationSuccess from "./RegistrationSuccess";
import Unauthorized from "./unauthorized";
import Users from "./Users";
import AddUser from "./addUser";
import BasePage from "./BasePage"
import { UserProfile } from "./UserProfile";
import { EditUser } from "./editUser";
import { Chambres } from "./Chambres";

function App() {
  return (
    <Router>
      <div>
        <Header pageTitle="" />
        <Routes>
          <Route path="/" element={<WelcomeContent />} />
          <Route path="/login" element={<LogInSignup action="login"/>} />
          <Route path="/RegistrationSuccess" element={<RegistrationSuccess />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/unauthorized" element={<Unauthorized/>}/>
          <Route path="/users" element={<Users />} />
          <Route path="/addUser" element={<AddUser />}/>
          <Route path="/BasePage" element={<BasePage />}/>
          <Route path="/UserProfile" element={<UserProfile />}/>
          <Route path="/editUser" element={<EditUser />}/>
          <Route path="/Chambres" element={<Chambres />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
