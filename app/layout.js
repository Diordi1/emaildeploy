import { Geist, Geist_Mono,Share_Tech } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const shareTech = Share_Tech({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: "400",
  
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Recruitment Email",
  description: "A recruitment email template",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${shareTech.variable} `}
      >
        {children}
      </body>
    </html>
  );
}
