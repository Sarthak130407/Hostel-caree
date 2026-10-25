// Compiled from homepage.jsx (React homepage). Edit homepage.jsx, not this file.
function StatCard(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, props.icon), /*#__PURE__*/React.createElement("div", {
    className: "number"
  }, props.number), /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, props.label));
}
function FeatureCard(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "feature-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, props.icon), /*#__PURE__*/React.createElement("h3", null, props.title), /*#__PURE__*/React.createElement("p", null, props.text));
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
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("h1", null, "Hostel Complaint Management System"), /*#__PURE__*/React.createElement("p", null, "A simple platform for hostel students to register complaints about rooms and common areas, and for the warden to track and resolve them quickly."), /*#__PURE__*/React.createElement("a", {
    href: "register.html",
    className: "btn btn-primary"
  }, "Register Complaint"), /*#__PURE__*/React.createElement("a", {
    href: "complaints.html",
    className: "btn btn-secondary"
  }, "View Complaints"))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("h2", null, "Complaint Overview"), /*#__PURE__*/React.createElement("p", null, "A quick summary of all complaints submitted so far")), /*#__PURE__*/React.createElement("div", {
    className: "stats-row"
  }, /*#__PURE__*/React.createElement(StatCard, {
    icon: "📋",
    number: complaints.length,
    label: "Total Complaints"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "⏳",
    number: pending,
    label: "Pending Complaints"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "🔧",
    number: progress,
    label: "In Progress"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "✅",
    number: resolved,
    label: "Resolved Complaints"
  })))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      backgroundColor: "#ffffff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("h2", null, "How It Works"), /*#__PURE__*/React.createElement("p", null, "Three simple steps for every student")), /*#__PURE__*/React.createElement("div", {
    className: "features-row"
  }, /*#__PURE__*/React.createElement(FeatureCard, {
    icon: "📝",
    title: "1. Register",
    text: "Fill a simple form with your room and complaint details."
  }), /*#__PURE__*/React.createElement(FeatureCard, {
    icon: "📊",
    title: "2. Track",
    text: "Check the status of your complaint from the complaints list."
  }), /*#__PURE__*/React.createElement(FeatureCard, {
    icon: "🛠️",
    title: "3. Resolve",
    text: "The warden updates the status once the issue is fixed."
  })))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
