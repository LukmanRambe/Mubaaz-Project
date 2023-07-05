export type AllDonasiType = {
  data: {
    id: string;
    nama_pengirim: string;
    jumlah_donasi: number;
    gambar: string;
  }[];
  pagination: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
};

export type DonasiType = {
  id: string;
  nama_pengirim: string;
  jumlah_donasi: number;
  gambar: string;
};
