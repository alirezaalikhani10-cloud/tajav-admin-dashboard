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
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="text-sm text-gray-500">خوش آمدید</div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <User className="w-4 h-4" />
          <span>{user?.email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-800 font-medium transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          خروج
        </button>
      </div>
    </header>
  );
}
