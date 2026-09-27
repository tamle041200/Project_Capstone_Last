"use client";

import Link from "next/link";
import { useState } from "react";
import { getLogIn } from "@/app/services/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    try {
      setLoading(true);

      const result = await getLogIn({
        email,
        password,
      });

      if (!result) {
        alert("Email hoặc mật khẩu không chính xác");
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      window.dispatchEvent(new Event("login"));

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="relative flex min-h-[650px] w-full max-w-5xl overflow-hidden rounded-[30px] bg-white shadow-2xl">
        <div className="flex w-full items-center justify-center p-8 lg:w-[55%] lg:p-12">
          <div className="w-full max-w-md text-center">
            <h1 className="text-3xl font-extrabold text-gray-800">Đăng nhập</h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {/* Email */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ✉️
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full rounded-full bg-gray-100 py-3.5 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:bg-gray-200/70"
                />
              </div>

              {/* Mật khẩu */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔒
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassWord(e.target.value)}
                  placeholder="Mật khẩu"
                  className="w-full rounded-full bg-gray-100 py-3.5 pl-11 pr-10 text-sm text-gray-700 outline-none transition focus:bg-gray-200/70"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {/* Quên mật khẩu */}
              <div className="flex justify-end pr-2 text-xs">
                <button
                  type="button"
                  onClick={() => alert("Chức năng này sẽ được cập nhật sau.")}
                  className="font-medium text-gray-500 hover:text-blue-500 hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* Nút Đăng nhập */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-1/2 rounded-full bg-blue-500 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-600 active:scale-95 disabled:opacity-50 uppercase tracking-wide"
              >
                {loading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </form>

            <div className="mt-8">
              <p className="text-xs text-gray-400 font-medium">
                Hoặc đăng nhập bằng mạng xã hội
              </p>
              <div className="mt-4 flex justify-center gap-4">
                {["f", "t", "G", "in"].map((icon, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-sm font-bold text-gray-600 transition hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-8 text-sm text-gray-500 lg:hidden">
              Chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="font-bold text-blue-500 hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>

        <div className="relative hidden w-[45%] flex-col items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 p-10 text-center text-white lg:flex">
          <div className="pointer-events-none absolute -left-1 top-0 h-full w-28 overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="h-full w-full fill-white"
            >
              <path d="M0 0 C 20 30, 80 70, 0 100 L 0 0 Z" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-xs">
            <h2 className="text-3xl font-bold tracking-wide">Chào bạn!</h2>
            <p className="mt-4 text-sm font-light text-blue-50 leading-relaxed">
              Nhập thông tin cá nhân của bạn và bắt đầu hành trình cùng chúng
              tôi.
            </p>

            <Link
              href="/register"
              className="mt-8 inline-block rounded-full border-2 border-white px-10 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-blue-600"
            >
              Đăng ký ngay
            </Link>

            <div className="mt-10 flex justify-center">
              <svg
                className="h-44 w-44 text-white/90 drop-shadow-md"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
