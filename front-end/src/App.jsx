import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgetPassword from "./pages/auth/ForgetPassword";
import OtpPage from "./pages/auth/Otp";
import NewPassword from "./pages/auth/NewPassword";
import { Toaster } from "@/components/ui/sonner";
import Dashboard from "./pages/Dashboard";
import FatchUserComplaint from "./pages/FatchUserComplaint";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";


function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/fatch/user/complaints" element={<FatchUserComplaint />} />
          <Route path="/" element={<Dashboard />} />
        </Route>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget/password" element={<ForgetPassword />} />
          <Route path="/otp/varify" element={<OtpPage />} />
          <Route path="/new/password" element={<NewPassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
