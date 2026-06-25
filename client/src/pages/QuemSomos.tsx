import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Users, Leaf, Award, Building2, Globe } from "lucide-react";

const timeline = [
  { year: "1994", title: "Fundação da COOTAPI", desc: "A cooperativa é fundada em Teresina-PI por um grupo de técnicos comprometidos com o desenvolvimento rural sustentável." },
  { year: "1998", title: "Primeiros Projetos de Cisternas", desc: "Início dos projetos de construção de cisternas de placas no semiárido piauiense, beneficiando famílias com acesso à água." },
  { year: "2003", title: "Expansão para o Semiárido", desc: "Ampliação da atuação para os territórios Vale do Sambito e Serra da Capivara, fortalecendo a presença no semiárido." },
  { year: "2010", title: "Projeto P1MC no Piauí", desc: "Participação no Programa Um Milhão de Cisternas, construindo centenas de cisternas para famílias rurais." },
  { year: "2015", title: "Filiação à OCB e UNICAFES", desc: "Fortalecimento institucional com a filiação às principais organizações cooperativistas do Brasil." },
  { year: "2020", title: "Projeto Viva o Semiárido", desc: "Início do projeto SEAF/FIDA, apoiando agricultores familiares nos territórios de atuação." },
  { year: "2024", title: "30 Anos de Impacto", desc: "Celebração dos 30 anos com mais de 634 cisternas construídas, 35 cooperados ativos e 23 associações atendidas." },
];

const affiliations = [
  { name: "OCB", fullName: "Organização das Cooperativas Brasileiras", icon: Building2, desc: "Filiação à principal entidade representativa do cooperativismo no Brasil." },
  { name: "UNICAFES", fullName: "União Nacional das Cooperativas da Agricultura Familiar e Economia Solidária", icon: Users, desc: "Integração à rede nacional de cooperativas da agricultura familiar." },
  { name: "UNISOL", fullName: "Central de Cooperativas e Empreendimentos Solidários", icon: Globe, desc: "Articulação com a central de empreendimentos da economia solidária." },
];

const team = [
  { area: "Agronomia", count: 8, icon: "🌱" },
  { area: "Medicina Veterinária", count: 4, icon: "🐄" },
  { area: "Engenharia Civil", count: 3, icon: "🏗️" },
  { area: "Topografia", count: 3, icon: "📐" },
  { area: "Ciências Sociais", count: 4, icon: "👥" },
  { area: "Gestão Ambiental", count: 3, icon: "🌿" },
  { area: "Administração Rural", count: 5, icon: "📊" },
  { area: "Outras Áreas", count: 5, icon: "🎓" },
];

