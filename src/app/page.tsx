import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { DEFAULT_WHATSAPP, whatsappLink } from "@/lib/whatsapp";
import { getProducts } from "@/data/store";
import Hero from "@/components/Hero";

export default async function Page() {
  const text = "Peça pelo WhatsApp";
  const url = whatsappLink(DEFAULT_WHATSAPP, "Oi Susi! Quero ver seus artesanatos.");
  const list = await getProducts(true);
  const featured = list.filter((p) => p.popular);
  return (
    <div className="space-y-10">
      <Hero title="Tapetes, amigurumis e mais" subtitle="Feitos à mão com carinho" ctaText={text} ctaHref={url} />
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Destaques</h2>
          <Link href="/produtos" className="text-brand-purple">Ver todos</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}