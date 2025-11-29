import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function doLogout() {
  "use server";
  cookies().delete("admin_auth");
  redirect("/admin/login");
}

export default function Page() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="card">
        <div className="card-header">
          <div className="card-title">Sair</div>
        </div>
        <div className="card-body">
          <form action={doLogout}>
            <button className="btn btn-primary w-full">Confirmar logout</button>
          </form>
        </div>
      </div>
    </div>
  );
}