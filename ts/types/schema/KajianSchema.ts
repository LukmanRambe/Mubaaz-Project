import { Option } from '../main/Option';

export type CreateKajianFormValues = {
  ustadz_id: Option<string>;
  nama_ustadz?: string;
  tema: string;
  judul: string;
  tanggal: Date;
  lokasi: string;
  poster: string;
  nama_file_poster?: string;
};

export type EditKajianFormValues = {
  ustadz_id: Option<string>;
  nama_ustadz?: string;
  tema: string;
  judul: string;
  tanggal: Date;
  lokasi: string;
  poster?: string;
  nama_file_poster?: string;
};
