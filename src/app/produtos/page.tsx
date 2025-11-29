import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";
import { getProducts, getCategories } from "@/data/store";

export default async function Page({ searchParams }: { searchParams?: Record<string, string> }) {
  const categories = await getCategories();
  const all = await getProducts(true);
  const state = {
    category: searchParams?.category,
    sort: searchParams?.sort || "popular",
    min: searchParams?.min ? Number(searchParams.min) : undefined,
    max: searchParams?.max ? Number(searchParams.max) : undefined,
  };
  let list = all.slice();
  if (state.category) list = list.filter((p) => p.category === state.category);
  if (state.min) list = list.filter((p) => p.priceFrom >= state.min!);
  if (state.max) list = list.filter((p) => p.priceFrom <= state.max!);
  if (state.sort === "price-asc") list.sort((a, b) => a.priceFrom - b.priceFrom);
  if (state.sort === "price-desc") list.sort((a, b) => b.priceFrom - a.priceFrom);
  if (state.sort === "popular") list.sort((a, b) => Number(b.popular) - Number(a.popular));
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Produtos</h1>
      <Filters categories={categories} defaults={state} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}