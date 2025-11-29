import Link from "next/link";
import type { Product } from "@/data/store";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produtos/${product.slug}`} className="card block">
      <div className="card-body">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.title} className="aspect-square w-full rounded object-cover" />
        ) : (
          <div className="aspect-square w-full rounded bg-brand-rose/30" />
        )}
        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <div className="text-sm text-gray-500">A partir de</div>
            <div className="text-lg font-semibold">R$ {product.priceFrom}</div>
          </div>
          <div className="text-sm font-medium">{product.title}</div>
        </div>
      </div>
    </Link>
  );
}