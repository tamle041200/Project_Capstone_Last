"use client";

import type { TUser } from "@/app/type";
import { getUsers, deleteUser } from "@/app/services/user";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function User() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [keyword, setKeyword] = useState("");

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data || []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Tìm kiếm
  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.phone}`
      .toLowerCase()
      .includes(keyword.toLowerCase()),
  );

  // Xóa người dùng
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Bạn có chắc chắn muốn xóa người dùng này không?",
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      alert("Xóa người dùng thành công!");

      fetchUsers();
    } catch (error) {
      console.log(error);
      alert("Xóa người dùng thất bại!");
    }
  };

  const adminCount = users.filter((user) => user.role === "ADMIN").length;

  const customerCount = users.filter((user) => user.role !== "ADMIN").length;

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>

              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Administration
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Quản lý người dùng
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Quản lý tài khoản và thông tin người dùng
            </p>
          </div>

          <Link
            href="/admin/user/addUser"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <span className="text-lg leading-none">+</span>
            Thêm người dùng
          </Link>
        </div>

        {/* ================= THỐNG KÊ ================= */}
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Tổng */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Tổng người dùng
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {users.length}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Tài khoản trong hệ thống
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-lg">
                👥
              </div>
            </div>
          </div>

          {/* Admin */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Quản trị viên
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {adminCount}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Tài khoản quản trị
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-lg">
                🛡️
              </div>
            </div>
          </div>

          {/* Khách hàng */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">Khách hàng</p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {customerCount}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Tài khoản khách hàng
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-lg">
                👤
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2">
            <h2 className="text-sm font-semibold text-slate-800">
              Tìm kiếm người dùng
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Tìm theo họ tên, email hoặc số điện thoại
            </p>
          </div>

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              🔍
            </span>

            <input
              type="text"
              placeholder="Nhập thông tin cần tìm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* TABLE HEADER */}
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Danh sách người dùng
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Hiển thị{" "}
                <span className="font-semibold text-slate-700">
                  {filteredUsers.length}
                </span>{" "}
                người dùng
              </p>
            </div>

            {keyword && (
              <button
                onClick={() => setKeyword("")}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50"
              >
                Xóa tìm kiếm
              </button>
            )}
          </div>

          {/* TABLE */}
          <table className="w-full table-fixed border-collapse">
            {/* Chia cột cố định, không bị kéo ngang */}
            <colgroup>
              <col className="w-[8%]" />
              <col className="w-[23%]" />
              <col className="w-[27%]" />
              <col className="w-[16%]" />
              <col className="w-[11%]" />
              <col className="w-[15%]" />
            </colgroup>

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2.5 text-left text-[11px] font-bold uppercase text-slate-500">
                  ID
                </th>

                <th className="px-3 py-2.5 text-left text-[11px] font-bold uppercase text-slate-500">
                  Người dùng
                </th>

                <th className="px-3 py-2.5 text-left text-[11px] font-bold uppercase text-slate-500">
                  Email
                </th>

                <th className="px-3 py-2.5 text-left text-[11px] font-bold uppercase text-slate-500">
                  Số điện thoại
                </th>

                <th className="px-3 py-2.5 text-left text-[11px] font-bold uppercase text-slate-500">
                  Vai trò
                </th>

                <th className="px-3 py-2.5 text-center text-[11px] font-bold uppercase text-slate-500">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    {/* ID */}
                    <td className="px-3 py-2.5">
                      <span className="text-xs font-medium text-slate-500">
                        #{user.id}
                      </span>
                    </td>

                    {/* USER */}
                    <td className="px-3 py-2.5">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>

                        <p className="truncate text-sm font-semibold text-slate-800">
                          {user.name}
                        </p>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="px-3 py-2.5">
                      <p className="truncate text-xs text-slate-600">
                        {user.email}
                      </p>
                    </td>

                    {/* PHONE */}
                    <td className="px-3 py-2.5">
                      <p className="truncate text-xs text-slate-600">
                        {user.phone}
                      </p>
                    </td>

                    {/* ROLE */}
                    <td className="px-3 py-2.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${
                          user.role === "ADMIN"
                            ? "bg-red-50 text-red-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-2 py-2.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <Link
                          href={`/admin/user/editUser/${user.id}`}
                          className="rounded-md bg-amber-50 px-2 py-1.5 text-[11px] font-semibold text-amber-600 transition hover:bg-amber-100"
                        >
                          Sửa
                        </Link>

                        <button
                          onClick={() => handleDelete(user.id)}
                          className="rounded-md bg-red-50 px-2 py-1.5 text-[11px] font-semibold text-red-600 transition hover:bg-red-100"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-slate-500"
                  >
                    Không tìm thấy người dùng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
