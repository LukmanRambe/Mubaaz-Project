import { Option } from '../main/Option';

export type CreateRunningTextFormValues = {
  text: string;
  urutan: Option<number>;
};

export type EditRunningTextFormValues = {
  text: string;
  urutan: Option<number>;
};
