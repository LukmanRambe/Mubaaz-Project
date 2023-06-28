import * as Yup from 'yup';

import type { LoginFormValues } from '../../ts/types/schema/AuthenticationSchema';

export const loginSchema: Yup.SchemaOf<LoginFormValues> = Yup.object().shape({
  username: Yup.string().required('Username harus diisi'),
  password: Yup.string().required('Password harus diisi'),
});
