import { Option } from '../main/Option';

export type CreateKhutbahFormValues = {
  ustadz_id: Option<string>;
  nama_ustadz?: string;
  judul: string;
  tanggal: Date;
};

export type EditKhutbahFormValues = {
  ustadz_id: Option<string>;
  nama_ustadz?: string;
  judul: string;
  tanggal: Date;
};
