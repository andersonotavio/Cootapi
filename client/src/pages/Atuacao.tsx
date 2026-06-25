import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Leaf, Droplets } from "lucide-react";

const territories = [
  {
    name: "Vale do Sambito",
    color: "bg-blue-500",
    municipalities: ["Valença do Piauí", "Picos", "Fronteiras", "Pio IX", "Itainópolis", "Bocaina", "Sussuapara", "Aroazes", "Lagoa do Sítio", "Monsenhor Hipólito", "Padre Marcos", "Alagoinha do Piauí"],
    associations: 12,
    families: 850,
    projects: ["Viva o Semiárido (SEAF/FIDA)", "Cisternas de Placas (P1MC)", "Assistência Técnica ATER"],
    highlights: "Região com forte presença de quebradeiras de coco babaçu e agricultores familiares diversificados.",
  },
  {
    name: "Serra da Capivara",
    color: "bg-orange-500",
    municipalities: ["São Raimundo Nonato", "Coronel José Dias", "João Costa", "Brejo do Piauí", "Caracol", "Guaribas", "Jurema", "Anísio de Abreu", "Bonfim do Piauí", "Dirceu Arcoverde", "Fartura do Piauí", "São Braz do Piauí", "Várzea Branca"],
    associations: 13,
    families: 950,
    projects: ["Viva o Semiárido (SEAF/FIDA)", "Cisternas de Placas (P1MC)", "Criação de Caprinos e Ovinos"],
    highlights: "Território do semiárido piauiense com rica biodiversidade e tradição na criação de caprinos e ovinos.",
  },
];

