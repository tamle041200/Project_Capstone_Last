"use client";

import { useState } from "react";
import { createBooking } from "@/app/services/order";
import type { TBookingRequest } from "@/app/type";
import { useRouter } from "next/navigation";

type TProps = {
  maPhong: number;
};

export default function Booking({ maPhong }: TProps) {
  const router = useRouter();

  const [ngayDen, setNgayDen] = useState("");
  const [ngayDi, setNgayDi] = useState("");
  const [soLuongKhach, setSoLuongKhach] = useState("1");
  const [loading, setLoading] = useState(false);

  // Ngày hôm nay
  const today = new Date().toISOString().split("T")[0];

  const handleBooking = async () => {
    // Kiểm tra đăng nhập
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Vui lòng đăng nhập để đặt phòng");
      router.push("/login");
      return;
    }

    // Kiểm tra ngày
    if (!ngayDen || !ngayDi) {
      alert("Vui lòng chọn ngày nhận và trả phòng");
      return;
    }

    if (ngayDi <= ngayDen) {
      alert("Ngày trả phòng phải sau ngày nhận phòng");
      return;
    }

    // Kiểm tra số khách
    if (Number(soLuongKhach) < 1) {
      alert("Số khách phải lớn hơn 0");
      return;
    }

    try {
      setLoading(true);

      const userData = JSON.parse(user);

      const data: TBookingRequest = {
        maPhong: maPhong,
        ngayDen: ngayDen,
        ngayDi: ngayDi,
        soLuongKhach: soLuongKhach,
        maNguoiDung: userData.id,
      };

      await createBooking(data);

      alert("Đặt phòng thành công!");

      router.push("/book");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Đặt phòng thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
      {/* ================= HEADER ================= */}
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Đặt phòng</h2>

            <p className="mt-1 text-sm text-gray-500">
              Chọn ngày lưu trú của bạn
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-xl">
            🏠
          </div>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div className="space-y-5 p-6">
        {/* Ngày nhận */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Ngày nhận phòng
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
              📅
            </span>

            <input
              type="date"
              min={today}
              value={ngayDen}
              onChange={(e) => setNgayDen(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>
        </div>

        {/* Ngày trả */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Ngày trả phòng
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
              📅
            </span>

            <input
              type="date"
              min={ngayDen || today}
              value={ngayDi}
              onChange={(e) => setNgayDi(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>
        </div>

        {/* Số khách */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Số khách
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
              👥
            </span>

            <input
              type="number"
              min={1}
              value={soLuongKhach}
              onChange={(e) => setSoLuongKhach(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>
        </div>

        {/* ================= NOTE ================= */}
        <div className="rounded-2xl bg-blue-50 p-4">
          <div className="flex gap-3">
            <span className="text-lg">💡</span>

            <div>
              <p className="text-sm font-semibold text-blue-900">Lưu ý</p>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                Vui lòng kiểm tra kỹ ngày nhận, ngày trả và số lượng khách trước
                khi đặt phòng.
              </p>
            </div>
          </div>
        </div>

        {/* ================= BUTTON ================= */}
        <button
          type="button"
          onClick={handleBooking}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
        >
          {loading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Đang đặt phòng...
            </>
          ) : (
            <>
              Đặt phòng
              <span>→</span>
            </>
          )}
        </button>

        {/* Security */}
        <p className="text-center text-xs text-gray-400">
          🔒 Thông tin đặt phòng của bạn được bảo mật
        </p>
      </div>
    </div>
  );
}
