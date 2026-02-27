import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { createComplaintThunk } from "@/store/feratures/complaint/createComplaint/createComplaint.thunk";
import { uploadComplaintFilesThunk } from "@/store/feratures/complaint/complaintDoc/uploadComplaintFiles.thunk";

const complaintSchema = z.object({
  complaintType: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  priority: z.string().min(1, "Required"),
  description: z.string().trim().min(10, "At least 10 characters"),
});

const ComplaintForm = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const { API_Response, error, complaintId } = useSelector((state) => state.createComplaintReducer);

  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      complaintType: "",
      category: "",
      priority: "",
      description: "",
    },
  });

  // Watch values taake Select ko reset state ka pata chale
  const complaintTypeVal = watch("complaintType");
  const categoryVal = watch("category");
  const priorityVal = watch("priority");

  const onSubmit = (data) => {
    dispatch(createComplaintThunk(data));
  };

  useEffect(() => {
    if (API_Response === "Complaint created successfully") {
      toast.success(API_Response);

      if (files.length > 0 && complaintId) {
        const formData = new FormData();
        formData.append("complaintId", complaintId);
        Array.from(files).forEach((file) => formData.append("files", file));
        dispatch(uploadComplaintFilesThunk(formData));
      }

      // ✅ Form reset (yeh defaultValues par le jayega)
      reset(); 
      // ✅ Files state khali
      setFiles([]); 
    }

    if (error) {
      toast.error(error);
    }
  }, [API_Response, error, complaintId, dispatch, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-xl border p-6 bg-background">
      
      {/* 1. Complaint Type */}
      <div className="space-y-2">
        <Label>Complaint Type</Label>
        <Select 
          value={complaintTypeVal} 
          onValueChange={(val) => setValue("complaintType", val)}
        >
          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Complaint">Complaint</SelectItem>
            <SelectItem value="Fraud">Fraud</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 2. Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select 
          value={categoryVal} 
          onValueChange={(val) => setValue("category", val)}
        >
          <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ATM">ATM</SelectItem>
            <SelectItem value="Card">Card</SelectItem>
            <SelectItem value="Online Banking">Online Banking</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 3. Priority */}
      <div className="space-y-2">
        <Label>Priority</Label>
        <Select 
          value={priorityVal} 
          onValueChange={(val) => setValue("priority", val)}
        >
          <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 4. Description */}
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea placeholder="Explain your issue..." {...register("description")} />
      </div>

      {/* 5. File Upload */}
      <div className="space-y-2">
        <Label>Upload Evidence</Label>
        <Input 
          type="file" 
          multiple 
          key={files.length === 0 ? "reset" : "active"} // ✅ Is se file input UI reset hogi
          onChange={(e) => setFiles(e.target.files)} 
        />
      </div>

      <Button type="submit" className="w-full">Submit Complaint</Button>
    </form>
  );
};

export default ComplaintForm;