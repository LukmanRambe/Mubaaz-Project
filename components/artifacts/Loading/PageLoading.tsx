import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const PageLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <AiOutlineLoading3Quarters className="text-primary-100 text-9xl animate-spin" />
    </div>
  );
};

export default PageLoading;
