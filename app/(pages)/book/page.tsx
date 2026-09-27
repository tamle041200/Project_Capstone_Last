"use client";

import { useEffect, useState } from "react";
import {
  getBookingByUser,
  deleteBooking,
  updateBooking,
} from "@/app/services/order";
import type { TBooking, TBookingRequest } from "@/app/type";

export default function Book() {
  const [bookings, setBookings] = useState<TBooking[]>([]);
  const [id, setId] = useState<number | null>(null);

  const [ngayDen, setNgayDen] = useState("");
  const [ngayDi, setNgayDi] = useState("");
  const [soLuongKhach, setSoLuongKhach] = useState("");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const userData = JSON.parse(user);

      const fetchBookings = async () => {
        try {
          const data = await getBookingByUser(userData.id);
          setBookings(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      fetchBookings();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  /* ================= DELETE ================= */

  const handleDelete = async (bookingId: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn hủy đặt phòng này không?",
    );

    if (!confirmDelete) return;

    try {
      await deleteBooking(bookingId);

      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));

      if (id === bookingId) {
        setId(null);
      }

      alert("Hủy đặt phòng thành công");
    } catch (error) {
      console.log(error);
      alert("Hủy đặt phòng thất bại");
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (booking: TBooking) => {
    setId(booking.id);
    setNgayDen(booking.ngayDen);
    setNgayDi(booking.ngayDi);
    setSoLuongKhach(booking.soLuongKhach);
  };

  /* ================= UPDATE ================= */

  const handleUpdate = async () => {
    if (id === null) return;

    if (!ngayDen || !ngayDi || !soLuongKhach) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (new Date(ngayDi) <= new Date(ngayDen)) {
      alert("Ngày trả phòng phải sau ngày nhận phòng");
      return;
    }

    try {
      setUpdating(true);

      const booking = bookings.find((booking) => booking.id === id);

      if (!booking) return;

      const data: TBookingRequest = {
        maPhong: booking.maPhong,
        ngayDen,
        ngayDi,
        soLuongKhach,
        maNguoiDung: booking.maNguoiDung,
      };

      await updateBooking(id, data);

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id
            ? {
                ...booking,
                ngayDen,
                ngayDi,
                soLuongKhach,
              }
            : booking,
        ),
      );

      setId(null);

      alert("Cập nhật đặt phòng thành công");
    } catch (error) {
      console.log(error);
      alert("Cập nhật thất bại");
    } finally {
      setUpdating(false);
    }
  };

  /* ================= FORMAT DATE ================= */

  const formatDate = (date?: string) => {
    if (!date) return "--";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("vi-VN");
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="h-5 w-40 rounded bg-slate-200" />

            <div className="mt-4 h-10 w-72 rounded bg-slate-200" />

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="h-28 rounded-3xl bg-white" />
              <div className="h-28 rounded-3xl bg-white" />
              <div className="h-28 rounded-3xl bg-white" />
            </div>

            <div className="mt-8 h-60 rounded-3xl bg-white" />
          </div>
        </div>
      </main>
    );
  }

  /* ================= MAIN ================= */

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* ================= HEADER ================= */}

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <span>🏠</span>
            Quản lý đặt phòng
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Phòng đã đặt
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Xem lại lịch đặt phòng và quản lý những chuyến đi của bạn.
          </p>
        </div>

        {/* ================= STATISTICS ================= */}

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {/* Total */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Tổng đặt phòng
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {bookings.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                🏠
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Đang đặt</p>

                <p className="mt-2 text-3xl font-extrabold text-emerald-600">
                  {bookings.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                ✓
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Trạng thái</p>

                <p className="mt-2 text-lg font-extrabold text-blue-600">
                  Thành viên
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
                👤
              </div>
            </div>
          </div>
        </div>

        {/* ================= EMPTY ================= */}

        {bookings.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-3xl">
              🏡
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Bạn chưa có đặt phòng
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Hãy khám phá những chỗ ở tuyệt vời và bắt đầu chuyến đi tiếp theo
              của bạn.
            </p>

            <a
              href="/rooms"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl"
            >
              🔎 Khám phá phòng
            </a>
          </div>
        ) : (
          /* ================= BOOKING LIST ================= */

          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {/* TOP */}
                <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:px-7">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg">
                        🏠
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Mã đặt phòng
                        </p>

                        <p className="font-bold text-slate-900">
                          #{booking.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Đã đặt
                  </div>
                </div>

                {/* CONTENT */}
                <div className="px-6 py-6 sm:px-7">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* ROOM */}
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                        🏠
                      </div>

                      <p className="mt-4 text-xs font-medium text-slate-400">
                        Mã phòng
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        Phòng #{booking.maPhong}
                      </p>
                    </div>

                    {/* CHECK IN */}
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                        📅
                      </div>

                      <p className="mt-4 text-xs font-medium text-slate-400">
                        Nhận phòng
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {formatDate(booking.ngayDen)}
                      </p>
                    </div>

                    {/* CHECK OUT */}
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                        🗓️
                      </div>

                      <p className="mt-4 text-xs font-medium text-slate-400">
                        Trả phòng
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {formatDate(booking.ngayDi)}
                      </p>
                    </div>

                    {/* GUEST */}
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                        👥
                      </div>

                      <p className="mt-4 text-xs font-medium text-slate-400">
                        Số khách
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {booking.soLuongKhach} khách
                      </p>
                    </div>
                  </div>

                  {/* ACTION */}
                  <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                    <button
                      onClick={() => handleEdit(booking)}
                      className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                    >
                      ✏️ Cập nhật
                    </button>

                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="rounded-xl border border-red-200 bg-white px-5 py-3 font-bold text-red-500 transition hover:bg-red-50"
                    >
                      🗑 Hủy đặt phòng
                    </button>
                  </div>

                  {/* ================= EDIT FORM ================= */}

                  {id === booking.id && (
                    <div className="mt-6 overflow-hidden rounded-3xl border border-blue-100 bg-blue-50/50">
                      {/* FORM HEADER */}
                      <div className="border-b border-blue-100 bg-white px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                            ✏️
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-900">
                              Cập nhật đặt phòng
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              Thay đổi thông tin chuyến đi của bạn
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* FORM */}
                      <div className="p-6">
                        <div className="grid gap-4 md:grid-cols-3">
                          {/* DATE */}
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                              Ngày nhận phòng
                            </label>

                            <input
                              type="date"
                              value={ngayDen}
                              onChange={(e) => setNgayDen(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                          </div>

                          {/* DATE */}
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                              Ngày trả phòng
                            </label>

                            <input
                              type="date"
                              value={ngayDi}
                              onChange={(e) => setNgayDi(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                          </div>

                          {/* GUEST */}
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                              Số khách
                            </label>

                            <input
                              type="number"
                              min={1}
                              value={soLuongKhach}
                              onChange={(e) => setSoLuongKhach(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                          </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                          <button
                            onClick={() => setId(null)}
                            className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                          >
                            Hủy
                          </button>

                          <button
                            onClick={handleUpdate}
                            disabled={updating}
                            className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {updating ? "Đang lưu..." : "✓ Lưu thay đổi"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FOOTER NOTE */}
        {bookings.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span>🔒</span>
            <span>Thông tin đặt phòng của bạn được bảo mật</span>
          </div>
        )}
      </div>
    </main>
  );
}
