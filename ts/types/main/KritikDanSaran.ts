export type AllKritikDanSaranType = {
  data: {
    id: string;
    nama_pengirim: string;
    teks: string;
  }[];
  pagination: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
};

export type KritikDanSaranType = {
  id: string;
  nama_pengirim: string;
  teks: string;
};
