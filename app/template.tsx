'use client'
// ============================================================================
// app/template.tsx
// Next.js re-mounts this on every navigation, so it is where an enter
// transition would go. It is deliberately a plain passthrough.
//
// A fade-and-rise on every route change means each page starts invisible and
// slightly out of place, which on a fast connection reads as a flicker rather
// than a transition — part of the "glitchy" feel the client reported. Pages
// now appear immediately.
// ============================================================================

export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
