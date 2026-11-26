import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

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

const prettyCode = {
  theme: "github-dark-dimmed",
  keepBackground: false,
};

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={{ Mermaid }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMermaid],
          rehypePlugins: [[rehypePrettyCode, prettyCode]],
        },
      }}
    />
  );
}
