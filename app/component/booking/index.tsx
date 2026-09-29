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
    <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 sm:rounded-3xl">
      {/* ================= HEADER ================= */}

      <div className="border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5 lg:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              Đặt phòng
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Chọn ngày lưu trú của bạn
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg sm:h-10 sm:w-10 sm:text-xl">
            🏠
          </div>
        </div>
      </div>

      {/* ================= FORM ================= */}

      <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
        {/* ================= NGÀY NHẬN ================= */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Ngày nhận phòng
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base sm:left-4 sm:text-lg">
              📅
            </span>

            <input
              type="date"
              min={today}
              value={ngayDen}
              onChange={(e) => setNgayDen(e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-3 text-sm font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:h-auto sm:rounded-2xl sm:py-3.5 sm:pl-12 sm:pr-4"
            />
          </div>
        </div>

        {/* ================= NGÀY TRẢ ================= */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Ngày trả phòng
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base sm:left-4 sm:text-lg">
              📅
            </span>

            <input
              type="date"
              min={ngayDen || today}
              value={ngayDi}
              onChange={(e) => setNgayDi(e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-3 text-sm font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:h-auto sm:rounded-2xl sm:py-3.5 sm:pl-12 sm:pr-4"
            />
          </div>
        </div>

        {/* ================= SỐ KHÁCH ================= */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Số khách
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base sm:left-4 sm:text-lg">
              👥
            </span>

            <input
              type="number"
              min={1}
              value={soLuongKhach}
              onChange={(e) => setSoLuongKhach(e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-3 text-sm font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:h-auto sm:rounded-2xl sm:py-3.5 sm:pl-12 sm:pr-4"
            />
          </div>
        </div>

        {/* ================= NOTE ================= */}

        <div className="rounded-xl bg-blue-50 p-3.5 sm:rounded-2xl sm:p-4">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <span className="shrink-0 text-base sm:text-lg">💡</span>

            <div className="min-w-0">
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
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none sm:h-auto sm:rounded-2xl sm:py-4 sm:text-base"
        >
          {loading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Đang đặt phòng...</span>
            </>
          ) : (
            <>
              <span>Đặt phòng</span>
              <span>→</span>
            </>
          )}
        </button>

        {/* ================= SECURITY ================= */}

        <p className="px-2 text-center text-[11px] leading-5 text-gray-400 sm:text-xs">
          🔒 Thông tin đặt phòng của bạn được bảo mật
        </p>
      </div>
    </div>
  );
}
