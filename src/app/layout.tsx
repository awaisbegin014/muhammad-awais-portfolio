import type { Metadata } from "next";

import "./globals.css";
import "./refinements.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammad-awais-portfolio.vercel.app"),
  title: "Muhammad Awais | Full-stack developer",
  icons: { icon: "data:," },
  description:
    "Portfolio of Muhammad Awais, a full-stack developer and final-year Computer Science student experienced in client websites, internal business systems, multi-tenant applications, and AI-powered features.",
  openGraph: {
    title: "Muhammad Awais | Full-stack developer",
    description:
      "Full-stack developer building client websites, internal business systems, multi-tenant applications, and AI-powered features.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/profile.jpg",
        width: 400,
        height: 400,
        alt: "Muhammad Awais",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
