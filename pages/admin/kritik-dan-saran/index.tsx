import { useState, useId, useMemo, useEffect } from 'react';

import Head from 'next/head';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { TbReportSearch } from 'react-icons/tb';
import ReactPaginate from 'react-paginate';
import { SingleValue } from 'react-select';

import KritikDanSaranDetailModal from '../../../components/artifacts/DetailModal/KritikDanSaranDetailModal';
import PageLoading from '../../../components/artifacts/Loading/PageLoading';
import PageHeader from '../../../components/artifacts/PageHeader';
import HeaderTitle from '../../../components/artifacts/PageHeader/HeaderTitle';
import DashboardLayout from '../../../components/main/Layout/DashboardLayout';
import useRemoteGetAllKritikDanSaran from '../../../hooks/remote/useRemoteGetAllKritikDanSaran';
import useRemoteGetKritikDanSaran from '../../../hooks/remote/useRemoteGetKritikDanSaran';
import { Option } from '../../../ts/types/main/Option';
import { NextPageWithLayout } from '../../../ts/types/NextPageWithLayout';
import { checkPageLimit } from '../../../utils/checkPageLimit';
import {
  generateDataPerPageOptions,
  generateTableHeadsKritikDanSaran,
} from '../../../utils/generateData';

const KritikDanSaran: NextPageWithLayout = () => {
  const uniqueId = useId();
  const [idKritikDanSaran, setIdKritikDanSaran] = useState<string>('');
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [dataLimit, setDataLimit] = useState<number>(15);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isDetailModalShown, setIsDetailModalShown] = useState<boolean>(false);

  const {
    data: allKritikDanSaranData,
    refetch,
    isFetching,
  } = useRemoteGetAllKritikDanSaran(dataLimit, pageIndex, searchInput);
  const {
    data: kritikDanSaranData,
    refetch: refetchKritikDanSaran,
    isFetching: isFetchingKritikDanSaran,
  } = useRemoteGetKritikDanSaran(idKritikDanSaran);
  const tableHeads = useMemo(() => generateTableHeadsKritikDanSaran(), []);
  const lastPage = useMemo(
    () => allKritikDanSaranData?.pagination?.lastPage,
    [allKritikDanSaranData?.pagination?.lastPage]
  );
  const itemsPerPage = useMemo(
    () => allKritikDanSaranData?.pagination?.perPage,
    [allKritikDanSaranData?.pagination?.perPage]
  );
  const totalItems = useMemo(
    () => allKritikDanSaranData?.pagination?.total ?? 0,
    [allKritikDanSaranData?.pagination?.total]
  );
  const [startItem, setStartItem] = useState<number>(1);
  const [endItem, setEndItem] = useState<number>(dataLimit);
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

  const handleOpenDetailModal = (kritikDanSaranId: string) => {
    setIdKritikDanSaran(kritikDanSaranId);
    if (kritikDanSaranData) {
      setIsDetailModalShown(true);
    }
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
  }, [allKritikDanSaranData?.data]);

  useEffect(() => {
    refetchKritikDanSaran();
  }, [idKritikDanSaran]);

  return (
    <>
      <Head>
        <title>List Kritik Dan Saran</title>
        <meta
          name="Halaman List Kritik Dan Saran"
          content="List Kritik Dan Saran"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {idKritikDanSaran && isDetailModalShown && (
        <KritikDanSaranDetailModal
          kritikDanSaran={kritikDanSaranData}
          isFetchingKritikDanSaran={isFetchingKritikDanSaran}
          idKritikDanSaran={idKritikDanSaran}
          setIdKritikDanSaran={setIdKritikDanSaran}
          isDetailModalShown={isDetailModalShown}
          setIsDetailModalShown={setIsDetailModalShown}
        />
      )}

      <div>
        <div className="flex flex-col gap-1">
          <div className="mb-5 lg:mb-16">
            <HeaderTitle headerTitle="List Kritik Dan Saran" />
          </div>

          <PageHeader
            options={dataPerPageOptions}
            placeholder={dataLimit.toString()}
            onChange={(option: SingleValue<Option<string>>) =>
              option && handleDataPerPage(+option.value)
            }
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
                    <tr className="bg-white hover:bg-gray-50">
                      <td colSpan={tableHeads.length} className="px-5 p-7">
                        <PageLoading />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {allKritikDanSaranData === undefined ? (
                        <tr className="font-medium bg-white text-primary-160">
                          <td
                            colSpan={tableHeads.length}
                            className="text-center p-7"
                          >
                            Tidak ada data
                          </td>
                        </tr>
                      ) : (
                        allKritikDanSaranData?.data?.map(
                          (kritikDanSaran, index) => (
                            <tr
                              key={kritikDanSaran.id}
                              className="bg-white hover:bg-gray-50"
                            >
                              <td className="px-5 p-7">{index + 1}</td>
                              <td className="px-5 font-medium text-primary-160 p-7">
                                {kritikDanSaran.nama_pengirim}
                              </td>
                              <td className="px-5 p-7">
                                {kritikDanSaran.teks?.slice(0, 150)}
                              </td>
                              <td className="px-5 p-7">
                                <button
                                  onClick={() =>
                                    handleOpenDetailModal(kritikDanSaran.id)
                                  }
                                >
                                  <div className="p-2 transition-all duration-150 bg-blue-500 rounded-lg outline-none cursor-pointer hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:bg-blue-600">
                                    <TbReportSearch className="text-lg text-white cursor-pointer" />
                                  </div>
                                </button>
                              </td>
                            </tr>
                          )
                        )
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

KritikDanSaran.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default KritikDanSaran;
