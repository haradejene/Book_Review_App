import type { Metadata } from "next";
import "./globals.css";
import { ShelfProvider } from "@/context/ShelfContext";

export const metadata: Metadata = {
  title: {
    default: "Enanbib-book-review-app",
    template: "%s | Enanbib-book-review-app",
  },
  description: "Discover and review books. Rate, read opinions, and manage shelves.",
  openGraph: {
    title: "Enanbib-book-review-app",
    description: "Discover and review books. Rate, read opinions, and manage shelves.",
    type: "website",
    url: "https://example.com",
    siteName: "Enanbib-book-review-app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className="relative bg-white">
        <ShelfProvider>
          <div className="relative z-10">
            {children}
          </div>
        </ShelfProvider>
      </body>
    </html>
  );
}