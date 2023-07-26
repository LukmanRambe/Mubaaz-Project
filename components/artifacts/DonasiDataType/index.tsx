import Select from 'react-select';

import { donasiDataTypeCustomStyles } from '../../../libs/reactSelectStyles';
import { DonasiDataTypeProps } from '../../../ts/types/main/DonasiDataType';

const DonasiDataType: React.FC<DonasiDataTypeProps> = ({
  options,
  placeholder,
  onChange,
}) => {
  return (
    <Select
      instanceId={options[1].label}
      options={options}
      placeholder={placeholder}
      styles={donasiDataTypeCustomStyles}
      onChange={onChange}
      isSearchable={false}
    />
  );
};

export default DonasiDataType;
