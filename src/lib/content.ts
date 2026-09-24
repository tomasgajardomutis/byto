import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link_url: string | null;
  tags: string;
  sort_order: number;
  is_active: boolean;
};

export type DesignStyle = {
  id: string;
  name: string;
  feeling: string;
  ideal_business: string;
  commercial_advantage: string;
  ease_level: string;
  image_url: string | null;
  preview_key: string;
  sort_order: number;
  is_active: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export const servicesQuery = queryOptions({
  queryKey: ["services"],
  queryFn: async (): Promise<Service[]> => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Service[];
  },
});

export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Project[];
  },
});

export const stylesQuery = queryOptions({
  queryKey: ["design_styles"],
  queryFn: async (): Promise<DesignStyle[]> => {
    const { data, error } = await supabase
      .from("design_styles")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as DesignStyle[];
  },
});

export const messagesQuery = queryOptions({
  queryKey: ["contact_messages"],
  queryFn: async (): Promise<ContactMessage[]> => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as ContactMessage[];
  },
});
