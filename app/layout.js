import './globals.css';

export const metadata = {
  title: 'Mondira Chanda — Frontend Developer | 3D Portfolio',
  description: 'Interactive 3D portfolio of Mondira Chanda, a Frontend Developer specialized in React, Next.js & TypeScript.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#070712] text-white overflow-x-hidden">{children}</body>
    </html>
  );
}