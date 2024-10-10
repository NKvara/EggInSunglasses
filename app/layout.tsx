import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const darwin = localFont({
  src: "./fonts/darwin.otf",
  variable: "--font-pixel"
});

const pixel = localFont({
  src: "./fonts/pixel.ttf",
  variable: "--font-pixel"
});

export const metadata: Metadata = {
  title: "Egg In Sunglasses",
  description: "this is MY website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${pixel.className} ${darwin.variable} `}
      >
        {children}
      </body>
    </html>
  );
}
