'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="bottom-right" reverseOrder={false} />
      <ProgressBar
        height="4px"
        color="#F97316"
        options={{ showSpinner: false }}
        disableSameURL={false}
        shallowRouting
      />
    </QueryClientProvider>
  );
};

export default Provider;
