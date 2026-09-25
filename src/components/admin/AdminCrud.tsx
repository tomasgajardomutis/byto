import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AdminCard, Field, GhostButton, PrimaryButton, adminInput } from "./fields";

export type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "switch" | "select";
  options?: { value: string; label: string }[];
  placeholder?: string;
};

type Row = Record<string, unknown> & { id: string };

type Props = {
  table: "services" | "projects" | "design_styles";
  queryKey: string;
  fields: FieldDef[];
  titleKey: string;
  emptyRow: Record<string, unknown>;
};

export function AdminCrud({ table, queryKey, fields, titleKey, emptyRow }: Props) {
  const client = useQueryClient();
  const { data: rows = [] } = useQuery<Row[]>({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const refresh = () => client.invalidateQueries({ queryKey: [queryKey] });

  async function addRow() {
    const { error } = await supabase
      .from(table)
      .insert({ ...emptyRow, sort_order: rows.length + 1 } as never);
    if (error) {
      toast.error("No se pudo crear el elemento.");
      return;
    }
    toast.success("Elemento creado.");
    refresh();
  }

  return (
    <div className="space-y-4">
      <PrimaryButton onClick={addRow}>
        <Plus className="h-4 w-4" />
        Agregar
      </PrimaryButton>

      {rows.map((row) => (
        <EditableRow
          key={row.id}
          row={row}
          fields={fields}
          table={table}
          titleKey={titleKey}
          onDone={refresh}
        />
      ))}
    </div>
  );
}

function EditableRow({
  row,
  fields,
  table,
  titleKey,
  onDone,
}: {
  row: Row;
  fields: FieldDef[];
  table: Props["table"];
  titleKey: string;
  onDone: () => void;
}) {
  const [draft, setDraft] = useState<Row>(row);
  const [busy, setBusy] = useState(false);

  const set = (key: string, value: unknown) => setDraft((d) => ({ ...d, [key]: value }));

  async function save() {
    setBusy(true);
    const { id, created_at, updated_at, ...payload } = draft;
    void created_at;
    void updated_at;
    const { error } = await supabase
      .from(table)
      .update(payload as never)
      .eq("id", id);
    setBusy(false);
    if (error) {
      toast.error("No se pudo guardar.");
      return;
    }
    toast.success("Cambios guardados.");
    onDone();
  }

  async function remove() {
    if (!window.confirm("¿Eliminar este elemento?")) return;
    const { error } = await supabase.from(table).delete().eq("id", row.id);
    if (error) {
      toast.error("No se pudo eliminar.");
      return;
    }
    toast.success("Elemento eliminado.");
    onDone();
  }

  return (
    <AdminCard>
      <h3 className="font-display text-lg font-semibold">
        {String(draft[titleKey] ?? "Sin título")}
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((f) => {
          const value = draft[f.key];
          if (f.type === "switch") {
            return (
              <label key={f.key} className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  checked={Boolean(value)}
                  onChange={(e) => set(f.key, e.target.checked)}
                  className="h-5 w-5 accent-[oklch(0.82_0.15_196)]"
                />
                <span className="text-sm">{f.label}</span>
              </label>
            );
          }
          if (f.type === "textarea") {
            return (
              <div key={f.key} className="sm:col-span-2">
                <Field label={f.label}>
                  <textarea
                    rows={3}
                    value={String(value ?? "")}
                    placeholder={f.placeholder}
                    onChange={(e) => set(f.key, e.target.value)}
                    className={adminInput}
                  />
                </Field>
              </div>
            );
          }
          if (f.type === "select") {
            return (
              <Field key={f.key} label={f.label}>
                <select
                  value={String(value ?? "")}
                  onChange={(e) => set(f.key, e.target.value)}
                  className={adminInput}
                >
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
            );
          }
          return (
            <Field key={f.key} label={f.label}>
              <input
                type={f.type === "number" ? "number" : "text"}
                value={value === null || value === undefined ? "" : String(value)}
                placeholder={f.placeholder}
                onChange={(e) =>
                  set(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)
                }
                className={adminInput}
              />
            </Field>
          );
        })}
      </div>

      <div className="flex gap-2 pt-1">
        <PrimaryButton onClick={save} disabled={busy}>
          <Save className="h-4 w-4" />
          Guardar
        </PrimaryButton>
        <GhostButton onClick={remove}>
          <Trash2 className="h-4 w-4" />
          Eliminar
        </GhostButton>
      </div>
    </AdminCard>
  );
}
