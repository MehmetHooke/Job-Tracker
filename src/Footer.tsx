export default function Footer() {
  return (
    <footer className=" border-t border-white/10 bg-[#1f2023] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Left */}
        <div className="text-sm opacity-80">
          <div className="font-semibold">Job Tracker</div>
          <div className="opacity-60">
            Built with React & TypeScript
          </div>
        </div>

        {/* Center */}
        <div className="text-sm opacity-70">
          Kanban-style job application tracking app
        </div>

        {/* Right */}
        <div className="flex gap-4 text-sm">
          <a
            href="https://github.com/MehmetHooke/Job-Tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mehmethoke/"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-xs opacity-50 pb-4">
        © {new Date().getFullYear()} Mehmet Höke. All rights reserved.
      </div>
    </footer>
  );
}
