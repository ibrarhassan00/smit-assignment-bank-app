"use client";

import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

function Navbar() {
  const navigate = useNavigate();

  const logOutHandler = () =>{
    localStorage.removeItem("token")
navigate("/login")
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-gray-100">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <span className="text-sm font-semibold text-primary">
          MyApp
        </span>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm hover:text-primary">Home</Link>
          <Link to="/about" className="text-sm hover:text-primary">About Us</Link>
          <Link to="/contact" className="text-sm hover:text-primary">Contact Us</Link>

          <Button
            variant="ghost"
            onClick={logOutHandler}
          >
            Logout
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact Us</Link>
                <Button
                  variant="ghost"
                  onClick={logOutHandler}>
                  Logout 
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
