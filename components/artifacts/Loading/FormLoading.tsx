import React from 'react';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const FormLoading = () => {
  return (
    <div className="flex justify-center gap-3 mt-5 mb-5">
      <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
      <p>Mengambil data...</p>
    </div>
  );
};

export default FormLoading;
