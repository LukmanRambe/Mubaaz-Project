import { useState } from 'react';

import Head from 'next/head';

import ResetButton from '../../components/artifacts/Button/Slideshow/ResetButton';
import SlideToButton from '../../components/artifacts/Button/Slideshow/SlideToButton';
import SlideToModal from '../../components/artifacts/EditModal/Slideshow/SlideToModal';
import HeaderTitle from '../../components/artifacts/PageHeader/HeaderTitle';
import Toast from '../../components/artifacts/Toast';
import DashboardLayout from '../../components/main/Layout/DashboardLayout';
import useRemoteGetSlideshow from '../../hooks/remote/useRemoteGetSlideshow';
import { NextPageWithLayout } from '../../ts/types/NextPageWithLayout';

const SlideshowControl: NextPageWithLayout = () => {
  const { data: slideshowData, isFetching, refetch } = useRemoteGetSlideshow();

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<string>('');
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Slideshow Control</title>
        <meta name="Halaman Slideshow Control" content="Slideshow Control" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mb-5 lg:mb-16">
        <HeaderTitle headerTitle="List Ustadz" />
      </div>

      {showToast && <Toast message={toastMessage} type={toastType} />}

      {isModalShown && (
        <SlideToModal
          slideshow={slideshowData}
          isFetching={isFetching}
          isModalShown={isModalShown}
          setIsModalShown={setIsModalShown}
          setShowToast={setShowToast}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
          setToastType={setToastType}
          refetch={refetch}
        />
      )}

      <section className="flex flex-col">
        <div className="flex flex-col items-start gap-2 mb-5">
          <label className="mb-3 font-semibold">Reset slideshow</label>

          <ResetButton
            toastMessage={toastMessage}
            setShowToast={setShowToast}
            setToastMessage={setToastMessage}
            setToastType={setToastType}
            refetch={refetch}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className="mb-3 font-semibold">
            Pilih nomor slide yang ditampilkan
          </label>

          <SlideToButton setIsModalShown={setIsModalShown} />
        </div>
      </section>
    </>
  );
};

SlideshowControl.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default SlideshowControl;
