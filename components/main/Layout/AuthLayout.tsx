import React, { ReactNode } from 'react';

import AuthProvider from '../../../context/AuthContext';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <main className="flex flex-col items-center justify-center min-h-screen">
        {children}
      </main>
    </AuthProvider>
  );
};

export default Layout;
