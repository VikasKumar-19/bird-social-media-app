import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";
import Layout from "./layout";
import Navbar from "./layout/navbar";
import Dashboard from "./pages/dashboard";
import LandingPage from "./pages/landiing-page";
import Login from "./pages/login-page";
import Register from "./pages/register-page";
import VikasTest from "./pages/vikas-test";
import PrivateRoute from "./privateRoute";

const Routings = () => {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
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
            {/* <Route path="/layout" element={<Layout />} /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthWrapper>
  );
};

export default Routings;
