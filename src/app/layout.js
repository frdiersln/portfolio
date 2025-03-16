import { Roboto } from "next/font/google";
import "./styles/globals.css";

import ThreeDCard from "@/components/threeDCard";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Ferdi Eraslan - Portfolio",
  description: "Ferdi Eraslan's portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
          <body
            className={`${roboto.variable} antialiased`}
            >
            <ThreeDCard/>
            <main className="content">
              {children}
            </main>
          </body>
      </html>
  );
}
