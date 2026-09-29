import type { TRoom } from "@/app/type";
import Link from "next/link";

type TProps = {
  room: TRoom;
};

export default function Room({ room }: TProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl">
      {/* ================= IMAGE ================= */}

      <div className="relative overflow-hidden">
        <Link href={`/detail/${room.id}`}>
          <img
            src={room.hinhAnh}
            alt={room.tenPhong}
            className="h-56 w-full object-cover transition duration-700 group-hover:scale-110 sm:h-64"
          />
        </Link>

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badge */}

        <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-gray-800 shadow-md backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-xs">
            ✨ Được yêu thích
          </span>
        </div>

        {/* Favorite */}

        <button
          type="button"
          aria-label="Yêu thích"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-base shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white sm:right-4 sm:top-4 sm:h-10 sm:w-10 sm:text-lg"
        >
          ♡
        </button>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-4 sm:p-5">
        {/* Tên + đánh giá */}

        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <Link href={`/detail/${room.id}`} className="min-w-0">
            <h3 className="line-clamp-1 text-base font-bold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-lg">
              {room.tenPhong}
            </h3>
          </Link>

          <div className="flex shrink-0 items-center gap-1 text-xs font-semibold text-gray-700 sm:text-sm">
            <span className="text-yellow-500">★</span>
            <span>4.8</span>
          </div>
        </div>

        {/* Mô tả */}

        <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
          {room.moTa}
        </p>

        {/* ================= INFO ================= */}

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-2.5 py-1.5 text-[11px] font-semibold text-blue-600 sm:px-3 sm:text-xs">
            👥 {room.khach} khách
          </span>

          <span className="rounded-full bg-gray-100 px-2.5 py-1.5 text-[11px] font-semibold text-gray-600 sm:px-3 sm:text-xs">
            🛏 {room.phongNgu} phòng ngủ
          </span>
        </div>

        {/* Divider */}

        <div className="my-4 border-t border-gray-100 sm:my-5" />

        {/* ================= PRICE ================= */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="text-[11px] font-medium text-gray-400 sm:text-xs">
              Giá mỗi đêm
            </p>

            <div className="mt-1">
              <span className="text-lg font-extrabold text-gray-900 sm:text-xl">
                {room.giaTien.toLocaleString("vi-VN")}đ
              </span>

              <span className="ml-1 text-xs text-gray-500 sm:text-sm">
                / đêm
              </span>
            </div>
          </div>

          {/* Button */}

          <Link
            href={`/detail/${room.id}`}
            className="flex w-full items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-100 transition-all duration-300 hover:bg-blue-700 hover:shadow-lg sm:w-auto"
          >
            Xem phòng
          </Link>
        </div>
      </div>
    </article>
  );
}
