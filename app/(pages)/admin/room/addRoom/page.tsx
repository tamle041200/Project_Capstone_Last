"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addRoom } from "@/app/services/room";

export default function AddRoom() {
  const router = useRouter();

  const [room, setRoom] = useState({
    tenPhong: "",
    khach: 1,
    phongNgu: 1,
    giuong: 1,
    phongTam: 1,
    moTa: "",
    giaTien: 0,
    maViTri: 0,
    hinhAnh: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setRoom({
      ...room,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await addRoom(room);

      alert("Thêm phòng thành công!");

      router.push("/admin/room");
    } catch (error) {
      console.log(error);

      alert("Thêm phòng thất bại!");
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 text-sm font-medium !text-slate-500 transition hover:!text-blue-600"
          >
            ← Quay lại danh sách phòng
          </button>

          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold !text-blue-700">
            QUẢN LÝ PHÒNG
          </span>

          <h1 className="mt-3 text-3xl font-bold tracking-tight !text-slate-900 md:text-4xl">
            Thêm phòng mới
          </h1>

          <p className="mt-2 text-sm !text-slate-500 md:text-base">
            Tạo thông tin phòng lưu trú mới cho hệ thống Airbnb.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ================= THÔNG TIN CƠ BẢN ================= */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  🏠
                </div>

                <div>
                  <h2 className="font-bold !text-slate-900">
                    Thông tin cơ bản
                  </h2>

                  <p className="text-sm !text-slate-500">
                    Thông tin chính của phòng
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">
              {/* TÊN PHÒNG */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold !text-slate-700">
                  Tên phòng
                </label>

                <input
                  name="tenPhong"
                  value={room.tenPhong}
                  onChange={handleChange}
                  placeholder="Ví dụ: Căn hộ cao cấp trung tâm Quận 1"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm !text-slate-900 outline-none transition placeholder:!text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* SỐ KHÁCH */}
              <div>
                <label className="mb-2 block text-sm font-bold !text-slate-700">
                  Số khách
                </label>

                <div className="relative">
                  <input
                    name="khach"
                    type="number"
                    value={room.khach}
                    onChange={handleChange}
                    min="1"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-16 text-sm !text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs !text-slate-400">
                    khách
                  </span>
                </div>
              </div>

              {/* PHÒNG NGỦ */}
              <div>
                <label className="mb-2 block text-sm font-bold !text-slate-700">
                  Phòng ngủ
                </label>

                <div className="relative">
                  <input
                    name="phongNgu"
                    type="number"
                    value={room.phongNgu}
                    onChange={handleChange}
                    min="1"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-20 text-sm !text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs !text-slate-400">
                    phòng
                  </span>
                </div>
              </div>

              {/* GIƯỜNG */}
              <div>
                <label className="mb-2 block text-sm font-bold !text-slate-700">
                  Số giường
                </label>

                <div className="relative">
                  <input
                    name="giuong"
                    type="number"
                    value={room.giuong}
                    onChange={handleChange}
                    min="1"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-20 text-sm !text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs !text-slate-400">
                    giường
                  </span>
                </div>
              </div>

              {/* PHÒNG TẮM */}
              <div>
                <label className="mb-2 block text-sm font-bold !text-slate-700">
                  Phòng tắm
                </label>

                <div className="relative">
                  <input
                    name="phongTam"
                    type="number"
                    value={room.phongTam}
                    onChange={handleChange}
                    min="1"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-20 text-sm !text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs !text-slate-400">
                    phòng
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= GIÁ + VỊ TRÍ ================= */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* GIÁ */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                    💰
                  </div>

                  <div>
                    <h2 className="font-bold !text-slate-900">Giá phòng</h2>

                    <p className="text-sm !text-slate-500">Giá thuê mỗi đêm</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <label className="mb-2 block text-sm font-bold !text-slate-700">
                  Giá tiền
                </label>

                <div className="relative">
                  <input
                    name="giaTien"
                    type="number"
                    value={room.giaTien}
                    onChange={handleChange}
                    min="0"
                    placeholder="500000"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-4 pr-20 text-lg font-bold !text-slate-900 outline-none transition placeholder:!text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold !text-slate-500">
                    VNĐ
                  </span>
                </div>

                <p className="mt-2 text-xs !text-slate-500">
                  Nhập giá tiền thuê phòng cho một đêm.
                </p>
              </div>
            </div>

            {/* VỊ TRÍ */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-xl">
                    📍
                  </div>

                  <div>
                    <h2 className="font-bold !text-slate-900">Vị trí</h2>

                    <p className="text-sm !text-slate-500">
                      Xác định vị trí phòng
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <label className="mb-2 block text-sm font-bold !text-slate-700">
                  Mã vị trí
                </label>

                <input
                  name="maViTri"
                  type="number"
                  value={room.maViTri}
                  onChange={handleChange}
                  placeholder="Nhập mã vị trí"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-4 text-sm !text-slate-900 outline-none transition placeholder:!text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs !text-slate-500">
                  Nhập mã vị trí tương ứng trong hệ thống.
                </p>
              </div>
            </div>
          </div>

          {/* ================= HÌNH ẢNH ================= */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl">
                  🖼️
                </div>

                <div>
                  <h2 className="font-bold !text-slate-900">Hình ảnh phòng</h2>

                  <p className="text-sm !text-slate-500">
                    Thêm hình ảnh đại diện cho phòng
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <label className="mb-2 block text-sm font-bold !text-slate-700">
                Link hình ảnh
              </label>

              <input
                name="hinhAnh"
                value={room.hinhAnh}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm !text-slate-900 outline-none transition placeholder:!text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <div className="mt-4 flex items-start gap-3 rounded-xl bg-slate-100 p-4">
                <span className="text-lg">💡</span>

                <p className="text-xs leading-5 !text-slate-600">
                  Sử dụng đường dẫn hình ảnh có thể truy cập công khai để hình
                  ảnh hiển thị chính xác trên trang phòng.
                </p>
              </div>
            </div>
          </div>

          {/* ================= MÔ TẢ ================= */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-xl">
                  📝
                </div>

                <div>
                  <h2 className="font-bold !text-slate-900">Mô tả phòng</h2>

                  <p className="text-sm !text-slate-500">
                    Giới thiệu chi tiết về nơi lưu trú
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <textarea
                name="moTa"
                value={room.moTa}
                onChange={handleChange}
                placeholder="Mô tả về phòng, tiện nghi, không gian, vị trí..."
                rows={6}
                className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 !text-slate-900 outline-none transition placeholder:!text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs !text-slate-500">
                Hãy mô tả những điểm nổi bật giúp khách hàng hiểu rõ hơn về
                phòng.
              </p>
            </div>
          </div>

          {/* ================= BUTTON ================= */}
          <div className="flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold !text-slate-700 transition hover:bg-slate-100"
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold !text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98]"
            >
              + Thêm phòng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
