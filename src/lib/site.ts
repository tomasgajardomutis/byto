export const SITE = {
  name: "Byto",
  tagline: "Desarrollo web que convierte visitas en clientes",
  whatsappNumber: "56997113344",
  whatsappDisplay: "+56 9 9711 3344",
  email: "contacto@byto.cl",
  adminEmail: "tomas.gajardo.mutis@gmail.com",
  city: "Santiago, Chile",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
