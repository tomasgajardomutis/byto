import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ContentPage } from "@/components/ContentPage";
import { supabase } from "@/integrations/supabase/client";

const db=supabase as any;
const SITE_URL="https://byto.cl";
type Post={title:string;slug:string;excerpt:string;content:string;image_url:string|null;category:string;tags:string;meta_title:string;meta_description:string;published_at:string|null};

async function getPost(slug:string):Promise<Post|null>{
 const{data,error}=await db.from("blog_posts").select("*").eq("slug",slug).eq("is_published",true).maybeSingle();
 if(error)throw error;
 return data;
}

export const Route=createFileRoute("/blog/$slug")({
 loader:async({params,context})=>context.queryClient.ensureQueryData({queryKey:["blog-post",params.slug],queryFn:()=>getPost(params.slug)}),
 head:({loaderData:post})=>{
  if(!post)return{meta:[{title:"Publicación no encontrada | Byto"},{name:"robots",content:"noindex, nofollow"}]};
  const title=post.meta_title||`${post.title} | Byto`;
  const description=post.meta_description||post.excerpt;
  const url=`${SITE_URL}/blog/${post.slug}`;
  return{
   meta:[{title},{name:"description",content:description},{name:"author",content:"Byto"},{name:"robots",content:"index, follow, max-image-preview:large"},{property:"og:title",content:title},{property:"og:description",content:description},{property:"og:type",content:"article"},{property:"og:url",content:url},{property:"og:locale",content:"es_CL"},...(post.image_url?[{property:"og:image",content:post.image_url}]:[]),{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:title},{name:"twitter:description",content:description},...(post.image_url?[{name:"twitter:image",content:post.image_url}]:[])],
   links:[{rel:"canonical",href:url}],
   scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"BlogPosting",headline:post.title,description,image:post.image_url||undefined,datePublished:post.published_at||undefined,dateModified:post.published_at||undefined,inLanguage:"es-CL",mainEntityOfPage:{"@type":"WebPage","@id":url},author:{"@type":"Organization",name:"Byto",url:SITE_URL},publisher:{"@type":"Organization",name:"Byto",url:SITE_URL},articleSection:post.category||undefined,keywords:post.tags||undefined})}]
  };
 },
 component:Page
});

function Page(){const{slug}=Route.useParams();const{data:post,isLoading}=useQuery<Post|null>({queryKey:["blog-post",slug],queryFn:()=>getPost(slug)});if(isLoading)return <ContentPage eyebrow="Blog" title="Cargando…" intro=""> </ContentPage>;if(!post)return <ContentPage eyebrow="Blog" title="Publicación no encontrada" intro="El artículo que buscas no está disponible."><Link to="/blog" className="font-semibold text-primary">Volver al blog</Link></ContentPage>;const isRich=/<\/?[a-z][\s\S]*>/i.test(post.content);return <ContentPage eyebrow={post.category||"Blog"} title={post.title} intro={post.excerpt}><article className="mx-auto max-w-3xl">{post.image_url&&<img src={post.image_url} alt={post.title} className="mb-10 aspect-[16/9] w-full rounded-3xl object-cover"/>}{isRich?<div className="blog-content text-base leading-8 text-muted-foreground" dangerouslySetInnerHTML={{__html:post.content}}/>:<div className="space-y-6 text-base leading-8 text-muted-foreground">{post.content.split(/\n\s*\n/).filter(Boolean).map((p,i)=><p key={i}>{p}</p>)}</div>}{post.tags&&<div className="mt-12 flex flex-wrap gap-2">{post.tags.split(",").map(tag=><span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{tag.trim()}</span>)}</div>}</article></ContentPage>}
