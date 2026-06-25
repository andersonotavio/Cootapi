import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";

const services = [
  {
    id: "assistencia",
    icon: "🌱",
    title: "Assistência Técnica e Extensão Rural (ATER)",
    description: "Apoio técnico direto ao produtor rural, incluindo diagnóstico da propriedade, planejamento produtivo, orientação no manejo de culturas e criações, e acompanhamento sistemático.",
    items: [
      "Diagnóstico e planejamento da propriedade rural",
      "Orientação técnica em culturas alimentares e comerciais",
      "Manejo de criações (bovinos, caprinos, ovinos, aves)",
      "Implantação de sistemas agroflorestais",
      "Orientação em práticas agroecológicas",
      "Acompanhamento de DAP/CAF",
    ],
  },
  {
    id: "capacitacao",
    icon: "📚",
    title: "Capacitação e Formação",
    description: "Cursos, oficinas, palestras e formações presenciais e online para agricultores, técnicos e gestores, abordando temas de produção, gestão, meio ambiente e organização social.",
    items: [
      "Cursos de produção agroecológica",
      "Formação em gestão rural e finanças",
      "Oficinas de tecnologias sociais",
      "Capacitação em boas práticas de fabricação",
      "Formação em associativismo e cooperativismo",
      "Treinamentos técnicos específicos",
    ],
  },
  {
    id: "ambiental",
    icon: "🌿",
    title: "Gestão Ambiental",
    description: "Serviços de licenciamento ambiental, regularização e adequação às normas ambientais vigentes, incluindo CAR, ICMS ecológico e planos de manejo.",
    items: [
      "Cadastro Ambiental Rural (CAR)",
      "Licenciamento ambiental (LP, LI, LO)",
      "ICMS ecológico — documentação e habilitação",
      "Planos de recuperação de áreas degradadas",
      "Laudos e perícias ambientais",
      "Adequação à legislação ambiental",
    ],
  },
  {
    id: "topografia",
    icon: "📐",
    title: "Topografia e Georreferenciamento",
    description: "Levantamentos topográficos, georreferenciamento de imóveis rurais e mapeamento para fins de regularização fundiária e planejamento.",
    items: [
      "Georreferenciamento de imóveis rurais (INCRA)",
      "Levantamentos planialtimétricos",
      "Mapeamento de propriedades e comunidades",
      "Demarcação de áreas e divisas",
      "Plantas e memoriais descritivos",
      "Atualização de registros cartoriais",
    ],
  },
  {
    id: "projetos",
    icon: "📋",
    title: "Projetos Agropecuários e Sociais",
    description: "Elaboração de projetos técnicos para obtenção de crédito rural, financiamentos, convênios e programas governamentais.",
    items: [
      "Projetos para PRONAF e crédito rural",
      "Projetos para programas sociais (PAA, PNAE)",
      "Projetos de infraestrutura rural",
      "Projetos de captação de recursos",
      "Planos de negócios rurais",
      "Relatórios técnicos e de gestão",
    ],
  },
  {
    id: "regularizacao",
    icon: "🏛️",
    title: "Regularização Fundiária e Avaliações",
    description: "Serviços de regularização de imóveis rurais, avaliações, laudos técnicos e documentação para fins legais e financeiros.",
    items: [
      "CCIR — Certificado de Cadastro de Imóvel Rural",
      "ITR — Imposto Territorial Rural",
      "Avaliação de imóveis rurais",
      "Laudos de vistoria e perícia",
      "Regularização de posses",
      "Assessoria em processos de herança rural",
    ],
  },
];

export default function Contrate() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "servico" as const,
  });
  const [submitted, setSubmitted] = useState(false);

  const sendMutation = trpc.contact.send.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "", type: "servico" });
    },
    onError: () => {
      toast.error("Erro ao enviar mensagem. Tente novamente ou entre em contato por telefone.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Preencha os campos obrigatórios: nome, e-mail e mensagem.");
      return;
    }
    sendMutation.mutate(formData);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-cootapi-green py-20">
        <div className="container text-center text-white">
          <Badge className="bg-cootapi-yellow text-cootapi-green mb-4">Serviços</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contrate a COOTAPI</h1>
          <p className="text-xl text-green-200 max-w-2xl mx-auto">
            Oferecemos serviços técnicos especializados para fortalecer a agricultura familiar e o desenvolvimento rural sustentável no Piauí.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Nossos Serviços</Badge>
            <h2 className="text-3xl font-bold text-cootapi-green">O Que Oferecemos</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} id={service.id} className="card-hover border-l-4 border-l-cootapi-green">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{service.icon}</span>
                    <CardTitle className="text-cootapi-green text-lg">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-cootapi-green flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-cootapi-green-pale py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <Badge className="bg-cootapi-yellow text-cootapi-green mb-4">Fale Conosco</Badge>
              <h2 className="text-3xl font-bold text-cootapi-green mb-6">
                Entre em Contato
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Preencha o formulário ao lado ou entre em contato diretamente pelos nossos canais. Nossa equipe retornará o contato em até 48 horas úteis.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cootapi-green flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-cootapi-green">Telefone / WhatsApp</div>
                    <a href="https://wa.me/5586999456187" className="text-gray-600 hover:text-cootapi-green">
                      (86) 99945-6187
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cootapi-green flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-cootapi-green">E-mail</div>
                    <a href="mailto:cootapi@gmail.com" className="text-gray-600 hover:text-cootapi-green">
                      cootapi@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cootapi-green flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-cootapi-green">Endereço</div>
                    <p className="text-gray-600">Rua 19 de Novembro, 1980<br />Teresina — PI</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cootapi-green flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-cootapi-green">Horário de Atendimento</div>
                    <p className="text-gray-600">Segunda a Sexta: 8h às 17h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <Card className="text-center p-8">
                  <CheckCircle2 className="w-16 h-16 text-cootapi-green mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-cootapi-green mb-2">Mensagem Enviada!</h3>
                  <p className="text-gray-600 mb-4">
                    Recebemos sua mensagem e retornaremos em até 48 horas úteis.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-cootapi-green hover:bg-cootapi-green-mid text-white"
                  >
                    Enviar Nova Mensagem
                  </Button>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-cootapi-green mb-6">Solicitar Serviço</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="name">Nome Completo *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Seu nome completo"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">E-mail *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="seu@email.com"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(86) 99999-9999"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="type">Tipo de Solicitação</Label>
                          <Select
                            value={formData.type}
                            onValueChange={(v) => setFormData({ ...formData, type: v as any })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="servico">Contratação de Serviço</SelectItem>
                              <SelectItem value="projeto">Elaboração de Projeto</SelectItem>
                              <SelectItem value="parceria">Parceria Institucional</SelectItem>
                              <SelectItem value="outro">Outro Assunto</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="subject">Assunto</Label>
                          <Input
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Descreva brevemente o assunto"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="message">Mensagem *</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Descreva sua necessidade em detalhes..."
                            rows={5}
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-cootapi-green hover:bg-cootapi-green-mid text-white"
                        disabled={sendMutation.isPending}
                      >
                        {sendMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        Ao enviar, você concorda com o uso dos seus dados para retorno de contato.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
