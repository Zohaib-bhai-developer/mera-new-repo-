import "../styles/globals.css";
import CursorTrail from "../components/CursorTrail";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* subtle animated overlay element (pure CSS) */}
      <div className="body-overlay" aria-hidden="true" />
      {/* App UI */}
      <div className="app-shell">
        <header className="mb-6 text-center">
          <h1 className="neon-title">AI Image Generator</h1>
          <p className="neon-sub">Create images — fast, neon vibes ✨</p>
        </header>

        <main className="w-full max-w-5xl">
          <div className="glass-card">
            <Component {...pageProps} />
          </div>
        </main>
      </div>

      {/* cursor trail (global) */}
      <CursorTrail />
    </>
  );
}
