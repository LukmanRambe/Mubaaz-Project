import Image from 'next/image';

const HomePageBanner = () => {
  return (
    <article className="relative flex items-center justify-start w-full h-screen">
      <div className="absolute top-0 z-[2] w-full h-full backdrop-brightness-[.35]" />

      <picture className="relative block min-h-screen overflow-hidden bg-no-repeat z-[1] w-full">
        <Image
          src="/assets/images/mubaaz-banner.jpg"
          alt="Home Page Banner Image"
          layout="fill"
          className="object-cover"
        />
      </picture>

      <section className="absolute z-[3] tracking-widest flex flex-col items-center gap-5 justify-start w-full px-3 sm:px-6 lg:px-12 xl:px-24 2xl:px-28 text-start">
        <h1 className="w-full text-3xl font-bold text-white sm:text-4xl 2xl:text-6xl">
          Assalamu&apos;alaikum <br /> Warahmatullahi Wabarakatuh
        </h1>

        <section className="w-full text-base font-light text-white 2xl:text-xl">
          <p>
            Selamat datang di website resmi{' '}
            <span className="font-bold text-yellow-500">
              Masjid Umar bin Abdul Aziz
            </span>
          </p>
        </section>
      </section>
    </article>
  );
};

export default HomePageBanner;
