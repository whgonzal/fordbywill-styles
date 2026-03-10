import "./globals.css";
import Link from "next/link";
import { SITE_NAME } from "@/lib/config";
import StickyContactBar from "@/components/StickyContactBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ paddingBottom: 80 }}>
        <header>
          <div className="nav container">
            <Link className="badge" href="/">🚗 {SITE_NAME}</Link>
            <nav className="nav-links">
              <a href="/#inventory">Inventory</a>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <StickyContactBar />
      </body>
    </html>
  );
}
