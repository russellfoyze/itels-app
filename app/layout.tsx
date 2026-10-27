import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IELTS Master Online - Official Computer Delivered Mock Testing & Scoring',
  description: 'Authentic Computer-Delivered IELTS (CD-IELTS) testing platform with real-time scoring, Gemini AI evaluations, and diagnostic feedback.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
