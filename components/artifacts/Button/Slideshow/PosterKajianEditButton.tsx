type PosterKajianEditButtonPropsType = {
  setIsPosterKajianEditModalShown: (value: boolean) => void;
};
const PosterKajianEditButton = ({
  setIsPosterKajianEditModalShown,
}: PosterKajianEditButtonPropsType) => {
  return (
    <button
      type="button"
      onClick={() => setIsPosterKajianEditModalShown(true)}
      className="w-fit px-5 py-[.675rem] text-sm font-semibold text-center text-white transition duration-300 ease-in-out bg-primary-120 rounded-lg cursor-pointer hover:bg-primary-140 focus:outline-none outline-none focus:bg-primary-140 active:bg-primary-160 md:w-64"
    >
      Pilih Poster Kajian
    </button>
  );
};

export default PosterKajianEditButton;
