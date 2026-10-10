import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-invert prose-lg max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-h2:mt-12 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-chalk prose-table:text-sm prose-th:text-chalk prose-td:text-muted">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          a: ({ href = "", children }) =>
            href.startsWith("/") ? (
              <Link href={href}>{children}</Link>
            ) : (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

/** Extracts h2 headings from markdown for the table of contents (ids match rehype-slug). */
export function getHeadings(md: string) {
  return [...md.matchAll(/^## (.+)$/gm)].map((m) => {
    const text = m[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s/g, "-");
    return { text, id };
  });
}
