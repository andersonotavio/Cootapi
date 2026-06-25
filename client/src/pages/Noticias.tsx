import { useState } from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Search, Calendar, ArrowRight, BookOpen, Newspaper } from "lucide-react";

const CATEGORIES = [
  { value: "all", label: "Todas" },
  { value: "noticia", label: "Notícias" },
  { value: "projeto", label: "Projetos" },
  { value: "materia", label: "Matérias" },
];

const staticGallery = [
  { src: "/manus-storage/GrupocomfaixadaCOOTAPI_a0d7cfd5.JPG", alt: "Grupo com faixa COOTAPI - 30 anos" },
  { src: "/manus-storage/ComemorandoachegadadaCisterna_35a5e2cc.JPG", alt: "Celebração da chegada da cisterna" },
  { src: "/manus-storage/Discutindoprojetocomacomunidade_9353061d.jpg", alt: "Discussão de projeto com a comunidade" },
  { src: "/manus-storage/Quebradeirasdecocos_c570e332.jpg", alt: "Quebradeiras de cocos" },
  { src: "/manus-storage/eventocootapi_mistica_a121617e.jpg", alt: "Evento COOTAPI - Mística" },
  { src: "/manus-storage/misticanacomundade_9a3ab18b.jpg", alt: "Mística na comunidade" },
  { src: "/manus-storage/reuniaocomacomunidade_6f9e1e24.jpg", alt: "Reunião com a comunidade" },
  { src: "/manus-storage/ReuniaoCootapi_a9d218dc.jpg", alt: "Reunião COOTAPI" },
  { src: "/manus-storage/Atividadenacomunidade1_9b8d7255.jpg", alt: "Atividade na comunidade" },
  { src: "/manus-storage/familianafrentedacisternaprojetoP1MCMDS_052759b2.jpg", alt: "Família na frente da cisterna" },
  { src: "/manus-storage/Criacaodecaprinos_3ed9481d.jpg", alt: "Criação de caprinos" },
  { src: "/manus-storage/Construindoacisternadeplacas_362e8c59.JPG", alt: "Construindo cisterna de placas" },
];

const staticNews = [
  {
    id: "n1",
    title: "COOTAPI celebra 30 anos de fortalecimento da agricultura familiar no Piauí",
    category: "noticia",
    date: "Outubro 2024",
    summary: "Em 2024, a cooperativa completou três décadas de atuação junto às comunidades rurais do Piauí, marcadas por projetos transformadores e pelo fortalecimento de centenas de famílias agricultoras.",
    img: "/manus-storage/GrupocomfaixadaCOOTAPI_a0d7cfd5.JPG",
  },
  {
    id: "n2",
    title: "Projeto Viva o Semiárido beneficia famílias nos territórios Vale do Sambito e Serra da Capivara",
    category: "projeto",
    date: "Agosto 2024",
    summary: "Iniciativa do SEAF/FIDA apoia a elaboração de projetos e assessoria técnica sistemática para agricultores familiares, fortalecendo a produção e a organização social.",
    img: "/manus-storage/familianafrentedacisternaprojetoP1MCMDS_052759b2.jpg",
  },
  {
    id: "n3",
    title: "Mulheres quebradeiras de coco babaçu fortalecem organização produtiva",
    category: "projeto",
    date: "Junho 2024",
    summary: "Projeto apoia a construção de unidade de beneficiamento e capacitações em gestão, saúde e boas práticas para as quebradeiras de coco babaçu do Piauí.",
    img: "/manus-storage/Quebradeirasdecocos_c570e332.jpg",
  },
  {
    id: "n4",
    title: "COOTAPI constrói mais de 634 cisternas de placas no semiárido piauiense",
    category: "projeto",
    date: "Março 2024",
    summary: "Desde o início do Programa Um Milhão de Cisternas no Piauí, a COOTAPI já construiu mais de 634 cisternas, garantindo acesso à água para famílias rurais.",
    img: "/manus-storage/ComemorandoachegadadaCisterna_35a5e2cc.JPG",
  },
  {
    id: "n5",
    title: "Capacitação em agroecologia reúne agricultores nos territórios de atuação",
    category: "noticia",
    date: "Fevereiro 2024",
    summary: "Oficinas de produção agroecológica e manejo sustentável foram realizadas com agricultores e agricultoras dos territórios Vale do Sambito e Serra da Capivara.",
    img: "/manus-storage/reuniaocomacomunidade_6f9e1e24.jpg",
  },
  {
    id: "n6",
    title: "COOTAPI participa de assembleia da UNICAFES Piauí",
    category: "noticia",
    date: "Janeiro 2024",
    summary: "Representantes da cooperativa participaram da assembleia estadual da UNICAFES, fortalecendo as articulações com o cooperativismo da agricultura familiar.",
    img: "/manus-storage/ReuniaoCootapi_a9d218dc.jpg",
  },
];

