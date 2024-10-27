'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import toast, { Toaster, ToastBar } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 10000 }}>
          {(t) => (
            <div onClick={() => toast.dismiss(t.id)} className="cursor-pointer">
              <ToastBar toast={t} position="bottom-right" />
            </div>
          )}
        </Toaster>
        <ProgressBar height="4px" color="#F97316" options={{ showSpinner: false }} shallowRouting />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Provider;
