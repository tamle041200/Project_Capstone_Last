"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLocations } from "@/app/services/room";

type TLocation = {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
};

export default function Home() {
  const router = useRouter();

  const [locations, setLocations] = useState<TLocation[]>([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (error) {
        console.error("Không thể lấy danh sách vị trí:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!location) return;

    router.push(`/search?q=${location}`);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-sans text-gray-900">
      {/* ================= HERO ================= */}

      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 100, 140, 0.55), rgba(0, 180, 200, 0.35)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28 md:py-36 lg:px-8">
          {/* ================= TITLE ================= */}

          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[2px] text-white sm:mb-5 sm:text-sm sm:tracking-[3px]">
            CHÀO MỪNG ĐẾN VỚI STAYGO
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Tìm một nơi
            <span className="mt-2 block text-cyan-200">
              thật phù hợp với bạn
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-6 text-white/90 sm:mt-6 sm:text-lg sm:leading-8">
            Khám phá những không gian lưu trú thoải mái, tiện nghi và phù hợp
            cho chuyến đi của bạn.
          </p>

          {/* ================= SEARCH ================= */}

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-8 w-full max-w-3xl sm:mt-10"
          >
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-2.5 shadow-2xl sm:gap-3 sm:rounded-3xl sm:p-3 md:flex-row md:items-center md:rounded-full">
              {/* LOCATION */}

              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-left sm:px-4 sm:py-3 md:rounded-full">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 sm:h-11 sm:w-11">
                  <svg
                    className="h-5 w-5 text-cyan-600 sm:h-6 sm:w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 21a2 2 0 01-2.828 0l-4.243-4.343a8 8 0 1111.314 0z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 sm:text-xs">
                    Địa điểm
                  </p>

                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-0.5 w-full cursor-pointer truncate bg-transparent text-sm font-semibold text-gray-800 outline-none sm:mt-1"
                  >
                    <option value="">Bạn muốn đi đâu?</option>

                    {locations.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.tenViTri} - {item.tinhThanh}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SEARCH BUTTON */}

              <button
                type="submit"
                disabled={!location}
                className="flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 text-sm font-bold text-white shadow-lg transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:px-8 md:w-auto md:rounded-full"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                  />
                </svg>
                Tìm kiếm
              </button>
            </div>
          </form>

          {/* ================= BUTTONS ================= */}

          <div className="mx-auto mt-6 flex w-full max-w-md flex-col justify-center gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:gap-4">
            <Link
              href="/rooms"
              className="flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-cyan-600 shadow-lg transition hover:bg-gray-100 sm:w-auto"
            >
              Khám phá phòng
            </Link>

            <Link
              href="/about"
              className="flex w-full items-center justify-center rounded-full border border-white bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-cyan-600 sm:w-auto"
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
