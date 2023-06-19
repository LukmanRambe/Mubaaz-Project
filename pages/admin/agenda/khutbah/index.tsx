import { useState, useId, useMemo, useEffect } from 'react';

import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { SingleValue } from 'react-select';

import DeleteButton from '../../../../components/artifacts/Button/DeleteButton';
import PageLoading from '../../../../components/artifacts/Loading/PageLoading';
import PageHeader from '../../../../components/artifacts/PageHeader';
import HeaderTitle from '../../../../components/artifacts/PageHeader/HeaderTitle';
import DashboardLayout from '../../../../components/main/Layout/DashboardLayout';
import useRemoteGetAllKhutbah from '../../../../hooks/remote/useRemoteGetAllKhutbah';
import { Option } from '../../../../ts/types/main/Option';
import { NextPageWithLayout } from '../../../../ts/types/NextPageWithLayout';
import { checkPageLimit } from '../../../../utils/checkPageLimit';
import {
  generateDataPerPageOptions,
  generateTableHeadsKhutbah,
} from '../../../../utils/generateData';

const Khutbah: NextPageWithLayout = () => {
  const uniqueId = useId();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [dataLimit, setDataLimit] = useState<number>(15);
  const [searchInput, setSearchInput] = useState<string>('');
  const {
    data: allKhutbahData,
    refetch,
    isFetching,
  } = useRemoteGetAllKhutbah(dataLimit, pageIndex, searchInput);
  const lastPage = useMemo(
    () => allKhutbahData?.pagination?.lastPage,
    [allKhutbahData?.pagination?.lastPage]
  );
  const itemsPerPage = useMemo(
    () => allKhutbahData?.pagination?.perPage,
    [allKhutbahData?.pagination?.perPage]
  );
  const totalItems = useMemo(
    () => allKhutbahData?.pagination?.total ?? 0,
    [allKhutbahData?.pagination?.total]
  );
  const [startItem, setStartItem] = useState<number>(1);
  const [endItem, setEndItem] = useState<number>(dataLimit);
  const tableHeads = useMemo(() => generateTableHeadsKhutbah(), []);
  const dataPerPageOptions = useMemo<Option<string>[]>(
    () => generateDataPerPageOptions(),
    []
  );

  const handlePageClick = (page: number) => {
    setPageIndex(page + 1);
    refetch();
  };

  const handleDataPerPage = (amount: number) => {
    setDataLimit(amount);
  };

  const handleSearch = (searchInput: string) => {
    setSearchInput(searchInput);
  };

  useEffect(() => {
    if (itemsPerPage) {
      setStartItem((pageIndex - 1) * itemsPerPage + 1);
      setEndItem(pageIndex * itemsPerPage);

      if (lastPage) {
        if (pageIndex > lastPage) {
          setPageIndex(lastPage);
        }
      }
    }

    refetch();
  }, [pageIndex, dataLimit, itemsPerPage, totalItems]);

  useEffect(() => {
    if (searchInput.length >= 1 || searchInput.length === 0) {
      setPageIndex(1);
      refetch();
    }
  }, [searchInput]);

  useEffect(() => {
    refetch();
  }, [allKhutbahData]);

  return (
    <>
      <Head>
        <title>List Khutbah</title>
        <meta name="Halaman List Khutbah" content="List Khutbah" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="flex flex-col gap-1">
          <div className="mb-5 lg:mb-16">
            <HeaderTitle headerTitle="List Khutbah" />
          </div>

          <PageHeader
            options={dataPerPageOptions}
            placeholder={dataLimit.toString()}
            onChange={(option: SingleValue<Option<string>>) =>
              option && handleDataPerPage(+option.value)
            }
            pageLink="/admin/agenda/khutbah/create"
            buttonText="Tambah Khutbah +"
            onSearch={(event) => handleSearch(event.currentTarget.value)}
            searchInput={searchInput}
          />

          <div className="relative pt-3 pb-5 bg-white shadow-md rounded-xl">
            <div className="overflow-x-auto overflow-y-hidden">
              <table className="w-full overflow-x-auto text-sm text-left">
                <thead className="text-sm text-primary-160 capitalize bg-white border-b border-[#9FA284] border-opacity-20">
                  <tr>
                    {tableHeads.map((head, index) => (
                      <th
                        key={`${uniqueId}${index}`}
                        scope="col"
                        className="px-5 p-7"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isFetching ? (
                    <tr className="bg-white border-b border-[#9FA284] border-opacity-20 hover:bg-gray-50">
                      <td colSpan={tableHeads.length} className="px-5 p-7">
                        <PageLoading />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {totalItems === 0 ? (
                        <tr className="bg-white border-b border-[#9FA284] border-opacity-20 font-medium text-primary-160">
                          <td
                            colSpan={tableHeads.length}
                            className="text-center p-7"
                          >
                            Tidak ada data
                          </td>
                        </tr>
                      ) : (
                        allKhutbahData?.data?.map((khutbah, index) => (
                          <tr
                            key={khutbah.id}
                            className="bg-white border-b border-[#9FA284] border-opacity-20 hover:bg-gray-50"
                          >
                            <td className="px-5 p-7">{startItem + index}</td>
                            <td className="px-5 font-medium text-primary-160 p-7">
                              {khutbah.judul}
                            </td>
                            <td className="px-5 p-7">{khutbah.nama_ustadz}</td>
                            <td className="px-5 p-7">
                              {khutbah.tanggal
                                ? moment(khutbah.tanggal).format('DD MMMM YYYY')
                                : '-'}
                            </td>
                            <td className="px-5 p-7">
                              <div className="flex items-center justify-between gap-3 w-fit">
                                <Link
                                  href={`/admin/agenda/khutbah/edit/${khutbah.id}`}
                                >
                                  <a className="p-2 transition-all duration-150 bg-yellow-400 rounded-lg outline-none cursor-pointer hover:bg-yellow-500 active:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    <BiEdit className="text-lg text-white cursor-pointer" />
                                  </a>
                                </Link>

                                <DeleteButton
                                  queryKey="deleteKhutbah"
                                  endPointUrl={`/api/khutbahs/${khutbah.id}`}
                                  refetch={refetch}
                                  dataName="Khutbah"
                                />
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <nav
              className="flex flex-col items-center justify-between gap-8 px-5 mb-3 my-7 sm:gap-0 sm:flex-row"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500">
                <>
                  Showing{' '}
                  <span className="font-semibold text-primary-160 ">
                    {totalItems === 0 ? '0' : startItem}
                  </span>{' '}
                  to{' '}
                  <span className="font-semibold text-primary-160">
                    {checkPageLimit({ totalItems, endItem })}
                  </span>
                  of{' '}
                  <span className="font-semibold text-primary-160 ">
                    {totalItems} entries
                  </span>
                </>
              </span>

              <div className="pg-container">
                <ReactPaginate
                  breakLabel="..."
                  pageRangeDisplayed={1}
                  marginPagesDisplayed={2}
                  pageCount={
                    Math.ceil((totalItems as number) / dataLimit) as number
                  }
                  previousLabel={<FiChevronLeft />}
                  nextLabel={<FiChevronRight />}
                  onPageChange={(page) =>
                    handlePageClick(page.selected as number)
                  }
                  forcePage={pageIndex - 1}
                  renderOnZeroPageCount={() => null}
                  containerClassName="pg-container"
                  previousLinkClassName="pg-prev"
                  nextLinkClassName="pg-next"
                  pageLinkClassName="pg-item"
                  activeLinkClassName="pg-item-active"
                  breakLinkClassName="pg-item"
                  disabledLinkClassName="pg-item-disabled"
                  breakClassName="pg-break"
                />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

Khutbah.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Khutbah;
