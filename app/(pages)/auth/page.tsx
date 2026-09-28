"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getLogIn } from "@/app/services/auth";

export default function AuthPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");

      const data = await getLogIn({
        email,
        password,
      });

      if (data?.user?.role !== "ADMIN") {
        setError("Tài khoản không có quyền Admin");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));

      router.push("/admin");
    } catch (error) {
      console.log(error);
      setError("Email hoặc mật khẩu không chính xác");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="grid md:grid-cols-2">
          {/* LEFT */}
          <div className="hidden md:flex flex-col justify-between bg-slate-900 p-12 text-white">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold">
                  S
                </div>

                <div>
                  <h1 className="text-xl font-bold">StayGO</h1>

                  <p className="text-xs text-slate-400">Administration</p>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-medium text-blue-400">
                ADMINISTRATION SYSTEM
              </p>

              <h2 className="max-w-sm text-4xl font-bold leading-tight">
                Quản lý hệ thống
                <br />
                StayGO
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
                Quản lý người dùng, phòng và các hoạt động của hệ thống một cách
                nhanh chóng và hiệu quả.
              </p>
            </div>

            <div className="border-t border-slate-700 pt-5">
              <p className="text-xs text-slate-500">
                © 2026 StayGO. All rights reserved.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center p-8 sm:p-12">
            <div className="w-full max-w-md">
              {/* MOBILE LOGO */}
              <div className="mb-10 flex items-center gap-3 md:hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
                  S
                </div>

                <div>
                  <h1 className="font-bold text-slate-900">StayGO</h1>

                  <p className="text-xs text-slate-400">Administration</p>
                </div>
              </div>

              {/* TITLE */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Đăng nhập</h2>

                <p className="mt-2 text-sm text-slate-500">
                  Đăng nhập vào tài khoản quản trị của bạn.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">
                      Mật khẩu
                    </label>
                  </div>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* ERROR */}
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </form>

              {/* FOOTER */}
              <div className="mt-8 border-t border-slate-200 pt-6">
                <p className="text-center text-xs text-slate-400">
                  Chỉ dành cho tài khoản có quyền quản trị viên
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
