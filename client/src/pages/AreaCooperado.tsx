import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import {
  FileText, Download, Upload, Calendar, Bell, Lock,
  FileCheck, Folder, ChevronRight, Clock, MapPin, User
} from "lucide-react";

const DOC_CATEGORIES = [
  { value: "all", label: "Todos" },
  { value: "informe", label: "Informes" },
  { value: "relatorio", label: "Relatórios" },
  { value: "ata", label: "Atas" },
  { value: "contrato", label: "Contratos" },
  { value: "outro", label: "Outros" },
];

function DocumentCard({ doc }: { doc: any }) {
  const ext = doc.fileName?.split(".").pop()?.toUpperCase() ?? "DOC";
  const sizeKB = doc.fileSize ? Math.round(doc.fileSize / 1024) : null;

  return (
    <Card className="card-hover">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-cootapi-green-pale flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-cootapi-green" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 truncate">{doc.title}</h4>
          {doc.description && <p className="text-xs text-gray-500 truncate">{doc.description}</p>}
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">{ext}</Badge>
            {sizeKB && <span className="text-xs text-gray-400">{sizeKB} KB</span>}
            <span className="text-xs text-gray-400">
              {new Date(doc.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>
        <a
          href={doc.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0"
        >
          <Button size="sm" className="bg-cootapi-green hover:bg-cootapi-green-mid text-white">
            <Download className="w-4 h-4 mr-1" />
            Baixar
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}

function UploadDialog({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("outro");
  const [uploading, setUploading] = useState(false);

  const uploadMutation = trpc.documents.upload.useMutation({
    onSuccess: () => {
      toast.success("Documento enviado com sucesso!");
      setOpen(false);
      setFile(null);
      setTitle("");
      setDescription("");
      onSuccess();
    },
    onError: (err) => {
      toast.error("Erro ao enviar documento: " + (err as { message: string }).message);
    },
  });

  const handleUpload = async () => {
    if (!file || !title) {
      toast.error("Selecione um arquivo e informe o título.");
      return;
    }
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(",")[1];
        await uploadMutation.mutateAsync({
          title,
          description,
          category: category as any,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          fileData: base64,
        });
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-cootapi-green hover:bg-cootapi-green-mid text-white">
          <Upload className="w-4 h-4 mr-2" />
          Enviar Documento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-cootapi-green">Enviar Documento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label>Arquivo</Label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <p className="text-xs text-gray-400 mt-1">PDF, Word, Excel, Imagens (máx. 10MB)</p>
          </div>
          <div>
            <Label>Título *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nome do documento" />
          </div>
          <div>
            <Label>Descrição</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Breve descrição (opcional)" />
          </div>
          <div>
            <Label>Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="informe">Informe</SelectItem>
                <SelectItem value="relatorio">Relatório</SelectItem>
                <SelectItem value="ata">Ata</SelectItem>
                <SelectItem value="contrato">Contrato</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-full bg-cootapi-green hover:bg-cootapi-green-mid text-white"
            onClick={handleUpload}
            disabled={uploading || uploadMutation.isPending}
          >
            {uploading || uploadMutation.isPending ? "Enviando..." : "Enviar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EventCard({ event }: { event: any }) {
  const start = new Date(event.startDate);
  const end = event.endDate ? new Date(event.endDate) : null;
  const isUpcoming = start >= new Date();

  return (
    <Card className={`card-hover border-l-4 ${isUpcoming ? "border-l-cootapi-green" : "border-l-gray-300"}`}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center text-white ${isUpcoming ? "bg-cootapi-green" : "bg-gray-400"}`}>
            <span className="text-lg font-bold leading-none">{start.getDate()}</span>
            <span className="text-xs">{start.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800">{event.title}</h4>
            {event.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{event.description}</p>}
            <div className="flex flex-wrap gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {start.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                {end && ` – ${end.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`}
              </span>
              {event.location && (
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {event.location}
                </span>
              )}
            </div>
          </div>
          {isUpcoming && (
            <Badge className="bg-cootapi-green-pale text-cootapi-green self-start flex-shrink-0">Próximo</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AreaCooperado() {
  const { user, isAuthenticated, loading } = useAuth();
  const [docCategory, setDocCategory] = useState("all");
  const [docSearch, setDocSearch] = useState("");

  const { data: documents, refetch: refetchDocs } = trpc.documents.list.useQuery(
    { category: docCategory !== "all" ? (docCategory as any) : undefined },
    { enabled: isAuthenticated }
  );

  const { data: informes } = trpc.informes.list.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: events } = trpc.events.list.useQuery(
    { publicOnly: false },
    { enabled: isAuthenticated }
  );

  const filteredDocs = documents?.filter((d: any) =>
    !docSearch || d.title.toLowerCase().includes(docSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cootapi-green border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <section className="bg-cootapi-green py-20">
          <div className="container text-center text-white">
            <Lock className="w-16 h-16 mx-auto mb-4 text-cootapi-yellow" />
            <h1 className="text-4xl font-bold mb-4">Área do Cooperado(a)</h1>
            <p className="text-xl text-green-200 max-w-xl mx-auto mb-8">
              Esta área é exclusiva para cooperados(as) da COOTAPI. Faça login para acessar documentos, informes e o calendário de eventos.
            </p>
            <a href={getLoginUrl()}>
              <Button className="bg-cootapi-yellow text-cootapi-green hover:bg-yellow-400 text-lg px-8 py-3">
                <User className="w-5 h-5 mr-2" />
                Entrar na Área do Cooperado
              </Button>
            </a>
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { icon: FileText, title: "Documentos", desc: "Acesse e faça download de documentos, atas, contratos e relatórios." },
                { icon: Bell, title: "Informes", desc: "Fique por dentro dos informes e comunicados internos da cooperativa." },
                { icon: Calendar, title: "Calendário", desc: "Consulte os eventos, reuniões e assembleias programadas." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="text-center card-hover">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full bg-cootapi-green-pale flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-6 h-6 text-cootapi-green" />
                      </div>
                      <h3 className="font-bold text-cootapi-green mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-cootapi-green py-12">
        <div className="container">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-white">
              <Badge className="bg-cootapi-yellow text-cootapi-green mb-2">Área Restrita</Badge>
              <h1 className="text-3xl font-bold">Área do Cooperado(a)</h1>
              <p className="text-green-200 mt-1">Bem-vindo(a), {user?.name?.split(" ")[0] ?? "Cooperado"}!</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-cootapi-yellow flex items-center justify-center">
                <User className="w-5 h-5 text-cootapi-green" />
              </div>
              <div className="text-white">
                <div className="font-semibold text-sm">{user?.name}</div>
                <div className="text-xs text-green-200">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cootapi-green-pale py-12">
        <div className="container">
          <Tabs defaultValue="informes">
            <TabsList className="mb-8 bg-white shadow-sm">
              <TabsTrigger value="informes" className="data-[state=active]:bg-cootapi-green data-[state=active]:text-white">
                <Bell className="w-4 h-4 mr-2" />
                Informes
              </TabsTrigger>
              <TabsTrigger value="documentos" className="data-[state=active]:bg-cootapi-green data-[state=active]:text-white">
                <Folder className="w-4 h-4 mr-2" />
                Documentos
              </TabsTrigger>
              <TabsTrigger value="calendario" className="data-[state=active]:bg-cootapi-green data-[state=active]:text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Calendário
              </TabsTrigger>
            </TabsList>

            {/* Informes Tab */}
            <TabsContent value="informes">
              <div className="space-y-4">
                {!informes || informes.length === 0 ? (
                  <Card className="text-center py-12">
                    <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhum informe publicado ainda.</p>
                  </Card>
                ) : (
                  informes.map((informe: any) => (
                    <Card key={informe.id} className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-cootapi-green text-lg mb-2">{informe.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{informe.content}</p>
                            {informe.imageUrl && (
                              <img src={informe.imageUrl} alt={informe.title} className="mt-4 rounded-xl max-h-64 w-auto" />
                            )}
                            {informe.videoUrl && (
                              <div className="mt-4 aspect-video rounded-xl overflow-hidden">
                                <iframe
                                  src={informe.videoUrl.replace("watch?v=", "embed/")}
                                  className="w-full h-full"
                                  allowFullScreen
                                  title={informe.title}
                                />
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-400 flex-shrink-0">
                            {new Date(informe.createdAt).toLocaleDateString("pt-BR")}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documentos">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {DOC_CATEGORIES.map((cat) => (
                      <Button
                        key={cat.value}
                        variant={docCategory === cat.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDocCategory(cat.value)}
                        className={docCategory === cat.value ? "bg-cootapi-green text-white" : "border-cootapi-green text-cootapi-green"}
                      >
                        {cat.label}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Buscar documentos..."
                      value={docSearch}
                      onChange={(e) => setDocSearch(e.target.value)}
                      className="w-48"
                    />
                    <UploadDialog onSuccess={refetchDocs} />
                  </div>
                </div>

                {!filteredDocs || filteredDocs.length === 0 ? (
                  <Card className="text-center py-12">
                    <FileCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhum documento encontrado.</p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {filteredDocs.map((doc: any) => (
                      <DocumentCard key={doc.id} doc={doc} />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendario">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-cootapi-green">Eventos e Reuniões</h2>
                </div>
                {!events || events.length === 0 ? (
                  <Card className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhum evento programado.</p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {events.map((event: any) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
