function showLogin() {

    document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("signupForm").classList.add("hidden");

  document.getElementById("loginTab").classList.add("active");
  document.getElementById("signupTab").classList.remove("active");
}


function showSignup() {

  document.getElementById("signupForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");

  document.getElementById("signupTab").classList.add("active");
  document.getElementById("loginTab").classList.remove("active");
}


function getUsers() {
  var savedText = localStorage.getItem("users");

  if (savedText === null) {
    return [];
  }

  return JSON.parse(savedText);
}

function saveUsers(usersArray) {
  localStorage.setItem("users", JSON.stringify(usersArray));
}


function handleLogin(event) {

  event.preventDefault();

  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;
  var loginError = document.getElementById("loginError");

  var users = getUsers();
  var matchedUser = null;

    for (var i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      matchedUser = users[i];
    }
  }

   if (email === "" || password === "" || matchedUser === null) {
    loginError.style.display = "block";
    return;
  }

   loginError.style.display = "none";
  localStorage.setItem("loggedInUser", email);
  window.location.href = "dashboard.html";
}


function handleSignup(event) {

  event.preventDefault();

  var newUser = {
    name: document.getElementById("signupName").value,
    email: document.getElementById("signupEmail").value,
    password: document.getElementById("signupPassword").value
  };

  var users = getUsers();
  users.push(newUser);
  saveUsers(users);

   document.getElementById("signupMessage").style.display = "block";

  document.getElementById("signupForm").reset();
}



function checkLogin() {
  var loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser === null) {
    window.location.href = "login.html";
  }
}



function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}



function getComplaintsKey() {
  // Each logged-in user gets their own complaints list
  return "complaints_" + localStorage.getItem("loggedInUser");
}

function getComplaints() {

   var savedText = localStorage.getItem(getComplaintsKey());

   if (savedText === null) {
    return [];
  }

    return JSON.parse(savedText);
}

function saveComplaints(complaintsArray) {

   var textToSave = JSON.stringify(complaintsArray);

  localStorage.setItem(getComplaintsKey(), textToSave);
}


function submitComplaint(event) {

    event.preventDefault();

  var complaints = getComplaints();

  var newComplaint = {
    id: "HC-" + (101 + complaints.length),
    studentName: document.getElementById("studentName").value,
    roomNumber: document.getElementById("roomNumber").value,
    hostelBlock: document.getElementById("hostelBlock").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    priority: document.getElementById("priority").value,
    date: document.getElementById("date").value,
    status: "Pending"
  };

 complaints.push(newComplaint);

  saveComplaints(complaints);

  document.getElementById("successMessage").style.display = "block";
  document.getElementById("complaintForm").reset();
}


