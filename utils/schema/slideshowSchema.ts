import * as Yup from 'yup';

import type {
  EditUrutanSlideshowFormValues,
  EditPosterKajianSlideshowFormValues,
} from '../../ts/types/schema/SlideshowSchema';

export const editUrutanSlideshowSchema: Yup.SchemaOf<EditUrutanSlideshowFormValues> =
  Yup.object().shape({
    urutan: Yup.object()
      .shape({
        label: Yup.string().required('Mohon pilih Nomor Slide'),
        value: Yup.number().required('Mohohn pilih Nomor Slide'),
      })
      .required('Mohon pilih Nomor Slide'),
  });

export const editPosterKajianSlideshowSchema: Yup.SchemaOf<EditPosterKajianSlideshowFormValues> =
  Yup.object().shape({
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
