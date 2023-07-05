import { useContext } from 'react';

import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';

import { AuthContext } from '../../../context/AuthContext';

type EditButtonProps = {
  url: string;
};

const EditButton = ({ url }: EditButtonProps) => {
  const { userData } = useContext(AuthContext);

  return (
    <>
      {userData?.role !== 'Admin' && (
        <Link href={url} passHref>
          <a className="p-2 transition-all duration-150 bg-yellow-400 rounded-lg outline-none cursor-pointer hover:bg-yellow-500 active:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
            <BiEdit className="text-lg text-white cursor-pointer" />
          </a>
        </Link>
      )}
    </>
  );
};

export default EditButton;
