import * as Yup from 'yup';

import { CreateKritikDanSaranFormValues } from '../../ts/types/schema/KritikDanSaran';

export const createKritikDanSaranSchema: Yup.SchemaOf<CreateKritikDanSaranFormValues> =
  Yup.object().shape({
    nama_pengirim: Yup.string().required(
      'Mohon isi Nama Pengirim atau Pilih sebagai Anonim'
    ),
    teks: Yup.string().required('Mohon isi Kritik Dan Saran'),
  });
