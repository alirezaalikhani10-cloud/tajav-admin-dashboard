"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function ProtectedRoute({ children }) {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>در حال بررسی وضعیت ورود...</p>
      </div>
    );
  }

  if (!user) return null;
  return <>{children}</>;
}

export default ProtectedRoute;
