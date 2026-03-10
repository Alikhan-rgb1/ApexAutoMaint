import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  title: "ApexAutoMaint - Professional Car Repair Service Dubai & Sharjah",
  description: "ApexAutoMaint - Professional car repair service in UAE. Body repair, electrical work, mechanical service, ceramic coating, AC service, transmission repair. ISO 9001 certified. 24/7 concierge. Dubai & Sharjah.",
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
        {children}
      </body>
    </html>
  );
}
