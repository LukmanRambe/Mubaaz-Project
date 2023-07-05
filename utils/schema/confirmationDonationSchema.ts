import * as Yup from 'yup';

import type { ConfirmationDonationFormValues } from '../../ts/types/schema/ConfirmationDonationSchema';

export const confirmationDonationSchema: Yup.SchemaOf<ConfirmationDonationFormValues> =
  Yup.object().shape({
    nama_pengirim: Yup.string().required('Mohon isi Nama Pengirim'),
    jumlah_donasi: Yup.number()
      .min(1, 'Jumlah Donasi tidak boleh 0')
      .required('Mohon isi Jumlah Donasi'),
    gambar: Yup.mixed()
      .test('fileRequired', 'Mohon upload Bukti Transfer', (value) => {
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
      }),
  });
