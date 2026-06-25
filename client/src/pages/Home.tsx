import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Users, Calendar, MapPin, Leaf, Handshake, BookOpen, ChevronLeft, ChevronRight, Play, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";

const heroSlides = [
  {
    image: "/manus-storage/GrupocomfaixadaCOOTAPI_a0d7cfd5.JPG",
    title: "Fortalecendo a Agricultura Familiar desde 1994",
    subtitle: "Assessoria técnica, capacitação e projetos especializados para transformar a vida das famílias agricultoras do Piauí.",
  },
  {
    image: "/manus-storage/ComemorandoachegadadaCisterna_35a5e2cc.JPG",
    title: "Tecnologias Sociais que Transformam Vidas",
    subtitle: "Cisternas, sistemas de produção e infraestrutura rural que garantem água e dignidade para as famílias do semiárido.",
  },
  {
    image: "/manus-storage/misticanacomundade_9a3ab18b.jpg",
    title: "Comunidade, Solidariedade e Desenvolvimento",
    subtitle: "Trabalhamos junto às comunidades rurais, respeitando seus saberes e fortalecendo sua organização coletiva.",
  },
];

const impactNumbers = [
  { value: "30+", label: "Anos de Atuação", icon: Calendar, color: "bg-cootapi-green" },
  { value: "35", label: "Cooperados Ativos", icon: Users, color: "bg-cootapi-yellow-dark" },
  { value: "634", label: "Cisternas Construídas", icon: Leaf, color: "bg-cootapi-green-mid" },
  { value: "23+", label: "Associações Atendidas", icon: Handshake, color: "bg-cootapi-green-light" },
];

const services = [
  {
    icon: "🌱",
    title: "Assistência Técnica",
    description: "Apoio direto ao produtor rural no manejo das plantações, criações e administração financeira.",
    href: "/contrate#assistencia",
  },
  {
    icon: "📚",
    title: "Capacitação",
    description: "Cursos, palestras e formações em novas técnicas, tecnologias e práticas sustentáveis.",
    href: "/contrate#capacitacao",
  },
  {
    icon: "🌿",
    title: "Gestão Ambiental",
    description: "Licenciamento ambiental, CAR, ICMS ecológico e adequação às leis de proteção ao meio ambiente.",
    href: "/contrate#ambiental",
  },
  {
    icon: "📐",
    title: "Topografia",
    description: "Levantamentos topográficos, georreferenciamento e mapeamento de propriedades rurais.",
    href: "/contrate#topografia",
  },
  {
    icon: "📋",
    title: "Projetos Agropecuários",
    description: "Planejamento técnico e financeiro para obtenção de crédito rural e financiamentos.",
    href: "/contrate#projetos",
  },
  {
    icon: "🏛️",
    title: "Regularização",
    description: "CCIR, ITR, avaliação de imóveis rurais, laudos e perícias técnicas.",
    href: "/contrate#regularizacao",
  },
];

