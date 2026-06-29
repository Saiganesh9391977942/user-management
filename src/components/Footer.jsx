const Footer = () => (
  <footer className="border-t border-slate-800 mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-sm text-slate-500">
            © {new Date().getFullYear()} <span className="text-slate-300 font-medium">UserHub</span> — User Management Dashboard
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Powered by{' '}
          <a
            href="https://jsonplaceholder.typicode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-500 hover:text-violet-400 transition-colors"
          >
            JSONPlaceholder
          </a>
        </div>

      </div>
    </div>
  </footer>
);

export default Footer;
