import { Nunito } from 'next/font/google';

import './globals.css';
import Provider from '@/shared/components/layout/provider';

const nunito = Nunito({
  weight: ['200', '300', '400', '500', '600', '700', '800', '800', '1000'],
  subsets: ['latin', 'cyrillic'],
  style: 'normal',
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className="h-full">
      <body className={nunito.className + ' h-full'}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
