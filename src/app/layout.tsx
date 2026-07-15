import './globals.css';
import { Inter } from 'next/font/google';
import SiteHeader from '../components/SiteHeader';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  metadataBase: new URL('https://iphande.co.za'),
  title: {
    default: "AXIONYX Research Observatory | Evidence-Based Innovation",
    template: "%s | AXIONYX"
  },
  description: "Explore research, software, evidence, and validated solutions developed through transparent computational science."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[var(--ax-background)] text-[var(--ax-text)]">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-[var(--ax-primary)] focus:text-white">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-grow w-full max-w-[var(--ax-container)] mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
