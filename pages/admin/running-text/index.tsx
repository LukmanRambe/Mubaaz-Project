import { useState, useId, useMemo, useEffect } from 'react';

import Head from 'next/head';
import { BiEdit } from 'react-icons/bi';
import { TbReportSearch } from 'react-icons/tb';

import DeleteButton from '../../../components/artifacts/Button/DeleteButton';
import RunningTextCreateModal from '../../../components/artifacts/CreateModal/RunningTextCreateModal';
import RunningTextDetailModal from '../../../components/artifacts/DetailModal/RunningTextDetailModal';
import RunningTextEditModal from '../../../components/artifacts/EditModal/RunningTextEditModal';
import PageLoading from '../../../components/artifacts/Loading/PageLoading';
import HeaderTitle from '../../../components/artifacts/PageHeader/HeaderTitle';
import Toast from '../../../components/artifacts/Toast';
import DashboardLayout from '../../../components/main/Layout/DashboardLayout';
import useRemoteGetAllRunningText from '../../../hooks/remote/useRemoteGetAllRunningText';
import useRemoteGetRunningText from '../../../hooks/remote/useRemoteGetRunningText';
import { NextPageWithLayout } from '../../../ts/types/NextPageWithLayout';
import { generateTableHeadsRunningText } from '../../../utils/generateData';

const RunningText: NextPageWithLayout = () => {
  const uniqueId = useId();
  const [isDetailModalShown, setIsDetailModalShown] = useState<boolean>(false);
  const [isCreateModalShown, setIsCreateModalShown] = useState<boolean>(false);
  const [isEditModalShown, setIsEditModalShown] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<string>('');
  const [idRunningText, setIdRunningText] = useState<string>('');
  const {
    data: allRunningTextData,
    refetch,
    isFetching,
  } = useRemoteGetAllRunningText();
  const {
    data: runningTextData,
    refetch: refetchRunningText,
    isFetching: isFetchingRunningText,
  } = useRemoteGetRunningText(idRunningText);
  const tableHeads = useMemo(() => generateTableHeadsRunningText(), []);
  const selectedUrutan = allRunningTextData?.data?.map(
    (runningText) => runningText.urutan
  );

  const handleOpenDetailModal = (runningTextId: string) => {
    setIdRunningText(runningTextId);
    if (runningTextData) {
      setIsDetailModalShown(true);
    }
  };
  const handleOpenEditModal = (runningTextId: string) => {
    setIdRunningText(runningTextId);
    if (runningTextData) {
      setIsEditModalShown(true);
    }
  };

  useEffect(() => {
    refetch();
  }, [allRunningTextData?.data]);

  useEffect(() => {
    refetchRunningText();
  }, [idRunningText]);

  return (
    <>
      <Head>
        <title>List Running Text</title>
        <meta name="Halaman List Running Text" content="List RunningText" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showToast && <Toast message={toastMessage} type={toastType} />}

      {idRunningText && isDetailModalShown && (
        <RunningTextDetailModal
          runningText={runningTextData}
          isFetchingRunningText={isFetchingRunningText}
          idRunningText={idRunningText}
          setIdRunningText={setIdRunningText}
          isDetailModalShown={isDetailModalShown}
          setIsDetailModalShown={setIsDetailModalShown}
        />
      )}

      {isCreateModalShown && (
        <RunningTextCreateModal
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

      {idRunningText && isEditModalShown && (
        <RunningTextEditModal
          runningText={runningTextData}
          isFetchingRunningText={isFetchingRunningText}
          selectedUrutan={selectedUrutan}
          idRunningText={idRunningText}
          setIdRunningText={setIdRunningText}
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
            <HeaderTitle headerTitle="List Running Text" />
          </div>

          <button
            onClick={() => setIsCreateModalShown(true)}
            className="w-full px-5 py-[.675rem] text-sm font-semibold text-center text-white transition duration-300 ease-in-out bg-primary-120 rounded-full cursor-pointer hover:bg-primary-140 focus:outline-none outline-none focus:bg-primary-140 active:bg-primary-160 md:w-64 self-end mb-5"
          >
            Tambah Running Text +
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
                  {isFetching ? (
                    <tr className="bg-white hover:bg-gray-50">
                      <td colSpan={tableHeads.length} className="px-5 p-7">
                        <PageLoading />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {allRunningTextData === undefined ? (
                        <tr className="font-medium bg-white text-primary-160">
                          <td
                            colSpan={tableHeads.length}
                            className="text-center p-7"
                          >
                            Tidak ada data
                          </td>
                        </tr>
                      ) : (
                        allRunningTextData?.data?.map((runningText, index) => (
                          <tr
                            key={runningText.id}
                            className="bg-white hover:bg-gray-50"
                          >
                            <td className="px-5 p-7">{index + 1}</td>
                            <td className="px-5 font-medium text-primary-160 p-7">
                              {runningText.text}
                            </td>
                            <td className="px-5 p-7">{runningText.urutan}</td>
                            <td className="px-5 p-7">
                              <div className="flex items-center justify-between gap-3 w-fit">
                                <button
                                  onClick={() =>
                                    handleOpenDetailModal(runningText.id)
                                  }
                                >
                                  <div className="p-2 transition-all duration-150 bg-blue-500 rounded-lg outline-none cursor-pointer hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:bg-blue-600">
                                    <TbReportSearch className="text-lg text-white cursor-pointer" />
                                  </div>
                                </button>
                                <button
                                  onClick={() =>
                                    handleOpenEditModal(runningText.id)
                                  }
                                >
                                  <div className="p-2 transition-all duration-150 bg-yellow-400 rounded-lg outline-none cursor-pointer hover:bg-yellow-500 active:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    <BiEdit className="text-lg text-white cursor-pointer" />
                                  </div>
                                </button>

                                <DeleteButton
                                  queryKey="deleteRunningText"
                                  endPointUrl={`/api/running-text/${runningText.id}`}
                                  refetch={refetch}
                                  dataName="Running Text"
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

RunningText.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RunningText;
