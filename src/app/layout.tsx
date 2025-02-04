import { Inter } from 'next/font/google';
import Header from '@/components/Header/index.server';
import Footer from '@/components/Footer/index.server';
import LightsBackground from '@/components/LightsBackground/index.server';

// Styles
import '@/styles/build.sass';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative--core min-height--100vh height--fit-content`}
      >
        <LightsBackground>
          <Header />
          {children}
          <Footer />
        </LightsBackground>
      </body>
    </html>
  );
}