function loadComplaints() {

  var complaints = getComplaints();

  var table = document.getElementById("complaintsTable");
  var tableBody = document.getElementById("complaintsTableBody");
  var emptyState = document.getElementById("emptyState");

    tableBody.innerHTML = "";

    if (complaints.length === 0) {
    table.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

    table.style.display = "table";
  emptyState.style.display = "none";

   for (var i = 0; i < complaints.length; i++) {

    var complaint = complaints[i];
  var statusClass = "status-pending";
    if (complaint.status === "In Progress") {
      statusClass = "status-progress";
    } else if (complaint.status === "Resolved") {
      statusClass = "status-resolved";
    }

    var rowHtml =
      "<tr>" +
      "<td>" + complaint.id + "</td>" +
      "<td>" + complaint.studentName + "</td>" +
      "<td>" + complaint.hostelBlock + "-" + complaint.roomNumber + "</td>" +
      "<td>" + complaint.category + "</td>" +
      "<td>" + complaint.description + "</td>" +
      "<td>" + complaint.priority + "</td>" +
      "<td><span class='status " + statusClass + "'>" + complaint.status + "</span></td>" +
      "<td>" + complaint.date + "</td>" +
      "<td><a href='details.html?id=" + complaint.id + "' class='btn btn-small btn-view'>View</a></td>" +
      "</tr>";

    tableBody.innerHTML = tableBody.innerHTML + rowHtml;
  }
}



function loadAdminComplaints() {

  var complaints = getComplaints();

  var table = document.getElementById("adminTable");
  var tableBody = document.getElementById("adminTableBody");
  var emptyState = document.getElementById("adminEmptyState");

  tableBody.innerHTML = "";

  
  var pendingCount = 0;
  var progressCount = 0;
  var resolvedCount = 0;

  if (complaints.length === 0) {
    table.style.display = "none";
    emptyState.style.display = "block";
  } else {
    table.style.display = "table";
    emptyState.style.display = "none";
  }

  for (var i = 0; i < complaints.length; i++) {

    var complaint = complaints[i];
    var statusClass = "status-pending";

    if (complaint.status === "Pending") {
      pendingCount = pendingCount + 1;
      statusClass = "status-pending";
    } else if (complaint.status === "In Progress") {
      progressCount = progressCount + 1;
      statusClass = "status-progress";
    } else if (complaint.status === "Resolved") {
      resolvedCount = resolvedCount + 1;
      statusClass = "status-resolved";
    }

    var rowHtml =
      "<tr>" +
      "<td>" + complaint.id + "</td>" +
      "<td>" + complaint.studentName + "</td>" +
      "<td>" + complaint.hostelBlock + "-" + complaint.roomNumber + "</td>" +
      "<td>" + complaint.category + "</td>" +
      "<td>" + complaint.priority + "</td>" +
      "<td><span class='status " + statusClass + "'>" + complaint.status + "</span></td>" +
      "<td>" + complaint.date + "</td>" +
      "<td>" +
      "<a href='details.html?id=" + complaint.id + "' class='btn btn-small btn-view'>View</a> " +
      "<button class='btn btn-small btn-resolve' onclick='markResolved(" + i + ")'>Mark Resolved</button>" +
      "</td>" +
      "</tr>";

    tableBody.innerHTML = tableBody.innerHTML + rowHtml;
  }

  document.getElementById("totalCount").textContent = complaints.length;
  document.getElementById("pendingCount").textContent = pendingCount;
  document.getElementById("progressCount").textContent = progressCount;
  document.getElementById("resolvedCount").textContent = resolvedCount;
}

function markResolved(complaintIndex) {

  var complaints = getComplaints();

  complaints[complaintIndex].status = "Resolved";

  saveComplaints(complaints);

  loadAdminComplaints();
}



function loadDashboardStats() {

  var complaints = getComplaints();

  var pendingCount = 0;
  var progressCount = 0;
  var resolvedCount = 0;

  for (var i = 0; i < complaints.length; i++) {
    if (complaints[i].status === "Pending") {
      pendingCount = pendingCount + 1;
    } else if (complaints[i].status === "In Progress") {
      progressCount = progressCount + 1;
    } else if (complaints[i].status === "Resolved") {
      resolvedCount = resolvedCount + 1;
    }
  }

  document.getElementById("dashTotalCount").textContent = complaints.length;
  document.getElementById("dashPendingCount").textContent = pendingCount;
  document.getElementById("dashProgressCount").textContent = progressCount;
  document.getElementById("dashResolvedCount").textContent = resolvedCount;
}


function loadComplaintDetails() {

  var params = new URLSearchParams(window.location.search);
  var wantedId = params.get("id");

  var complaints = getComplaints();
  var complaint = null;

  for (var i = 0; i < complaints.length; i++) {
    if (complaints[i].id === wantedId) {
      complaint = complaints[i];
    }
  }

  if (complaint === null) {
    document.getElementById("detailTitle").textContent = "Complaint not found";
    return;
  }

  var statusClass = "status-pending";
  if (complaint.status === "In Progress") {
    statusClass = "status-progress";
  } else if (complaint.status === "Resolved") {
    statusClass = "status-resolved";
  }

  document.getElementById("detailTitle").textContent = "Complaint " + complaint.id;
  document.getElementById("detailName").textContent = complaint.studentName;
  document.getElementById("detailRoom").textContent = complaint.hostelBlock + "-" + complaint.roomNumber;
  document.getElementById("detailCategory").textContent = complaint.category;
  document.getElementById("detailDescription").textContent = complaint.description;
  document.getElementById("detailPriority").textContent = complaint.priority;
  document.getElementById("detailDate").textContent = complaint.date;
  document.getElementById("detailStatus").innerHTML =
    "<span class='status " + statusClass + "'>" + complaint.status + "</span>";

  if (complaint.status === "In Progress" || complaint.status === "Resolved") {
    document.getElementById("stepProgress").classList.add("completed");
  }
  if (complaint.status === "Resolved") {
    document.getElementById("stepResolved").classList.add("completed");
  }
}



function loadWardenOverview() {

  var complaints = getComplaints();

  var pendingCount = 0;
  var progressCount = 0;
  var resolvedCount = 0;
  var highCount = 0;

  var categories = ["Plumbing", "Electricity", "Fan", "AC", "Cooler", "Food", "Cleanliness", "Water", "Other"];
  var blocks = ["A", "B", "C", "D"];

  var categoryCounts = {};
  var blockCounts = {};

  for (var c = 0; c < categories.length; c++) {
    categoryCounts[categories[c]] = 0;
  }
  for (var b = 0; b < blocks.length; b++) {
    blockCounts[blocks[b]] = 0;
  }

  for (var i = 0; i < complaints.length; i++) {
    var complaint = complaints[i];

    if (complaint.status === "Pending") {
      pendingCount = pendingCount + 1;
    } else if (complaint.status === "In Progress") {
      progressCount = progressCount + 1;
    } else if (complaint.status === "Resolved") {
      resolvedCount = resolvedCount + 1;
    }

    if (complaint.priority === "High" && complaint.status !== "Resolved") {
      highCount = highCount + 1;
    }

    if (categoryCounts[complaint.category] !== undefined) {
      categoryCounts[complaint.category] = categoryCounts[complaint.category] + 1;
    }
    if (blockCounts[complaint.hostelBlock] !== undefined) {
      blockCounts[complaint.hostelBlock] = blockCounts[complaint.hostelBlock] + 1;
    }
  }

  document.getElementById("wTotalCount").textContent = complaints.length;
  document.getElementById("wPendingCount").textContent = pendingCount;
  document.getElementById("wProgressCount").textContent = progressCount;
  document.getElementById("wResolvedCount").textContent = resolvedCount;
  document.getElementById("wHighCount").textContent = highCount;

  var categoryBody = document.getElementById("categoryTableBody");
  categoryBody.innerHTML = "";
  for (var k = 0; k < categories.length; k++) {
    categoryBody.innerHTML = categoryBody.innerHTML +
      "<tr><td>" + categories[k] + "</td><td>" + categoryCounts[categories[k]] + "</td></tr>";
  }

  var blockBody = document.getElementById("blockTableBody");
  blockBody.innerHTML = "";
  for (var m = 0; m < blocks.length; m++) {
    blockBody.innerHTML = blockBody.innerHTML +
      "<tr><td>Block " + blocks[m] + "</td><td>" + blockCounts[blocks[m]] + "</td></tr>";
  }

  var recentBody = document.getElementById("recentTableBody");
  var recentTable = document.getElementById("recentTable");
  var recentEmpty = document.getElementById("recentEmpty");
  recentBody.innerHTML = "";

  if (complaints.length === 0) {
    recentTable.style.display = "none";
    recentEmpty.style.display = "block";
    return;
  }

  recentTable.style.display = "table";
  recentEmpty.style.display = "none";

  var start = complaints.length - 5;
  if (start < 0) {
    start = 0;
  }

  for (var j = complaints.length - 1; j >= start; j--) {
    var item = complaints[j];
    var statusClass = "status-pending";
    if (item.status === "In Progress") {
      statusClass = "status-progress";
    } else if (item.status === "Resolved") {
      statusClass = "status-resolved";
    }

    recentBody.innerHTML = recentBody.innerHTML +
      "<tr>" +
      "<td>" + item.id + "</td>" +
      "<td>" + item.studentName + "</td>" +
      "<td>" + item.hostelBlock + "-" + item.roomNumber + "</td>" +
      "<td>" + item.category + "</td>" +
      "<td>" + item.priority + "</td>" +
      "<td><span class='status " + statusClass + "'>" + item.status + "</span></td>" +
      "<td>" + item.date + "</td>" +
      "</tr>";
  }
}
