import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Service = { id:string; title:string; description:string; icon:string; sort_order:number; is_active:boolean; };
export type Project = { id:string; title:string; description:string; image_url:string|null; link_url:string|null; tags:string; sort_order:number; is_active:boolean; };
export type DesignStyle = { id:string; name:string; feeling:string; ideal_business:string; commercial_advantage:string; ease_level:string; image_url:string|null; preview_key:string; sort_order:number; is_active:boolean; };
export type ContactMessage = { id:string; name:string; email:string; phone:string|null; message:string; is_read:boolean; created_at:string; };

const PUBLIC_STALE_TIME = 5 * 60 * 1000;
const PUBLIC_GC_TIME = 30 * 60 * 1000;

export const servicesQuery = queryOptions({
  queryKey:["services"], staleTime:PUBLIC_STALE_TIME, gcTime:PUBLIC_GC_TIME,
  queryFn:async():Promise<Service[]>=>{const {data,error}=await supabase.from("services").select("id,title,description,icon,sort_order,is_active").eq("is_active",true).order("sort_order",{ascending:true});if(error)throw error;return(data??[])as Service[];},
});
export const projectsQuery = queryOptions({
  queryKey:["projects"], staleTime:PUBLIC_STALE_TIME, gcTime:PUBLIC_GC_TIME,
  queryFn:async():Promise<Project[]>=>{const {data,error}=await supabase.from("projects").select("id,title,description,image_url,link_url,tags,sort_order,is_active").eq("is_active",true).order("sort_order",{ascending:true});if(error)throw error;return(data??[])as Project[];},
});
export const stylesQuery = queryOptions({
  queryKey:["design_styles"], staleTime:PUBLIC_STALE_TIME, gcTime:PUBLIC_GC_TIME,
  queryFn:async():Promise<DesignStyle[]>=>{const {data,error}=await supabase.from("design_styles").select("id,name,feeling,ideal_business,commercial_advantage,ease_level,image_url,preview_key,sort_order,is_active").eq("is_active",true).order("sort_order",{ascending:true});if(error)throw error;return(data??[])as DesignStyle[];},
});
export const messagesQuery=queryOptions({queryKey:["contact_messages"],queryFn:async():Promise<ContactMessage[]>=>{const{data,error}=await supabase.from("contact_messages").select("*").order("created_at",{ascending:false});if(error)throw error;return(data??[])as ContactMessage[];}});
