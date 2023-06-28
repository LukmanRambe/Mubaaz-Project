import { AiOutlineSearch } from 'react-icons/ai';
import { SingleValue } from 'react-select';

import useMediaQuery from '../../../hooks/useMediaQuery';
import { Option } from '../../../ts/types/main/Option';
import AddButton from '../Button/AddButton';
import DataPerPage from '../DataPerPage';

type PageHeaderProps = {
  options: Option<string>[];
  placeholder: string;
  onChange: (value: SingleValue<Option<string>>) => void;
  pageLink: string;
  buttonText: string;
  searchInput: string;
  isKaryawan?: boolean;
  onSearch: (event: React.FormEvent<HTMLInputElement>) => void;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  options,
  placeholder,
  onChange,
  pageLink,
  buttonText,
  searchInput,
  onSearch,
}) => {
  const isLargeScreen = useMediaQuery('(min-width: 768px)');

  return (
    <div className="flex flex-col items-end justify-between gap-4 mb-4 md:flex-row">
      {isLargeScreen ? (
        <>
          <div className="flex items-end justify-start w-full gap-5">
            <div className="min-w-fit">
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Jumlah Data
              </label>

              <DataPerPage
                options={options}
                placeholder={placeholder}
                onChange={onChange}
              />
            </div>

            <div className="relative flex items-center min-w-fit">
              <span className="absolute ml-3">
                <AiOutlineSearch className="w-6 h-6 pointer-events-none text-primary-160" />
              </span>

              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-primary-120 text-gray-900 text-sm rounded-full focus:ring-1 focus:ring-primary-140 focus:border-primary-140 block min-w-fit md:w-64 pl-10 p-2.5 outline-primary-120"
                placeholder="Search..."
                value={searchInput}
                onChange={onSearch}
              />
            </div>
          </div>

          <AddButton pageLink={pageLink} buttonText={buttonText} />
        </>
      ) : (
        <>
          <div className="flex items-end justify-between w-full gap-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Jumlah Data
              </label>

              <DataPerPage
                options={options}
                placeholder={placeholder}
                onChange={onChange}
              />
            </div>

            <AddButton pageLink={pageLink} buttonText={buttonText} />
          </div>

          <div className="relative flex items-center min-w-full">
            <span className="absolute ml-3">
              <AiOutlineSearch className="w-6 h-6 pointer-events-none text-primary-120" />
            </span>

            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-primary-120 text-gray-900 text-sm rounded-full focus:ring-primary-140 focus:border-primary-140 block min-w-full md:w-72 pl-10 p-2.5 outline-primary-120"
              placeholder="Search..."
              value={searchInput}
              onChange={onSearch}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PageHeader;
