import type { Metadata } from "next";
import ClientShell from "@/components/layout/ClientShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATS ENERGY SOLUTIONS | Industrial Electrical & Solar Technology Bangladesh",
  description: "Official Corporate Website and CMS for ATS Energy Solutions Bangladesh.",
  keywords: "ATS Energy, Electrical accessories Bangladesh, LED bulbs, Gang Switch, MCB, Cables 1.5 RM 2.5 RM, Solar systems Dhaka",
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-slate-950">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
