import FileDropZone from '@/components/FileDropZone'
import RecentFiles from '@/components/RecentFiles'
import BottomNav from '@/components/BottomNav'

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      {/* Header */}
      <header className="px-5 py-5 border-b border-[#1a1a1a] flex-shrink-0">
        <h1 className="font-mono text-[18px] font-semibold text-white tracking-[0.08em]">
          MARK<span className="text-[#555]">#</span>VAULT
        </h1>
        <p className="font-mono text-[10px] text-[#333] tracking-widest uppercase mt-0.5">
          by Csaydimba
        </p>
      </header>

      {/* Scrollable middle content */}
      <div className="flex-1 overflow-y-auto">
        <FileDropZone />
        <RecentFiles />
      </div>

      {/* Bottom nav always at bottom */}
      <BottomNav />
    </div>
  )
}
