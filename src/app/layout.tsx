import Navbar from "../components/navbar";
import "./global.css";
import LanguageProvider from "./lanquage-provider";
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
    <html lang="en">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
