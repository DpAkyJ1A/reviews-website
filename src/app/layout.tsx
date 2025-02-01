import { Inter } from 'next/font/google';
import Header from '@/components/Header/index.server';
import Footer from '@/components/Footer/index.server';

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
        className={`${inter.className} height--100vh fl fl--dir-col`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
