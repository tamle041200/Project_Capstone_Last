"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRoomById, updateRoom } from "@/app/services/room";

export default function EditRoom() {
  const { id } = useParams();
  const router = useRouter();

  const [room, setRoom] = useState({
    tenPhong: "",
    khach: 1,
    phongNgu: 1,
    giuong: 1,
    phongTam: 1,
    moTa: "",
    giaTien: 0,
  });

  // Lấy thông tin phòng
  useEffect(() => {
    const getData = async () => {
      const data = await getRoomById(id as string);

      setRoom({
        tenPhong: data.tenPhong,
        khach: data.khach,
        phongNgu: data.phongNgu,
        giuong: data.giuong,
        phongTam: data.phongTam,
        moTa: data.moTa,
        giaTien: data.giaTien,
      });
    };

    getData();
  }, [id]);

  // Thay đổi dữ liệu
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setRoom({
      ...room,
      [name]: value,
    });
  };

  // Cập nhật phòng
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await updateRoom(id as string, room);

    alert("Sửa phòng thành công!");
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 text-sm font-medium !text-gray-500 hover:!text-blue-600"
          >
            ← Quay lại danh sách phòng
          </button>

          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold !text-blue-700">
            QUẢN LÝ PHÒNG
          </span>

          <h1 className="mt-3 text-3xl font-bold !text-gray-900 md:text-4xl">
            Chỉnh sửa phòng
          </h1>

          <p className="mt-2 text-sm !text-gray-500 md:text-base">
            Cập nhật thông tin và thông số của phòng lưu trú.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* THÔNG TIN CƠ BẢN */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  🏠
                </div>

                <div>
                  <h2 className="font-bold !text-gray-900">Thông tin cơ bản</h2>

                  <p className="text-sm !text-gray-500">
                    Cập nhật thông tin chính của phòng
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">
              {/* TÊN PHÒNG */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold !text-gray-700">
                  Tên phòng
                </label>

                <input
                  name="tenPhong"
                  value={room.tenPhong}
                  onChange={handleChange}
                  placeholder="Tên phòng"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm !text-gray-900 outline-none placeholder:!text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* SỐ KHÁCH */}
              <div>
                <label className="mb-2 block text-sm font-bold !text-gray-700">
                  Số khách
                </label>

                <input
                  name="khach"
                  type="number"
                  value={room.khach}
                  onChange={handleChange}
                  min="1"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm !text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* PHÒNG NGỦ */}
              <div>
                <label className="mb-2 block text-sm font-bold !text-gray-700">
                  Phòng ngủ
                </label>

                <input
                  name="phongNgu"
                  type="number"
                  value={room.phongNgu}
                  onChange={handleChange}
                  min="1"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm !text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* GIƯỜNG */}
              <div>
                <label className="mb-2 block text-sm font-bold !text-gray-700">
                  Số giường
                </label>

                <input
                  name="giuong"
                  type="number"
                  value={room.giuong}
                  onChange={handleChange}
                  min="1"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm !text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* PHÒNG TẮM */}
              <div>
                <label className="mb-2 block text-sm font-bold !text-gray-700">
                  Phòng tắm
                </label>

                <input
                  name="phongTam"
                  type="number"
                  value={room.phongTam}
                  onChange={handleChange}
                  min="1"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm !text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {/* GIÁ PHÒNG */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                  💰
                </div>

                <div>
                  <h2 className="font-bold !text-gray-900">Giá phòng</h2>

                  <p className="text-sm !text-gray-500">
                    Cập nhật giá thuê mỗi đêm
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <label className="mb-2 block text-sm font-bold !text-gray-700">
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
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-4 pr-20 text-lg font-bold !text-gray-900 outline-none placeholder:!text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold !text-gray-500">
                  VNĐ
                </span>
              </div>

              <p className="mt-2 text-xs !text-gray-500">
                Giá thuê phòng cho một đêm.
              </p>
            </div>
          </div>

          {/* MÔ TẢ */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100 text-xl">
                  📝
                </div>

                <div>
                  <h2 className="font-bold !text-gray-900">Mô tả phòng</h2>

                  <p className="text-sm !text-gray-500">
                    Cập nhật thông tin giới thiệu về phòng
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
                rows={7}
                className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm leading-6 !text-gray-900 outline-none placeholder:!text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs !text-gray-500">
                Mô tả chi tiết giúp khách hàng hiểu rõ hơn về nơi lưu trú.
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex flex-col-reverse gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-bold !text-gray-700 transition hover:bg-gray-100"
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold !text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98]"
            >
              ✓ Cập nhật phòng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
