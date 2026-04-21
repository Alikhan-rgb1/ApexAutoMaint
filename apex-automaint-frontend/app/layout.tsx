import type { Metadata } from 'next';
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster } from "react-hot-toast";
import TopBanner from "./components/TopBanner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-poppins",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: 'AlwakeelAutoMaint',
  description:
    'ALWAKEEL AUTO MAINT — modern black-and-blue auto service for diagnostics, repairs, body work, and paint.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfairDisplay.variable} antialiased`}
      >
        <LanguageProvider>
          <TopBanner />
          {children}
          <Toaster position="top-right" />
        </LanguageProvider>
      </body>
    </html>
  );
}
