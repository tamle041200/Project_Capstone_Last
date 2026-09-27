import type { TRoom } from "@/app/type";
import Link from "next/link";

type TProps = {
  room: TRoom;
};

export default function Room({ room }: TProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* ================= IMAGE ================= */}
      <div className="relative overflow-hidden">
        <Link href={`/detail/${room.id}`}>
          <img
            src={room.hinhAnh}
            alt={room.tenPhong}
            className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Overlay nhẹ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badge */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-md backdrop-blur-sm">
            ✨ Được yêu thích
          </span>
        </div>

        {/* Favorite */}
        <button
          type="button"
          aria-label="Yêu thích"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white"
        >
          ♡
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5">
        {/* Tên + đánh giá */}
        <div className="flex items-start justify-between gap-3">
          <Link href={`/detail/${room.id}`} className="min-w-0">
            <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
              {room.tenPhong}
            </h3>
          </Link>

          <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-gray-700">
            <span className="text-yellow-500">★</span>
            <span>4.8</span>
          </div>
        </div>

        {/* Mô tả */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {room.moTa}
        </p>

        {/* ================= INFO ================= */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
            👥 {room.khach} khách
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
            🛏 {room.phongNgu} phòng ngủ
          </span>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-gray-100" />

        {/* ================= PRICE ================= */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-gray-400">Giá mỗi đêm</p>

            <div className="mt-1">
              <span className="text-xl font-extrabold text-gray-900">
                {room.giaTien.toLocaleString("vi-VN")}đ
              </span>

              <span className="ml-1 text-sm text-gray-500">/ đêm</span>
            </div>
          </div>

          {/* Button */}
          <Link
            href={`/detail/${room.id}`}
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-100 transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
          >
            Xem phòng
          </Link>
        </div>
      </div>
    </article>
  );
}