const projects = [
  {
    name: "Viva o Semiárido",
    funder: "SEAF/FIDA",
    period: "2020–2025",
    description: "Projeto de apoio à elaboração de projetos e assessoria técnica sistemática para agricultores familiares nos territórios Vale do Sambito e Serra da Capivara.",
    icon: Leaf,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    name: "Cisternas de Placas (P1MC)",
    funder: "Ministério do Desenvolvimento Social",
    period: "2003–presente",
    description: "Construção de cisternas de placas para captação de água de chuva, garantindo o acesso à água para consumo humano de famílias rurais no semiárido.",
    icon: Droplets,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    name: "Coco Babaçu",
    funder: "Parceiros institucionais",
    period: "2015–presente",
    description: "Apoio à organização produtiva das quebradeiras de coco babaçu, incluindo construção de unidade de beneficiamento e capacitações.",
    icon: Users,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
];

export default function Atuacao() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cootapi-green py-20">
        <div className="container text-center text-white">
          <Badge className="bg-cootapi-yellow text-cootapi-green mb-4">Piauí</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossa Atuação</h1>
          <p className="text-xl text-green-200 max-w-2xl mx-auto">
            Presença ativa nos territórios do Piauí, com foco no semiárido piauiense e nas comunidades rurais que mais precisam de apoio técnico.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <Badge className="bg-cootapi-yellow text-cootapi-green mb-4">Mapa de Atuação</Badge>
              <h2 className="text-3xl font-bold text-cootapi-green mb-6">
                Territórios Atendidos no Piauí
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                A COOTAPI atua em todos os territórios do Estado do Piauí, com presença especialmente forte no semiárido piauiense. Os territórios Vale do Sambito e Serra da Capivara concentram a maior parte das nossas atividades.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="font-semibold text-blue-700">Vale do Sambito</span>
                  <span className="text-gray-500 text-sm ml-auto">12 associações</span>
                </div>
                <div className="flex items-center gap-3 bg-orange-50 rounded-lg px-4 py-3">
                  <div className="w-4 h-4 rounded-full bg-orange-500 flex-shrink-0" />
                  <span className="font-semibold text-orange-700">Serra da Capivara</span>
                  <span className="text-gray-500 text-sm ml-auto">13 associações</span>
                </div>
                <div className="flex items-center gap-3 bg-green-50 rounded-lg px-4 py-3">
                  <div className="w-4 h-4 rounded-full bg-cootapi-green flex-shrink-0" />
                  <span className="font-semibold text-cootapi-green">Teresina e região</span>
                  <span className="text-gray-500 text-sm ml-auto">Sede</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/manus-storage/Mapa_Atuacao_Cootapi_053b6441.jpg"
                alt="Mapa Situacional Área de Atuação COOTAPI"
                className="rounded-2xl shadow-xl max-w-full w-auto max-h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Territories Detail */}
      <section className="bg-cootapi-green-pale py-16">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Territórios</Badge>
            <h2 className="text-3xl font-bold text-cootapi-green">Detalhamento por Território</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {territories.map((territory) => (
              <Card key={territory.name} className="overflow-hidden">
                <div className={`${territory.color} h-2`} />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-cootapi-green" />
                    <h3 className="text-xl font-bold text-cootapi-green">{territory.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 italic">{territory.highlights}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-cootapi-green-pale rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-cootapi-green">{territory.associations}</div>
                      <div className="text-xs text-gray-600">Associações</div>
                    </div>
                    <div className="bg-cootapi-yellow/30 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-cootapi-green">{territory.families}+</div>
                      <div className="text-xs text-gray-600">Famílias Atendidas</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-cootapi-green mb-2 text-sm">Municípios Atendidos:</h4>
                    <div className="flex flex-wrap gap-1">
                      {territory.municipalities.map((m) => (
                        <Badge key={m} variant="secondary" className="text-xs bg-white border border-gray-200">
                          {m}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cootapi-green mb-2 text-sm">Projetos em Andamento:</h4>
                    <ul className="space-y-1">
                      {territory.projects.map((p) => (
                        <li key={p} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cootapi-green flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Projetos</Badge>
            <h2 className="text-3xl font-bold text-cootapi-green">Projetos em Destaque</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <Card key={project.name} className={`${project.bg} border-0 card-hover`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow`}>
                      <Icon className={`w-6 h-6 ${project.color}`} />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">{project.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">
                      <span className="font-medium">Financiador:</span> {project.funder} | <span className="font-medium">Período:</span> {project.period}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="bg-cootapi-yellow py-16">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="bg-cootapi-green text-white mb-3">Impacto</Badge>
            <h2 className="text-3xl font-bold text-cootapi-green">Nossos Resultados</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "634", label: "Cisternas Construídas", icon: "💧" },
              { value: "25+", label: "Associações Atendidas", icon: "🤝" },
              { value: "1.800+", label: "Famílias Beneficiadas", icon: "👨‍👩‍👧‍👦" },
              { value: "30+", label: "Municípios Atendidos", icon: "🗺️" },
            ].map((item) => (
              <div key={item.label} className="bg-white/80 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="text-3xl font-bold text-cootapi-green">{item.value}</div>
                <div className="text-sm text-gray-600 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cootapi-green-pale py-16">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Galeria</Badge>
            <h2 className="text-3xl font-bold text-cootapi-green">Atividades nas Comunidades</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "/manus-storage/ComemorandoachegadadaCisterna_35a5e2cc.JPG", alt: "Celebração da chegada da cisterna" },
              { src: "/manus-storage/Construindoacisternadeplacas_362e8c59.JPG", alt: "Construindo cisterna de placas" },
              { src: "/manus-storage/familianafrentedacisternaprojetoP1MCMDS_052759b2.jpg", alt: "Família na frente da cisterna" },
              { src: "/manus-storage/Criacaodecaprinos_3ed9481d.jpg", alt: "Criação de caprinos" },
              { src: "/manus-storage/Atividadenacomunidade1_9b8d7255.jpg", alt: "Atividade na comunidade" },
              { src: "/manus-storage/Discutindoprojetocomacomunidade_9353061d.jpg", alt: "Discussão de projeto" },
            ].map((img, i) => (
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
