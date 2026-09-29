"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const [logIn, setLogIn] = useState<any>(null);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const getUser = () => {
      const data = localStorage.getItem("user");

      if (data) {
        try {
          setLogIn(JSON.parse(data));
        } catch {
          setLogIn(null);
        }
      } else {
        setLogIn(null);
      }
    };

    getUser();

    window.addEventListener("login", getUser);

    return () => {
      window.removeEventListener("login", getUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setLogIn(null);
    setOpenMenu(false);

    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:h-[76px] sm:px-6 lg:px-8">
        {/* ================= LOGO ================= */}

        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 sm:gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-lg font-extrabold text-white shadow-sm transition duration-300 group-hover:scale-105 group-hover:bg-blue-700 sm:h-11 sm:w-11 sm:text-xl">
            A
          </div>

          <div className="hidden sm:block">
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              STAYGO
            </h1>

            <p className="text-[10px] font-medium text-gray-400">
              Find your perfect stay
            </p>
          </div>
        </Link>

        {/* ================= RIGHT ================= */}

        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          {/* ================= NAVIGATION ================= */}

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="rounded-full px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-blue-600 lg:px-4 lg:py-2.5"
            >
              Trang chủ
            </Link>

            <Link
              href="/rooms"
              className="rounded-full px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-blue-600 lg:px-4 lg:py-2.5"
            >
              Phòng
            </Link>

            <Link
              href="/about"
              className="rounded-full px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-blue-600 lg:px-4 lg:py-2.5"
            >
              Giới thiệu
            </Link>
          </nav>

          {/* Divider */}

          <div className="hidden h-8 w-px bg-gray-200 md:block" />

          {/* ================= USER ================= */}

          {logIn ? (
            <div className="relative">
              {/* User Button */}

              <button
                type="button"
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white p-1 sm:gap-2 sm:p-1.5 sm:pr-3"
              >
                {/* Avatar */}

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold uppercase text-white sm:h-9 sm:w-9 sm:text-sm">
                  {logIn.name?.charAt(0) || "U"}
                </div>

                {/* User name */}

                <div className="hidden text-left sm:block">
                  <p className="max-w-[110px] truncate text-sm font-semibold text-gray-800">
                    {logIn.name}
                  </p>

                  <p className="text-[10px] text-gray-400">Thành viên</p>
                </div>

                {/* Arrow */}

                <svg
                  className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-200 sm:h-4 sm:w-4 ${
                    openMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </button>

              {/* ================= DROPDOWN ================= */}

              {openMenu && (
                <>
                  {/* Overlay */}

                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenMenu(false)}
                  />

                  {/* Dropdown */}

                  <div className="absolute right-0 top-[48px] z-50 w-[calc(100vw-24px)] max-w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:top-[55px]">
                    {/* User Info */}

                    <div className="border-b border-gray-100 bg-blue-50 p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-base font-bold uppercase text-white sm:h-12 sm:w-12 sm:text-lg">
                          {logIn.name?.charAt(0) || "U"}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-bold text-gray-900">
                            {logIn.name}
                          </p>

                          <p className="truncate text-xs text-gray-500">
                            {logIn.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu */}

                    <div className="p-2">
                      {/* Profile */}

                      <Link
                        href="/profile"
                        onClick={() => setOpenMenu(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-blue-50 sm:px-4"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-base sm:h-10 sm:w-10 sm:text-lg">
                          👤
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800">
                            Thông tin cá nhân
                          </p>

                          <p className="text-xs text-gray-400">
                            Quản lý tài khoản
                          </p>
                        </div>
                      </Link>

                      {/* Booking */}

                      <Link
                        href="/book"
                        onClick={() => setOpenMenu(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-blue-50 sm:px-4"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-base sm:h-10 sm:w-10 sm:text-lg">
                          🏠
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800">
                            Phòng đã đặt
                          </p>

                          <p className="text-xs text-gray-400">
                            Xem lịch sử đặt phòng
                          </p>
                        </div>
                      </Link>
                    </div>

                    {/* Logout */}

                    <div className="border-t border-gray-100 p-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-red-50 sm:px-4"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-base sm:h-10 sm:w-10 sm:text-lg">
                          🚪
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-red-500">
                            Đăng xuất
                          </p>

                          <p className="text-xs text-gray-400">
                            Đăng xuất khỏi tài khoản
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* ================= LOGIN ================= */

            <div className="flex items-center gap-1">
              <Link
                href="/login"
                className="rounded-full px-2.5 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-blue-600 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                Đăng nhập
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
