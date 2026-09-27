import { getRoomById } from "@/app/services/room";
import Booking from "@/app/component/booking";

type TProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Detail({ params }: TProps) {
  const { id } = await params;
  const data = await getRoomById(id);

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-3xl">
              🏠
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Không tìm thấy phòng
            </h1>

            <p className="mt-2 text-slate-500">
              Phòng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <span>Trang chủ</span>
          <span>›</span>
          <span>Phòng</span>
          <span>›</span>
          <span className="font-medium text-blue-600">{data.tenPhong}</span>
        </div>

        {/* TITLE */}
        <div className="mb-7">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            <span>✨</span>
            Chi tiết chỗ ở
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {data.tenPhong}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span>📍 Chỗ ở tiện nghi</span>

            <span>•</span>

            <span>👥 Tối đa {data.khach} khách</span>
          </div>
        </div>

        {/* IMAGE */}
        <div className="group relative overflow-hidden rounded-[2rem] bg-white shadow-sm">
          <img
            src={data.hinhAnh}
            alt={data.tenPhong}
            className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-[1.02] sm:h-[480px] lg:h-[540px]"
          />

          {/* Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Image badge */}
          <div className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg backdrop-blur">
            🏡 Không gian nghỉ dưỡng
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* HOST / INTRO */}
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white">
                  {data.tenPhong?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {data.tenPhong}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Không gian thoải mái cho kỳ nghỉ của bạn
                  </p>
                </div>
              </div>
            </section>

            {/* ROOM INFO */}
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div>
                <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Tổng quan
                </span>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Thông tin phòng
                </h2>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {/* Guests */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-100 hover:bg-blue-50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    👥
                  </div>

                  <p className="mt-4 text-xs font-medium text-slate-400">
                    Khách
                  </p>

                  <p className="mt-1 font-bold text-slate-900">{data.khach}</p>
                </div>

                {/* Bedroom */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-100 hover:bg-blue-50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    🛏️
                  </div>

                  <p className="mt-4 text-xs font-medium text-slate-400">
                    Phòng ngủ
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {data.phongNgu}
                  </p>
                </div>

                {/* Bed */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-100 hover:bg-blue-50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    🛌
                  </div>

                  <p className="mt-4 text-xs font-medium text-slate-400">
                    Giường
                  </p>

                  <p className="mt-1 font-bold text-slate-900">{data.giuong}</p>
                </div>

                {/* Bathroom */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-100 hover:bg-blue-50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    🚿
                  </div>

                  <p className="mt-4 text-xs font-medium text-slate-400">
                    Phòng tắm
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {data.phongTam}
                  </p>
                </div>
              </div>
            </section>

            {/* DESCRIPTION */}
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  📝
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Mô tả chỗ ở
                  </h2>

                  <p className="text-sm text-slate-500">
                    Một vài thông tin về căn phòng
                  </p>
                </div>
              </div>

              <p className="mt-6 whitespace-pre-line text-[15px] leading-8 text-slate-600">
                {data.moTa}
              </p>
            </section>

            {/* AMENITIES */}
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div>
                <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Tiện ích
                </span>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Những gì chỗ ở cung cấp
                </h2>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {data.wifi && <Amenity icon="📶" text="WiFi tốc độ cao" />}

                {data.tivi && <Amenity icon="📺" text="Tivi" />}

                {data.dieuHoa && <Amenity icon="❄️" text="Điều hòa" />}

                {data.mayGiat && <Amenity icon="🧺" text="Máy giặt" />}

                {data.bep && <Amenity icon="🍳" text="Bếp" />}

                {data.hoBoi && <Amenity icon="🏊" text="Hồ bơi" />}

                {data.doXe && <Amenity icon="🚗" text="Chỗ đỗ xe" />}

                {data.banLa && <Amenity icon="👔" text="Bàn là" />}

                {data.banUi && <Amenity icon="♨️" text="Bàn ủi" />}
              </div>
            </section>
          </div>

          {/* RIGHT BOOKING */}
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
              {/* PRICE */}
              <div className="border-b border-slate-100 p-6 sm:p-7">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-extrabold text-blue-600">
                    {data.giaTien.toLocaleString("vi-VN")}đ
                  </span>

                  <span className="mb-1 text-sm text-slate-500">/ đêm</span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <span className="text-yellow-500">★</span>
                  <span>Chỗ ở được yêu thích</span>
                </div>
              </div>

              {/* BOOKING */}
              <div className="p-6 sm:p-7">
                <Booking maPhong={data.id} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ================= AMENITY ================= */

function Amenity({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:bg-blue-50">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
        {icon}
      </div>

      <span className="font-semibold text-slate-700">{text}</span>
    </div>
  );
}
