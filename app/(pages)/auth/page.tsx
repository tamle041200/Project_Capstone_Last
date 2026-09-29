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
      setLoading(true);
      setError("");

      const data = await getLogIn({
        email,
        password,
      });

      if (data?.user?.role !== "ADMIN") {
        setError("Tài khoản không có quyền Admin");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));

      router.push("/admin");
    } catch (error) {
      console.log(error);
      setError("Email hoặc mật khẩu không chính xác");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-6 sm:px-6 sm:py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="grid min-h-[600px] md:grid-cols-2">
          {/* ================= LEFT ================= */}
          <div className="hidden flex-col justify-between bg-slate-900 p-8 text-white sm:p-10 md:flex lg:p-12">
            {/* LOGO */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold sm:h-11 sm:w-11 sm:text-xl">
                  S
                </div>

                <div>
                  <h1 className="text-lg font-bold sm:text-xl">StayGO</h1>

                  <p className="text-[11px] text-slate-400 sm:text-xs">
                    Administration
                  </p>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="my-10">
              <p className="mb-3 text-xs font-medium tracking-wide text-blue-400 sm:mb-4 sm:text-sm">
                ADMINISTRATION SYSTEM
              </p>

              <h2 className="max-w-sm text-3xl font-bold leading-tight sm:text-4xl">
                Quản lý hệ thống
                <br />
                StayGO
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-slate-400 sm:mt-6 sm:leading-7">
                Quản lý người dùng, phòng và các hoạt động của hệ thống một cách
                nhanh chóng và hiệu quả.
              </p>
            </div>

            {/* FOOTER */}
            <div className="border-t border-slate-700 pt-4 sm:pt-5">
              <p className="text-[11px] text-slate-500 sm:text-xs">
                © 2026 StayGO. All rights reserved.
              </p>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex items-center justify-center px-5 py-8 sm:px-10 sm:py-12 lg:px-12">
            <div className="w-full max-w-md">
              {/* MOBILE LOGO */}
              <div className="mb-8 flex items-center gap-3 md:hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
                  S
                </div>

                <div>
                  <h1 className="font-bold text-slate-900">StayGO</h1>

                  <p className="text-xs text-slate-400">Administration</p>
                </div>
              </div>

              {/* TITLE */}
              <div className="mb-7 sm:mb-8">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Đăng nhập
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Đăng nhập vào tài khoản quản trị của bạn.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
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
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Mật khẩu
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* ERROR */}
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm leading-5 text-red-600">{error}</p>
                  </div>
                )}

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </form>

              {/* FOOTER */}
              <div className="mt-7 border-t border-slate-200 pt-5 sm:mt-8 sm:pt-6">
                <p className="text-center text-xs leading-5 text-slate-400">
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
