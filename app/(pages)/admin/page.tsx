"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUsers } from "@/app/services/user";
import { getRooms } from "@/app/services/room";
import type { TUser, TRoom } from "@/app/type";

export default function Admin() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [rooms, setRooms] = useState<TRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, roomData] = await Promise.all([
          getUsers(),
          getRooms(),
        ]);

        setUsers(userData || []);
        setRooms(roomData || []);
      } catch (error) {
        console.log("Lỗi lấy dữ liệu Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Tổng người dùng",
      value: users.length,
      icon: "👥",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Tổng số phòng",
      value: rooms.length,
      icon: "🏠",
      bg: "bg-indigo-50",
      iconBg: "bg-indigo-100",
      text: "text-indigo-600",
    },
    {
      title: "Đặt phòng",
      value: "—",
      icon: "📅",
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    {
      title: "Doanh thu",
      value: "—",
      icon: "💰",
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      text: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* ================= WELCOME ================= */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-lg">
        <div className="relative z-10">
          <p className="mb-2 text-sm font-medium text-blue-100">
            Chào mừng trở lại 👋
          </p>

          <h1 className="text-3xl font-bold">Dashboard quản trị</h1>

          <p className="mt-2 max-w-xl text-sm text-blue-100">
            Theo dõi và quản lý hệ thống StayGO của bạn một cách dễ dàng.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/user/addUser"
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
            >
              + Thêm người dùng
            </Link>

            <Link
              href="/admin/room/addRoom"
              className="rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              + Thêm phòng
            </Link>
          </div>
        </div>

        <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-32 h-52 w-52 rounded-full bg-white/10" />
      </section>

      {/* ================= STATS ================= */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">Tổng quan</h2>

          <p className="text-sm text-slate-500">Thống kê dữ liệu từ hệ thống</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${item.bg}`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg} text-xl`}
              >
                {item.icon}
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {item.title}
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {loading ? "..." : item.value}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DATA ================= */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* USERS */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="font-bold text-slate-900">Người dùng mới</h2>

              <p className="mt-1 text-xs text-slate-400">
                Danh sách người dùng trong hệ thống
              </p>
            </div>

            <Link
              href="/admin/user"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-6 text-center text-sm text-slate-400">
                Đang tải dữ liệu...
              </div>
            ) : users.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-400">
                Không có người dùng
              </div>
            ) : (
              users.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-slate-400">
                      {user.email}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                    {user.role}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ROOMS */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="font-bold text-slate-900">Phòng mới</h2>

              <p className="mt-1 text-xs text-slate-400">
                Danh sách phòng trong hệ thống
              </p>
            </div>

            <Link
              href="/admin/room"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-6 text-center text-sm text-slate-400">
                Đang tải dữ liệu...
              </div>
            ) : rooms.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-400">
                Không có phòng
              </div>
            ) : (
              rooms.slice(0, 5).map((room) => (
                <div
                  key={room.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                    🏠
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {room.tenPhong}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {room.khach} khách • {room.phongNgu} phòng ngủ
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">
                      {room.giaTien?.toLocaleString("vi-VN")}đ
                    </p>

                    <p className="text-xs text-slate-400">/ đêm</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* ================= QUICK ACTION ================= */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-slate-900">Thao tác nhanh</h2>

        <p className="mt-1 text-sm text-slate-400">
          Truy cập nhanh các chức năng quản trị
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/admin/user"
            className="group rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="text-2xl">👥</div>

            <p className="mt-3 font-semibold text-slate-800">
              Quản lý người dùng
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Xem, sửa và xóa người dùng
            </p>
          </Link>

          <Link
            href="/admin/user/addUser"
            className="group rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="text-2xl">➕</div>

            <p className="mt-3 font-semibold text-slate-800">Thêm người dùng</p>

            <p className="mt-1 text-xs text-slate-400">
              Tạo tài khoản người dùng mới
            </p>
          </Link>

          <Link
            href="/admin/room"
            className="group rounded-xl border border-slate-200 p-5 transition hover:border-indigo-300 hover:bg-indigo-50"
          >
            <div className="text-2xl">🏠</div>

            <p className="mt-3 font-semibold text-slate-800">Quản lý phòng</p>

            <p className="mt-1 text-xs text-slate-400">
              Xem và chỉnh sửa phòng
            </p>
          </Link>

          <Link
            href="/admin/room/addRoom"
            className="group rounded-xl border border-slate-200 p-5 transition hover:border-indigo-300 hover:bg-indigo-50"
          >
            <div className="text-2xl">🏡</div>

            <p className="mt-3 font-semibold text-slate-800">Thêm phòng</p>

            <p className="mt-1 text-xs text-slate-400">Tạo phòng mới</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
