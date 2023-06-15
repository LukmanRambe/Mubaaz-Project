export type AllUstadzType = {
  data: {
    id: string;
    nama_ustadz: string;
    alamat: string;
    nomor_wa: string;
  }[];
  pagination: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
};

export type UstadzType = {
  id: string;
  nama_ustadz: string;
  alamat: string;
  nomor_wa: string;
};

export type AllUstadzDropdownType = {
  id: string;
  nama_ustadz: string;
};
