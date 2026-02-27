import React from "react";
import Navbar from "../components/web/Navbar";
import ComplaintForm from "../components/web/ComplaintForm";
import DashboardHeader from "../components/web/DashboardHeader";
import Footer from "@/components/web/Footer";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

 const navigate = useNavigate();
  const signinState = useSelector((state) => {
    return state.signinReducer;
  });
  const role = signinState.user?.role;
  console.log(role);

  // customer
  // bank_officer

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <DashboardHeader />
        {role === "customer" && (
          <>
            <Button variants="ghost" className="w-full" onClick={() => navigate("/fatch/user/complaints")}>
            My Complaints
          </Button>
            <ComplaintForm />
          </>
        )}

        {role === "bank_officer" && <><h1>Hello</h1></>}

        {role === "SBP_admin" && <>{/* SBP admin components */}</>}
        
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
