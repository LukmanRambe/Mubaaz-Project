import * as Yup from 'yup';

import type {
  CreateUstadzFormValues,
  EditUstadzFormValues,
} from '../../ts/types/schema/UstadzSchema';

export const createUstadzSchema: Yup.SchemaOf<CreateUstadzFormValues> =
  Yup.object().shape({
    nama_ustadz: Yup.string().required('Mohon isi Nama'),
    alamat: Yup.string().required('Mohon isi Alamat'),
    nomor_wa: Yup.string().required('Mohon isi Nomor Whatsapp'),
  });

export const editUstadzSchema: Yup.SchemaOf<EditUstadzFormValues> =
  Yup.object().shape({
    nama_ustadz: Yup.string().required('Mohon isi Nama'),
    alamat: Yup.string().required('Mohon isi Alamat'),
    nomor_wa: Yup.string().required('Mohon isi Nomor Whatsapp'),
  });
