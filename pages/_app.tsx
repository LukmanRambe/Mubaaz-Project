import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import { NextPageWithLayout } from '../ts/types/NextPageWithLayout';

const queryClient = new QueryClient();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);

  if (Component.getLayout) {
    return (
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
};

export default MyApp;
