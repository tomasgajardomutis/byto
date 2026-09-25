import { useState } from "react";
import { Mail, MessageCircle, Send, Instagram, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SITE, whatsappLink } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function ContactSection() {
  const [sending, setSending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim() || null,
      message: String(data.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      toast.error("Completa nombre, correo y mensaje.");
      return;
    }

    setSending(true);
    const { error } = await supabase.from("contact_messages").insert(payload);
    setSending(false);

    if (error) {
      toast.error("No pudimos enviar tu mensaje. Escríbeme por WhatsApp.");
      return;
    }
    toast.success("¡Mensaje enviado! Te respondo hoy mismo.");
    form.reset();
  }

  const inputClass =
    "w-full rounded-2xl border border-input bg-surface/60 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40 focus:outline-none";

  return (
    <section id="contacto" className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Contacto"
          title="Cuéntame tu proyecto"
          subtitle="Respondo el mismo día. Sin formularios eternos ni compromisos."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="glass-panel rounded-3xl p-6 sm:p-8">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-muted-foreground">Nombre</span>
                  <input name="name" required className={inputClass} placeholder="Tu nombre" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-muted-foreground">Correo</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="tucorreo@email.com"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm text-muted-foreground">
                  Teléfono (opcional)
                </span>
                <input
                  name="phone"
                  type="tel"
                  className={inputClass}
                  placeholder="+56 9 1234 5678"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-muted-foreground">Mensaje</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className={inputClass}
                  placeholder="Necesito una web para..."
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="glow-ring inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-aurora)] px-6 py-4 font-display text-base font-bold text-background transition-transform active:scale-95 disabled:opacity-60"
              >
                <Send className="h-5 w-5" />
                {sending ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-3">
            <a
              href={whatsappLink("Hola Byto, quiero cotizar un proyecto.")}
              target="_blank"
              rel="noreferrer"
              className="aurora-border glass-panel flex items-center gap-4 rounded-3xl p-5"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-neon/20 text-neon">
                <MessageCircle className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display font-semibold">WhatsApp</span>
                <span className="block text-sm text-muted-foreground">{SITE.whatsappDisplay}</span>
              </span>
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="aurora-border glass-panel flex items-center gap-4 rounded-3xl p-5"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/20 text-primary">
                <Mail className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display font-semibold">Correo</span>
                <span className="block text-sm text-muted-foreground">{SITE.email}</span>
              </span>
            </a>

            <div className="glass-panel rounded-3xl p-5">
              <p className="font-display font-semibold">Redes sociales</p>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-surface-2/60 text-foreground transition-colors hover:text-accent"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-surface-2/60 text-foreground transition-colors hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
