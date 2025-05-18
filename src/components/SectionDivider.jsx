export default function SectionDivider({ children }) {
  return (
    <div className="w-full flex items-center justify-center my-14">
      <div className="flex items-center gap-4 w-full max-w-4xl">
        <div className="flex-1 border-t border-slate-200" />
        <span className="text-lg font-semibold text-indigo-400 bg-[#f8fafb] px-5 select-none tracking-wide">
          {children}
        </span>
        <div className="flex-1 border-t border-slate-200" />
      </div>
    </div>
  );
}
