import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://arlas-legal.dapper-smile-5399.chatgpt.site"),
  title: "Arlas Legal | Hukuk & Danışmanlık",
  description:
    "Sağlam bir temel. Güvenli bir gelecek. Arlas Legal ile bireyler ve kurumlar için özenli bir hukuki yaklaşım.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Arlas Legal",
    title: "Arlas Legal | Hukuk & Danışmanlık",
    description: "Sağlam bir temel. Güvenli bir gelecek.",
    images: [
      {
        url: "/og.png",
        width: 1733,
        height: 907,
        alt: "Arlas Legal — Hukuk & Danışmanlık",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arlas Legal | Hukuk & Danışmanlık",
    description: "Sağlam bir temel. Güvenli bir gelecek.",
    images: ["/og.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
