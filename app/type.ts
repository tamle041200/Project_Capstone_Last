export type TRoom = {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  banUi: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  maViTri: number;
  hinhAnh: string;
};
export type TLogIn = {
  email: string;
  password: string;
};
export type TRegister = {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
};
export type TBookingRequest = {
  id?: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: string;
  maNguoiDung: number;
};
export type TBooking = {
  id: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: string;
  maNguoiDung: number;
};
export type TUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
};
