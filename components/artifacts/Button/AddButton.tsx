import Link from 'next/link';

type AddButtonProps = {
  pageLink: string;
  buttonText: string;
};

const AddButton: React.FC<AddButtonProps> = ({ pageLink, buttonText }) => {
  return (
    <Link passHref href={pageLink}>
      <a className="w-fit px-5 py-[.675rem] text-sm font-semibold text-center text-white transition duration-300 ease-in-out bg-primary-120 rounded-full cursor-pointer hover:bg-primary-140 focus:outline-none outline-none focus:bg-primary-140 active:bg-primary-160 md:w-64 ">
        {buttonText}
      </a>
    </Link>
  );
};

export default AddButton;
