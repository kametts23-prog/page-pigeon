import "./globals.css";

export const metadata = {
  title: "Page Pigeon",
  description: "Send a story. Get a story.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
