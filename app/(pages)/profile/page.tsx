"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type TUser = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  birthday?: string;
  gender?: boolean;
  role?: string;
};

export default function Profile() {
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      try {
        setUser(JSON.parse(data));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const formatBirthday = (birthday?: string) => {
    if (!birthday) return "Chưa cập nhật";

    const date = new Date(birthday);

    if (isNaN(date.getTime())) {
      return birthday;
    }

    return date.toLocaleDateString("vi-VN");
  };

  const getRole = (role?: string) => {
    if (!role) return "Khách hàng";

    if (role.toLowerCase() === "admin") {
      return "Quản trị viên";
    }

    return "Khách hàng";
  };

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6">
        <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-blue-100/50">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-3xl">
            👤
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-gray-900">
            Bạn chưa đăng nhập
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Đăng nhập để xem và quản lý thông tin tài khoản của bạn.
          </p>

          <Link
            href="/login"
            className="mt-7 flex w-full items-center justify-center rounded-2xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
          >
            Đăng nhập
            <span className="ml-2">→</span>
          </Link>

          <Link
            href="/"
            className="mt-3 flex w-full items-center justify-center rounded-2xl border border-gray-200 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Về trang chủ
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            Tài khoản
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Thông tin cá nhân
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Quản lý và xem thông tin tài khoản của bạn.
          </p>
        </div>

        {/* MAIN */}
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* USER CARD */}
          <div className="h-fit overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg shadow-blue-100/40">
            {/* Banner */}
            <div className="relative h-28 overflow-hidden bg-gradient-to-br">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-16 -left-8 h-32 w-32 rounded-full bg-white/10" />
            </div>

            {/* User */}
            <div className="-mt-12 px-6 pb-6 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-blue-50 text-3xl font-extrabold uppercase text-blue-600 shadow-lg">
                {user.name?.charAt(0)}
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                {user.name}
              </h2>

              <div className="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {getRole(user.role)}
              </div>

              <div className="my-5 border-t border-gray-100" />

              {/* Email */}
              <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  ✉️
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Email</p>

                  <p className="truncate text-sm font-semibold text-gray-700">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="mt-3 flex items-center gap-3 rounded-2xl bg-gray-50 p-3 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  📱
                </div>

                <div>
                  <p className="text-xs text-gray-400">Điện thoại</p>

                  <p className="text-sm font-semibold text-gray-700">
                    {user.phone || "Chưa cập nhật"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* INFORMATION */}
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg shadow-blue-100/40">
            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-6 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                  👤
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Thông tin tài khoản
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Thông tin cá nhân của bạn
                  </p>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* NAME */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-blue-100 hover:bg-blue-50/40">
                  <div className="flex items-center gap-3">
                    <span>👤</span>

                    <p className="text-sm font-medium text-gray-500">
                      Họ và tên
                    </p>
                  </div>

                  <p className="mt-3 text-base font-bold text-gray-900">
                    {user.name}
                  </p>
                </div>

                {/* EMAIL */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-blue-100 hover:bg-blue-50/40">
                  <div className="flex items-center gap-3">
                    <span>✉️</span>

                    <p className="text-sm font-medium text-gray-500">Email</p>
                  </div>

                  <p className="mt-3 break-all text-base font-bold text-gray-900">
                    {user.email}
                  </p>
                </div>

                {/* PHONE */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-blue-100 hover:bg-blue-50/40">
                  <div className="flex items-center gap-3">
                    <span>📱</span>

                    <p className="text-sm font-medium text-gray-500">
                      Số điện thoại
                    </p>
                  </div>

                  <p className="mt-3 text-base font-bold text-gray-900">
                    {user.phone || "Chưa cập nhật"}
                  </p>
                </div>

                {/* BIRTHDAY */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-blue-100 hover:bg-blue-50/40">
                  <div className="flex items-center gap-3">
                    <span>🎂</span>

                    <p className="text-sm font-medium text-gray-500">
                      Ngày sinh
                    </p>
                  </div>

                  <p className="mt-3 text-base font-bold text-gray-900">
                    {formatBirthday(user.birthday)}
                  </p>
                </div>

                {/* GENDER */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-blue-100 hover:bg-blue-50/40">
                  <div className="flex items-center gap-3">
                    <span>⚧</span>

                    <p className="text-sm font-medium text-gray-500">
                      Giới tính
                    </p>
                  </div>

                  <p className="mt-3 text-base font-bold text-gray-900">
                    {user.gender === undefined
                      ? "Chưa cập nhật"
                      : user.gender
                        ? "Nam"
                        : "Nữ"}
                  </p>
                </div>

                {/* ROLE */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-blue-100 hover:bg-blue-50/40">
                  <div className="flex items-center gap-3">
                    <span>🛡️</span>

                    <p className="text-sm font-medium text-gray-500">
                      Loại tài khoản
                    </p>
                  </div>

                  <p className="mt-3 text-base font-bold text-gray-900">
                    {getRole(user.role)}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
                <Link
                  href="/book"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 font-bold text-white shadow-md shadow-blue-100 transition hover:bg-blue-700 hover:shadow-lg"
                >
                  🏠
                  <span>Phòng đã đặt</span>
                </Link>

                <Link
                  href="/rooms"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3.5 font-bold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  🔎
                  <span>Khám phá phòng</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span>🔒</span>
          <span>Thông tin tài khoản của bạn được bảo mật</span>
        </div>
      </div>
    </main>
  );
}
