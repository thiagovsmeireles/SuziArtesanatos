import Button from "@/components/ui/Button";

type Props = {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
};

export default function Hero({ title, subtitle, ctaText, ctaHref }: Props) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-rose/60 via-brand-yellow/40 to-brand-purple/50 p-6 md:p-10">
      <div className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        {subtitle ? <p className="mt-2 text-base md:text-lg text-gray-800">{subtitle}</p> : null}
        <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="inline-block mt-6">
          <Button variant="primary" size="md">{ctaText}</Button>
        </a>
      </div>
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-xl" />
      <div className="pointer-events-none absolute -left-6 -bottom-6 h-32 w-32 rounded-full bg-white/20 blur-lg" />
    </section>
  );
}