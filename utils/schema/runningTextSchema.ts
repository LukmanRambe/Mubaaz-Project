import * as Yup from 'yup';

import type {
  CreateRunningTextFormValues,
  EditRunningTextFormValues,
} from '../../ts/types/schema/RunningTextSchema';

export const createRunningTextSchema: Yup.Schema<CreateRunningTextFormValues> =
  Yup.object().shape({
    text: Yup.string()
      .max(70, 'Teks tidak boleh lebih dari 70 karakter')
      .required('Mohon isi Text'),
    urutan: Yup.object()
      .shape({
        label: Yup.string().required('Mohon pilih Urutan'),
        value: Yup.number().required('Mohohn pilih Urutan'),
      })
      .required('Mohon pilih Urutan'),
  });

export const editRunningTextSchema: Yup.Schema<EditRunningTextFormValues> =
  Yup.object().shape({
    text: Yup.string()
      .max(70, 'Teks tidak boleh lebih dari 70 karakter')
      .required('Mohon isi Text'),
    urutan: Yup.object()
      .shape({
        label: Yup.string().required('Mohon pilih Urutan'),
        value: Yup.number().required('Mohohn pilih Urutan'),
      })
      .required('Mohon pilih Urutan'),
  });
