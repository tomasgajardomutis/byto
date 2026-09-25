import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hola Byto, vengo desde tu sitio web.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      className="glow-ring fixed right-5 bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-neon text-neon-foreground transition-transform active:scale-90 md:h-16 md:w-16"
    >
      <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
    </a>
  );
}
