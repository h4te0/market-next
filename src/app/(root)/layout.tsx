import type { PropsWithChildren } from 'react';

import { Header, Topbar } from '@/shared/components';

const Layout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <main className="h-full">
      <Topbar />
      <Header />
      {children}
    </main>
  );
};

export default Layout;
