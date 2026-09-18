/**
 * Download slot. Until the client supplies the PDF this renders in an honest
 * disabled state — never a dead link, never a fake file.
 */
export default function DownloadCard({
  label,
  href,
}: {
  label: string
  href?: string
}) {
  const pending = !href

  const inner = (
    <>
      <span
        aria-hidden
        className={`grid h-11 w-11 flex-none place-items-center rounded-[var(--r-sm)] ${
          pending
            ? 'bg-[var(--bg-inset)] text-[var(--ink-subtle)]'
            : 'bg-[var(--accent)] text-[var(--steel-950)]'
        }`}
      >
        ↓
      </span>
      <span className="flex flex-col">
        <span className="font-semibold text-[var(--ink-strong)]">{label}</span>
        <span className="text-sm text-[var(--ink-muted)]">
          {pending ? 'Data sheet coming soon' : 'PDF'}
        </span>
      </span>
    </>
  )

  if (pending) {
    return (
      <div
        aria-disabled="true"
        className="flex items-center gap-4 rounded-[var(--r-lg)] border border-dashed border-[var(--border-strong)] bg-[var(--bg-subtle)] p-5 opacity-80"
      >
        {inner}
      </div>
    )
  }

  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-[var(--r-lg)] border border-[var(--border)] bg-white p-5 shadow-[var(--sh-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--sh-md)]"
    >
      {inner}
    </a>
  )
}
