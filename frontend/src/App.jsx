import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

import AllList from "./pages/AllList";
import ActiveList from "./pages/ActiveList";
import Completed from "./pages/Completed";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import ResetPassword from "./pages/ResetPassword";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || null
  );

  return (
    <div className="relative w-full min-h-screen flex flex-col ggFont">
      {/* Background Img */}
      <div
        style={{
          backgroundImage: 'url("/img.png")',
          backgroundSize: "cover",
          backgroundPosition: "top",
          width: "100%",
          height: "100%",
          filter: "blur(2px)",
          position: "absolute",
          zIndex: 1,
        }}
      />

      {/* Routes */}
      <div className="relative z-2 flex flex-col flex-1">
        <ToastContainer position="top-right" autoClose={1000} />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to={"/all"} replace />} />
            <Route
              path="/Login"
              element={<Login setUserName={setUserName} />}
            />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            
            <Route element={<Layout userName={userName} setUserName={setUserName} />}>
              <Route path="/all" element={<AllList />} />
              <Route path="/active" element={<ActiveList />} />
              <Route path="/completed" element={<Completed />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute userName={userName}>
                    <MyProfile setUserName={setUserName} />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
