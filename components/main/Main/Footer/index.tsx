import Link from 'next/link';
import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineWhatsApp,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="flex flex-col items-start justify-between w-full p-10 px-3 sm:px-6 lg:px-12 xl:px-24 2xl:px-28 pb-7 bg-primary-180">
      <section className="flex flex-col items-start justify-between w-full gap-5 md:flex-wrap lg:flex-nowrap md:flex-row">
        <section className="w-full text-white">
          <h3 className="text-4xl font-bold tracking-wider uppercase">
            Mubaaz
          </h3>
        </section>

        <section className="w-full">
          <h3 className="mb-2 text-xl font-bold text-white">Lihat Lainnya</h3>

          <ul className="w-full text-white list-none">
            <li className="mb-2">
              <Link href="/agenda/kajian" passHref>
                <a
                  className="tracking-wide transition-all duration-150 ease-in-out hover:underline active:underline"
                  title="Halaman Jadwal Kajian"
                >
                  Kajian
                </a>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/agenda/khutbah" passHref>
                <a
                  className="tracking-wide transition-all duration-150 ease-in-out hover:underline active:underline"
                  title="Halaman Jadwal Khutbah Jum'at"
                >
                  Khutbah Jum&apos;at
                </a>
              </Link>
            </li>
          </ul>
        </section>

        <section className="w-full mb-10 lg:mb-0">
          <h3 className="mb-2 text-xl font-bold text-white">Hubungi Kami</h3>

          <section className="flex justify-start w-full h-full gap-3">
            <section className="w-full">
              <p className="text-white">
                Jl. Pusaka, Pasar 10, Tembung, Kec. Percut Sei Tuan, Kabupaten
                Deli Serdang, Sumatera Utara 20371
              </p>

              <section className="flex gap-2 mt-5 w-fit">
                <Link href="https://www.youtube.com/@TembungSunnah" passHref>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full"
                    title="Youtube Tembung Sunnah"
                  >
                    <AiFillYoutube className="flex-shrink-0 p-2 text-white duration-100 ease-in-out rounded-full w-9 h-9 bg-primary-140 hover:text-primary-140 hover:bg-white transition-color" />
                  </a>
                </Link>

                <Link
                  href="https://www.instagram.com/mubaaz_official/"
                  passHref
                >
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full"
                    title="Instagram Mubaaz Official"
                  >
                    <AiOutlineInstagram className="flex-shrink-0 p-2 text-white duration-100 ease-in-out rounded-full w-9 h-9 bg-primary-140 hover:text-primary-140 hover:bg-white transition-color" />
                  </a>
                </Link>

                <Link href="https://wa.me/+6285361233635" passHref>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full"
                    title="Whatsapp Mubaaz Official"
                  >
                    <AiOutlineWhatsApp className="flex-shrink-0 p-2 text-white duration-100 ease-in-out rounded-full w-9 h-9 bg-primary-140 hover:text-primary-140 hover:bg-white transition-color" />
                  </a>
                </Link>
              </section>
            </section>
          </section>
        </section>

        <section className="w-full lg:min-w-[22.5rem] h-full overflow-hidden rounded-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d939.6060833173204!2d98.7582505785972!3d3.607692419194703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303137e3b5f80019%3A0x8a56cbd813b92a69!2sMasjid%20Umar%20bin%20Abdul%20Aziz%20Tembung%20-%20MUBAZZ-!5e0!3m2!1sen!2sid!4v1687794338178!5m2!1sen!2sid"
            className="w-full h-full min-h-[20rem]"
            loading="lazy"
          />
        </section>
      </section>

      <section className="w-full text-xs tracking-wide text-center text-white md:text-base mt-14">
        <h4>
          Copyright &#169; {new Date().getFullYear()} - Masjid Umar bin Abdul
          Aziz
        </h4>
      </section>
    </footer>
  );
};

export default Footer;
