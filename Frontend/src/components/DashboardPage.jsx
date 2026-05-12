import { useState } from "react";
import "./DashboardPage.scss";

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [seoLoading, setSeoLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [seoResult, setSeoResult] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState("");

  const [form, setForm] = useState({
    businessName: user.businessName || "LocalBoost AI",
    location: user.location || "New York, US",
    category: user.category || "Digital Marketing",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAnalyzeSEO = () => {
    setSeoLoading(true);
    setSeoResult(null);

    setTimeout(() => {
      setSeoResult({
        keywords: [
          "local SEO",
          "Google business ranking",
          "digital marketing",
          "business growth",
        ],
        posts: [
          "Boost your local business visibility with LocalBoost AI.",
          "Rank higher on Google and attract more nearby customers.",
          "Improve your online presence with smart SEO suggestions.",
        ],
        competitors: [
          {
            name: "Nearby Digital Agency",
            type: "SEO Competitor",
            theirStrength: "Strong Google reviews",
            yourOpportunity: "Improve local keywords and service pages",
            actionTip: "Add city-based keywords to your website content",
          },
          {
            name: "Local Marketing Hub",
            type: "Marketing Competitor",
            theirStrength: "Active social media posts",
            yourOpportunity: "Post consistent business updates",
            actionTip: "Share 2-3 weekly promotional posts",
          },
        ],
      });

      setSeoLoading(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    setMessageLoading(true);
    setMessageSuccess("");

    setTimeout(() => {
      setMessageSuccess("Message sent successfully. Backend integration pending.");
      setMessageLoading(false);
    }, 800);
  };

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Analyze SEO and generate marketing insights for your business.</p>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Business Details</h2>

          <input
            name="businessName"
            placeholder="Business Name"
            value={form.businessName}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <button onClick={handleAnalyzeSEO} disabled={seoLoading}>
            {seoLoading ? "Analyzing..." : "Analyze SEO"}
          </button>
        </div>

        <div className="card">
          <h2>SEO Results</h2>

          {!seoResult && !seoLoading && (
            <p className="muted">Run SEO analysis to see results.</p>
          )}

          {seoLoading && <p className="muted">Analyzing your business SEO...</p>}

          {seoResult && (
            <>
              <h3>Recommended Keywords</h3>
              <ul>
                {seoResult.keywords.map((keyword, index) => (
                  <li key={index}>{keyword}</li>
                ))}
              </ul>

              <h3>Post Ideas</h3>
              <ul>
                {seoResult.posts.map((post, index) => (
                  <li key={index}>{post}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="card">
          <h2>Send Message</h2>

          <input
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
          />

          <button onClick={handleSendMessage} disabled={messageLoading}>
            {messageLoading ? "Sending..." : "Send Message"}
          </button>

          {messageSuccess && <p className="success-text">{messageSuccess}</p>}
        </div>

        <div className="card">
          <h2>Competitor Analysis</h2>

          {!seoResult && (
            <p className="muted">
              Competitor insights will appear after SEO analysis.
            </p>
          )}

          {seoResult?.competitors?.map((item, index) => (
            <div className="competitor" key={index}>
              <h3>{item.name}</h3>
              <p>
                <strong>Type:</strong> {item.type}
              </p>
              <p>
                <strong>Strength:</strong> {item.theirStrength}
              </p>
              <p>
                <strong>Opportunity:</strong> {item.yourOpportunity}
              </p>
              <p>
                <strong>Action:</strong> {item.actionTip}
              </p>
            </div>
          ))}
        </div>

        <div className="card activity-card">
          <h2>Quick Stats</h2>
          <p>
            <strong>Business:</strong> {form.businessName}
          </p>
          <p>
            <strong>Location:</strong> {form.location}
          </p>
          <p>
            <strong>Category:</strong> {form.category}
          </p>
          <p>
            <strong>Status:</strong> Demo mode ready
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;