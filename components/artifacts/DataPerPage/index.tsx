import Select from 'react-select';

import { dataPerPageCustomStyles } from '../../../libs/reactSelectStyles';
import { DataPerPageProps } from '../../../ts/types/main/DataPerPage';

const DataPerPage: React.FC<DataPerPageProps> = ({
  options,
  placeholder,
  onChange,
}) => {
  return (
    <Select
      instanceId={options[1].label}
      options={options}
      placeholder={placeholder}
      styles={dataPerPageCustomStyles}
      onChange={onChange}
      isSearchable={false}
    />
  );
};

export default DataPerPage;
