import WindowManager from "@/features/desktop/components/windowManager";

export default function DesktopMain() {
  return (
    <div
      className="w-svw h-svh flex flex-col justify-between bg-cover bg-bottom"
      style={{backgroundImage: `url('/images/desktop/background.png')`}}
    >
      <div className="relative h-full w-full overflow-hidden">
        <WindowManager />
      </div>
      <div className="w-full h-12 bg-gradient-to-r from-slate-950/[0.8] via-slate-900/[0.8] to-slate-950/[0.8] backdrop-blur-3xl">
        <div className="w-4 h-4 bg-white" />
      </div>
    </div>
  );
}