export default function QuemSomos() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-cootapi-green py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/manus-storage/GrupocomfaixadaCOOTAPI_a0d7cfd5.JPG" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center text-white">
          <Badge className="bg-cootapi-yellow text-cootapi-green mb-4">Desde 1994</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quem Somos</h1>
          <p className="text-xl text-green-200 max-w-2xl mx-auto">
            Conheça a história, a missão e as pessoas que fazem a COOTAPI transformar vidas no campo piauiense.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-cootapi-green">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-cootapi-green mb-3">Missão</h3>
                <p className="text-gray-600 leading-relaxed">
                  Garantir o exercício profissional dos cooperados por meio da prestação de serviços aos agricultores e agricultoras familiares, priorizando o desenvolvimento sustentável como processo de elevação de oportunidades sociais.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-cootapi-yellow-dark">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">🔭</div>
                <h3 className="text-xl font-bold text-cootapi-green mb-3">Visão</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ser reconhecida como uma cooperativa de referência no Nordeste brasileiro na prestação de serviços de assistência técnica e extensão rural, contribuindo para a soberania alimentar e a sustentabilidade das famílias agricultoras.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-cootapi-green-mid">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">💚</div>
                <h3 className="text-xl font-bold text-cootapi-green mb-3">Valores</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Solidariedade e cooperação</li>
                  <li>• Compromisso com as comunidades</li>
                  <li>• Ética e transparência</li>
                  <li>• Sustentabilidade ambiental</li>
                  <li>• Equidade de gênero e raça</li>
                  <li>• Valorização dos saberes locais</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Text */}
      <section className="bg-cootapi-green-pale py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-cootapi-yellow text-cootapi-green mb-4">Nossa História</Badge>
              <h2 className="text-3xl font-bold text-cootapi-green mb-6">
                Três Décadas Fortalecendo a Agricultura Familiar
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  A COOTAPI — Cooperativa de Trabalho dos Técnicos em Agropecuária do Piauí — foi fundada em 1994 em Teresina, Piauí, por um grupo de profissionais comprometidos com o desenvolvimento rural sustentável e o fortalecimento da agricultura familiar.
                </p>
                <p>
                  Ao longo de mais de 30 anos, a cooperativa construiu uma trajetória marcada pela presença ativa nas comunidades rurais, pelo respeito aos saberes tradicionais e pela adoção de tecnologias sociais que transformam a realidade das famílias agricultoras.
                </p>
                <p>
                  Com uma equipe multidisciplinar de 35 cooperados e cooperadas, a COOTAPI atua em todos os territórios do Estado do Piauí, com destaque para o semiárido piauiense, onde o acesso à água, à terra e ao crédito são desafios centrais para as famílias rurais.
                </p>
                <p>
                  Nossa atuação abrange desde a assessoria técnica individual às famílias até a elaboração de projetos complexos, passando pela mobilização social, capacitação, gestão ambiental e regularização fundiária.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <img
                src="/manus-storage/eventocootapi_mistica_a121617e.jpg"
                alt="Evento COOTAPI"
                className="rounded-2xl w-full h-64 object-cover shadow-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/manus-storage/Discutindoprojetocomacomunidade_9353061d.jpg"
                  alt="Capacitação COOTAPI"
                  className="rounded-xl w-full h-40 object-cover shadow"
                />
                <img
                  src="/manus-storage/misticanacomundade_9a3ab18b.jpg"
                  alt="Mística na comunidade"
                  className="rounded-xl w-full h-40 object-cover shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Vídeo Institucional</Badge>
            <h2 className="text-3xl font-bold text-cootapi-green mb-3">
              A História da COOTAPI em Imagens
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Assista ao documentário que conta a trajetória de 30 anos da cooperativa e o impacto do nosso trabalho nas comunidades do Piauí.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <iframe
                src="https://www.youtube.com/embed/1VAAxDFk6ls"
                title="História da COOTAPI - 30 Anos de Atuação"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cootapi-green-pale py-16">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Linha do Tempo</Badge>
            <h2 className="text-3xl font-bold text-cootapi-green">Nossa Trajetória</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-cootapi-green/30" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div key={i} className="relative flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-cootapi-green text-white flex items-center justify-center font-bold text-sm z-10">
                      {item.year}
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-5 shadow-sm">
                      <h3 className="font-bold text-cootapi-green mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Nossa Equipe</Badge>
            <h2 className="text-3xl font-bold text-cootapi-green mb-3">
              35 Profissionais Multidisciplinares
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa equipe é formada por profissionais de diversas áreas do conhecimento, todos comprometidos com o desenvolvimento rural sustentável.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((item) => (
              <Card key={item.area} className="text-center card-hover">
                <CardContent className="p-5">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-2xl font-bold text-cootapi-green">{item.count}</div>
                  <div className="text-sm text-gray-600">{item.area}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section className="bg-cootapi-yellow py-16">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-cootapi-green text-white mb-3">Filiações Institucionais</Badge>
            <h2 className="text-3xl font-bold text-cootapi-green mb-3">
              Integrados ao Cooperativismo Brasileiro
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {affiliations.map((aff) => {
              const Icon = aff.icon;
              return (
                <Card key={aff.name} className="bg-white/80">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-cootapi-green flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-cootapi-green text-lg">{aff.name}</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2 italic">{aff.fullName}</p>
                    <p className="text-gray-700 text-sm">{aff.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Institutional Partnerships */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Articulações</Badge>
            <h2 className="text-3xl font-bold text-cootapi-green mb-3">Redes e Articulações Institucionais</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A COOTAPI atua em rede com organizações nacionais e regionais comprometidas com o desenvolvimento rural sustentável e a agricultura familiar.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "ARrEPIA", desc: "Articulação Regional dos Empreendimentos do Piauí — rede de cooperativas e associações do semiárido piauiense.", icon: "🤝" },
              { name: "ASA Brasil", desc: "Articulação Semiárido Brasileiro — rede de organizações da sociedade civil que promovem a convivência com o semiárido.", icon: "🌵" },
              { name: "SEAF/FIDA", desc: "Fundo Internacional de Desenvolvimento Agrícola — parceria para o projeto Viva o Semiárido, apoiando agricultores familiares.", icon: "🌍" },
              { name: "Ministério do Desenvolvimento Social", desc: "Parceria em programas de acesso à água e segurança alimentar, como o Programa Cisternas (P1MC/P1+2).", icon: "🏛️" },
              { name: "INCRA", desc: "Instituto Nacional de Colonização e Reforma Agrária — parceria em serviços de georreferenciamento e regularização fundiária.", icon: "📋" },
              { name: "Embrapa Meio-Norte", desc: "Cooperação técnica em pesquisa e desenvolvimento de tecnologias adaptadas ao semiárido piauiense.", icon: "🔬" },
            ].map((item) => (
              <Card key={item.name} className="card-hover border-l-4 border-l-cootapi-yellow">
                <CardContent className="p-5">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h4 className="font-bold text-cootapi-green mb-2">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Book Section */}
      <section className="bg-cootapi-green py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-cootapi-yellow text-cootapi-green mb-4">Publicação</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Livro dos 30 Anos da COOTAPI
              </h2>
              <p className="text-green-200 leading-relaxed mb-6">
                Em 2024, a COOTAPI lançou um livro comemorativo que narra a história da cooperativa, os projetos realizados, os impactos alcançados e os desafios superados ao longo de três décadas de trabalho junto às comunidades rurais do Piauí.
              </p>
              <p className="text-green-200 leading-relaxed">
                A publicação reúne depoimentos de cooperados, parceiros e beneficiários, além de registros fotográficos das atividades nas comunidades.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/10 rounded-2xl p-8 text-center text-white max-w-xs">
                <BookOpen className="w-24 h-24 mx-auto mb-4 text-cootapi-yellow" />
                <h3 className="text-xl font-bold mb-2">30 Anos COOTAPI</h3>
                <p className="text-green-200 text-sm mb-4">Fortalecendo a Agricultura Familiar desde 1994</p>
                <Badge className="bg-cootapi-yellow text-cootapi-green">Em breve disponível para download</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
