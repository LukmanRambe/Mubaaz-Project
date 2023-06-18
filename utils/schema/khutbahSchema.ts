import * as Yup from 'yup';

import type {
  CreateKhutbahFormValues,
  EditKhutbahFormValues,
} from '../../ts/types/schema/KhutbahSchema';

export const createKhutbahSchema: Yup.SchemaOf<CreateKhutbahFormValues> =
  Yup.object().shape({
    ustadz_id: Yup.object().shape({
      label: Yup.string().required('Mohon pilih Khatib'),
      value: Yup.string().required('Mohon pilih Khatib'),
    }),
    nama_ustadz: Yup.string(),
    judul: Yup.string().required('Mohon isi Judul Khutbah'),
    tanggal: Yup.date().required('Mohon isi Tanggal'),
  });

export const editKhutbahSchema: Yup.SchemaOf<EditKhutbahFormValues> =
  Yup.object().shape({
    ustadz_id: Yup.object().shape({
      label: Yup.string().required('Mohon pilih Khatib'),
      value: Yup.string().required('Mohon pilih Khatib'),
    }),
    nama_ustadz: Yup.string(),
    judul: Yup.string().required('Mohon isi Judul Khutbah'),
    tanggal: Yup.date().required('Mohon isi Tanggal'),
  });
