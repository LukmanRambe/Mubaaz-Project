import useRemoteGetJadwalShalat from '../../../../hooks/remote/slideshow/useRemoteGetJadwalShalat';
import useNextShalat from '../../../../hooks/slideshow/useNextShalat';
import { generateJadwalShalat } from '../../../../utils/generateData';

type JadwalShalatProps = {
  isTVScreen: boolean;
};

const JadwalShalat = ({ isTVScreen }: JadwalShalatProps) => {
  const { data: jadwalShalatData } = useRemoteGetJadwalShalat();
  const jadwalShalat = generateJadwalShalat(jadwalShalatData);
  const { nextShalat } = useNextShalat({ jadwalShalat });

  return (
    <section
      className={`flex flex-col ${
        isTVScreen ? 'px-0 gap-6' : 'lg:px-0 lg:gap-3 xl:px-8 xl:gap-3'
      }`}
    >
      {jadwalShalat?.map((shalat: { name: string; jam: string }) => (
        <div
          key={shalat.name}
          className={`flex items-center justify-between w-full p-5 rounded-lg  ${
            shalat.name === nextShalat
              ? 'bg-[#051b1e] text-[#e3cf19] ring ring-white/50'
              : 'bg-[#2790a0] text-white'
          } ${isTVScreen ? 'h-24' : 'lg:h-14 xl:h-[4.5rem]'}`}
        >
          <p
            className={`font-semibold ${
              isTVScreen ? 'text-4xl' : 'lg:text-xl xl:text-3xl'
            }`}
          >
            {shalat.name}
          </p>
          <p
            className={` font-semibold ${
              isTVScreen ? 'text-4xl' : 'lg:text-xl xl:text-3xl'
            }`}
          >
            {shalat.jam}
          </p>
        </div>
      ))}
    </section>
  );
};

export default JadwalShalat;
