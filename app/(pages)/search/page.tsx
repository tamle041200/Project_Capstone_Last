import { getRoomsByLocation } from "@/app/services/room";
import type { TRoom } from "@/app/type";
import Room from "@/app/component/room";

type TProps = {
  searchParams: {
    q: number;
  };
};

export default async function Search(props: TProps) {
  const searchParams = await props.searchParams;
  const { q } = searchParams;

  const data = await getRoomsByLocation(q);

  return (
    <main className="min-h-screen bg-[#f8fbff] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Tìm kiếm
          </span>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Phòng phù hợp với bạn
          </h1>

          <p className="mt-2 text-gray-500">
            Tìm thấy{" "}
            <span className="font-semibold text-blue-600">
              {data?.length || 0}
            </span>{" "}
            phòng
          </p>
        </div>

        {/* Không có phòng */}
        {!data || data.length === 0 ? (
          <div className="rounded-2xl border border-blue-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl">
              🏠
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              Không tìm thấy phòng
            </h2>

            <p className="mt-2 text-gray-500">
              Hãy thử tìm kiếm một địa điểm khác.
            </p>
          </div>
        ) : (
          /* Danh sách phòng */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((room: TRoom) => (
              <Room key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
