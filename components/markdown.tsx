"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-emerald dark:prose-invert max-w-none prose-headings:text-emerald-800 dark:prose-headings:text-emerald-100 prose-p:text-emerald-900 dark:prose-p:text-emerald-50 prose-strong:text-emerald-700 dark:prose-strong:text-emerald-200 prose-ul:text-emerald-900 dark:prose-ul:text-emerald-50 prose-ol:text-emerald-900 dark:prose-ol:text-emerald-50 prose-code:bg-emerald-100 dark:prose-code:bg-emerald-900/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-emerald-950 dark:prose-pre:bg-emerald-950"
    >
      {content}
    </ReactMarkdown>
  );
}
