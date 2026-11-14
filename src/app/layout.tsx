import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'tinye — Make room for what matters',
  description: 'Goal-based savings on NEAR Testnet. Put something aside. Build something bigger.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="%23121316"/><circle cx="16" cy="16" r="8" fill="%2378A738"/></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAFAFA] text-[#1A1B1E] min-h-screen antialiased selection:bg-[#78A738]/20 selection:text-[#1A1B1E] relative overflow-x-hidden">
        {/* Soft Lens Ambient Atmospheric Light */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-[15%] left-[20%] w-[550px] h-[550px] rounded-full bg-[#EBF2E6]/60 blur-[140px]" />
          <div className="absolute top-[35%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#F2F4EB]/70 blur-[130px]" />
          <div className="absolute -bottom-[10%] left-[30%] w-[450px] h-[450px] rounded-full bg-[#E5ECE0]/50 blur-[150px]" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
