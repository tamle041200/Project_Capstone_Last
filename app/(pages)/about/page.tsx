import Link from "next/link";

export default function About() {
  const statistics = [
    { value: "500+", label: "Phòng cho thuê" },
    { value: "50+", label: "Địa điểm" },
    { value: "1000+", label: "Khách hàng" },
    { value: "24/7", label: "Hỗ trợ" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-indigo-50/30 to-slate-50 py-16 sm:py-24 lg:py-32">
        <div className="absolute left-1/2 top-1/4 -z-0 h-64 w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-400/20 to-indigo-400/20 blur-3xl sm:h-80 sm:w-[500px] lg:h-96 lg:w-[600px]" />

        <div className="absolute -left-20 top-10 -z-0 h-48 w-48 rounded-full bg-blue-300/20 blur-3xl sm:h-64 sm:w-64 lg:h-72 lg:w-72" />

        <div className="absolute -right-20 bottom-0 -z-0 h-56 w-56 rounded-full bg-indigo-300/20 blur-3xl sm:h-72 sm:w-72 lg:h-80 lg:w-80" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-white/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 shadow-sm backdrop-blur-md sm:px-4 sm:text-xs">
              ✨ Về chúng tôi
            </span>

            <h1 className="mt-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:mt-8 sm:text-5xl lg:text-7xl">
              Khám phá nơi ở{" "}
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                theo cách của bạn
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-6 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl">
              Tìm kiếm những nơi lưu trú tuyệt vời, khám phá địa điểm mới và đặt
              phòng nhanh chóng với trải nghiệm đơn giản, tiện lợi.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link
                href="/rooms"
                className="group inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4"
              >
                Khám phá phòng
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-blue-600 hover:shadow-md sm:w-auto sm:px-8 sm:py-4"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="relative border-y border-slate-200/60 bg-white py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-5 sm:space-y-6">
              <span className="inline-block rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
                Chúng tôi là ai?
              </span>

              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Một nơi để bắt đầu hành trình
              </h2>

              <div className="space-y-4 text-sm font-medium leading-6 text-slate-600 sm:text-lg sm:leading-8">
                <p>
                  STAYGO là nền tảng giúp kết nối khách du lịch với những địa
                  điểm lưu trú phù hợp.
                </p>

                <p>
                  Người dùng có thể tìm kiếm phòng, xem thông tin chi tiết, lựa
                  chọn ngày nhận phòng và thực hiện đặt phòng một cách nhanh
                  chóng.
                </p>

                <p>
                  Dự án được xây dựng bằng{" "}
                  <strong className="font-bold text-slate-900">Next.js</strong>,{" "}
                  <strong className="font-bold text-slate-900">
                    TypeScript
                  </strong>{" "}
                  và{" "}
                  <strong className="font-bold text-slate-900">
                    Tailwind CSS
                  </strong>
                  .
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-3 sm:gap-2.5 sm:pt-4">
                <span className="rounded-xl border border-blue-100 bg-blue-50/80 px-3 py-2 text-xs font-bold text-blue-600 shadow-sm sm:px-4">
                  Next.js
                </span>

                <span className="rounded-xl border border-indigo-100 bg-indigo-50/80 px-3 py-2 text-xs font-bold text-indigo-600 shadow-sm sm:px-4">
                  TypeScript
                </span>

                <span className="rounded-xl border border-sky-100 bg-sky-50/80 px-3 py-2 text-xs font-bold text-sky-600 shadow-sm sm:px-4">
                  Tailwind CSS
                </span>
              </div>
            </div>

            <div className="relative mt-2 lg:mt-0">
              <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 p-6 text-white shadow-2xl shadow-blue-500/20 sm:p-10 lg:p-12">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl sm:h-40 sm:w-40" />

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-xl shadow-inner backdrop-blur-md sm:h-16 sm:w-16 sm:text-2xl">
                  ♥
                </div>

                <h3 className="mt-6 text-xl font-extrabold tracking-tight sm:mt-8 sm:text-3xl">
                  Sứ mệnh của chúng tôi
                </h3>

                <p className="mt-3 text-sm font-medium leading-6 text-blue-100/90 sm:mt-4 sm:text-lg sm:leading-8">
                  Mang đến trải nghiệm tìm kiếm và đặt phòng đơn giản, hiện đại
                  và đáng tin cậy cho mọi người.
                </p>

                <div className="my-6 h-px bg-white/20 sm:my-8" />

                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm sm:p-4">
                    <p className="text-2xl font-extrabold text-white sm:text-4xl">
                      500+
                    </p>

                    <p className="mt-1 text-[11px] font-medium text-blue-100 sm:text-xs">
                      Phòng lưu trú
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm sm:p-4">
                    <p className="text-2xl font-extrabold text-white sm:text-4xl">
                      50+
                    </p>

                    <p className="mt-1 text-[11px] font-medium text-blue-100 sm:text-xs">
                      Địa điểm
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl bg-blue-600/10 blur-xl sm:-bottom-6 sm:-right-6" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-lg bg-blue-100/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
              Giá trị
            </span>

            <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Điều chúng tôi hướng đến
            </h2>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
              Tạo ra một trải nghiệm đặt phòng dễ sử dụng, rõ ràng và thuận tiện
              cho người dùng.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-3 md:gap-8">
            <div className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600 transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:text-2xl">
                ✓
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 sm:mt-6 sm:text-xl">
                Đơn giản
              </h3>

              <p className="mt-2 text-sm font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                Tìm kiếm và đặt phòng chỉ với vài thao tác đơn giản.
              </p>
            </div>

            <div className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-xl sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl font-bold text-indigo-600 transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:text-2xl">
                ★
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 sm:mt-6 sm:text-xl">
                Chất lượng
              </h3>

              <p className="mt-2 text-sm font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                Cung cấp thông tin rõ ràng để người dùng dễ dàng lựa chọn.
              </p>
            </div>

            <div className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-xl sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-xl font-bold text-sky-600 transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:text-2xl">
                ♡
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 sm:mt-6 sm:text-xl">
                Trải nghiệm
              </h3>

              <p className="mt-2 text-sm font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                Mang đến giao diện hiện đại và thân thiện với người dùng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="border-t border-slate-200/60 bg-white py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="rounded-lg bg-blue-100/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
              Những con số
            </span>

            <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Những con số nổi bật
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
              Những con số thể hiện quy mô và mục tiêu của nền tảng.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {statistics.map((item) => (
              <div
                key={item.label}
                className="group rounded-2xl border border-slate-200/70 bg-slate-50/50 p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg sm:rounded-3xl sm:p-8"
              >
                <p className="text-2xl font-extrabold tracking-tight text-blue-600 transition-transform duration-300 group-hover:scale-105 sm:text-4xl">
                  {item.value}
                </p>

                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:mt-2 sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 px-5 py-12 text-center shadow-2xl shadow-blue-500/20 sm:px-12 sm:py-20">
            <div className="absolute right-0 top-0 h-48 w-48 -translate-y-10 translate-x-10 rounded-full bg-white/10 blur-2xl sm:h-64 sm:w-64" />

            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-10 translate-y-10 rounded-full bg-black/10 blur-2xl sm:h-64 sm:w-64" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md sm:px-4 sm:text-xs">
                Bắt đầu ngay
              </span>

              <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Sẵn sàng cho chuyến đi tiếp theo?
              </h2>

              <p className="mx-auto mt-3 text-sm font-medium leading-6 text-blue-100 sm:mt-4 sm:text-lg sm:leading-7">
                Khám phá những phòng lưu trú phù hợp với bạn ngay hôm nay.
              </p>

              <div className="mt-7 sm:mt-8">
                <Link
                  href="/rooms"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-blue-600 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-2xl sm:w-auto sm:px-8 sm:py-4"
                >
                  Khám phá phòng
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/60 p-6 text-center sm:p-12">
            <span className="rounded-lg bg-blue-100/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
              Hỗ trợ khách hàng
            </span>

            <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-3xl">
              Liên hệ với chúng tôi
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-slate-600 sm:text-base sm:leading-7">
              Nếu bạn cần hỗ trợ hoặc có bất kỳ câu hỏi nào, hãy liên hệ với đội
              ngũ của chúng tôi.
            </p>

            <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-6">
              <span className="rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow sm:px-6">
                📧 support@airbnb.com
              </span>

              <span className="rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow sm:px-6">
                📞 1900 1234
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
