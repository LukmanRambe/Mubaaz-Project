import * as Yup from 'yup';

import type {
  CreateKajianFormValues,
  EditKajianFormValues,
} from '../../ts/types/schema/KajianSchema';

export const createKajianSchema: Yup.SchemaOf<CreateKajianFormValues> =
  Yup.object().shape({
    ustadz_id: Yup.object().shape({
      label: Yup.string().required('Mohon pilih Ustadz'),
      value: Yup.string().required('Mohon pilih Ustadz'),
    }),
    nama_ustadz: Yup.string(),
    tema: Yup.string().required('Mohon isi Tema Kajian'),
    judul: Yup.string().required('Mohon isi Judul Kajian'),
    tanggal: Yup.date().required('Mohon isi Tanggal'),
    lokasi: Yup.string().required('Mohon isi Lokasi'),
    poster: Yup.mixed()
      .test('fileRequired', 'Mohon upload poster', (value) => {
        // Check if a file is present
        if (!value) {
          return false;
        }

        return true;
      })
      .test('fileType', 'Format file tidak didukung', (value?: File) => {
        // Check if a file is present
        if (!value) {
          return true;
        }

        // Check if the file type is allowed (e.g., only accept image files)
        return ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(
          value?.type
        );
      })
      .test(
        'fileSize',
        'File tidak boleh lebih besar dari 3MB',
        (value?: File) => {
          // Check if a file is present
          if (!value) {
            return true;
          }

          // Check if the file size is within the allowed limit (3MB)
          return value?.size <= 3 * 1024 * 1024;
        }
      ),
    nama_file_poster: Yup.string(),
  });

export const editKajianSchema: Yup.SchemaOf<EditKajianFormValues> =
  Yup.object().shape({
    ustadz_id: Yup.object().shape({
      label: Yup.string().required('Mohon pilih Ustadz'),
      value: Yup.string().required('Mohon pilih Ustadz'),
    }),
    nama_ustadz: Yup.string(),
    tema: Yup.string().required('Mohon isi Tema Kajian'),
    judul: Yup.string().required('Mohon isi Judul Kajian'),
    tanggal: Yup.date().required('Mohon isi Tanggal'),
    lokasi: Yup.string().required('Mohon isi Lokasi'),
    poster: Yup.mixed()
      .notRequired()
      .test('fileType', 'Format file tidak didukung', (value?: File) => {
        // Check if a file is present
        if (!value) {
          return true;
        }

        // Check if the file type is allowed (e.g., only accept image files)
        return ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(
          value.type
        );
      })
      .test(
        'fileSize',
        'File tidak boleh lebih besar dari 3MB',
        (value?: File) => {
          // Check if a file is present
          if (!value) {
            return true;
          }

          // Check if the file size is within the allowed limit (3MB)
          return value?.size <= 3 * 1024 * 1024;
        }
      ),
    nama_file_poster: Yup.string(),
  });
