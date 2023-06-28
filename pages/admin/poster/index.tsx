import { useState, useId, useMemo, useEffect } from 'react';

import Head from 'next/head';
import { BiEdit } from 'react-icons/bi';
import { TbReportSearch } from 'react-icons/tb';

import DeleteButton from '../../../components/artifacts/Button/DeleteButton';
import PosterCreateModal from '../../../components/artifacts/CreateModal/PosterCreateModal';
import PosterDetailModal from '../../../components/artifacts/DetailModal/PosterDetailModal';
import PosterEditModal from '../../../components/artifacts/EditModal/PosterEditModal';
import PageLoading from '../../../components/artifacts/Loading/PageLoading';
import HeaderTitle from '../../../components/artifacts/PageHeader/HeaderTitle';
import Toast from '../../../components/artifacts/Toast';
import DashboardLayout from '../../../components/main/Layout/DashboardLayout';
import useRemoteGetAllPoster from '../../../hooks/remote/useRemoteGetAllPoster';
import useRemoteGetPoster from '../../../hooks/remote/useRemoteGetPoster';
import { NextPageWithLayout } from '../../../ts/types/NextPageWithLayout';
import { generateTableHeadsPoster } from '../../../utils/generateData';

const Poster: NextPageWithLayout = () => {
  const uniqueId = useId();
  const [idPoster, setIdPoster] = useState<string>('');
  const [isCreateModalShown, setIsCreateModalShown] = useState<boolean>(false);
  const [isEditModalShown, setIsEditModalShown] = useState<boolean>(false);
  const [isDetailModalShown, setIsDetailModalShown] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: allPosterData, refetch, isFetching } = useRemoteGetAllPoster();
  const {
    data: posterData,
    refetch: refetchPoster,
    isFetching: isFetchingPoster,
  } = useRemoteGetPoster(idPoster);
  const tableHeads = useMemo(() => generateTableHeadsPoster(), []);
  const selectedUrutan = allPosterData?.data?.map((poster) => poster.urutan);

  const handleOpenDetailModal = (posterId: string) => {
    setIdPoster(posterId);
    if (posterData) {
      setIsDetailModalShown(true);
    }
  };
  const handleOpenEditModal = (posterId: string) => {
    setIdPoster(posterId);
    if (posterData) {
      setIsEditModalShown(true);
    }
  };

  useEffect(() => {
    refetch();
    refetchPoster();
  }, [allPosterData]);

  useEffect(() => {
    refetchPoster();
  }, [idPoster]);

  useEffect(() => {
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(loading);
  }, []);

  return (
    <>
      <Head>
        <title>List Poster</title>
        <meta name="Halaman List Poster" content="List Poster" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showToast && <Toast message={toastMessage} type={toastType} />}

      {isDetailModalShown && (
        <PosterDetailModal
          poster={posterData}
          isFetchingPoster={isFetchingPoster}
          setIdPoster={setIdPoster}
          isDetailModalShown={isDetailModalShown}
          setIsDetailModalShown={setIsDetailModalShown}
        />
      )}

      {isCreateModalShown && (
        <PosterCreateModal
          selectedUrutan={selectedUrutan}
          isCreateModalShown={isCreateModalShown}
          setIsCreateModalShown={setIsCreateModalShown}
          setShowToast={setShowToast}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
          setToastType={setToastType}
          refetch={refetch}
        />
      )}

      {isEditModalShown && (
        <PosterEditModal
          poster={posterData}
          isFetchingPoster={isFetchingPoster}
          selectedUrutan={selectedUrutan}
          setIdPoster={setIdPoster}
          isEditModalShown={isEditModalShown}
          setIsEditModalShown={setIsEditModalShown}
          setShowToast={setShowToast}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
          setToastType={setToastType}
          refetch={refetch}
        />
      )}

      <div>
        <div className="flex flex-col gap-1">
          <div className="mb-5 lg:mb-16">
            <HeaderTitle headerTitle="List Poster" />
          </div>

          <button
            onClick={() => setIsCreateModalShown(true)}
            className="w-full px-5 py-[.675rem] text-sm font-semibold text-center text-white transition duration-300 ease-in-out bg-primary-120 rounded-full cursor-pointer hover:bg-primary-140 focus:outline-none outline-none focus:bg-primary-140 active:bg-primary-160 md:w-64 self-end mb-5"
          >
            Tambah Poster +
          </button>

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
                  {isFetching || isLoading ? (
                    <tr className="bg-white border-opacity-20 hover:bg-gray-50">
                      <td colSpan={tableHeads.length} className="px-5 p-7">
                        <PageLoading />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {allPosterData?.data?.length === 0 ? (
                        <tr className="font-medium bg-white border-opacity-20 text-primary-160">
                          <td
                            colSpan={tableHeads.length}
                            className="text-center p-7"
                          >
                            Tidak ada data
                          </td>
                        </tr>
                      ) : (
                        allPosterData?.data?.map((poster, index) => (
                          <tr
                            key={poster.id}
                            className="bg-white border-opacity-20 hover:bg-gray-50"
                          >
                            <td className="px-5 p-7">{index + 1}</td>
                            <td className="px-5 font-medium text-primary-160 p-7">
                              {poster.nama_file_poster}
                            </td>
                            <td className="px-5 p-7">{poster.urutan}</td>
                            <td className="px-5 p-7">
                              <div className="flex items-center justify-between gap-3 w-fit">
                                <button
                                  onClick={() =>
                                    handleOpenDetailModal(poster.id)
                                  }
                                >
                                  <div className="p-2 transition-all duration-150 bg-blue-500 rounded-lg outline-none cursor-pointer hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:bg-blue-600">
                                    <TbReportSearch className="text-lg text-white cursor-pointer" />
                                  </div>
                                </button>

                                <button
                                  onClick={() => handleOpenEditModal(poster.id)}
                                >
                                  <div className="p-2 transition-all duration-150 bg-yellow-400 rounded-lg outline-none cursor-pointer hover:bg-yellow-500 active:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    <BiEdit className="text-lg text-white cursor-pointer" />
                                  </div>
                                </button>

                                <DeleteButton
                                  queryKey="deletePoster"
                                  endPointUrl={`/api/posters/${poster.id}`}
                                  refetch={refetch}
                                  dataName="Poster"
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
          </div>
        </div>
      </div>
    </>
  );
};

Poster.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Poster;
