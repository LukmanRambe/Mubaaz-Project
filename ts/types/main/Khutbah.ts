export type AllKhutbahType = {
  data: {
    id: string;
    ustadz_id: string;
    nama_ustadz: string;
    judul: string;
    tanggal: string;
  }[];
  pagination: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
};

export type KhutbahType = {
  id: string;
  ustadz_id: string;
  nama_ustadz: string;
  judul: string;
  tanggal: string;
};
