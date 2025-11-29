import { getProducts, upsertProduct, deleteProduct, setProductActive, getCategories, addProductImages, removeProductImage, addModelImages, removeModelImage } from "@/data/store";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

async function createOrUpdate(formData: FormData) {
  "use server";
  if (cookies().get("admin_auth")?.value !== "1") return;
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString() || "";
  const category = formData.get("category")?.toString() || "";
  const priceFrom = Number(formData.get("priceFrom") || 0);
  const description = formData.get("description")?.toString() || "";
  const models = formData.get("models")?.toString()?.split(",").map((x) => x.trim()).filter(Boolean);
  const sizes = formData.get("sizes")?.toString()?.split(",").map((x) => x.trim()).filter(Boolean);
  const extras = formData.get("extras")?.toString()?.split(",").map((x) => x.trim()).filter(Boolean);
  await upsertProduct({ id, title, category, priceFrom, description, variations: { models, sizes, extras } });
  redirect("/admin/produtos?ok=1");
}

async function remove(formData: FormData) {
  "use server";
  if (cookies().get("admin_auth")?.value !== "1") return;
  const id = formData.get("id")?.toString() || "";
  await deleteProduct(id);
}

async function toggle(formData: FormData) {
  "use server";
  if (cookies().get("admin_auth")?.value !== "1") return;
  const id = formData.get("id")?.toString() || "";
  const active = formData.get("active")?.toString() === "true";
  await setProductActive(id, active);
  redirect("/admin/produtos");
}

async function upload(formData: FormData) {
  "use server";
  if (cookies().get("admin_auth")?.value !== "1") return;
  const id = formData.get("id")?.toString() || "";
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
  if (urls.length) await addProductImages(id, urls);
}

async function removeImage(formData: FormData) {
  "use server";
  if (cookies().get("admin_auth")?.value !== "1") return;
  const id = formData.get("id")?.toString() || "";
  const url = formData.get("url")?.toString() || "";
  await removeProductImage(id, url);
  const filePath = path.join(process.cwd(), "public", url.replace(/^[\/]+/, ""));
  try {
    await fs.unlink(filePath);
  } catch {}
}

async function uploadModel(formData: FormData) {
  "use server";
  if (cookies().get("admin_auth")?.value !== "1") return;
  const id = formData.get("id")?.toString() || "";
  const model = formData.get("model")?.toString() || "";
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
  if (urls.length) await addModelImages(id, model, urls);
}

async function removeModelImageAction(formData: FormData) {
  "use server";
  if (cookies().get("admin_auth")?.value !== "1") return;
  const id = formData.get("id")?.toString() || "";
  const model = formData.get("model")?.toString() || "";
  const url = formData.get("url")?.toString() || "";
  await removeModelImage(id, model, url);
  const filePath = path.join(process.cwd(), "public", url.replace(/^[\/]+/, ""));
  try {
    await fs.unlink(filePath);
  } catch {}
}

export default async function Page({ searchParams }: { searchParams?: Record<string, string> }) {
  if (cookies().get("admin_auth")?.value !== "1") {
    redirect("/admin/login");
  }
  const products = await getProducts(false);
  const categories = await getCategories();
  return (
    <div className="space-y-8">
      {searchParams?.ok ? (
        <div className="card">
          <div className="card-body">
            <span className="badge badge-success">Salvo com sucesso</span>
          </div>
        </div>
      ) : null}
      <h1 className="text-2xl font-semibold">Produtos</h1>
      <div className="card">
        <div className="card-header">
          <div className="card-title">Adicionar produto</div>
        </div>
        <div className="card-body">
        <form action={createOrUpdate} className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input name="title" className="input" placeholder="Nome" />
          <select name="category" className="input">
            {categories.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
          <input name="priceFrom" type="number" className="input" placeholder="Preço base" />
          <input name="models" className="input" placeholder="Modelos (separar por vírgula)" />
          <input name="sizes" className="input" placeholder="Tamanhos (vírgula)" />
          <input name="extras" className="input" placeholder="Adicionais (vírgula)" />
          <textarea name="description" className="col-span-1 md:col-span-2 input" placeholder="Descrição" />
          <button className="btn btn-primary md:col-span-2">Salvar</button>
        </form>
        </div>
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Fotos</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>R$ {p.priceFrom}</td>
                <td>
                  {(p.variations?.models || []).map((m) => (
                    <div key={m} className="mb-4">
                      <div className="font-medium">Modelo {m}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(p.modelImages?.[m] || []).map((img) => (
                          <div key={img} className="flex items-center gap-2">
                            <img src={img} alt="" className="h-10 w-10 rounded object-cover" />
                            <form action={removeModelImageAction}>
                              <input type="hidden" name="id" value={p.id} />
                              <input type="hidden" name="model" value={m} />
                              <input type="hidden" name="url" value={img} />
                              <button className="btn-secondary rounded px-2 py-1">Remover</button>
                            </form>
                          </div>
                        ))}
                      </div>
                      <details>
                        <summary className="mt-2 btn-secondary inline-flex rounded px-2 py-1">Adicionar fotos</summary>
                        <form action={uploadModel} className="mt-2 flex items-center gap-2" encType="multipart/form-data">
                          <input type="hidden" name="id" value={p.id} />
                          <input type="hidden" name="model" value={m} />
                          <input type="file" name="images" multiple className="input" />
                          <button className="btn btn-primary">Enviar</button>
                        </form>
                      </details>
                    </div>
                  ))}
                </td>
                <td>
                  {p.active === false ? (
                    <span className="badge badge-muted">Desativado</span>
                  ) : (
                    <span className="badge badge-success">Ativo</span>
                  )}
                </td>
                <td>
                  <div className="flex gap-2">
                    <form action={toggle}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="active" value={p.active === false ? "true" : "false"} />
                      <button className="btn-secondary rounded px-2 py-1">{p.active === false ? "Ativar" : "Desativar"}</button>
                    </form>
                    <details>
                      <summary className="btn-secondary inline-flex rounded px-2 py-1">Editar</summary>
                      <form action={createOrUpdate} className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                        <input type="hidden" name="id" value={p.id} />
                        <input name="title" defaultValue={p.title} className="input" />
                        <select name="category" defaultValue={p.category} className="input">
                          {categories.map((c) => (
                            <option key={c.name} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                        <input name="priceFrom" type="number" defaultValue={p.priceFrom} className="input" />
                        <input name="models" defaultValue={(p.variations?.models || []).join(", ")} className="input" />
                        <input name="sizes" defaultValue={(p.variations?.sizes || []).join(", ")} className="input" />
                        <input name="extras" defaultValue={(p.variations?.extras || []).join(", ")} className="input" />
                        <textarea name="description" defaultValue={p.description} className="col-span-1 md:col-span-2 input" />
                        <button className="btn btn-primary md:col-span-2">Salvar alterações</button>
                      </form>
                    </details>
                    <form action={remove}>
                      <input type="hidden" name="id" value={p.id} />
                      <button className="btn-destructive rounded px-2 py-1">Excluir</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
