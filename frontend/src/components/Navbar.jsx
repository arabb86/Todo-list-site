import { Link, useLocation } from "react-router-dom";
import { BookOpen } from "lucide-react";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
            <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
            NoteKeeper
          </span>
        </Link>

        {/* Links */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === "/"
                ? "bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === "/create"
                ? "bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
          >
            Create
          </Link>
          <Link
            to="/archive"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === "/archive"
                ? "bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
          >
            Archive
          </Link>
          <Link
            to="/trash"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === "/trash"
                ? "bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
          >
            Trash
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
