import type { Metadata } from "next";
import { Inter, Poppins, Pacifico } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

export const metadata: Metadata = {
  title: "Digital Pro Learning",
  description: "Plateforme de création de sites web professionnels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning={true}>
      <body className={`${inter.variable} ${poppins.variable} ${pacifico.variable} font-poppins antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}