import type { MDXComponents } from "mdx/types";

/**
 * Styles every note body. Required at the project root by @next/mdx.
 *
 * Prose styling lives here rather than in a wrapper's CSS so the note bodies
 * stay plain MDX — no classes in the content, no Tailwind knowledge needed to
 * write a post.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }) => (
      <h2
        className="font-display mt-14 mb-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="font-display mt-10 mb-3 text-xl font-semibold tracking-tight text-ink"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-6 text-lg leading-relaxed text-muted" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mb-6 space-y-3 pl-5" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-6 list-decimal space-y-3 pl-5" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li
        className="relative text-lg leading-relaxed text-muted marker:text-accent"
        {...props}
      >
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-ink" {...props}>
        {children}
      </strong>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
        {...(href?.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-8 border-l-2 border-accent pl-6 text-lg italic text-muted"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => (
      <code
        className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="mb-6 overflow-x-auto rounded-2xl border border-line bg-surface p-5 font-mono text-sm leading-relaxed"
        {...props}
      >
        {children}
      </pre>
    ),
    hr: (props) => <hr className="my-12 border-line" {...props} />,
    ...components,
  };
}
