"use client";

import Link from "next/link";
import { useState } from "react";
import { getSignUp } from "@/app/services/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim()) return alert("Vui lòng nhập họ tên");
    if (!form.email.trim()) return alert("Vui lòng nhập email");
    if (!form.password) return alert("Vui lòng nhập mật khẩu");
    if (form.password.length < 6)
      return alert("Mật khẩu phải có ít nhất 6 ký tự");
    if (!form.phone.trim()) return alert("Vui lòng nhập số điện thoại");
    if (!form.birthday) return alert("Vui lòng chọn ngày sinh");

    try {
      setLoading(true);
      await getSignUp(form);
      alert("Đăng ký thành công!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="relative flex min-h-[650px] w-full max-w-5xl overflow-hidden rounded-[30px] bg-white shadow-2xl">
        <div className="relative hidden w-[45%] flex-col items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 p-10 text-center text-white lg:flex">
          <div className="pointer-events-none absolute -right-1 top-0 h-full w-28 overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="h-full w-full fill-white"
            >
              <path d="M0 0 C 80 30, 20 70, 100 100 L 100 0 Z" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-xs">
            <h2 className="text-3xl font-bold tracking-wide">
              Bạn mới đến đây?
            </h2>
            <p className="mt-4 text-sm font-light text-blue-50 leading-relaxed">
              Tạo tài khoản ngay hôm nay để bắt đầu hành trình khám phá những
              điểm đến tuyệt vời.
            </p>

            <Link
              href="/login"
              className="mt-8 inline-block rounded-full border-2 border-white px-10 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-blue-600"
            >
              Đăng nhập ngay
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
                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.24a6 6 0 00-2.24 2.24m0 0l-2.24 2.24"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center p-8 lg:w-[55%] lg:p-12">
          <div className="w-full max-w-md text-center">
            <h1 className="text-3xl font-extrabold text-gray-800">Đăng ký</h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {/* Họ tên */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  👤
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Họ và tên"
                  className="w-full rounded-full bg-gray-100 py-3.5 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:bg-gray-200/70"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ✉️
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
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
                  name="password"
                  value={form.password}
                  onChange={handleChange}
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

              {/* Số điện thoại & Ngày sinh */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    📱
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Số điện thoại"
                    className="w-full rounded-full bg-gray-100 py-3.5 pl-9 pr-3 text-xs text-gray-700 outline-none transition focus:bg-gray-200/70"
                  />
                </div>

                <div className="relative">
                  <input
                    type="date"
                    name="birthday"
                    value={form.birthday}
                    onChange={handleChange}
                    className="w-full rounded-full bg-gray-100 py-3.5 px-4 text-xs text-gray-600 outline-none transition focus:bg-gray-200/70"
                  />
                </div>
              </div>

              {/* Chọn giới tính */}
              <div className="flex justify-center gap-6 py-1 text-sm font-medium text-gray-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={form.gender === true}
                    onChange={() => setForm({ ...form, gender: true })}
                    className="accent-blue-500 h-4 w-4"
                  />
                  Nam
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={form.gender === false}
                    onChange={() => setForm({ ...form, gender: false })}
                    className="accent-blue-500 h-4 w-4"
                  />
                  Nữ
                </label>
              </div>

              {/* Nút Đăng ký */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-1/2 rounded-full bg-blue-500 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-600 active:scale-95 disabled:opacity-50 uppercase tracking-wide"
              >
                {loading ? "Đang xử lý..." : "Đăng ký"}
              </button>
            </form>

            <div className="mt-8">
              <p className="text-xs text-gray-400 font-medium">
                Hoặc kết nối bằng mạng xã hội
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
              Bạn đã có tài khoản?{" "}
              <Link
                href="/login"
                className="font-bold text-blue-500 hover:underline"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
