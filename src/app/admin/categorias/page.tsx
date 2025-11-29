import { getCategories, upsertCategory, deleteCategory, addCategoryImages, removeCategoryImage } from "@/data/store";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

async function addOrEdit(formData: FormData) {
  "use server";
  if (cookies().get("admin_auth")?.value !== "1") return;
  const name = formData.get("name")?.toString() || "";
  const prev = formData.get("prev")?.toString();
  await upsertCategory(name, prev || undefined);
}

async function remove(formData: FormData) {
  "use server";
  if (cookies().get("admin_auth")?.value !== "1") return;
  const name = formData.get("name")?.toString() || "";
  await deleteCategory(name);
}

export default async function Page() {
  if (cookies().get("admin_auth")?.value !== "1") {
    redirect("/admin/login");
  }
  const categories = await getCategories();
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Categorias</h1>
      <div className="card">
        <div className="card-body">
        <form action={addOrEdit} className="flex gap-2">
          <input name="name" className="flex-1 input" placeholder="Nova categoria" />
          <button className="btn btn-primary">Adicionar</button>
        </form>
        </div>
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Imagens</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.name}>
                <td>{c.name}</td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    {(c.images || []).map((img) => (
                      <div key={img} className="flex items-center gap-2">
                        <img src={img} alt="" className="h-10 w-10 rounded object-cover" />
                        <form action={async (formData: FormData) => {
                          "use server";
                          if (cookies().get("admin_auth")?.value !== "1") return;
                          const name = formData.get("name")?.toString() || "";
                          const url = formData.get("url")?.toString() || "";
                          await removeCategoryImage(name, url);
                          const filePath = path.join(process.cwd(), "public", url.replace(/^[\/]+/, ""));
                          try {
                            await fs.unlink(filePath);
                          } catch {}
                        }}>
                          <input type="hidden" name="name" value={c.name} />
                          <input type="hidden" name="url" value={img} />
                          <button className="btn-secondary rounded px-2 py-1">Remover</button>
                        </form>
                      </div>
                    ))}
                  </div>
                  <details>
                    <summary className="mt-2 btn-secondary inline-flex rounded px-2 py-1">Adicionar fotos</summary>
                    <form
                      action={async (formData: FormData) => {
                        "use server";
                        if (cookies().get("admin_auth")?.value !== "1") return;
                        const name = formData.get("name")?.toString() || "";
                        const files = formData.getAll("images") as File[];
                        const dir = path.join(process.cwd(), "public", "uploads");
                        await fs.mkdir(dir, { recursive: true });
                        const urls: string[] = [];
                        for (const file of files) {
                          if (!file || file.size === 0) continue;
                          const buf = Buffer.from(await file.arrayBuffer());
                          const safeName = `${Date.now()}-${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9_.-]/g, "_")}`;
                          const full = path.join(dir, safeName);
                          await fs.writeFile(full, buf);
                          urls.push(`/uploads/${safeName}`);
                        }
                        if (urls.length) await addCategoryImages(name, urls);
                      }}
                      className="mt-2 flex items-center gap-2" encType="multipart/form-data"
                    >
                      <input type="hidden" name="name" value={c.name} />
                      <input type="file" name="images" multiple className="input" />
                      <button className="btn btn-primary">Enviar</button>
                    </form>
                  </details>
                </td>
                <td>
                  <details>
                    <summary className="btn-secondary inline-flex rounded px-2 py-1">Editar</summary>
                    <form action={addOrEdit} className="mt-2 flex gap-2">
                      <input type="hidden" name="prev" value={c.name} />
                      <input name="name" defaultValue={c.name} className="input" />
                      <button className="btn btn-primary">Salvar</button>
                    </form>
                  </details>
                  <form action={remove} className="mt-2 inline-block">
                    <input type="hidden" name="name" value={c.name} />
                    <button className="btn-destructive rounded px-2 py-1">Excluir</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}