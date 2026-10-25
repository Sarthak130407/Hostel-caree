import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

// Reads saved complaints from the browser (same data the HTML project saves).
// If nothing is saved yet, everything simply shows 0.
function getComplaints() {
  let all = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key === "complaints" || key.startsWith("complaints_")) {
      try {
        all = all.concat(JSON.parse(localStorage.getItem(key)));
      } catch (e) {}
    }
  }
  return all;
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">Hostel<span>Care</span></div>
        <ul className="nav-links">
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#">Register Complaint</a></li>
          <li><a href="#">Complaints List</a></li>
          <li><a href="#">Warden Overview</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </div>
    </nav>
  );
}

function StatCard({ icon, number, label }) {
  return (
    <div className="stat-card">
      <div className="icon">{icon}</div>
      <div className="number">{number}</div>
      <div className="label">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function App() {
  const complaints = getComplaints();

  const pending = complaints.filter((c) => c.status === "Pending").length;
  const progress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="container">
          <h1>Hostel Complaint Management System</h1>
          <p>
            A simple platform for hostel students to register complaints about
            rooms and common areas, and for the warden to track and resolve them
            quickly.
          </p>
          <a href="#" className="btn btn-primary">Register Complaint</a>
          <a href="#" className="btn btn-secondary">View Complaints</a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Complaint Overview</h2>
            <p>A quick summary of all complaints submitted so far</p>
          </div>
          <div className="stats-row">
            <StatCard icon="📋" number={complaints.length} label="Total Complaints" />
            <StatCard icon="⏳" number={pending} label="Pending Complaints" />
            <StatCard icon="🔧" number={progress} label="In Progress" />
            <StatCard icon="✅" number={resolved} label="Resolved Complaints" />
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          <div className="section-title">
            <h2>How It Works</h2>
            <p>Three simple steps for every student</p>
          </div>
          <div className="features-row">
            <FeatureCard icon="📝" title="1. Register" text="Fill a simple form with your room and complaint details." />
            <FeatureCard icon="📊" title="2. Track" text="Check the status of your complaint from the complaints list." />
            <FeatureCard icon="🛠️" title="3. Resolve" text="The warden updates the status once the issue is fixed." />
          </div>
        </div>
      </section>

      <footer>
        <p>Hostel Complaint Management System &copy; 2026 </p>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
