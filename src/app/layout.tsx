import { Inter } from 'next/font/google';
import Header from '@/components/Header/index.server';
import Footer from '@/components/Footer/index.server';
import LightsBackground from '@/components/LightsBackground/index.server';

import { ToastContainer } from 'react-toastify';

// Styles
import '@/styles/build.sass';
import { getGoods } from '@/actions/good';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whiteGoods = await getGoods('white');

  return (
    <html lang="en">
      <body
        className={`${inter.className} relative--core min-height--100vh height--fit-content`}
      >
        <LightsBackground>
          <Header whiteGoods={whiteGoods} />
          {children}
          <Footer />
          <ToastContainer />
        </LightsBackground>
      </body>
    </html>
  );
}
