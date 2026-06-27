"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AuthContext, useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { LogIn, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { signin } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "ورود | گالری تژاو";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data.email);
    setLoading(true);
    setError(null);
    try {
      await signin(data.email, data.password);
      router.push("/admin");
    } catch (err) {
      setError("ایمیل یا رمز عبور اشتباه است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">گالری تژاو</h1>
          <p className="text-gray-500 mt-2">ورود به پنل مدیریت</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5"
        >
          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-3 rounded-xl text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ایمیل
            </label>
            <input
              type="email"
              defaultValue="user@example.com"
              {...register("email", {
                required: "ایمیل الزامی است",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "ایمیل معتبر نیست",
                },
              })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
              placeholder="example@email.com"
              dir="ltr"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رمز عبور
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "رمز عبور الزامی است",
                  minLength: {
                    value: 6,
                    message: "رمز عبور حداقل ۶ کاراکتر باشد",
                  },
                })}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
                placeholder="••••••"
                defaultValue="tajavv4"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          حساب کاربری ندارید؟{" "}
          <Link
            href="/auth/signup"
            className="text-indigo-600 font-medium hover:text-indigo-700"
          >
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}
