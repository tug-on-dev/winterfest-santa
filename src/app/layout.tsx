import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Secret Santa",
  description: "A Secret Santa application for organizing gift exchanges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen font-sans">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              🎅 Secret Santa
            </h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-border bg-card mt-auto">
          <div className="container mx-auto px-4 py-4 text-center text-muted-foreground text-sm">
            Made with ❤️ for the holidays
          </div>
        </footer>
      </body>
    </html>
  );
}
