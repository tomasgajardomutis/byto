CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF lower(NEW.email) = 'tomas.gajardo.mutis@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_assign_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'sparkles',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active services" ON public.services FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "Admins manage services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text,
  link_url text,
  tags text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active projects" ON public.projects FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.design_styles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  feeling text NOT NULL DEFAULT '',
  ideal_business text NOT NULL DEFAULT '',
  commercial_advantage text NOT NULL DEFAULT '',
  ease_level text NOT NULL DEFAULT '',
  image_url text,
  preview_key text NOT NULL DEFAULT 'aurora',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.design_styles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.design_styles TO authenticated;
GRANT ALL ON public.design_styles TO service_role;
ALTER TABLE public.design_styles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active styles" ON public.design_styles FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "Admins manage styles" ON public.design_styles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER design_styles_updated_at BEFORE UPDATE ON public.design_styles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.services (title, description, icon, sort_order) VALUES
('Desarrollo Web', 'Sitios rápidos, seguros y a medida, construidos con tecnología moderna y pensados para convertir visitas en clientes.', 'code', 1),
('E-commerce', 'Tiendas online completas con pagos, inventario y una experiencia de compra fluida desde el celular.', 'cart', 2),
('Posicionamiento Web (SEO)', 'Optimización técnica y de contenido para que tu negocio aparezca primero cuando te buscan en Google.', 'search', 3),
('Aplicaciones Web', 'Plataformas y paneles internos a medida: reservas, gestión, automatizaciones y datos en tiempo real.', 'layers', 4),
('Ficha de Google Business', 'Optimización de tu perfil de empresa en Google para dominar las búsquedas locales y ganar reseñas.', 'mappin', 5);

INSERT INTO public.projects (title, description, link_url, tags, sort_order) VALUES
('Nova Studio', 'Sitio corporativo con animaciones scroll-driven y carga instantánea para una consultora de innovación.', 'https://example.com', 'Landing,Animaciones,SEO', 1),
('Kaia Store', 'E-commerce mobile-first con checkout en dos pasos que aumentó la conversión móvil de la marca.', 'https://example.com', 'E-commerce,UX,Pagos', 2),
('Ruta Local', 'Aplicación web de reservas con panel de administración y notificaciones automáticas por WhatsApp.', 'https://example.com', 'App Web,Panel,Automatización', 3);

INSERT INTO public.design_styles (name, feeling, ideal_business, commercial_advantage, ease_level, preview_key, sort_order) VALUES
('Bento Grid', 'Organizado, moderno y profesional. Todo ordenado en cajas limpias como un panel inteligente.', 'Startups, tecnología, servicios profesionales y portafolios.', 'Permite entender tus servicios y datos clave en solo 3 segundos de un vistazo.', 'Excelente', 'bento', 1),
('Aurora UI', 'Tecnológico, premium y futurista. Fondos oscuros con luces de colores suaves.', 'Software (SaaS), empresas de innovación y marcas de alta gama.', 'Hace que tu marca se vea costosa, sofisticada y líder en el mercado digital.', 'Excelente', 'aurora', 2),
('Neo-brutalismo', 'Audaz, rebelde y muy original. Colores llamativos, letras grandes y bordes negros marcados.', 'Marcas de ropa, creadores de contenido, Web3 y agencias creativas.', 'Te separa radicalmente de tu competencia. Imposible de olvidar.', 'Regular', 'brutal', 3),
('Flat Design 2.0', 'Limpio, directo y corporativo. El clásico de internet pero mejorado, sin decoraciones innecesarias.', 'Pymes tradicionales, tiendas online y corporativos.', 'Carga muy rápido en celulares y genera confianza inmediata por su familiaridad.', 'Excelente', 'flat', 4),
('Glassmorphism', 'Elegante y transparente. Elementos que parecen tarjetas de cristal flotando sobre el fondo.', 'Apps móviles premium, banca digital y diseño de producto.', 'Transmite transparencia, diseño cuidado y tecnología de última generación.', 'Buena', 'glass', 5),
('Claymorphism', 'Amigable, divertido y cercano. Botones que parecen hechos de plastilina suave en 3D.', 'Educación, apps infantiles, videojuegos y marcas jóvenes.', 'Rompe el miedo a la tecnología: se siente fácil y divertido de usar.', 'Excelente', 'clay', 6),
('Neumorphism', 'Minimalista y futurista. Botones que parecen esculpidos en la misma pared del fondo.', 'Marcas de diseño minimalista o interfaces de dispositivos inteligentes.', 'Muy estético y pulido visualmente para proyectos minimalistas.', 'Baja', 'neu', 7),
('Skeuomorphism', 'Nostálgico y realista. Imita texturas reales como madera, metal o cuero.', 'Tiendas de nicho, proyectos retro o marcas con componente histórico.', 'Conecta emocionalmente a través de la nostalgia y el hiperrealismo.', 'Excelente', 'skeu', 8);