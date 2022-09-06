// Vendor
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';

// Helpers
import { ArtifactProvider } from 'src/features/artifact/context';
import { SearchProvider } from 'src/features/open-sea/context';
import 'src/styles/globals.scss';
import { context, queryClient } from 'src/utils/query-client';

function MyApp({ Component, pageProps }: AppProps) {
  // Set custom context so that we may pass it through ContextBridge in Canvas
  return (
    <QueryClientProvider client={queryClient} context={context}>
      <SearchProvider>
        <ArtifactProvider>
          <Toaster />
          <Component {...pageProps} />
        </ArtifactProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
