import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { FloatingContact } from "@/components/FloatingContact";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { Nav } from "@/components/Nav";
import { company } from "@/lib/data";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import "./globals.css";

const display = Barlow_Condensed({
  weight: ["700", "800"],
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Barlow({
  weight: ["400", "600", "700"],
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createPageMetadata({
    title: "Shahid Mehmood Salamat Auto General Repairing Co LLC | Dubai",
    description: company.description,
    path: "/",
  }),
  title: {
    default: "Shahid Mehmood Salamat Auto General Repairing Co LLC | Dubai",
    template: "%s | SMS Auto Dubai",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a2342",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`h-full ${display.variable} ${body.variable}`}
    >
      <body className="flex min-h-full flex-col pb-16 antialiased md:pb-0">
        <GoogleAnalytics />
        <OrganizationJsonLd />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
        <MobileCallBar />
      </body>
    </html>
  );
}
