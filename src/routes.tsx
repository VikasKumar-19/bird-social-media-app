import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login-page";
import Register from "./pages/register-page";
import VikasTest from "./pages/vikas-test";
import PrivateRoute from "./privateRoute";

const Routings = () => {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/vikas" element={<VikasTest />} />
        </Routes>
      </BrowserRouter>
    </AuthWrapper>
  );
};

export default Routings;
