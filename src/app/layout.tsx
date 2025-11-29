import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";
import { Nunito, Quicksand } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700"] });
const quicksand = Quicksand({ subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Susi Artesanatos",
  description: "Catálogo e pedidos pelo WhatsApp",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = cookies().get("admin_auth")?.value === "1";
  const logoPath = path.join(process.cwd(), "public", "logo", "logo.png");
  let hasLogo = false;
  try {
    await fs.access(logoPath);
    hasLogo = true;
  } catch {}
  const year = new Date().getFullYear();
  return (
    <html lang="pt-br">
      <body className={`${nunito.className}`}>
        <header className="border-b bg-gradient-to-r from-brand-rose/40 via-brand-yellow/30 to-brand-purple/30">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              {hasLogo ? (
                <Image src="/logo/logo.png" alt="Logo" width={36} height={36} className="rounded" />
              ) : (
                <span className={`${quicksand.className} text-xl font-semibold text-brand-purple`}>Susi Artesanatos</span>
              )}
            </Link>
            <nav className="flex items-center gap-2">
              <Link href="/produtos" className="btn-secondary rounded-full px-3 py-1">Produtos</Link>
              <Link href="/sobre" className="btn-secondary rounded-full px-3 py-1">Sobre</Link>
              <Link href="/contato" className="btn-secondary rounded-full px-3 py-1">Contato</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="border-t bg-gradient-to-r from-brand-purple/10 via-brand-rose/10 to-brand-yellow/10">
          <div className="container py-6 text-sm">
            <div>Luziânia-GO</div>
            <div className="mt-1 text-gray-600">© {year} Susi Artesanatos — Todos os direitos reservados. Feito por Green Mind Sys.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}