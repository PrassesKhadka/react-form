import "./globals.css";
import StoreProvider from "./redux/StoreProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Redux store */}
      <StoreProvider>
        <body className="box-border p-0 b-0 m-0 min-w-full min-h-screen border-red-500 border-8">
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
