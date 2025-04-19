import { useEffect } from "react";

declare global {
  interface Window {
    electron: {
      close: () => void;
      minimize: () => void;
    };
  }
}

export default function AppBar() {
  useEffect(() => {}, []);

  return (
    <div className="w-full h-10 bg-black/20 text-white flex items-center justify-end px-2 draggable">
      <div className="flex gap-2 no-drag">
        <button
          id="minimize"
          onClick={(e) => {
            e.preventDefault();
            window.electron.minimize();
          }}
          className="w-8 h-8 rounded hover:bg-white/10"
        >
          -
        </button>
        <button
          id="close"
          onClick={(e) => {
            e.preventDefault();
            window.electron.close();
          }}
          className="w-8 h-8 rounded hover:bg-white/10"
        >
          ×
        </button>
      </div>
    </div>
  );
}
