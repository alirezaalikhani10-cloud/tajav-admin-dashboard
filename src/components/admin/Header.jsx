"use client";

import { AuthContext } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";
import { useContext } from "react";

export default function Header() {
  const { user, signout } = useContext(AuthContext);

  async function handleLogout() {
    await signout();
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
      <div className="text-xs md:text-sm text-gray-500 mr-12 lg:mr-0">
        خوش آمدید
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-700">
          <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="hidden sm:inline">{user?.email}</span>
          <span className="sm:hidden">{user?.email?.split("@")[0]}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 md:gap-1.5 text-xs md:text-sm text-red-600 hover:text-red-800 font-medium transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="hidden sm:inline">خروج</span>
        </button>
      </div>
    </header>
  );
}
