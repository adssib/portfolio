import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import { asset } from "@/lib/asset";
import { Mermaid } from "@/components/mermaid";

type Node = { type: string; lang?: string | null; value?: string; children?: Node[]; [key: string]: unknown };

/** Turns ```mermaid fences into <Mermaid chart="..." /> before code highlighting sees them. */
function remarkMermaid() {
  return (tree: Node) => {
    const walk = (node: Node) => {
      node.children?.forEach((child, i) => {
        if (child.type === "code" && child.lang === "mermaid") {
          node.children![i] = {
            type: "mdxJsxFlowElement",
            name: "Mermaid",
            attributes: [{ type: "mdxJsxAttribute", name: "chart", value: child.value ?? "" }],
            children: [],
          };
        } else {
          walk(child);
        }
      });
    };
    walk(tree);
  };
}

/** Markdown wraps a lone image in a paragraph, but a <figure> can't sit inside <p>;
 *  lift such images out so the HTML is valid and React can hydrate it. */
function remarkUnwrapImages() {
  return (tree: Node) => {
    const walk = (node: Node) => {
      node.children?.forEach((child, i) => {
        const kids = child.children?.filter((k) => !(k.type === "text" && !String(k.value ?? "").trim()));
        if (child.type === "paragraph" && kids?.length === 1 && kids[0].type === "image") {
          node.children![i] = kids[0];
        } else {
          walk(child);
        }
      });
    };
    walk(tree);
  };
}

const prettyCode = {
  theme: "github-dark-dimmed",
  keepBackground: false,
};

/** Markdown images become figures on a white card (charts are drawn for white),
 *  with the image title as the caption and the site base path added. */
function Figure({ src, alt, title }: { src?: string; alt?: string; title?: string }) {
  return (
    <figure className="not-prose my-10">
      <div className="overflow-hidden rounded-md bg-white p-3 ring-1 ring-line/10 sm:p-5">
        <img src={asset(src ?? "")} alt={alt ?? ""} loading="lazy" className="mx-auto h-auto w-full max-w-4xl" />
      </div>
      {title && <figcaption className="mt-3 text-center text-sm text-muted">{title}</figcaption>}
    </figure>
  );
}

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={{ Mermaid, img: Figure }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMermaid, remarkUnwrapImages],
          rehypePlugins: [[rehypePrettyCode, prettyCode]],
        },
      }}
    />
  );
}
