import type { Option } from '../main/Option';

export type CreatePosterFormValues = {
  urutan: Option<number>;
  poster: string;
  nama_file_poster?: string;
};

export type EditPosterFormValues = {
  urutan: Option<number>;
  poster?: string;
  nama_file_poster?: string;
};
