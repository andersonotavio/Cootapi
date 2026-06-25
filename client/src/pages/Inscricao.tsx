import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Users, Leaf, Award } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const benefits = [
  { icon: "💼", title: "Exercício Profissional", desc: "Trabalhe de forma cooperada, com respaldo jurídico e institucional da cooperativa." },
  { icon: "🤝", title: "Solidariedade", desc: "Faça parte de uma rede de profissionais comprometidos com o desenvolvimento rural." },
  { icon: "📈", title: "Crescimento", desc: "Acesso a projetos, capacitações e oportunidades de desenvolvimento profissional." },
  { icon: "🌱", title: "Impacto Social", desc: "Contribua diretamente para a transformação da vida das famílias agricultoras." },
];

const requirements = [
  "Formação técnica ou superior em área relacionada ao desenvolvimento rural",
  "Compromisso com os princípios do cooperativismo",
  "Disponibilidade para atuar nos territórios de atuação da COOTAPI",
  "Integralização de quota-parte (valor definido em assembleia)",
  "Participação nas assembleias e reuniões da cooperativa",
];

export default function Inscricao() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    cpf: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    city: "",
    state: "PI",
    education: "",
    formation: "",
    experience: "",
    motivation: "",
  });

  const createMutation = trpc.memberApplications.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: () => {
      toast.error("Erro ao enviar inscrição. Tente novamente.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone) {
      toast.error("Preencha os campos obrigatórios: nome, e-mail e telefone.");
      return;
    }
    createMutation.mutate(form);
  };

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <>
      {/* Hero */}
      <section className="bg-cootapi-green py-20">
        <div className="container text-center text-white">
          <Badge className="bg-cootapi-yellow text-cootapi-green mb-4">Faça Parte</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Seja Cooperado(a)</h1>
          <p className="text-xl text-green-200 max-w-2xl mx-auto">
            Junte-se à COOTAPI e contribua para o fortalecimento da agricultura familiar no Piauí.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Vantagens</Badge>
            <h2 className="text-3xl font-bold text-cootapi-green">Por Que Ser Cooperado(a)?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <Card key={b.title} className="text-center card-hover">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{b.icon}</div>
                  <h3 className="font-bold text-cootapi-green mb-2">{b.title}</h3>
                  <p className="text-gray-600 text-sm">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-cootapi-green-pale py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-cootapi-yellow text-cootapi-green mb-4">Requisitos</Badge>
              <h2 className="text-3xl font-bold text-cootapi-green mb-6">
                Quem Pode se Inscrever?
              </h2>
              <p className="text-gray-600 mb-6">
                A COOTAPI é aberta a profissionais comprometidos com o desenvolvimento rural sustentável e a agricultura familiar. Os principais requisitos são:
              </p>
              <ul className="space-y-3">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cootapi-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <img
                src="/manus-storage/GrupocomfaixadaCOOTAPI_a0d7cfd5.JPG"
                alt="Cooperados COOTAPI"
                className="rounded-2xl w-full h-64 object-cover shadow-lg"
              />
              <div className="bg-cootapi-yellow/30 rounded-xl p-4 text-center">
                <Users className="w-8 h-8 text-cootapi-green mx-auto mb-2" />
                <p className="font-semibold text-cootapi-green">35 Cooperados Ativos</p>
                <p className="text-sm text-gray-600">Profissionais multidisciplinares</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <Card className="text-center p-10">
                <CheckCircle2 className="w-16 h-16 text-cootapi-green mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-cootapi-green mb-3">Inscrição Enviada!</h3>
                <p className="text-gray-600 mb-2">
                  Recebemos sua inscrição com sucesso. Nossa equipe analisará seu perfil e entrará em contato em breve.
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  Em caso de dúvidas, entre em contato pelo e-mail <strong>cootapi@gmail.com</strong> ou pelo WhatsApp <strong>(86) 99945-6187</strong>.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="bg-cootapi-green hover:bg-cootapi-green-mid text-white"
                >
                  Nova Inscrição
                </Button>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <Badge className="bg-cootapi-yellow text-cootapi-green mb-3">Inscrição</Badge>
                    <h2 className="text-2xl font-bold text-cootapi-green">Formulário de Inscrição</h2>
                    <p className="text-gray-500 text-sm mt-2">Campos marcados com * são obrigatórios</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="fullName">Nome Completo *</Label>
                      <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Seu nome completo" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input id="cpf" value={form.cpf} onChange={(e) => update("cpf", e.target.value)} placeholder="000.000.000-00" />
                      </div>
                      <div>
                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                        <Input id="birthDate" type="date" value={form.birthDate} onChange={(e) => update("birthDate", e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="seu@email.com" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone / WhatsApp *</Label>
                        <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(86) 99999-9999" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Endereço</Label>
                      <Input id="address" value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Rua, número, bairro" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Município</Label>
                        <Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Sua cidade" />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <Select value={form.state} onValueChange={(v) => update("state", v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map((uf) => (
                              <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="education">Nível de Escolaridade</Label>
                      <Select value={form.education} onValueChange={(v) => update("education", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tecnico">Técnico</SelectItem>
                          <SelectItem value="superior">Superior Completo</SelectItem>
                          <SelectItem value="especializacao">Especialização</SelectItem>
                          <SelectItem value="mestrado">Mestrado</SelectItem>
                          <SelectItem value="doutorado">Doutorado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="formation">Área de Formação</Label>
                      <Input id="formation" value={form.formation} onChange={(e) => update("formation", e.target.value)} placeholder="Ex: Agronomia, Medicina Veterinária, Engenharia Civil..." />
                    </div>
                    <div>
                      <Label htmlFor="experience">Experiência Profissional</Label>
                      <Textarea id="experience" value={form.experience} onChange={(e) => update("experience", e.target.value)} placeholder="Descreva sua experiência profissional relevante..." rows={3} />
                    </div>
                    <div>
                      <Label htmlFor="motivation">Motivação para Ser Cooperado(a)</Label>
                      <Textarea id="motivation" value={form.motivation} onChange={(e) => update("motivation", e.target.value)} placeholder="Por que você quer fazer parte da COOTAPI?" rows={3} />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-cootapi-green hover:bg-cootapi-green-mid text-white"
                      disabled={createMutation.isPending}
                    >
                      {createMutation.isPending ? "Enviando..." : "Enviar Inscrição"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
