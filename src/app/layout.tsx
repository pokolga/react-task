import Navbar from "../components/navbar";
import "./global.css";
import Providers from "./providers";

export const metadata = {
  title: "My App",
  description: "Next.js migration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