const galleryImages = [
  { src: "/manus-storage/Atividadenacomunidade1_9b8d7255.jpg", alt: "Atividade na comunidade" },
  { src: "/manus-storage/Discutindoprojetocomacomunidade_9353061d.jpg", alt: "Discussão de projeto com a comunidade" },
  { src: "/manus-storage/Quebradeirasdecocos_c570e332.jpg", alt: "Quebradeiras de cocos" },
  { src: "/manus-storage/eventocootapi_mistica_a121617e.jpg", alt: "Evento COOTAPI" },
  { src: "/manus-storage/Construindoacisternadeplacas_362e8c59.JPG", alt: "Construindo cisterna de placas" },
  { src: "/manus-storage/familianafrentedacisternaprojetoP1MCMDS_052759b2.jpg", alt: "Família na frente da cisterna" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: latestNews } = trpc.news.list.useQuery({ limit: 3, published: true });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="hero-overlay absolute inset-0" />
          </div>
        ))}

        <div className="relative z-10 h-full flex items-center">
          <div className="container">
            <div className="max-w-2xl text-white">
              <Badge className="bg-cootapi-yellow text-cootapi-green font-semibold mb-4">
                Cooperativa desde 1994
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contrate">
                  <Button size="lg" className="bg-cootapi-yellow text-cootapi-green hover:bg-yellow-400 font-semibold">
                    Contrate Nossos Serviços
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/quem-somos">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 bg-white/10">
                    Conheça a COOTAPI
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slider controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlide ? "bg-yellow-400 w-6" : "bg-white/60"}`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactNumbers.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className={`${item.color} text-white rounded-2xl p-6 text-center card-hover`}>
                  <Icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <div className="text-3xl md:text-4xl font-bold mb-1">{item.value}</div>
                  <div className="text-sm opacity-90">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-cootapi-green-pale py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-cootapi-yellow text-cootapi-green mb-4">Nossa Missão</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-cootapi-green mb-6">
                Transformando Vidas no Campo Piauiense
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                A COOTAPI é uma cooperativa de técnicos que atua desde 1994 no fortalecimento da agricultura familiar no Piauí, por meio de assessoria, assistência técnica, elaboração de projetos, mobilização social, agroecologia e desenvolvimento rural sustentável.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Nossa missão é garantir o exercício profissional dos nossos cooperados e cooperadas por meio da prestação de serviços aos agricultores e agricultoras familiares, priorizando a promoção do desenvolvimento sustentável como um processo amplo de mudança e de elevação de oportunidades sociais.
              </p>
              <Link href="/quem-somos">
                <Button className="bg-cootapi-green hover:bg-cootapi-green-mid text-white">
                  Nossa História
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/manus-storage/ReuniaoCootapi_a9d218dc.jpg"
                alt="Reunião COOTAPI"
                className="rounded-2xl object-cover h-48 w-full shadow-lg"
              />
              <img
                src="/manus-storage/reuniaocomacomunidade_6f9e1e24.jpg"
                alt="Reunião com a comunidade"
                className="rounded-2xl object-cover h-48 w-full shadow-lg mt-8"
              />
              <img
                src="/manus-storage/Criacaodecaprinos_3ed9481d.jpg"
                alt="Criação de caprinos"
                className="rounded-2xl object-cover h-48 w-full shadow-lg"
              />
              <img
                src="/manus-storage/Construindoacisternadeplacas_362e8c59.JPG"
                alt="Construindo cisterna"
                className="rounded-2xl object-cover h-48 w-full shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Nossos Serviços</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-cootapi-green">
              Como a COOTAPI Pode Ajudar Você
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Oferecemos uma gama completa de serviços técnicos para fortalecer a agricultura familiar e o desenvolvimento rural sustentável.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.href}>
                <Card className="h-full card-hover cursor-pointer border-2 hover:border-cootapi-green transition-colors">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-lg font-bold text-cootapi-green mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/contrate">
              <Button size="lg" className="bg-cootapi-green hover:bg-cootapi-green-mid text-white">
                Ver Todos os Serviços
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Atuação Section */}
      <section className="bg-cootapi-yellow py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/manus-storage/Mapa_Atuacao_Cootapi_053b6441.jpg"
                alt="Mapa de Atuação COOTAPI"
                className="rounded-2xl shadow-xl w-full max-w-sm mx-auto"
              />
            </div>
            <div>
              <Badge className="bg-cootapi-green text-white mb-4">Onde Atuamos</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-cootapi-green mb-6">
                Presença em Todo o Piauí
              </h2>
              <p className="text-gray-800 text-lg leading-relaxed mb-6">
                A COOTAPI atua em todos os territórios do Estado do Piauí, com destaque para o Semiárido piauiense, incluindo os territórios Vale do Sambito e Serra da Capivara.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { name: "Vale do Sambito", desc: "12 associações atendidas" },
                  { name: "Serra da Capivara", desc: "13 associações atendidas" },
                  { name: "Teresina e região", desc: "Sede e atendimento regional" },
                ].map((territory) => (
                  <div key={territory.name} className="flex items-center gap-3 bg-white/60 rounded-lg px-4 py-3">
                    <MapPin className="w-5 h-5 text-cootapi-green flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-cootapi-green">{territory.name}</span>
                      <span className="text-gray-600 text-sm ml-2">— {territory.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/atuacao">
                <Button className="bg-cootapi-green hover:bg-cootapi-green-mid text-white">
                  Ver Mapa Completo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-cootapi-green py-16">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Nossa História</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              30 Anos Transformando o Campo
            </h2>
            <p className="text-green-200 max-w-2xl mx-auto">
              Conheça a trajetória da COOTAPI e o impacto do nosso trabalho junto às famílias agricultoras do Piauí.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <iframe
                src="https://www.youtube.com/embed/1VAAxDFk6ls"
                title="História da COOTAPI - 30 Anos"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Galeria</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-cootapi-green">
              Nossas Atividades nas Comunidades
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl aspect-square card-hover">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/noticias#galeria">
              <Button variant="outline" size="lg" className="border-cootapi-green text-cootapi-green hover:bg-cootapi-green hover:text-white">
                Ver Galeria Completa
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-cootapi-green-pale py-16">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Notícias</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-cootapi-green">
              Últimas Notícias e Projetos
            </h2>
          </div>
          {latestNews && latestNews.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {latestNews.map((item) => (
                <Link key={item.id} href={`/noticias/${item.slug}`}>
                  <Card className="h-full card-hover cursor-pointer overflow-hidden">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                    )}
                    <CardContent className="p-5">
                      <Badge className="mb-2 bg-cootapi-green-pale text-cootapi-green text-xs">
                        {item.category === "noticia" ? "Notícia" : item.category === "projeto" ? "Projeto" : "Matéria"}
                      </Badge>
                      <h3 className="font-bold text-cootapi-green mb-2 line-clamp-2">{item.title}</h3>
                      {item.summary && <p className="text-gray-600 text-sm line-clamp-3">{item.summary}</p>}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "COOTAPI celebra 30 anos de fortalecimento da agricultura familiar",
                  category: "noticia",
                  summary: "Em 2024, a cooperativa completou três décadas de atuação junto às comunidades rurais do Piauí, marcadas por projetos transformadores.",
                  img: "/manus-storage/GrupocomfaixadaCOOTAPI_a0d7cfd5.JPG",
                },
                {
                  title: "Projeto Viva o Semiárido beneficia famílias nos territórios Vale do Sambito e Serra da Capivara",
                  category: "projeto",
                  summary: "Iniciativa do SEAF/FIDA apoia a elaboração de projetos e assessoria técnica sistemática para agricultores familiares.",
                  img: "/manus-storage/familianafrentedacisternaprojetoP1MCMDS_052759b2.jpg",
                },
                {
                  title: "Mulheres quebradeiras de coco babaçu fortalecem organização produtiva",
                  category: "projeto",
                  summary: "Projeto apoia a construção de unidade de beneficiamento e capacitações em gestão, saúde e boas práticas.",
                  img: "/manus-storage/Quebradeirasdecocos_c570e332.jpg",
                },
              ].map((item, i) => (
                <Card key={i} className="h-full card-hover overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                  <CardContent className="p-5">
                    <Badge className="mb-2 bg-cootapi-green-pale text-cootapi-green text-xs">
                      {item.category === "noticia" ? "Notícia" : "Projeto"}
                    </Badge>
                    <h3 className="font-bold text-cootapi-green mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{item.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link href="/noticias">
              <Button className="bg-cootapi-green hover:bg-cootapi-green-mid text-white">
                Ver Todas as Notícias
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Instagram className="w-6 h-6 text-pink-500" />
              <Badge className="bg-pink-100 text-pink-700">Instagram</Badge>
            </div>
            <h2 className="text-3xl font-bold text-cootapi-green">
              Siga-nos no Instagram
            </h2>
            <p className="text-gray-600 mt-2">
              Acompanhe nossas atividades em tempo real em{" "}
              <a
                href="https://www.instagram.com/cooperativacootapi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 font-semibold hover:underline"
              >
                @cooperativacootapi
              </a>
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href="https://www.instagram.com/cooperativacootapi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-shadow"
            >
              <Instagram className="w-6 h-6" />
              Ver nosso perfil no Instagram
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cootapi-green py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quer Contratar Nossos Serviços?
          </h2>
          <p className="text-green-200 text-lg mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como a COOTAPI pode apoiar o desenvolvimento da sua propriedade ou comunidade.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contrate">
              <Button size="lg" className="bg-cootapi-yellow text-cootapi-green hover:bg-yellow-400 font-semibold">
                Solicitar Serviço
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/inscricao">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 bg-white/10">
                Seja Cooperado(a)
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
