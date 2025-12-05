import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function login(formData: FormData) {
  "use server";
  const user = formData.get("user")?.toString() || "";
  const pass = formData.get("pass")?.toString() || "";
  const ADMIN_USER = process.env.ADMIN_USER || "default_user";
const ADMIN_PASS = process.env.ADMIN_PASS || "default_pass";
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    cookies().set("admin_auth", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
    redirect("/admin/produtos");
  }
}

export default function Page() {
  return (
    <div className="mx-auto max-w-md">
      <div className="card">
        <div className="card-header">
          <div className="card-title">Admin Login</div>
        </div>
        <div className="card-body">
          {cookies().get("admin_auth")?.value === "1" ? (
            <div className="mb-4 text-sm">
              Você já está logado. <a href="/admin/produtos" className="text-brand-purple">Ir para produtos</a> ou
              <a href="/admin/logout" className="ml-1 text-brand-purple">Sair</a>.
            </div>
          ) : null}
          <form action={login} className="space-y-4">
            <div>
              <label className="label">Usuário</label>
              <input name="user" className="input" placeholder="Usuário" />
            </div>
            <div>
              <label className="label">Senha</label>
              <input name="pass" type="password" className="input" placeholder="Senha" />
            </div>
            <button type="submit" className="btn btn-primary w-full">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
