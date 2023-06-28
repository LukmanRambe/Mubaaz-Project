import * as Yup from 'yup';

import type {
  CreatePosterFormValues,
  EditPosterFormValues,
} from '../../ts/types/schema/PosterSchema';

export const createPosterSchema: Yup.SchemaOf<CreatePosterFormValues> =
  Yup.object().shape({
    urutan: Yup.object()
      .shape({
        label: Yup.string().required('Mohon pilih Urutan'),
        value: Yup.number().required('Mohohn pilih Urutan'),
      })
      .required('Mohon pilih Urutan'),
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

export const editPosterSchema: Yup.SchemaOf<EditPosterFormValues> =
  Yup.object().shape({
    urutan: Yup.object()
      .shape({
        label: Yup.string().required('Mohon pilih Urutan'),
        value: Yup.number().required('Mohohn pilih Urutan'),
      })
      .required('Mohon pilih Urutan'),
    poster: Yup.mixed()
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
