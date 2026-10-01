import { useEffect, useRef } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Quote, Link2, RemoveFormatting, Heading2, Heading3 } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const allowedTags = new Set([
  "P", "BR", "STRONG", "B", "EM", "I", "U", "H2", "H3",
  "UL", "OL", "LI", "A", "BLOCKQUOTE", "DIV",
]);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toEditorHtml(value: string) {
  if (!value) return "";
  if (/<\/?[a-z][\s\S]*>/i.test(value)) return value;
  return value
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export function sanitizeBlogHtml(html: string) {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");

  const clean = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType !== Node.ELEMENT_NODE) continue;
      const el = child as HTMLElement;

      if (["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED"].includes(el.tagName)) {
        el.remove();
        continue;
      }

      if (!allowedTags.has(el.tagName)) {
        el.replaceWith(...Array.from(el.childNodes));
        continue;
      }

      for (const attr of Array.from(el.attributes)) {
        if (el.tagName === "A" && attr.name === "href") continue;
        el.removeAttribute(attr.name);
      }

      if (el.tagName === "A") {
        const href = el.getAttribute("href") ?? "";
        if (!/^(https?:\/\/|mailto:|\/|#)/i.test(href)) el.removeAttribute("href");
        el.setAttribute("rel", "noopener noreferrer");
        if (/^https?:\/\//i.test(href)) el.setAttribute("target", "_blank");
      }

      clean(el);
    }
  };

  clean(doc.body);
  return doc.body.innerHTML;
}

function ToolButton({
  title,
  onMouseDown,
  children,
}: {
  title: string;
  onMouseDown: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(event) => {
        event.preventDefault();
        onMouseDown();
      }}
      className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const next = toEditorHtml(value);
    if (editor.innerHTML !== next) editor.innerHTML = next;
  }, [value]);

  const emit = () => {
    const editor = editorRef.current;
    if (!editor) return;
    onChange(sanitizeBlogHtml(editor.innerHTML));
  };

  const command = (name: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(name, false, commandValue);
    emit();
  };

  const addLink = () => {
    const url = window.prompt("URL del enlace:");
    if (!url) return;
    command("createLink", url);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background/50">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface/60 p-2">
        <ToolButton title="Negrita" onMouseDown={() => command("bold")}><Bold className="h-4 w-4" /></ToolButton>
        <ToolButton title="Cursiva" onMouseDown={() => command("italic")}><Italic className="h-4 w-4" /></ToolButton>
        <ToolButton title="Subrayado" onMouseDown={() => command("underline")}><Underline className="h-4 w-4" /></ToolButton>
        <span className="mx-1 h-6 w-px bg-border" />
        <ToolButton title="Título grande" onMouseDown={() => command("formatBlock", "h2")}><Heading2 className="h-4 w-4" /></ToolButton>
        <ToolButton title="Subtítulo" onMouseDown={() => command("formatBlock", "h3")}><Heading3 className="h-4 w-4" /></ToolButton>
        <ToolButton title="Párrafo normal" onMouseDown={() => command("formatBlock", "p")}><span className="text-sm font-semibold">P</span></ToolButton>
        <span className="mx-1 h-6 w-px bg-border" />
        <ToolButton title="Lista con viñetas" onMouseDown={() => command("insertUnorderedList")}><List className="h-4 w-4" /></ToolButton>
        <ToolButton title="Lista numerada" onMouseDown={() => command("insertOrderedList")}><ListOrdered className="h-4 w-4" /></ToolButton>
        <ToolButton title="Cita" onMouseDown={() => command("formatBlock", "blockquote")}><Quote className="h-4 w-4" /></ToolButton>
        <ToolButton title="Agregar enlace" onMouseDown={addLink}><Link2 className="h-4 w-4" /></ToolButton>
        <span className="mx-1 h-6 w-px bg-border" />
        <ToolButton title="Quitar formato" onMouseDown={() => command("removeFormat")}><RemoveFormatting className="h-4 w-4" /></ToolButton>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        onPaste={(event) => {
          event.preventDefault();
          const text = event.clipboardData.getData("text/plain");
          document.execCommand("insertText", false, text);
          emit();
        }}
        data-placeholder="Escribe el contenido del artículo…"
        className="blog-content min-h-[22rem] px-4 py-4 text-base leading-8 text-foreground outline-none empty:before:pointer-events-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
      />
    </div>
  );
}
