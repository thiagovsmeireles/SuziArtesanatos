import path from "path";
import { promises as fs } from "fs";

export type Variation = {
  model?: string;
  size?: string;
  color?: string;
  extras?: string[];
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: string;
  priceFrom: number;
  images: string[];
  description: string;
  popular?: boolean;
  active?: boolean;
  variations?: {
    models?: string[];
    sizes?: string[];
    extras?: string[];
  };
  modelImages?: Record<string, string[]>;
};

export type Category = {
  name: string;
  images?: string[];
};

export type DB = {
  categories: Category[];
  products: Product[];
};

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "db.json");

async function ensure() {
  try {
    await fs.access(dbPath);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify({ categories: [], products: [] }, null, 2));
  }
}

export async function getDB(): Promise<DB> {
  await ensure();
  const raw = await fs.readFile(dbPath, "utf8");
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed.categories) && parsed.categories.length && typeof parsed.categories[0] === "string") {
    parsed.categories = (parsed.categories as string[]).map((name) => ({ name, images: [] }));
    await fs.writeFile(dbPath, JSON.stringify(parsed, null, 2));
  }
  return parsed as DB;
}

export async function saveDB(db: DB) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

export async function getProducts(activeOnly = true) {
  const db = await getDB();
  return activeOnly ? db.products.filter((p) => p.active !== false) : db.products;
}

export async function getProductBySlug(slug: string) {
  const db = await getDB();
  return db.products.find((p) => p.slug === slug) || null;
}

export async function upsertProduct(input: Partial<Product> & { id?: string }) {
  const db = await getDB();
  if (!input.id) input.id = String(Date.now());
  if (!input.slug) input.slug = (input.title || "produto").toLowerCase().replace(/\s+/g, "-");
  const idx = db.products.findIndex((p) => p.id === input!.id);
  const base: Product = {
    id: input.id!,
    slug: input.slug!,
    title: input.title || "",
    category: input.category || "",
    priceFrom: input.priceFrom || 0,
    images: input.images || [],
    description: input.description || "",
    popular: input.popular || false,
    active: input.active ?? true,
    variations: input.variations || {},
    modelImages: (idx >= 0 ? db.products[idx].modelImages : input.modelImages) || {},
  };
  if (idx >= 0) db.products[idx] = { ...db.products[idx], ...base };
  else db.products.push(base);
  await saveDB(db);
  return base;
}

export async function setProductActive(id: string, active: boolean) {
  const db = await getDB();
  const p = db.products.find((x) => x.id === id);
  if (p) p.active = active;
  await saveDB(db);
}

export async function deleteProduct(id: string) {
  const db = await getDB();
  db.products = db.products.filter((p) => p.id !== id);
  await saveDB(db);
}

export async function getCategories() {
  const db = await getDB();
  return db.categories;
}

export async function upsertCategory(name: string, prev?: string) {
  const db = await getDB();
  if (prev) {
    const idx = db.categories.findIndex((c) => c.name === prev);
    if (idx >= 0) db.categories[idx].name = name;
  } else {
    if (!db.categories.find((c) => c.name === name)) db.categories.push({ name, images: [] });
  }
  await saveDB(db);
}

export async function deleteCategory(name: string) {
  const db = await getDB();
  db.categories = db.categories.filter((c) => c.name !== name);
  await saveDB(db);
}

export async function addProductImages(id: string, urls: string[]) {
  const db = await getDB();
  const p = db.products.find((x) => x.id === id);
  if (p) {
    p.images = Array.from(new Set([...(p.images || []), ...urls]));
    await saveDB(db);
  }
}

export async function removeProductImage(id: string, url: string) {
  const db = await getDB();
  const p = db.products.find((x) => x.id === id);
  if (p) {
    p.images = (p.images || []).filter((u) => u !== url);
    await saveDB(db);
  }
}

export async function addModelImages(id: string, model: string, urls: string[]) {
  const db = await getDB();
  const p = db.products.find((x) => x.id === id);
  if (p) {
    const current = p.modelImages?.[model] || [];
    const next = Array.from(new Set([...current, ...urls]));
    p.modelImages = { ...(p.modelImages || {}), [model]: next };
    await saveDB(db);
  }
}

export async function removeModelImage(id: string, model: string, url: string) {
  const db = await getDB();
  const p = db.products.find((x) => x.id === id);
  if (p) {
    const current = p.modelImages?.[model] || [];
    const next = current.filter((u) => u !== url);
    p.modelImages = { ...(p.modelImages || {}), [model]: next };
    await saveDB(db);
  }
}

export async function addCategoryImages(name: string, urls: string[]) {
  const db = await getDB();
  const c = db.categories.find((x) => x.name === name);
  if (c) {
    c.images = Array.from(new Set([...(c.images || []), ...urls]));
    await saveDB(db);
  }
}

export async function removeCategoryImage(name: string, url: string) {
  const db = await getDB();
  const c = db.categories.find((x) => x.name === name);
  if (c) {
    c.images = (c.images || []).filter((u) => u !== url);
    await saveDB(db);
  }
}