export default function Noticias() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { data: dbNews } = trpc.news.list.useQuery({ limit: 20, published: true });

  const allNews = dbNews && dbNews.length > 0 ? dbNews.map((n) => ({
    id: String(n.id),
    title: n.title,
    category: n.category,
    date: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString("pt-BR", { month: "long", year: "numeric" }) : "",
    summary: n.summary ?? "",
    img: n.imageUrl ?? "",
    slug: n.slug,
  })) : staticNews;

  const filtered = allNews.filter((item) => {
    const matchCat = category === "all" || item.category === category;
    const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-cootapi-green py-20">
        <div className="container text-center text-white">
          <Badge className="bg-cootapi-yellow text-cootapi-green mb-4">Notícias</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notícias e Projetos</h1>
          <p className="text-xl text-green-200 max-w-2xl mx-auto">
            Acompanhe as atividades, projetos e conquistas da COOTAPI e das comunidades que atendemos.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-8 border-b">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar notícias..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat.value}
                  variant={category === cat.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(cat.value)}
                  className={category === cat.value ? "bg-cootapi-green text-white" : "border-cootapi-green text-cootapi-green"}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="bg-cootapi-green-pale py-16">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Nenhuma notícia encontrada.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <Card key={item.id} className="h-full card-hover overflow-hidden">
                  {item.img && (
                    <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                  )}
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-cootapi-green-pale text-cootapi-green text-xs">
                        {item.category === "noticia" ? "Notícia" : item.category === "projeto" ? "Projeto" : "Matéria"}
                      </Badge>
                      {item.date && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-cootapi-green mb-2 line-clamp-2">{item.title}</h3>
                    {item.summary && <p className="text-gray-600 text-sm line-clamp-3">{item.summary}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Book Section */}
      <section className="bg-cootapi-green py-16" id="livro">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-cootapi-yellow text-cootapi-green mb-4">Publicação Especial</Badge>
              <h2 className="text-3xl font-bold mb-4">Livro dos 30 Anos da COOTAPI</h2>
              <p className="text-green-200 leading-relaxed mb-4">
                Em 2024, a COOTAPI lançou um livro comemorativo que narra a história da cooperativa, os projetos realizados, os impactos alcançados e os desafios superados ao longo de três décadas de trabalho junto às comunidades rurais do Piauí.
              </p>
              <p className="text-green-200 leading-relaxed mb-6">
                A publicação reúne depoimentos de cooperados, parceiros e beneficiários, além de registros fotográficos das atividades nas comunidades.
              </p>
              <Button className="bg-cootapi-yellow text-cootapi-green hover:bg-yellow-400">
                <BookOpen className="w-4 h-4 mr-2" />
                Em breve disponível para download
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/10 rounded-2xl p-8 text-center text-white max-w-xs">
                <BookOpen className="w-24 h-24 mx-auto mb-4 text-cootapi-yellow" />
                <h3 className="text-xl font-bold mb-2">30 Anos COOTAPI</h3>
                <p className="text-green-200 text-sm">Fortalecendo a Agricultura Familiar desde 1994</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white py-16" id="galeria">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Galeria</Badge>
            <h2 className="text-3xl font-bold text-cootapi-green">Fotos das Atividades</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {staticGallery.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl aspect-square">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
