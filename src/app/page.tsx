import FileDropZone from '@/components/FileDropZone'
import RecentFiles from '@/components/RecentFiles'
import BottomNav from '@/components/BottomNav'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="px-5 py-5 border-b border-[#1a1a1a] flex-shrink-0">
        <h1 className="font-mono text-[18px] font-semibold text-white tracking-[0.08em]">
          MARK<span className="text-[#555]">#</span>VAULT
        </h1>
        <p className="font-mono text-[10px] text-[#333] tracking-widest uppercase mt-0.5">
          by Csaydimba
        </p>
      </header>

      {/* File drop zone */}
      <FileDropZone />

      {/* Recent files */}
      <RecentFiles />

      {/* Bottom nav */}
      <BottomNav />
    </div>
  )
}
