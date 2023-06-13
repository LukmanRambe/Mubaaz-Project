import { SingleValue } from 'react-select';

import { Option } from './Option';

export type DataPerPageProps = {
  options: Option<string>[];
  placeholder: string;
  onChange: (newValue: SingleValue<Option<string>>) => void;
};
