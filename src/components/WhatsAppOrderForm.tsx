"use client";
import { DEFAULT_WHATSAPP, whatsappLink } from "@/lib/whatsapp";
import type { Product } from "@/data/store";

export default function WhatsAppOrderForm({ product }: { product: Product }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const model = (new FormData(form).get("model")?.toString() || "").trim();
        const size = (new FormData(form).get("size")?.toString() || "").trim();
        const extras = (new FormData(form).getAll("extras") || []).join(", ");
        const text = `Oi Susi! Quero esse produto: ${product.title}${model ? ", modelo " + model : ""}${size ? ", tamanho " + size : ""}${extras ? ", adicionais: " + extras : ""}`;
        const url = whatsappLink(DEFAULT_WHATSAPP, text);
        window.open(url, "_blank");
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm">Modelo</label>
          <select name="model" className="mt-1 w-full input">
            {(product.variations?.models || ["Único"]).map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm">Tamanho</label>
          <select name="size" className="mt-1 w-full input">
            {(product.variations?.sizes || ["Único"]).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm">Adicionais</label>
        <div className="mt-1 grid grid-cols-2 gap-2">
          {(product.variations?.extras || []).map((e) => (
            <label key={e} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="extras" value={e} />
              {e}
            </label>
          ))}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Pedir pelo WhatsApp</button>
    </form>
  );
}
