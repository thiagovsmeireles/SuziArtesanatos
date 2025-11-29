"use client";
import { useRef } from "react";
import type { Category } from "@/data/store";
type Props = {
  categories: Category[];
  defaults?: { category?: string; sort?: string; min?: number; max?: number };
};

export default function Filters({ categories, defaults }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const submit = () => formRef.current?.requestSubmit();
  return (
    <form ref={formRef} method="GET" className="card">
      <div className="card-body grid grid-cols-1 gap-4 sm:grid-cols-5">
      <select name="category" defaultValue={defaults?.category || ""} className="input" onChange={submit}>
        <option value="">Todas as categorias</option>
        {categories.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <select name="sort" defaultValue={defaults?.sort || "popular"} className="input" onChange={submit}>
        <option value="popular">Popularidade</option>
        <option value="price-asc">Preço: menor primeiro</option>
        <option value="price-desc">Preço: maior primeiro</option>
      </select>
      <input
        name="min"
        type="number"
        placeholder="Preço mínimo"
        defaultValue={defaults?.min ?? ""}
        className="input"
        onBlur={submit}
      />
      <input
        name="max"
        type="number"
        placeholder="Preço máximo"
        defaultValue={defaults?.max ?? ""}
        className="input"
        onBlur={submit}
      />
      <button className="btn btn-primary">Filtrar</button>
      </div>
    </form>
  );
}