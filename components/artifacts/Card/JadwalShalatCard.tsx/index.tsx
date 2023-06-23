import useRemoteGetJadwalShalat from '../../../../hooks/remote/slideshow/useRemoteGetJadwalShalat';
import useNextShalat from '../../../../hooks/slideshow/useNextShalat';
import { generateJadwalShalat } from '../../../../utils/generateData';

const JadwalShalat = () => {
  const { data: jadwalShalatData } = useRemoteGetJadwalShalat();
  const jadwalShalat = generateJadwalShalat(jadwalShalatData);
  const { nextShalat } = useNextShalat({ jadwalShalat });

  return (
    <section className="flex flex-col gap-5">
      {jadwalShalat?.map((shalat: { name: string; jam: string }) => (
        <div
          key={shalat.name}
          className={`flex items-center justify-between w-full p-5 rounded-lg h-28 ${
            shalat.name === nextShalat ? 'bg-red-500' : 'bg-white'
          }`}
        >
          <p className="text-5xl font-semibold">{shalat.name}</p>
          <p className="text-5xl font-semibold">{shalat.jam}</p>
        </div>
      ))}
    </section>
  );
};

export default JadwalShalat;
