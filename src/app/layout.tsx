import { ToastProvider } from "@/components/PoeticToast";
import { SeasonsProvider } from "@/components/SeasonsProvider";
import SymbolicNav from "@/components/SymbolicNav";
import type { Metadata } from "next";
import { Fira_Code, Inter, Lora } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import layoutStyles from "./layout.module.css";
import "./seasons.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-lora"
});
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata: Metadata = {
  metadataBase: new URL("https://axionyx.co.za"),
  title: {
    default: "AXIONYX Research Institute",
    template: "%s | AXIONYX Research Institute",
  },
  description:
    "Advancing scientific discovery through computational research, reproducible methods, and open science.",
  openGraph: {
    type: "website",
    url: "https://axionyx.co.za",
    siteName: "AXIONYX Research Institute",
    title: "AXIONYX Research Institute",
    description:
      "Advancing scientific discovery through computational research, reproducible methods, and open science.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AXIONYX Research Institute",
    description:
      "Advancing scientific discovery through computational research, reproducible methods, and open science.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/research", label: "Research" },
    { href: "/publications", label: "Publications" },
    { href: "/software", label: "Software" },
    { href: "/open-science", label: "Open Science" },
    { href: "/partners", label: "Partnerships" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} ${firaCode.variable}`}>
        <header className={layoutStyles.header}>
          <div className={layoutStyles.headerInner}>
            <Link href="/" className={layoutStyles.brand}>
              AXIONYX Research Institute
            </Link>
            <nav className={layoutStyles.nav}>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={layoutStyles.navLink}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <SeasonsProvider>
          <ToastProvider>
            <SymbolicNav />
            {children}
            <footer className={layoutStyles.footer}>
              <div className={layoutStyles.footerInner}>
                AXIONYX Research Institute is a research initiative operated by Global IT and
                Business Solutions (Pty) Ltd, a South African registered private company.
              </div>
            </footer>
          </ToastProvider>
        </SeasonsProvider>
      </body>
    </html>
  );
}
