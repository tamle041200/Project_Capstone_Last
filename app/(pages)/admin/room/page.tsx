"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRooms, deleteRoom } from "@/app/services/room";
import type { TRoom } from "@/app/type";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<TRoom[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((room) =>
    room.tenPhong.toLowerCase().includes(keyword.toLowerCase()),
  );

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa phòng này không?",
    );

    if (!confirmDelete) return;

    try {
      await deleteRoom(id);

      alert("Xóa phòng thành công!");

      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      console.log(error);
      alert("Xóa phòng thất bại!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold !text-blue-700">
              QUẢN LÝ PHÒNG
            </span>

            <h1 className="mt-3 text-3xl font-bold tracking-tight !text-slate-900">
              Danh sách phòng
            </h1>

            <p className="mt-2 text-sm !text-slate-500">
              Quản lý, chỉnh sửa và theo dõi các phòng đang cho thuê.
            </p>
          </div>

          <Link
            href="/admin/room/addRoom"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold !text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98]"
          >
            + Thêm phòng
          </Link>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Tổng phòng */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium !text-slate-500">
                  Tổng số phòng
                </p>

                <h2 className="mt-2 text-3xl font-bold !text-slate-900">
                  {rooms.length}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                🏠
              </div>
            </div>
          </div>

          {/* Kết quả */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium !text-slate-500">
                  Kết quả tìm kiếm
                </p>

                <h2 className="mt-2 text-3xl font-bold !text-slate-900">
                  {filteredRooms.length}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
                🔎
              </div>
            </div>
          </div>

          {/* Trạng thái */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium !text-slate-500">
                  Trạng thái
                </p>

                <h2 className="mt-2 text-xl font-bold !text-emerald-600">
                  Đang hoạt động
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
                ✓
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="font-bold !text-slate-900">Tìm kiếm phòng</h2>

            <p className="mt-1 text-sm !text-slate-500">
              Tìm phòng nhanh theo tên phòng.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                🔍
              </span>

              <input
                type="text"
                placeholder="Nhập tên phòng cần tìm..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-sm !text-slate-900 outline-none transition placeholder:!text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button
              type="button"
              className="rounded-xl bg-slate-900 px-7 py-3 text-sm font-bold !text-white transition hover:bg-slate-800"
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Table header */}
          <div className="flex flex-col gap-2 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold !text-slate-900">Danh sách phòng</h2>

              <p className="mt-1 text-sm !text-slate-500">
                Hiển thị {filteredRooms.length} phòng
              </p>
            </div>

            {keyword && (
              <button
                type="button"
                onClick={() => setKeyword("")}
                className="text-sm font-semibold !text-blue-600 hover:!text-blue-700"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider !text-slate-500">
                    ID
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider !text-slate-500">
                    Phòng
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider !text-slate-500">
                    Tên phòng
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider !text-slate-500">
                    Khách
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider !text-slate-500">
                    Giá / đêm
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider !text-slate-500">
                    Thao tác
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room) => (
                    <tr
                      key={room.id}
                      className="border-b border-slate-100 transition last:border-0 hover:bg-blue-50/40"
                    >
                      {/* ID */}
                      <td className="px-6 py-5">
                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold !text-slate-600">
                          #{room.id}
                        </span>
                      </td>

                      {/* IMAGE */}
                      <td className="px-6 py-5">
                        <div className="h-16 w-24 overflow-hidden rounded-xl bg-slate-100">
                          <img
                            src={room.hinhAnh}
                            alt={room.tenPhong}
                            width={96}
                            height={64}
                            className="h-full w-full object-cover transition duration-300 hover:scale-105"
                          />
                        </div>
                      </td>

                      {/* NAME */}
                      <td className="px-6 py-5">
                        <div className="max-w-xs">
                          <p className="font-bold !text-slate-800">
                            {room.tenPhong}
                          </p>

                          <p className="mt-1 text-xs !text-slate-400">
                            Phòng lưu trú
                          </p>
                        </div>
                      </td>

                      {/* GUEST */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold !text-blue-700">
                          👤 {room.khach} khách
                        </span>
                      </td>

                      {/* PRICE */}
                      <td className="px-6 py-5">
                        <p className="font-bold !text-slate-900">
                          {room.giaTien.toLocaleString()} $
                        </p>

                        <p className="mt-1 text-xs !text-slate-400">/ đêm</p>
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/admin/room/editRoom/${room.id}`}
                            className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold !text-blue-600 transition hover:bg-blue-100"
                          >
                            Sửa
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(room.id)}
                            className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold !text-red-600 transition hover:bg-red-100"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                          🔍
                        </div>

                        <h3 className="mt-4 font-bold !text-slate-800">
                          Không tìm thấy phòng
                        </h3>

                        <p className="mt-2 text-sm !text-slate-500">
                          Không có phòng nào phù hợp với từ khóa "{keyword}".
                        </p>

                        <button
                          type="button"
                          onClick={() => setKeyword("")}
                          className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold !text-white transition hover:bg-blue-700"
                        >
                          Xem tất cả phòng
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= FOOTER NOTE ================= */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <span className="text-lg">💡</span>

            <div>
              <p className="text-sm font-semibold !text-blue-900">
                Quản lý phòng
              </p>

              <p className="mt-1 text-xs leading-5 !text-blue-700">
                Bạn có thể thêm phòng mới, chỉnh sửa thông tin hoặc xóa phòng
                trực tiếp từ danh sách này.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
