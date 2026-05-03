import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Nisarg",
    email: "nisarg@gmail.com",
    businessName: "LocalBoost AI",
    category: "Digital Marketing",
    location: "New York, US",
    website: "https://example.com",
    keywords: "local SEO, Google ranking",
    description: "Helping businesses grow online",
  };

  const [user, setUser] = useState(storedUser);
  const [activeTab, setActiveTab] = useState("basic");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile saved!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <section className="profile-page">
      {/* LEFT SIDEBAR */}
      <aside className="profile-sidebar">
        <h2>My Profile</h2>
        <p>Manage your business information and SEO preferences</p>

        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h3>{user.name}</h3>
        <span className="role-badge">BUSINESS OWNER</span>

        <div
          className={`sidebar-tab ${activeTab === "basic" ? "active" : ""}`}
          onClick={() => setActiveTab("basic")}
        >
          <span>Basic Info</span>
          <small>Business profile</small>
        </div>

        <div
          className={`sidebar-tab ${activeTab === "seo" ? "active" : ""}`}
          onClick={() => setActiveTab("seo")}
        >
          <span>SEO Details</span>
          <small>Keywords & location</small>
        </div>

        <div
          className={`sidebar-tab ${activeTab === "account" ? "active" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          <span>Account</span>
          <small>Login info</small>
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="profile-content">
        <div className="profile-header">
          <h1>Profile Settings</h1>

          <div className="profile-actions">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>

        {/* BASIC INFO */}
        {activeTab === "basic" && (
          <>
            <h2>Personal Information</h2>

            <div className="info-grid">
              <div className="info-field">
                <label>Full Name</label>
                <input
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>

              <div className="info-field">
                <label>Email</label>
                <input
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h2>Business Information</h2>

            <div className="info-grid">
              <div className="info-field">
                <label>Business Name</label>
                <input
                  name="businessName"
                  value={user.businessName}
                  onChange={handleChange}
                />
              </div>

              <div className="info-field">
                <label>Category</label>
                <input
                  name="category"
                  value={user.category}
                  onChange={handleChange}
                />
              </div>

              <div className="info-field">
                <label>Location</label>
                <input
                  name="location"
                  value={user.location}
                  onChange={handleChange}
                />
              </div>

              <div className="info-field">
                <label>Website</label>
                <input
                  name="website"
                  value={user.website}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}

        {/* SEO DETAILS */}
        {activeTab === "seo" && (
          <>
            <h2>SEO Preferences</h2>

            <div className="info-field full">
              <label>Keywords</label>
              <textarea
                name="keywords"
                value={user.keywords}
                onChange={handleChange}
              />
            </div>

            <div className="info-field full">
              <label>Description</label>
              <textarea
                name="description"
                value={user.description}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* ACCOUNT */}
        {activeTab === "account" && (
          <>
            <h2>Account Settings</h2>

            <div className="info-field">
              <label>Email</label>
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="info-field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
          </>
        )}
      </main>
    </section>
  );
};

export default ProfilePage;