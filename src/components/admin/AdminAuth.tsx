import { useState } from "react";
import { LogIn, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

const inputClass =
  "w-full rounded-2xl border border-input bg-surface/70 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40 focus:outline-none";

export function AdminAuth() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) {
        toast.error("Correo o contraseña incorrectos.");
        return;
      }
      toast.success("Sesión iniciada.");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setBusy(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Cuenta creada. Revisa tu correo para confirmarla.");
    }
  }

  async function onGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/admin`,
    });
    if (result.error) toast.error("No se pudo iniciar sesión con Google.");
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="glass-panel rounded-3xl p-7">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-aurora)] text-background">
          <ShieldAlert className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold">Panel de Byto</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Acceso restringido. Ingresa con la cuenta autorizada del administrador.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            className={inputClass}
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className={inputClass}
          />
          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-aurora)] px-6 py-4 font-display font-bold text-background disabled:opacity-60"
          >
            <LogIn className="h-5 w-5" />
            {mode === "signin" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>

        <button
          type="button"
          onClick={onGoogle}
          className="mt-3 w-full rounded-2xl border border-border bg-surface-2/60 px-6 py-4 font-display font-semibold"
        >
          Continuar con Google
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-5 w-full text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          {mode === "signin" ? "Primera vez: crear cuenta" : "Ya tengo cuenta"}
        </button>
      </div>
    </div>
  );
}
