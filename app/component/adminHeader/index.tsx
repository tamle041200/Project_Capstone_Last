"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: "📊",
    },
    {
      name: "Người dùng",
      href: "/admin/user",
      icon: "👥",
    },
    {
      name: "Phòng",
      href: "/admin/room",
      icon: "🏠",
    },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");

    if (!confirmLogout) return;

    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-sm">
        {/* LOGO */}
        <div className="flex h-20 items-center border-b border-slate-200 px-5">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl shadow-sm">
              🏠
            </div>

            <div>
              <h1 className="text-base font-bold text-slate-900">
                Airbnb Admin
              </h1>

              <p className="text-xs text-slate-400">Administration</p>
            </div>
          </Link>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Tổng quan
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-lg ${
                      isActive
                        ? "bg-white/15"
                        : "bg-slate-100 group-hover:bg-blue-50"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span>{item.name}</span>

                  {isActive && <span className="ml-auto text-xs">●</span>}
                </Link>
              );
            })}
          </nav>

          {/* THAO TÁC NHANH */}
          <div className="mt-8">
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Thao tác nhanh
            </p>

            <div className="space-y-1">
              <Link
                href="/admin/user/addUser"
                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-lg group-hover:bg-blue-100">
                  ➕
                </span>

                <span>Thêm người dùng</span>
              </Link>

              <Link
                href="/admin/room/addRoom"
                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-lg group-hover:bg-blue-100">
                  🏠
                </span>

                <span>Thêm phòng</span>
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-slate-200 p-4">
          {/* XEM TRANG CHỦ */}
          <Link
            href="/"
            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
              🌐
            </span>

            <span>Xem trang chủ</span>
          </Link>

          {/* ĐĂNG XUẤT */}
          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-lg transition group-hover:bg-red-100">
              🚪
            </span>

            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="ml-64 min-h-screen">
        {/* TOP HEADER */}
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-8 shadow-sm backdrop-blur">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Administration
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Quản trị hệ thống
            </h2>
          </div>

          {/* USER */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                Quản trị viên
              </p>

              <p className="text-xs text-slate-400">Administrator</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white shadow-sm">
              A
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
