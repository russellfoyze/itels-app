import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IELTS Master Online - Official Computer Delivered Mock Testing & Scoring',
  description: 'Authentic Computer-Delivered IELTS (CD-IELTS) testing platform with real-time scoring, Gemini AI evaluations, and diagnostic feedback.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#002B49',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
