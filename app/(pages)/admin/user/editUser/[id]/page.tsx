"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserById, updateUser } from "@/app/services/user";

export default function EditUser() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = Number(params.id);

        console.log("ID:", id);

        const data = await getUserById(id);

        console.log("DATA USER:", data);

        setUser({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          birthday: data.birthday ? data.birthday.substring(0, 10) : "",
          gender: data.gender ?? true,
          role: data.role || "",
        });
      } catch (error) {
        console.log("LỖI LẤY USER:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser((prev) => ({
      ...prev,
      gender: e.target.value === "true",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const id = Number(params.id);

      await updateUser(id, user);

      alert("Cập nhật người dùng thành công!");

      router.push("/admin/user");
    } catch (error) {
      console.log("LỖI UPDATE USER:", error);
      alert("Cập nhật người dùng thất bại!");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">
          Đang tải thông tin người dùng...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        {/* HEADER */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.push("/admin/user")}
            className="mb-4 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Quay lại danh sách
          </button>

          <h1 className="text-3xl font-bold text-gray-900">
            Chỉnh sửa người dùng
          </h1>

          <p className="mt-1 text-gray-500">
            Cập nhật thông tin tài khoản người dùng
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* NAME */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Họ và tên
              </label>

              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Số điện thoại
              </label>

              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
              />
            </div>

            {/* BIRTHDAY */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Ngày sinh
              </label>

              <input
                type="date"
                name="birthday"
                value={user.birthday}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
              />
            </div>

            {/* GENDER */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Giới tính
              </label>

              <select
                value={user.gender ? "true" : "false"}
                onChange={handleGenderChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
              >
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>
            </div>

            {/* ROLE */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Loại tài khoản
              </label>

              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
              >
                <option value="">-- Chọn loại tài khoản --</option>
                <option value="USER">Người dùng</option>
                <option value="ADMIN">Quản trị viên</option>
              </select>
            </div>
          </div>

          {/* BUTTON */}
          <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={() => router.push("/admin/user")}
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
