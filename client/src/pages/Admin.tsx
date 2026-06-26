import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import {
  LayoutDashboard, Newspaper, Calendar, FileText, Users, MessageSquare,
  Plus, Trash2, Edit, Eye, EyeOff, Lock, BarChart3, Image, Bell
} from "lucide-react";

// ─── News Management ───────────────────────────────────────────────────────────
function NewsManager() {
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState({ title: "", slug: "", summary: "", content: "", imageUrl: "", category: "noticia", published: false });

  const utils = trpc.useUtils();
  const { data: newsList } = trpc.news.list.useQuery({ limit: 50 });
  const createMutation = trpc.news.create.useMutation({
    onSuccess: () => { toast.success("Notícia criada!"); utils.news.list.invalidate(); setOpen(false); resetForm(); },
    onError: (e) => { toast.error((e as { message: string }).message); },
  });
  const updateMutation = trpc.news.update.useMutation({
    onSuccess: () => { toast.success("Notícia atualizada!"); utils.news.list.invalidate(); setOpen(false); resetForm(); },
    onError: (e) => { toast.error((e as { message: string }).message); },
  });
  const deleteMutation = trpc.news.delete.useMutation({
    onSuccess: () => { toast.success("Notícia removida!"); utils.news.list.invalidate(); },
    onError: (e) => { toast.error((e as { message: string }).message); },
  });

  const resetForm = () => { setForm({ title: "", slug: "", summary: "", content: "", imageUrl: "", category: "noticia", published: false }); setEditItem(null); };

  const handleEdit = (item: any) => {
    setEditItem(item);
    setForm({ title: item.title, slug: item.slug, summary: item.summary ?? "", content: item.content, imageUrl: item.imageUrl ?? "", category: item.category, published: item.published });
    setOpen(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.content) { toast.error("Título e conteúdo são obrigatórios."); return; }
    const slug = form.slug || form.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (editItem) {
      updateMutation.mutate({ id: editItem.id, title: form.title, summary: form.summary || undefined, content: form.content, imageUrl: form.imageUrl || undefined, category: form.category as any, published: form.published });
    } else {
      createMutation.mutate({ title: form.title, slug, summary: form.summary || undefined, content: form.content, imageUrl: form.imageUrl || undefined, category: form.category as any, published: form.published });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-cootapi-green">Notícias e Artigos</h2>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-cootapi-green hover:bg-cootapi-green-mid text-white">
              <Plus className="w-4 h-4 mr-2" /> Nova Notícia
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-cootapi-green">{editItem ? "Editar Notícia" : "Nova Notícia"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Título *</Label>
                  <Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Título da notícia" />
                </div>
                <div>
                  <Label>Categoria</Label>
                  <Select value={form.category} onValueChange={(v) => setForm(f => ({ ...f, category: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="noticia">Notícia</SelectItem>
                      <SelectItem value="projeto">Projeto</SelectItem>
                      <SelectItem value="materia">Matéria</SelectItem>
                      <SelectItem value="evento">Evento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Resumo</Label>
                <Input value={form.summary} onChange={(e) => setForm(f => ({ ...f, summary: e.target.value }))} placeholder="Breve resumo" />
              </div>
              <div>
                <Label>Conteúdo *</Label>
                <Textarea value={form.content} onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Conteúdo completo..." rows={8} />
              </div>
              <div>
                <Label>URL da Imagem</Label>
                <Input value={form.imageUrl} onChange={(e) => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.published} onCheckedChange={(v) => setForm(f => ({ ...f, published: v }))} />
                <Label>Publicar imediatamente</Label>
              </div>
              <Button className="w-full bg-cootapi-green hover:bg-cootapi-green-mid text-white" onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {!newsList || newsList.length === 0 ? (
          <Card className="text-center py-8"><p className="text-gray-500">Nenhuma notícia cadastrada.</p></Card>
        ) : (
          newsList.map((item: any) => (
            <Card key={item.id} className="card-hover">
              <CardContent className="p-4 flex items-center gap-4">
                {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800 truncate">{item.title}</h4>
                    <Badge variant={item.published ? "default" : "secondary"} className={item.published ? "bg-green-100 text-green-700" : ""}>
                      {item.published ? "Publicado" : "Rascunho"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
                  </div>
                  {item.summary && <p className="text-sm text-gray-500 truncate">{item.summary}</p>}
                  <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString("pt-BR")}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50" onClick={() => { if (confirm("Remover esta notícia?")) deleteMutation.mutate({ id: item.id }); }}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Events Management ─────────────────────────────────────────────────────────
function EventsManager() {
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState({ title: "", description: "", location: "", startDate: "", startTime: "09:00", endDate: "", endTime: "", isPublic: true });

  const utils = trpc.useUtils();
  const { data: eventsList } = trpc.events.list.useQuery({ publicOnly: false });
  const createMutation = trpc.events.create.useMutation({
    onSuccess: () => { toast.success("Evento criado!"); utils.events.list.invalidate(); setOpen(false); resetForm(); },
    onError: (e) => { toast.error((e as { message: string }).message); },
  });
  const updateMutation = trpc.events.update.useMutation({
    onSuccess: () => { toast.success("Evento atualizado!"); utils.events.list.invalidate(); setOpen(false); resetForm(); },
    onError: (e) => { toast.error((e as { message: string }).message); },
  });
  const deleteMutation = trpc.events.delete.useMutation({
    onSuccess: () => { toast.success("Evento removido!"); utils.events.list.invalidate(); },
    onError: (e) => { toast.error((e as { message: string }).message); },
  });

  const resetForm = () => { setForm({ title: "", description: "", location: "", startDate: "", startTime: "09:00", endDate: "", endTime: "", isPublic: true }); setEditItem(null); };

  const handleEdit = (item: any) => {
    const start = new Date(item.startDate);
    const end = item.endDate ? new Date(item.endDate) : null;
    setEditItem(item);
    setForm({
      title: item.title,
      description: item.description ?? "",
      location: item.location ?? "",
      startDate: start.toISOString().split("T")[0],
      startTime: start.toTimeString().slice(0, 5),
      endDate: end ? end.toISOString().split("T")[0] : "",
      endTime: end ? end.toTimeString().slice(0, 5) : "",
      isPublic: item.isPublic,
    });
    setOpen(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.startDate) { toast.error("Título e data são obrigatórios."); return; }
    const startDate = new Date(`${form.startDate}T${form.startTime || "09:00"}:00`);
    const endDate = form.endDate ? new Date(`${form.endDate}T${form.endTime || "18:00"}:00`) : undefined;
    if (editItem) {
      updateMutation.mutate({ id: editItem.id, title: form.title, description: form.description || undefined, location: form.location || undefined, startDate, endDate, isPublic: form.isPublic });
    } else {
      createMutation.mutate({ title: form.title, description: form.description || undefined, location: form.location || undefined, startDate, endDate, isPublic: form.isPublic });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-cootapi-green">Calendário de Eventos</h2>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-cootapi-green hover:bg-cootapi-green-mid text-white">
              <Plus className="w-4 h-4 mr-2" /> Novo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-cootapi-green">{editItem ? "Editar Evento" : "Novo Evento"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label>Título *</Label>
                <Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Nome do evento" />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
              </div>
              <div>
                <Label>Local</Label>
                <Input value={form.location} onChange={(e) => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Endereço ou nome do local" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Data Início *</Label>
                  <Input type="date" value={form.startDate} onChange={(e) => setForm(f => ({ ...f, startDate: e.target.value }))} />
                </div>
                <div>
                  <Label>Hora Início</Label>
                  <Input type="time" value={form.startTime} onChange={(e) => setForm(f => ({ ...f, startTime: e.target.value }))} />
                </div>
                <div>
                  <Label>Data Fim</Label>
                  <Input type="date" value={form.endDate} onChange={(e) => setForm(f => ({ ...f, endDate: e.target.value }))} />
                </div>
                <div>
                  <Label>Hora Fim</Label>
                  <Input type="time" value={form.endTime} onChange={(e) => setForm(f => ({ ...f, endTime: e.target.value }))} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.isPublic} onCheckedChange={(v) => setForm(f => ({ ...f, isPublic: v }))} />
                <Label>Evento público (visível no site)</Label>
              </div>
              <Button className="w-full bg-cootapi-green hover:bg-cootapi-green-mid text-white" onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {!eventsList || eventsList.length === 0 ? (
          <Card className="text-center py-8"><p className="text-gray-500">Nenhum evento cadastrado.</p></Card>
        ) : (
          eventsList.map((item: any) => {
            const start = new Date(item.startDate);
            return (
              <Card key={item.id} className="card-hover">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cootapi-green flex flex-col items-center justify-center text-white flex-shrink-0">
                    <span className="text-lg font-bold leading-none">{start.getDate()}</span>
                    <span className="text-xs">{start.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-800 truncate">{item.title}</h4>
                      <Badge variant={item.isPublic ? "default" : "secondary"} className={item.isPublic ? "bg-blue-100 text-blue-700" : ""}>
                        {item.isPublic ? "Público" : "Privado"}
                      </Badge>
                    </div>
                    {item.location && <p className="text-sm text-gray-500">{item.location}</p>}
                    <p className="text-xs text-gray-400">{start.toLocaleString("pt-BR")}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50" onClick={() => { if (confirm("Remover este evento?")) deleteMutation.mutate({ id: item.id }); }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

// ─── Documents Management ──────────────────────────────────────────────────────
function DocumentsManager() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({ title: "", description: "", category: "outro", isPublic: true });
  const [uploading, setUploading] = useState(false);

  const utils = trpc.useUtils();
  const { data: docsList } = trpc.documents.list.useQuery(undefined);
  const createMutation = trpc.documents.upload.useMutation({
    onSuccess: () => { toast.success("Documento enviado!"); utils.documents.list.invalidate(); setOpen(false); resetForm(); setUploading(false); },
    onError: (e) => { toast.error((e as { message: string }).message); setUploading(false); },
  });
  const deleteMutation = trpc.documents.delete.useMutation({
    onSuccess: () => { toast.success("Documento removido!"); utils.documents.list.invalidate(); },
    onError: (e) => { toast.error((e as { message: string }).message); },
  });

  const resetForm = () => { setForm({ title: "", description: "", category: "outro", isPublic: true }); setFile(null); };

  const handleUpload = () => {
    if (!file || !form.title) { toast.error("Selecione um arquivo e informe o título."); return; }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split(",")[1];
      createMutation.mutate({
        title: form.title,
        description: form.description || undefined,
        category: form.category as any,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        fileData: base64,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-cootapi-green">Documentos</h2>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-cootapi-green hover:bg-cootapi-green-mid text-white">
              <Plus className="w-4 h-4 mr-2" /> Novo Documento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-cootapi-green">Enviar Documento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label>Arquivo *</Label>
                <Input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              </div>
              <div>
                <Label>Título *</Label>
                <Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Nome do documento" />
              </div>
              <div>
                <Label>Descrição</Label>
                <Input value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Breve descrição" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Categoria</Label>
                  <Select value={form.category} onValueChange={(v) => setForm(f => ({ ...f, category: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="informe">Informe</SelectItem>
                      <SelectItem value="relatorio">Relatório</SelectItem>
                      <SelectItem value="ata">Ata</SelectItem>
                      <SelectItem value="contrato">Contrato</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch checked={form.isPublic} onCheckedChange={(v) => setForm(f => ({ ...f, isPublic: v }))} />
                  <Label>Visível para cooperados</Label>
                </div>
              </div>
              <Button className="w-full bg-cootapi-green hover:bg-cootapi-green-mid text-white" onClick={handleUpload} disabled={uploading || createMutation.isPending}>
                {uploading || createMutation.isPending ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {!docsList || docsList.length === 0 ? (
          <Card className="text-center py-8"><p className="text-gray-500">Nenhum documento cadastrado.</p></Card>
        ) : (
          docsList.map((doc: any) => (
            <Card key={doc.id} className="card-hover">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-cootapi-green-pale flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-cootapi-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-800 truncate">{doc.title}</h4>
                    <Badge variant="outline" className="text-xs">{doc.category}</Badge>
                    {doc.isPublic ? <Eye className="w-3 h-3 text-green-500" /> : <EyeOff className="w-3 h-3 text-gray-400" />}
                  </div>
                  <p className="text-xs text-gray-400">{doc.fileName} · {new Date(doc.createdAt).toLocaleDateString("pt-BR")}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline">Ver</Button>
                  </a>
                  <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50" onClick={() => { if (confirm("Remover este documento?")) deleteMutation.mutate({ id: doc.id }); }}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Informes Management ───────────────────────────────────────────────────────
function InformesManager() {
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState({ title: "", content: "", imageUrl: "", videoUrl: "", published: true });

  const utils = trpc.useUtils();
  const { data: informesList } = trpc.informes.list.useQuery(undefined);
  const createMutation = trpc.informes.create.useMutation({
    onSuccess: () => { toast.success("Informe criado!"); utils.informes.list.invalidate(); setOpen(false); resetForm(); },
    onError: (e) => { toast.error((e as { message: string }).message); },
  });
  const updateMutation = trpc.informes.update.useMutation({
    onSuccess: () => { toast.success("Informe atualizado!"); utils.informes.list.invalidate(); setOpen(false); resetForm(); },
    onError: (e) => { toast.error((e as { message: string }).message); },
  });
  const deleteMutation = trpc.informes.delete.useMutation({
    onSuccess: () => { toast.success("Informe removido!"); utils.informes.list.invalidate(); },
    onError: (e) => { toast.error((e as { message: string }).message); },
  });

  const resetForm = () => { setForm({ title: "", content: "", imageUrl: "", videoUrl: "", published: true }); setEditItem(null); };

  const handleEdit = (item: any) => {
    setEditItem(item);
    setForm({ title: item.title, content: item.content, imageUrl: item.imageUrl ?? "", videoUrl: item.videoUrl ?? "", published: item.published });
    setOpen(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.content) { toast.error("Título e conteúdo são obrigatórios."); return; }
    if (editItem) {
      updateMutation.mutate({ id: editItem.id, ...form, imageUrl: form.imageUrl || undefined, videoUrl: form.videoUrl || undefined });
    } else {
      createMutation.mutate({ ...form, imageUrl: form.imageUrl || undefined, videoUrl: form.videoUrl || undefined });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-cootapi-green">Informes para Cooperados</h2>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-cootapi-green hover:bg-cootapi-green-mid text-white">
              <Plus className="w-4 h-4 mr-2" /> Novo Informe
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-cootapi-green">{editItem ? "Editar Informe" : "Novo Informe"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label>Título *</Label>
                <Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Título do informe" />
              </div>
              <div>
                <Label>Conteúdo *</Label>
                <Textarea value={form.content} onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))} rows={8} placeholder="Texto do informe..." />
              </div>
              <div>
                <Label>URL da Imagem (opcional)</Label>
                <Input value={form.imageUrl} onChange={(e) => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." />
              </div>
              <div>
                <Label>URL do Vídeo YouTube (opcional)</Label>
                <Input value={form.videoUrl} onChange={(e) => setForm(f => ({ ...f, videoUrl: e.target.value }))} placeholder="https://www.youtube.com/watch?v=..." />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.published} onCheckedChange={(v) => setForm(f => ({ ...f, published: v }))} />
                <Label>Publicar para cooperados</Label>
              </div>
              <Button className="w-full bg-cootapi-green hover:bg-cootapi-green-mid text-white" onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {!informesList || informesList.length === 0 ? (
          <Card className="text-center py-8"><p className="text-gray-500">Nenhum informe cadastrado.</p></Card>
        ) : (
          informesList.map((item: any) => (
            <Card key={item.id} className="card-hover">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-cootapi-yellow flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-cootapi-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-800 truncate">{item.title}</h4>
                    <Badge variant={item.published ? "default" : "secondary"} className={item.published ? "bg-green-100 text-green-700" : ""}>
                      {item.published ? "Publicado" : "Rascunho"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{item.content.slice(0, 100)}...</p>
                  <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString("pt-BR")}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50" onClick={() => { if (confirm("Remover este informe?")) deleteMutation.mutate({ id: item.id }); }}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Applications Management ───────────────────────────────────────────────────
function ApplicationsManager() {
  const { data: apps } = trpc.memberApplications.list.useQuery(undefined);
  const utils = trpc.useUtils();
  const updateStatus = trpc.memberApplications.updateStatus.useMutation({
    onSuccess: () => { toast.success("Status atualizado!"); utils.memberApplications.list.invalidate(); },
    onError: (e) => { toast.error((e as { message: string }).message); },
  });

  const statusColors: Record<string, string> = {
    pendente: "bg-yellow-100 text-yellow-700",
    aprovado: "bg-green-100 text-green-700",
    rejeitado: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-cootapi-green">Inscrições de Cooperados</h2>
      <div className="space-y-3">
        {!apps || apps.length === 0 ? (
          <Card className="text-center py-8"><p className="text-gray-500">Nenhuma inscrição recebida.</p></Card>
        ) : (
          apps.map((app: any) => (
            <Card key={app.id} className="card-hover">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{app.fullName}</h4>
                      <Badge className={statusColors[app.status] ?? ""}>{app.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                      {app.email && <span>📧 {app.email}</span>}
                      {app.phone && <span>📞 {app.phone}</span>}
                      {app.city && <span>📍 {app.city}/{app.state}</span>}
                      {app.formation && <span>🎓 {app.formation}</span>}
                    </div>
                    {app.motivation && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{app.motivation}</p>}
                    <p className="text-xs text-gray-400 mt-1">{new Date(app.createdAt).toLocaleDateString("pt-BR")}</p>
                  </div>
                  {app.status === "pendente" && (
                    <div className="flex gap-2 flex-shrink-0">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => updateStatus.mutate({ id: app.id, status: "aprovado" })}>
                        Aprovar
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50" onClick={() => updateStatus.mutate({ id: app.id, status: "rejeitado" })}>
                        Rejeitar
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Messages Management ───────────────────────────────────────────────────────
function MessagesManager() {
  const { data: messages } = trpc.contact.list.useQuery(undefined);
  const utils = trpc.useUtils();
  const markRead = trpc.contact.markRead.useMutation({
    onSuccess: () => utils.contact.list.invalidate(),
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-cootapi-green">Mensagens de Contato</h2>
      <div className="space-y-3">
        {!messages || messages.length === 0 ? (
          <Card className="text-center py-8"><p className="text-gray-500">Nenhuma mensagem recebida.</p></Card>
        ) : (
          messages.map((msg: any) => (
            <Card key={msg.id} className={`card-hover ${!msg.read ? "border-l-4 border-l-cootapi-yellow" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{msg.name}</h4>
                      {!msg.read && <Badge className="bg-cootapi-yellow text-cootapi-green text-xs">Novo</Badge>}
                      <Badge variant="outline" className="text-xs">{msg.type}</Badge>
                    </div>
                    {msg.subject && <p className="text-sm font-medium text-gray-700">{msg.subject}</p>}
                    <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-400">
                      <span>📧 {msg.email}</span>
                      {msg.phone && <span>📞 {msg.phone}</span>}
                      <span>{new Date(msg.createdAt).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>
                  {!msg.read && (
                    <Button size="sm" variant="outline" onClick={() => markRead.mutate({ id: msg.id })}>
                      Marcar lida
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Dashboard Stats ───────────────────────────────────────────────────────────
function DashboardStats() {
  const { data: stats } = trpc.admin.stats.useQuery(undefined);

  const cards = [
    { label: "Notícias", value: stats?.news ?? 0, icon: Newspaper, color: "bg-blue-50 text-blue-600" },
    { label: "Eventos", value: stats?.events ?? 0, icon: Calendar, color: "bg-purple-50 text-purple-600" },
    { label: "Documentos", value: stats?.documents ?? 0, icon: FileText, color: "bg-green-50 text-green-600" },
    { label: "Inscrições", value: stats?.applications ?? 0, icon: Users, color: "bg-yellow-50 text-yellow-600" },
    { label: "Msgs não lidas", value: stats?.unreadMessages ?? 0, icon: MessageSquare, color: "bg-red-50 text-red-600" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-cootapi-green">Visão Geral</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} className="card-hover">
              <CardContent className="p-4 text-center">
                <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{card.value}</div>
                <div className="text-xs text-gray-500">{card.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card className="bg-cootapi-green-pale border-cootapi-green/20">
        <CardContent className="p-6">
          <h3 className="font-bold text-cootapi-green mb-2">Dicas de Gestão</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Publique notícias regularmente para manter o site atualizado.</li>
            <li>• Adicione eventos ao calendário para que cooperados fiquem informados.</li>
            <li>• Envie informes periódicos para a área do cooperado.</li>
            <li>• Revise as inscrições pendentes e responda às mensagens de contato.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────────────────────
export default function Admin() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cootapi-green border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="bg-cootapi-green min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <Lock className="w-16 h-16 mx-auto mb-4 text-cootapi-yellow" />
          <h1 className="text-3xl font-bold mb-4">Painel Administrativo</h1>
          <p className="text-green-200 mb-6">Acesso restrito. Faça login para continuar.</p>
          <a href={getLoginUrl()}>
            <Button className="bg-cootapi-yellow text-cootapi-green hover:bg-yellow-400">Entrar</Button>
          </a>
        </div>
      </section>
    );
  }

  if (user?.role !== "admin") {
    return (
      <section className="bg-cootapi-green min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <Lock className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h1 className="text-3xl font-bold mb-4">Acesso Negado</h1>
          <p className="text-green-200">Você não tem permissão para acessar esta área.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-cootapi-green py-10">
        <div className="container">
          <div className="flex items-center gap-3 text-white">
            <LayoutDashboard className="w-8 h-8 text-cootapi-yellow" />
            <div>
              <h1 className="text-2xl font-bold">Painel Administrativo</h1>
              <p className="text-green-200 text-sm">Bem-vindo(a), {user?.name}!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cootapi-green-pale py-10">
        <div className="container">
          <Tabs defaultValue="dashboard">
            <TabsList className="mb-8 bg-white shadow-sm flex-wrap h-auto gap-1 p-1">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-cootapi-green data-[state=active]:text-white">
                <BarChart3 className="w-4 h-4 mr-1" /> Dashboard
              </TabsTrigger>
              <TabsTrigger value="news" className="data-[state=active]:bg-cootapi-green data-[state=active]:text-white">
                <Newspaper className="w-4 h-4 mr-1" /> Notícias
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-cootapi-green data-[state=active]:text-white">
                <Calendar className="w-4 h-4 mr-1" /> Eventos
              </TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:bg-cootapi-green data-[state=active]:text-white">
                <FileText className="w-4 h-4 mr-1" /> Documentos
              </TabsTrigger>
              <TabsTrigger value="informes" className="data-[state=active]:bg-cootapi-green data-[state=active]:text-white">
                <Bell className="w-4 h-4 mr-1" /> Informes
              </TabsTrigger>
              <TabsTrigger value="applications" className="data-[state=active]:bg-cootapi-green data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-1" /> Inscrições
              </TabsTrigger>
              <TabsTrigger value="messages" className="data-[state=active]:bg-cootapi-green data-[state=active]:text-white">
                <MessageSquare className="w-4 h-4 mr-1" /> Mensagens
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard"><DashboardStats /></TabsContent>
            <TabsContent value="news"><NewsManager /></TabsContent>
            <TabsContent value="events"><EventsManager /></TabsContent>
            <TabsContent value="documents"><DocumentsManager /></TabsContent>
            <TabsContent value="informes"><InformesManager /></TabsContent>
            <TabsContent value="applications"><ApplicationsManager /></TabsContent>
            <TabsContent value="messages"><MessagesManager /></TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
