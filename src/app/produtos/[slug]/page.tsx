import { getProductBySlug } from "@/data/store";
import ImageCarousel from "@/components/ImageCarousel";
import WhatsAppOrderForm from "@/components/WhatsAppOrderForm";

type Props = { params: { slug: string } };

export default async function Page({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) return <div>Produto não encontrado</div>;
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <ImageCarousel images={product.images || []} />
      </div>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
        <WhatsAppOrderForm product={product} />
      </div>
    </div>
  );
}