import { SwatchBook } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

import { THEMES } from "../constants";

const ThemeSelecter = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-sm gap-2">
        <SwatchBook className="size-5" />
        <span className="hidden sm:inline">Theme</span>
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
        <ul
          tabIndex={0}
          className="dropdown-content menu-dropdown flex flex-col bg-base-300 rounded-box z-[1] max-h-[90vh] min-w-[10rem] m-1 overflow-auto p-2 shadow-2xl"
        >
          {THEMES.map((t) => (
            <li key={t} className="w-full">
              <button
                key={t}
                className={`group flex flex-col w-full gap-1 p-2 rounded-lg transition-colors ${
                  theme === t ? "bg-base-200" : "hover:bg-base-200/50"
                }`}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative h-8 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[11px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThemeSelecter;
