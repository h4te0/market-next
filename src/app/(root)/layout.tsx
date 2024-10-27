import type { PropsWithChildren } from 'react';

import { Footer, Header, Topbar } from '@/shared/components';

const Layout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="min-h-full flex flex-col">
      <Topbar />
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
