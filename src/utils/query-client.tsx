// Vendor
import { createContext } from 'react';
import toast from 'react-hot-toast';
import { QueryCache, QueryClient } from '@tanstack/react-query';

export const context = createContext<QueryClient | undefined>(undefined);

export const queryClient = new QueryClient({
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
