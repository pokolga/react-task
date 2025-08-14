import Navbar from "../components/navbar";
import "./global.css";
import ThemeProvider from "./theme-provider";

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
    <html lang="ru">
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
