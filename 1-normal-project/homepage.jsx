function StatCard(props) {
  return (
    <div className="stat-card">
      <div className="icon">{props.icon}</div>
      <div className="number">{props.number}</div>
      <div className="label">{props.label}</div>
    </div>
  );
}

function FeatureCard(props) {
  return (
    <div className="feature-card">
      <div className="icon">{props.icon}</div>
      <h3>{props.title}</h3>
      <p>{props.text}</p>
    </div>
  );
}

function App() {
  const [complaints] = React.useState(getComplaints());

  let pending = 0;
  let progress = 0;
  let resolved = 0;

  for (let i = 0; i < complaints.length; i++) {
    if (complaints[i].status === "Pending") {
      pending = pending + 1;
    } else if (complaints[i].status === "In Progress") {
      progress = progress + 1;
    } else if (complaints[i].status === "Resolved") {
      resolved = resolved + 1;
    }
  }

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Hostel Complaint Management System</h1>
          <p>
            A simple platform for hostel students to register complaints about
            rooms and common areas, and for the warden to track and resolve them
            quickly.
          </p>
          <a href="register.html" className="btn btn-primary">Register Complaint</a>
          <a href="complaints.html" className="btn btn-secondary">View Complaints</a>
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
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
