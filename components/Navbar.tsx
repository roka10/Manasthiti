"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Settings, Bell, User, LogOut, Flame, Menu } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;
  const router = useRouter();
  const [streak, setStreak] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const lastLogin = localStorage.getItem("lastLogin");
      const currentStreak = parseInt(localStorage.getItem("streak") || "0", 10);
      const today = new Date().toDateString();

      if (lastLogin !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastLogin === yesterday.toDateString()) {
          localStorage.setItem("streak", (currentStreak + 1).toString());
          setStreak(currentStreak + 1);
        } else {
          localStorage.setItem("streak", "1");
          setStreak(1);
        }
        localStorage.setItem("lastLogin", today);
      } else {
        setStreak(currentStreak);
      }
    }
  }, [user]);

  const handleLogout = () => {
    if (logout) {
      logout();
      router.push("/");
    }
  };

  const navigateToProfile = () => {
    router.push("/profile");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.jpg" alt="MANN Mental Health Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold text-[#1e3a8a] dark:text-white transition-colors duration-300">MANN</span>
          </Link>

          {/* Mobile Menu Button */}
          <button className="sm:hidden p-2 rounded-md focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-6 h-6 text-gray-600 dark:text-white" />
          </button>

          {/* Navigation Items */}
          <div className={`absolute sm:static top-16 left-0 w-full sm:w-auto bg-white dark:bg-gray-800 sm:bg-transparent dark:sm:bg-transparent shadow-md sm:shadow-none p-4 sm:p-0 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-300 ${menuOpen ? "block" : "hidden sm:flex"}`}>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">{streak} Day Streak</span>
            </div>
            <Link href="/notifications">
              <Button variant="ghost" className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
                <Bell className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name || "User"}`} alt={user.name || "User"} />
                      <AvatarFallback>{user.name ? user.name.charAt(0) : "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={navigateToProfile} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
