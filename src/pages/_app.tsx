import type { AppProps } from 'next/app';
import toast, { Toaster } from 'react-hot-toast';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'src/styles/globals.scss';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (error instanceof Error && query.state.data !== undefined) {
        // Only show toasts if data already exists in the cache,
        // which indicates a failed background update.
        toast.error(`Oops, mistakes were made: ${error.message}`, {
          style: {
            background: '#2f3236',
            borderRadius: '8px',
            color: '#f4f6f7',
          },
        });
      }
    },
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
