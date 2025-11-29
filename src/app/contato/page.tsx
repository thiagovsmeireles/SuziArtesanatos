import { DEFAULT_WHATSAPP, whatsappLink } from "@/lib/whatsapp";

export default function Page() {
  const wa = whatsappLink(DEFAULT_WHATSAPP, "Oi Susi! Quero fazer um pedido.");
  const maps = "https://maps.app.goo.gl/dmbcXeHabQL8wBFb7";
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Contato</h1>
      <div className="space-y-4">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="btn rounded-full px-4 py-2 bg-green-600 text-white hover:bg-green-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5" aria-hidden="true">
            <path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.671.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.521-.075-.149-.671-1.612-.921-2.206-.242-.579-.487-.5-.671-.51-.173-.01-.372-.01-.571-.01-.198 0-.521.074-.793.372-.272.297-1.043 1.02-1.043 2.48 0 1.46 1.068 2.875 1.219 3.074.149.198 2.104 3.21 5.102 4.496.714.308 1.27.492 1.705.63.716.227 1.37.195 1.887.118.576-.086 1.758-.719 2.006-1.414.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.617h-.003a9.86 9.86 0 01-5.031-1.378l-.36-.214-3.741.982 1.002-3.648-.235-.374a9.86 9.86 0 01-1.51-5.268c.001-5.45 4.435-9.884 9.885-9.884 2.64 0 5.111 1.03 6.962 2.89a9.821 9.821 0 012.922 6.994c-.003 5.449-4.437 9.882-9.891 9.882M20.52 3.48A11.816 11.816 0 0012.003 0C5.374 0 .003 5.371 0 12a11.9 11.9 0 001.623 6.01L0 24l6.173-1.61A11.86 11.86 0 0012.004 24c6.627 0 12-5.373 12-12a11.82 11.82 0 00-3.484-8.52z"/>
          </svg>
          WhatsApp
        </a>
        <a
          href="https://www.instagram.com/susi_artesanatos12/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn rounded-full px-4 py-2 bg-pink-600 text-white hover:bg-pink-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm11 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
          </svg>
          Instagram
        </a>
      </div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">Localização</div>
        </div>
        <div className="card-body">
          <a href={maps} target="_blank" rel="noopener noreferrer" className="btn-secondary rounded-full px-4 py-2">Abrir no Google Maps</a>
        </div>
      </div>
    </div>
  );
}
