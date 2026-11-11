export function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#08080a]" />
      <div className="grid-plane absolute inset-x-0 top-0 h-[820px] opacity-60" />
      <div className="absolute -top-[22rem] left-1/2 h-[46rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(91,77,245,0.22),rgba(91,77,245,0.06)_55%,transparent_78%)] opacity-30 blur-2xl dark:opacity-100" />
      <div className="absolute top-[26rem] -right-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.08),transparent_72%)] opacity-40 blur-2xl dark:opacity-100" />
      <div className="absolute top-[62rem] -left-48 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgba(139,124,255,0.09),transparent_72%)] opacity-40 blur-2xl dark:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 h-[30rem] bg-gradient-to-t from-[#08080a] to-transparent" />
      <div className="noise-overlay absolute inset-0 opacity-40" />
    </div>
  )
}
