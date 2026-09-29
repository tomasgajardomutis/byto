import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AdminCard, Field, GhostButton, PrimaryButton, adminInput } from "./fields";

type Post = { id:string; title:string; slug:string; excerpt:string; content:string; image_url:string|null; category:string; tags:string; meta_title:string; meta_description:string; is_published:boolean; published_at:string|null; sort_order:number };
const db = supabase as any;

export function AdminBlog(){
 const client=useQueryClient();
 const {data:posts=[]}=useQuery<Post[]>({queryKey:["admin-blog"],queryFn:async()=>{const {data,error}=await db.from("blog_posts").select("*").order("sort_order",{ascending:true});if(error)throw error;return data??[];}});
 const refresh=()=>client.invalidateQueries({queryKey:["admin-blog"]});
 async function add(){const {error}=await db.from("blog_posts").insert({title:"Nueva publicación",slug:`nueva-publicacion-${Date.now()}`,excerpt:"",content:"",category:"",tags:"",meta_title:"",meta_description:"",is_published:false,sort_order:posts.length+1});if(error)return toast.error("No se pudo crear la publicación.");toast.success("Publicación creada como borrador.");refresh();}
 return <div className="space-y-4"><PrimaryButton onClick={add}><Plus className="h-4 w-4"/>Nueva publicación</PrimaryButton>{posts.map(p=><PostEditor key={p.id} post={p} refresh={refresh}/>)}</div>;
}
function PostEditor({post,refresh}:{post:Post;refresh:()=>void}){
 const [d,setD]=useState(post); const [busy,setBusy]=useState(false); const set=(k:keyof Post,v:any)=>setD(x=>({...x,[k]:v}));
 async function save(){setBusy(true);const payload={title:d.title,slug:d.slug.trim().toLowerCase().replace(/[^a-z0-9áéíóúñ]+/g,"-").replace(/^-|-$/g,""),excerpt:d.excerpt,content:d.content,image_url:d.image_url||null,category:d.category,tags:d.tags,meta_title:d.meta_title,meta_description:d.meta_description,is_published:d.is_published,published_at:d.is_published?(d.published_at||new Date().toISOString()):null,sort_order:d.sort_order};const {error}=await db.from("blog_posts").update(payload).eq("id",d.id);setBusy(false);if(error)return toast.error("No se pudo guardar.");toast.success("Publicación guardada.");refresh();}
 async function remove(){if(!confirm("¿Eliminar esta publicación?"))return;const {error}=await db.from("blog_posts").delete().eq("id",d.id);if(error)return toast.error("No se pudo eliminar.");toast.success("Publicación eliminada.");refresh();}
 return <AdminCard><div className="flex items-center justify-between gap-4"><h3 className="font-display text-lg font-semibold">{d.title}</h3><span className={`rounded-full px-3 py-1 text-xs font-semibold ${d.is_published?"bg-primary/15 text-primary":"bg-surface-2 text-muted-foreground"}`}>{d.is_published?"Publicado":"Borrador"}</span></div><div className="mt-4 grid gap-3 sm:grid-cols-2">
 <Field label="Título"><input className={adminInput} value={d.title} onChange={e=>set("title",e.target.value)}/></Field><Field label="Slug"><input className={adminInput} value={d.slug} onChange={e=>set("slug",e.target.value)}/></Field>
 <Field label="Categoría"><input className={adminInput} value={d.category} onChange={e=>set("category",e.target.value)}/></Field><Field label="Etiquetas (separadas por coma)"><input className={adminInput} value={d.tags} onChange={e=>set("tags",e.target.value)}/></Field>
 <div className="sm:col-span-2"><Field label="Imagen (URL)"><input className={adminInput} value={d.image_url??""} onChange={e=>set("image_url",e.target.value)}/></Field></div>
 <div className="sm:col-span-2"><Field label="Extracto"><textarea rows={3} className={adminInput} value={d.excerpt} onChange={e=>set("excerpt",e.target.value)}/></Field></div>
 <div className="sm:col-span-2"><Field label="Contenido"><textarea rows={14} className={adminInput} value={d.content} onChange={e=>set("content",e.target.value)} placeholder="Escribe el contenido del artículo. Separa párrafos con una línea en blanco."/></Field></div>
 <Field label="SEO title"><input className={adminInput} value={d.meta_title} onChange={e=>set("meta_title",e.target.value)}/></Field><Field label="SEO description"><input className={adminInput} value={d.meta_description} onChange={e=>set("meta_description",e.target.value)}/></Field>
 <Field label="Orden"><input type="number" className={adminInput} value={d.sort_order} onChange={e=>set("sort_order",Number(e.target.value))}/></Field><label className="flex items-center gap-3 py-6"><input type="checkbox" checked={d.is_published} onChange={e=>set("is_published",e.target.checked)} className="h-5 w-5 accent-[oklch(0.82_0.15_196)]"/><span className="text-sm">Publicar en el sitio</span></label>
 </div><div className="mt-4 flex gap-2"><PrimaryButton onClick={save} disabled={busy}><Save className="h-4 w-4"/>Guardar</PrimaryButton><GhostButton onClick={remove}><Trash2 className="h-4 w-4"/>Eliminar</GhostButton></div></AdminCard>;
}
