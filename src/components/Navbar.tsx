"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/auth";

const Navbar = () => {
  const { currentUser } = useAuth();

  const router = useRouter();
  const navigate = (path: string) => {
    router.push(path);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <div className="bg-primary">
      <header className="p-4 container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
          </Link>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link href="/add-student">
                  <span className="text-white text-sm font-medium">
                    Add Student
                  </span>
                </Link>
                <div className="flex items-center space-x-2 text-white">
                  <User className="h-5 w-5" />
                  <span className="text-sm">{currentUser.email}</span>
                </div>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-primary">
          <div className="container mx-auto pt-2 pb-4 flex flex-col space-y-2">
            {currentUser ? (
              <>
                <Button
                  variant="ghost"
                  className="text-white justify-start hover:text-white hover:bg-primary/80 m-0"
                  onClick={() => {
                    navigate("/add-student");
                    setIsMenuOpen(false);
                  }}
                >
                  Add Student
                </Button>
                <div className="flex items-center p-3 space-x-2 text-white">
                  <User className="h-5 w-5" />
                  <span className="text-sm">{currentUser.email}</span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-fit mx-4"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="w-fit mx-4"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
