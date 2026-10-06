import "./globals.css";
import { Fraunces, Outfit } from "next/font/google";
const f1 = Fraunces({ subsets: ["latin"], variable: "--f1" });
const f2 = Outfit({ subsets: ["latin"], variable: "--f2" });
export const metadata = {
  title: "Enjoy Your Diwali | Crackers & Flowers with Home Delivery",
  description: "Diwali crackers and fresh flowers. Order on WhatsApp, home delivery available.",
};
export default function RootLayout({ children }) {
  return (<html lang="en"><body className={`${f1.variable} ${f2.variable}`}>{children}</body></html>);
}
