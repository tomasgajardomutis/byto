import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { messagesQuery } from "@/lib/content";
import { AdminCard, GhostButton } from "./fields";

export function AdminMessages() {
  const client = useQueryClient();
  const { data: messages = [] } = useQuery(messagesQuery);

  async function remove(id: string) {
    if (!window.confirm("¿Eliminar este mensaje?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) {
      toast.error("No se pudo eliminar.");
      return;
    }
    client.invalidateQueries({ queryKey: ["contact_messages"] });
  }

  if (messages.length === 0) {
    return (
      <AdminCard>
        <p className="text-sm text-muted-foreground">Aún no hay mensajes de contacto.</p>
      </AdminCard>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <AdminCard key={m.id}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-lg font-semibold">{m.name}</h3>
            <span className="text-xs text-muted-foreground">
              {new Date(m.created_at).toLocaleString("es-CL")}
            </span>
          </div>
          <p className="text-sm whitespace-pre-line text-muted-foreground">{m.message}</p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-sm">
            <a href={`mailto:${m.email}`} className="inline-flex items-center gap-2 text-primary">
              <Mail className="h-4 w-4" />
              {m.email}
            </a>
            {m.phone && <span className="text-muted-foreground">{m.phone}</span>}
          </div>
          <GhostButton onClick={() => remove(m.id)}>
            <Trash2 className="h-4 w-4" />
            Eliminar
          </GhostButton>
        </AdminCard>
      ))}
    </div>
  );
}
