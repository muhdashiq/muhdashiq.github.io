const updated = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(
  new Date(__BUILD_DATE__),
);

export const Footer = () => (
  <footer className="border-t border-line">
    <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-ink-3 sm:flex-row sm:justify-between sm:px-6">
      <p>
        Built with React, TypeScript, Tailwind CSS and GSAP.{' '}
        <a
          href="https://github.com/muhdashiq/muhdashiq.github.io"
          className="text-ink-2 underline underline-offset-4 hover:text-ink"
        >
          View the source
        </a>
      </p>
      <p>Updated {updated}</p>
    </div>
  </footer>
);
