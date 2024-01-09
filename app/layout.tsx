import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="box-border p-0 b-0 m-0 min-w-full min-h-screen border-red-500 border-8">
        {children}
      </body>
    </html>
  );
}
