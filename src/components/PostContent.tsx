
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

interface PostContentProps {
  content: string;
}

type CodeProps = {
  node: any;
  inline: boolean;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
};

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="github-markdown pb-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <Prism
                language={match[1]}
                style={vscDarkPlus}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </Prism>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
