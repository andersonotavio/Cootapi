import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Youtube, ChevronDown, FileText } from "lucide-react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/contrate", label: "Contrate a COOTAPI" },
  { href: "/atuacao", label: "Atuação" },
  { href: "/noticias", label: "Notícias e Projetos" },
  { href: "/inscricao", label: "Seja Cooperado(a)" },
  { href: "/cooperado", label: "Área do Cooperado" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-cootapi-green text-white text-sm py-2 hidden md:block">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="mailto:cootapi@gmail.com" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
              <Mail className="w-3.5 h-3.5" />
              cootapi@gmail.com
            </a>
            <a href="tel:+5586999456187" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              (86) 99945-6187
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/cooperativacootapi/" target="_blank" rel="noopener noreferrer"
               className="hover:text-yellow-300 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
               className="hover:text-yellow-300 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/watch?v=1VAAxDFk6ls" target="_blank" rel="noopener noreferrer"
               className="hover:text-yellow-300 transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container flex items-center justify-between py-3">
          <Link href="/" className="flex items-center">
            <img
              src="/manus-storage/Logo_Cootapi_08f1a4db.webp"
              alt="COOTAPI"
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === link.href
                    ? "bg-cootapi-green text-white"
                    : "text-gray-700 hover:bg-cootapi-green-pale hover:text-cootapi-green"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-md text-cootapi-green hover:bg-cootapi-green-pale transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="container py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    location === link.href
                      ? "bg-cootapi-green text-white"
                      : "text-gray-700 hover:bg-cootapi-green-pale hover:text-cootapi-green"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-cootapi-green text-white">
        <div className="container py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img
              src="/manus-storage/Logo_Cootapi_08f1a4db.webp"
              alt="COOTAPI"
              className="h-16 w-auto mb-4 bg-white rounded-lg p-2"
            />
            <p className="text-green-200 text-sm leading-relaxed">
              Fortalecendo a agricultura familiar desde 1994. Assessoria técnica, extensão rural e desenvolvimento sustentável no Piauí.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-yellow-300 mb-4 text-sm uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-green-200 hover:text-yellow-300 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Relatórios */}
          <div>
            <h4 className="font-bold text-yellow-300 mb-4 text-sm uppercase tracking-wider">Relatórios Anuais</h4>
            <ul className="space-y-2">
              {[2023, 2022, 2021, 2020, 2019].map((year) => (
                <li key={year}>
                  <a
                    href={`/documentos/relatorio-${year}`}
                    className="flex items-center gap-2 text-green-200 hover:text-yellow-300 transition-colors text-sm"
                  >
                    <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                    Relatório {year}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-yellow-300 mb-4 text-sm uppercase tracking-wider">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-green-200 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-300" />
                <span>Rua 19 de Novembro, 1980<br />Bairro Primavera Norte<br />Teresina - PI, CEP: 64.002-585</span>
              </li>
              <li>
                <a href="mailto:cootapi@gmail.com" className="flex items-center gap-2 text-green-200 hover:text-yellow-300 transition-colors text-sm">
                  <Mail className="w-4 h-4 text-yellow-300" />
                  cootapi@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+5586999456187" className="flex items-center gap-2 text-green-200 hover:text-yellow-300 transition-colors text-sm">
                  <Phone className="w-4 h-4 text-yellow-300" />
                  (86) 99945-6187
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.instagram.com/cooperativacootapi/" target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-cootapi-green transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-cootapi-green transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/watch?v=1VAAxDFk6ls" target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-cootapi-green transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Filiações */}
        <div className="border-t border-green-700">
          <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-green-300">
            <p>Filiada: OCB · UNICAFES · UNISOL Brasil · UNISOL Piauí</p>
            <p>SIATER nº 161/12-2010 · ANATER nº 13714-186</p>
            <p>© {new Date().getFullYear()} COOTAPI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/5586999456187?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20COOTAPI."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
