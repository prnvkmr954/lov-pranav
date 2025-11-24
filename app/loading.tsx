// app/loading.tsx
export default function RootLoading() {
  return (
    <div className="loading-screen">
      <div className="loading-hearts">
        <span className="loading-heart loading-heart-left">❤️</span>
        <span className="loading-heart loading-heart-right">❤️</span>
        <span className="loading-heart loading-heart-center">💖</span>
      </div>

      <p className="loading-text-main">
        Bringing our memories together…
      </p>
      <p className="loading-text-sub">
        Love is loading, just for you. ✨
      </p>
    </div>
  )
}
