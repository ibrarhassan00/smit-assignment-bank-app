import React, { useEffect, useState } from "react";
import CompalintTable from "../components/web/ComplaintTable"; // Table component import
import { Card } from "@/components/ui/card";
import Navbar from "@/components/web/Navbar";
import { getComplaintThunk } from "@/store/feratures/complaint/getCompalint/getCompalint.thunk";
import { useDispatch, useSelector } from "react-redux";

  // const complaintsData = [
  //   { _id: "66ab1", complaintType: "Complaint", category: "ATM", description: "ATM cash deducted...", priority: "high", status: "resolved", createdAt: "2025-08-12" },
  //   { _id: "66ab2", complaintType: "Fraud", category: "Online", description: "Unauthorized...", priority: "medium", status: "inProgress", createdAt: "2025-08-13" },
  //   { _id: "66ab3", complaintType: "Complaint", category: "Branch", description: "Staff misbehavior...", priority: "low", status: "rejected", createdAt: "2025-08-14" },
  //   { _id: "66ab4", complaintType: "Complaint", category: "Branch", description: "Staff misbehavior...", priority: "low", status: "rejected", createdAt: "2025-08-14" },
  //   { _id: "66ab5", complaintType: "Complaint", category: "Branch", description: "Staff misbehavior...", priority: "low", status: "rejected", createdAt: "2025-08-14" },
  // ];

const FatchUserComplaint = () => {

 let dispatch = useDispatch();

  useEffect(()=>{
   dispatch(getComplaintThunk())
  },[dispatch])

   const getComplaintState = useSelector((state) => {
      return state.getComplaintReducer;
    });

    
const complaintsData = getComplaintState.API_Response || []
console.log(getComplaintState.API_Response)



const getFilteredComplaints = (data, filter) => {
  if (filter === "All") {
    return data;
  }
  return data.filter((item) => item.status === filter);
};

  const [filter, setFilter] = useState("All");

  const actions = [
    { label: "All Complaints", status: "All" },
    { label: "Resolved", status: "Resolved" },
    { label: "In-Process", status: "In-Process" },
    { label: "Rejected", status: "Rejected" },
    { label: "Closed", status: "Closed" },
  ];

  const filteredData = getFilteredComplaints(complaintsData, filter);

  // Debug (JSX ke bahar)
 //console.log("filteredData:", filteredData);


    

  return (
    <>
      <Navbar />

      <div className="p-6">
        {/* Filter Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-5 grid-cols-2">
          {actions.map((item) => (
            <Card
              key={item.status}
              onClick={() => setFilter(item.status)}
              className={`flex items-center justify-center p-4 cursor-pointer transition
                ${
                  filter === item.status
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
            >
              <span className="font-medium">{item.label}</span>
            </Card>
          ))}
        </div>

        {/* Table */}
        <CompalintTable data={filteredData} title={filter} />
      </div>
    </>
  );
};


export default FatchUserComplaint;