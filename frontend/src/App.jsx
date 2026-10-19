
import './App.css'

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h2 className="logo">SnapSort<span>.</span></h2>

        <a href="#features" className="nav-link">
          Features
        </a>
      </nav>

      <main className="hero">
        <p className="tagline">AI-POWERED EVENT MEDIA</p>

        <h1>
          Every moment.
          <br />
          <span>Find it instantly.</span>
        </h1>

        <p className="description">
          Organize event photos and videos effortlessly.
          SnapSort uses AI to help you find the moments
          that matter most.
        </p>

        <button
          className="primary-button"
          onClick={() => alert('SnapSort upload feature is coming soon!')}
        >
          Get Started →
        </button>

        <section id="features" className="features">
          <div className="feature-card">
            <span className="feature-icon">📸</span>
            <h3>Smart Galleries</h3>
            <p>Keep event photos organized in one place.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">✨</span>
            <h3>AI Face Grouping</h3>
            <p>Group photos featuring the same person.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🔎</span>
            <h3>Quick Discovery</h3>
            <p>Make finding your favorite moments easier.</p>
          </div>
        </section>
      </main>

      <footer>
        © 2026 SnapSort · Your memories, organized.
      </footer>
    </div>
  )
}

export default App
