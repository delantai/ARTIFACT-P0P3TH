// Vendor
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';

// Helpers
import { AssetsProvider } from 'src/features/open-sea/context';
import 'src/styles/globals.scss';

// Module
import { context, queryClient } from './query';

function MyApp({ Component, pageProps }: AppProps) {
  // Set custom context so that we may pass it through ContextBridge in Canvas
  return (
    <QueryClientProvider client={queryClient} context={context}>
      <AssetsProvider>
        <Toaster />
        <Component {...pageProps} />
      </AssetsProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
