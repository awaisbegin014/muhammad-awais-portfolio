import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammad-awais-portfolio.vercel.app"),
  title: "Muhammad Awais | Portfolio",
  description:
    "Portfolio of Muhammad Awais, Computer Science student and full-stack developer from FAST National University.",
  openGraph: {
    title: "Muhammad Awais | Portfolio",
    description:
      "Portfolio of Muhammad Awais, Computer Science student and full-stack developer from FAST National University.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 1200,
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
