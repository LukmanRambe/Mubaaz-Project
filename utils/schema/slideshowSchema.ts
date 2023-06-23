import * as Yup from 'yup';

import type { EditSlideshowFormValues } from '../../ts/types/schema/SlideshowSchema';

export const editSlideshowSchema: Yup.SchemaOf<EditSlideshowFormValues> =
  Yup.object().shape({
    urutan: Yup.object()
      .shape({
        label: Yup.string().required('Mohon pilih Nomor Slide'),
        value: Yup.number().required('Mohohn pilih Nomor Slide'),
      })
      .required('Mohon pilih Nomor Slide'),
    kajian_id: Yup.object()
      .shape({
        label: Yup.string().required(
          'Mohon pilih Poster Kajian yang Ditampilkan'
        ),
        value: Yup.string().required(
          'Mohohn pilih Poster Kajian yang Ditampilkan'
        ),
      })
      .required('Mohon pilih Poster Kajian yang Ditampilkan'),
  });
