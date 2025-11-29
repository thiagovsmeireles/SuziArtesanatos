export function whatsappLink(number: string, text: string) {
  const normalized = number.replace(/[^0-9]/g, "");
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${normalized}?text=${encoded}`;
}

export const DEFAULT_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5561993237606";