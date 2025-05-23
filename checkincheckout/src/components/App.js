import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import WelcomeContent from "./WelcomeContent";
import Dashboard from "./Dashboard";
import RegistrationSuccess from "./RegistrationSuccess";
import Unauthorized from "./unauthorized";
import Users from "./Users";
import AddUser from "./addUser";
import BasePage from "./BasePage"
import { EditUser } from "./editUser";
import { Chambres } from "./Chambres";
import { Services } from "./Services";
import { UserProfile } from "./UserProfile";
import { UserServices } from "./userServices";
import { PaymentSuccess }  from "./payment-success"
import { SignUp } from "./signUp"
import { LogIn } from "./login";


function App() {
  return (
    <Router>
      <div>
        <Header pageTitle="" />
        <Routes>
          <Route path="/" element={<WelcomeContent />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/RegistrationSuccess" element={<RegistrationSuccess />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/unauthorized" element={<Unauthorized/>}/>
          <Route path="/users" element={<Users />} />
          <Route path="/addUser" element={<AddUser />}/>
          <Route path="/BasePage" element={<BasePage />}/>
          <Route path="/UserProfile" element={<UserProfile />}/>
          <Route path="/editUser" element={<EditUser />}/>
          <Route path="/Chambres" element={<Chambres />}/>
          <Route path="/Services" element={<Services />}/>
          <Route path="/Services-sejour" element= {<UserServices/>}/>
          <Route path="/checkout-payment-success" element= {<PaymentSuccess/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
