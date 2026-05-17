import React, { useState } from 'react';
import './Dashboard.scss';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 768;
    }
    return true;
  });

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* SIDEBAR */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="logo">
          <span>LocalBoost AI</span>
        </div>

        <nav className="menu">
          <div className="menu-group">
            <a href="#" className="active">For you</a>
            <a href="#">Search</a>
            <a href="#">Library</a>
          </div>
          <div className="menu-group">
            <a href="#">Bookmarks</a>
            <a href="#">Saved</a>
            <a href="#">Playlists</a>
            <a href="#">Settings</a>
          </div>
        </nav>

        <div className="logout">
          <a href="#">Log out</a>
        </div>
      </aside>

      <div className={`sidebar-overlay ${isSidebarOpen ? 'visible' : ''}`} onClick={() => setIsSidebarOpen(false)} />

      {/* MAIN CONTENT */}
      <main className="main-content">
        
        {/* TOP NAVBAR */}
        <header className="top-navbar">
          <button className="nav-btn" onClick={() => window.history.back()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back
          </button>
          <div className="nav-actions">
            <button className="nav-btn theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                  Light Mode
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  Dark Mode
                </>
              )}
            </button>
            <button className="nav-btn hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </header>

        {/* Featured Section */}
        <section className="featured-section">
          <div className="featured-card yellow-card">
            <div className="card-header">
              <span className="badge">Jessica Monroe • 45 min</span>
            </div>
            <div className="card-content">
              <h2>True Crime<br/>Weekly</h2>
              <button className="play-btn">
                Play now
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
            {/* Decorative element resembling the dog */}
            <div className="dog-illustration">
              <div className="dog-ear"></div>
              <div className="dog-eye"></div>
              <div className="dog-snout"></div>
            </div>
          </div>

          <div className="featured-card orange-card">
            <div className="card-header">
              <span className="badge">Michael Lane • 35 min</span>
            </div>
            <div className="card-content">
              <h2>The Daily<br/>Recap</h2>
              <button className="play-btn dark">
                Now playing
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </button>
            </div>
            <div className="dog-illustration-2">
              <div className="mic-stand"></div>
              <div className="dog-head">
                <div className="eye"></div>
                <div className="ear"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Based on your interests */}
        <section className="interests-section">
          <div className="section-header">
            <h2>Based on your interests</h2>
            <a href="#" className="view-more">View more &rarr;</a>
          </div>

          <div className="interests-list">
            <div className="interest-item">
              <div className="item-icon pink-bg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
              </div>
              <div className="item-details">
                <h3>Information</h3>
                <p>information about your business</p>
              </div>
              <div className="item-category"></div>
              <div className="item-duration"></div>
              <button className="heart-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
            </div>

            <div className="interest-item">
              <div className="item-icon green-bg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
              </div>
              <div className="item-details">
                <h3>AI</h3>
                <p>use this ai to improve your business</p>
              </div>
              <div className="item-category"></div>
              <div className="item-duration"></div>
              <button className="heart-btn active">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
            </div>
          </div>
        </section>

        {/* Podcasts Grid Section */}
        <section className="podcasts-section">
          <div className="pills-row">
            <div className="pills-left">
              <button className="pill active">New podcasts</button>
              <button className="pill">True Crime & Mysteries</button>
              <button className="pill">Education & Learning</button>
              <button className="pill">Health & Fitness</button>
              <button className="pill">Society & Culture</button>
            </div>
            <a href="#" className="view-all">All podcasts &rarr;</a>
          </div>

          <div className="podcasts-grid">
            <div className="podcast-card pink-card">
              <div className="card-graphics">
                <div className="laptop-icon"></div>
                <div className="dog-mini"></div>
              </div>
              <div className="card-info">
                <p className="author">David Kim</p>
                <h3>Startup Stories</h3>
              </div>
            </div>

            <div className="podcast-card green-card">
              <div className="card-graphics">
                <div className="mic-icon"></div>
                <div className="bubble-icon">...</div>
              </div>
              <div className="card-info">
                <p className="author">Samantha Green</p>
                <h3>Voices<br/>of Change</h3>
              </div>
            </div>

            <div className="podcast-card orange-card-small">
              <div className="card-graphics">
                <div className="flask-icon"></div>
                <div className="sparkles"></div>
              </div>
              <div className="card-info">
                <p className="author">Dr. Alan Perez</p>
                <h3>Science<br/>Simplified</h3>
              </div>
            </div>

            <div className="podcast-card yellow-card-small">
              <div className="card-graphics">
                <div className="book-icon"></div>
                <div className="dog-head-mini"></div>
              </div>
              <div className="card-info">
                <p className="author">Emma Clark</p>
                <h3>History Bytes</h3>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
