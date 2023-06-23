export type AllKajianType = {
  data: {
    id: string;
    ustadz_id: string;
    nama_ustadz: string;
    tema: string;
    judul: string;
    tanggal: string;
    lokasi: string;
    poster: string;
    waktu_awal: string;
    waktu_akhir: string;
    nama_file_poster: string;
  }[];
  pagination: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
};

export type KajianType = {
  id: string;
  ustadz_id: string;
  nama_ustadz: string;
  tema: string;
  judul: string;
  tanggal: string;
  lokasi: string;
  poster: string;
  waktu_awal: string;
  waktu_akhir: string;
  nama_file_poster: string;
};

export type AllKajianDropdownType = {
  id: string;
  judul: string;
};
