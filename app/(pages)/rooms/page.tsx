import type { TRoom } from "@/app/type";
import Room from "@/app/component/room";
import { getRooms, getLocations } from "@/app/services/room";

export default async function Rooms() {
  const data = await getRooms();
  const locations = await getLocations();

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-28">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/30 via-indigo-900/40 to-slate-900" />

        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-300 backdrop-blur-md">
                <span>✨</span>
                Khám phá điểm đến lý tưởng
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Tìm nơi lưu trú{" "}
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                  hoàn hảo cho bạn
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base font-medium leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Hàng trăm không gian sống tiện nghi, sang trọng đang chờ đón
                bạn. Đặt phòng dễ dàng, trải nghiệm trọn vẹn.
              </p>
            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10">
                <p className="text-3xl font-extrabold text-white sm:text-4xl">
                  {data.length}+
                </p>

                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Phòng sẵn sàng
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10">
                <p className="text-3xl font-extrabold text-amber-400 sm:text-4xl">
                  ★ 4.9
                </p>

                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Đánh giá tuyệt vời
                </p>
              </div>

              <div className="col-span-2 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-white">Hỗ trợ 24/7</p>

                    <p className="mt-1 text-xs font-medium text-slate-300">
                      Luôn sẵn sàng khi bạn cần
                    </p>
                  </div>

                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-xl backdrop-blur-md">
                    🎧
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* SECTION HEADER */}
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Danh sách phòng
              </span>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Khám phá lựa chọn của bạn
              </h2>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Hiển thị{" "}
              <span className="font-bold text-slate-900">{data.length}</span>{" "}
              kết quả phù hợp
            </p>
          </div>

          {/* ROOMS */}
          {data.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((room: TRoom) => (
                <div
                  key={room.id}
                  className="transition-all duration-300 hover:-translate-y-1"
                >
                  <Room room={room} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-100 bg-blue-50 text-4xl shadow-inner">
                🏡
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Chưa tìm thấy phòng nào
              </h3>

              <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-slate-500">
                Hiện tại hệ thống chưa có phòng khả dụng. Thử thay đổi bộ lọc
                hoặc quay lại sau nhé!
              </p>

              <button
                type="button"
                className="mt-6 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 px-6 py-16 text-center text-white shadow-2xl shadow-blue-500/25 sm:px-12 sm:py-20">
            {/* Ambient Lighting */}
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-12 translate-x-12 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-12 translate-y-12 rounded-full bg-black/20 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                Ưu đãi đặc biệt
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Bạn vẫn chưa chọn được phòng?
              </h2>

              <p className="mt-4 text-base font-medium leading-7 text-blue-100 sm:text-lg">
                Đội ngũ tư vấn sẵn sàng giúp bạn chọn không gian ở hoàn hảo nhất
                cho chuyến đi sắp tới.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  className="rounded-2xl bg-white px-8 py-4 text-sm font-bold text-blue-600 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-2xl"
                >
                  Nhận tư vấn ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
