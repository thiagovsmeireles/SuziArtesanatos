import Link from "next/link";
import { cookies } from "next/headers";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = cookies().get("admin_auth")?.value === "1";
  if (!isAdmin) {
    return <>{children}</>;
  }
  return (
    <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-3 md:col-span-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Admin</div>
          </div>
          <div className="card-body">
            <nav className="grid gap-2">
              <Link href="/admin/produtos" className="btn-secondary rounded px-2 py-1">Produtos</Link>
              <Link href="/admin/categorias" className="btn-secondary rounded px-2 py-1">Categorias</Link>
              <Link href="/admin/logout" className="btn-secondary rounded px-2 py-1">Sair</Link>
            </nav>
          </div>
        </div>
      </aside>
      <section className="col-span-9 md:col-span-10">{children}</section>
    </div>
  );
}