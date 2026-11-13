const warmUpTasks = [
  { question: "What is 7 × 8?", answers: ["56", "48", "64"], correct: "56" },
  { question: "What is 9 + 7?", answers: ["15", "16", "17"], correct: "16" },
  { question: "What is 6 × 4?", answers: ["20", "24", "28"], correct: "24" },
  { question: "Which number is bigger: 47 or 74?", answers: ["47", "74", "They are equal"], correct: "74" },
  { question: "What is 18 ÷ 3?", answers: ["5", "6", "7"], correct: "6" },
  { question: "What is 1/2 of 20?", answers: ["8", "10", "12"], correct: "10" }
];

const questions = [
  {
    category: "Number",
    question: "What is 36 + 19?",
    answers: ["55", "45", "65", "54"],
    correct: "55"
  },
  {
    category: "Multiplication",
    question: "What is 7 × 8?",
    answers: ["54", "56", "64", "48"],
    correct: "56"
  },
  {
    category: "Fractions",
    question: "Which fraction is equal to 1/2?",
    answers: ["2/3", "3/6", "1/4", "4/5"],
    correct: "3/6"
  },
  {
    category: "Measurement",
    question: "How many centimetres are in 1 metre?",
    answers: ["10", "100", "1000", "50"],
    correct: "100"
  },
  {
    category: "Time",
    question: "What time is shown by 3:45?",
    answers: ["Quarter past three", "Quarter to four", "Half past three", "Five to four"],
    correct: "Quarter to four"
  },
  {
    category: "Geometry",
    question: "How many right angles does a square have?",
    answers: ["1", "2", "3", "4"],
    correct: "4"
  },
  {
    category: "Place Value",
    question: "Which number is bigger: 482 or 428?",
    answers: ["428", "482", "They are equal", "Cannot tell"],
    correct: "482"
  },
  {
    category: "Division",
    question: "What is 24 ÷ 4?",
    answers: ["5", "6", "7", "8"],
    correct: "6"
  },
  {
    category: "Number",
    question: "What is 100 less than 734?",
    answers: ["634", "724", "664", "624"],
    correct: "634"
  },
  {
    category: "Statistics",
    question: "If a bar chart shows 5 apples, 3 oranges and 2 pears, which fruit is most popular?",
    answers: ["Oranges", "Pears", "Apples", "Bananas"],
    correct: "Apples"
  }
];

const studentsStorageKey = "year3MathsStudents";
const currentStudentKey = "year3SelectedStudent";
const studentAccountsKey = "year3MathsAccounts";
const notificationsKey = "year3MathsNotifications";
const ownerPasswordKey = "year3MathsOwnerPassword";
const ownerAccessKey = "year3MathsOwnerUnlocked";
const loggedInStudentKey = "year3MathsLoggedInStudent";
const defaultProgress = {
  counts: false,
  addition: false,
  multiplication: false,
  fractions: false,
  time: false,
  shapes: false,
  data: false,
  challenge: false
};

const lessonLabels = {
  counts: "Number patterns",
  addition: "Addition and subtraction",
  multiplication: "Times tables",
  fractions: "Fractions",
  time: "Time and measure",
  shapes: "Geometry and data",
  data: "Data and charts",
  challenge: "Maths challenge quiz"
};

const lessonQuestionBank = {
  counting: {
    title: "Number patterns",
    summary: [
      "Count in 2s, 3s, 4s, 5s and 8s.",
      "Spot patterns in sequences and tables.",
      "Use place value to explain each jump."
    ],
    questions: [
      { prompt: "What comes next: 2, 4, 6, 8, ?", options: ["10", "12", "14", "9"], answer: "10" },
      { prompt: "What comes next: 5, 10, 15, 20, ?", options: ["22", "25", "30", "35"], answer: "25" },
      { prompt: "What is the next number in the pattern: 3, 6, 9, 12, ?", options: ["13", "14", "15", "18"], answer: "15" },
      { prompt: "Which number is missing: 4, 8, 12, __, 20?", options: ["14", "15", "16", "18"], answer: "16" },
      { prompt: "What is 7 more than 18?", options: ["23", "24", "25", "26"], answer: "25" },
      { prompt: "Count on in 3s from 9. What is the fourth number?", options: ["18", "21", "24", "27"], answer: "18" },
      { prompt: "Which number is larger: 47 or 74?", options: ["47", "74", "They are equal", "Cannot tell"], answer: "74" },
      { prompt: "What number is 10 less than 63?", options: ["53", "52", "43", "62"], answer: "53" },
      { prompt: "Complete the pattern: 30, 35, 40, __, 50", options: ["45", "42", "47", "44"], answer: "45" },
      { prompt: "A pattern goes 6, 12, 18, 24, __. What is next?", options: ["28", "30", "32", "36"], answer: "30" }
    ]
  },
  addition: {
    title: "Addition and subtraction",
    summary: [
      "Use number bonds to 10 and 20.",
      "Add and subtract tens and ones mentally.",
      "Check answers by using the inverse."
    ],
    questions: [
      { prompt: "What is 6 + 4?", options: ["8", "9", "10", "11"], answer: "10" },
      { prompt: "What is 12 + 5?", options: ["15", "16", "17", "18"], answer: "17" },
      { prompt: "What is 20 - 7?", options: ["11", "12", "13", "14"], answer: "13" },
      { prompt: "Which answer is correct for 38 + 17?", options: ["45", "55", "65", "54"], answer: "55" },
      { prompt: "What is 42 - 15?", options: ["25", "27", "30", "37"], answer: "27" },
      { prompt: "What is 19 + 26?", options: ["44", "45", "46", "55"], answer: "45" },
      { prompt: "Find 63 + 29.", options: ["82", "88", "92", "90"], answer: "92" },
      { prompt: "Solve 54 - 27.", options: ["23", "27", "29", "37"], answer: "27" },
      { prompt: "What is 76 + 18?", options: ["84", "90", "94", "96"], answer: "94" },
      { prompt: "What is 100 - 39?", options: ["61", "63", "67", "71"], answer: "61" }
    ]
  },
  multiplication: {
    title: "Times tables",
    summary: [
      "Learn 3, 4 and 8 times tables.",
      "Use arrays to show multiplication.",
      "Match facts to related division facts."
    ],
    questions: [
      { prompt: "What is 2 × 3?", options: ["5", "6", "7", "8"], answer: "6" },
      { prompt: "What is 3 × 4?", options: ["10", "11", "12", "13"], answer: "12" },
      { prompt: "What is 5 × 2?", options: ["8", "10", "12", "14"], answer: "10" },
      { prompt: "What is 7 × 8?", options: ["48", "54", "56", "64"], answer: "56" },
      { prompt: "What is 4 × 6?", options: ["18", "20", "24", "28"], answer: "24" },
      { prompt: "What is 8 × 3?", options: ["18", "21", "24", "27"], answer: "24" },
      { prompt: "What is 6 × 7?", options: ["36", "40", "42", "48"], answer: "42" },
      { prompt: "What is 9 × 4?", options: ["32", "34", "36", "38"], answer: "36" },
      { prompt: "What is 7 × 6?", options: ["36", "40", "42", "44"], answer: "42" },
      { prompt: "What is 8 × 8?", options: ["54", "56", "60", "64"], answer: "64" }
    ]
  },
  fractions: {
    title: "Fractions",
    summary: [
      "Split shapes into equal parts.",
      "Find fractions such as 1/2, 1/4 and 3/4.",
      "Compare simple fractions with the same denominator."
    ],
    questions: [
      { prompt: "What is 1/2 of 8?", options: ["2", "4", "6", "8"], answer: "4" },
      { prompt: "Which fraction is equal to 1/2?", options: ["2/3", "3/6", "1/4", "4/5"], answer: "3/6" },
      { prompt: "What is 3/4 of 8?", options: ["4", "5", "6", "8"], answer: "6" },
      { prompt: "Which is larger: 1/4 or 1/2?", options: ["1/4", "1/2", "They are equal", "Cannot tell"], answer: "1/2" },
      { prompt: "What is 1/3 of 12?", options: ["3", "4", "5", "6"], answer: "4" },
      { prompt: "Which fraction is the same as 2/4?", options: ["1/2", "1/4", "3/4", "4/5"], answer: "1/2" },
      { prompt: "What is 2/5 of 10?", options: ["2", "4", "5", "6"], answer: "4" },
      { prompt: "Which fraction is smaller: 2/3 or 1/3?", options: ["2/3", "1/3", "They are equal", "Cannot tell"], answer: "1/3" },
      { prompt: "If a pizza is cut into 8 equal slices and you eat 3, what fraction is left?", options: ["3/8", "5/8", "6/8", "7/8"], answer: "5/8" },
      { prompt: "Which is greater: 3/4 or 2/3?", options: ["3/4", "2/3", "They are equal", "Cannot tell"], answer: "3/4" }
    ]
  },
  measurement: {
    title: "Time and measure",
    summary: [
      "Read analogue and digital clocks.",
      "Measure length, mass and capacity.",
      "Find the perimeter of simple shapes."
    ],
    questions: [
      { prompt: "How many centimetres are in 1 metre?", options: ["10", "100", "1000", "50"], answer: "100" },
      { prompt: "What time is quarter past 4?", options: ["4:05", "4:15", "4:30", "4:45"], answer: "4:15" },
      { prompt: "A rectangle is 6 cm long and 3 cm wide. What is its perimeter?", options: ["9cm", "18cm", "12cm", "24cm"], answer: "18cm" },
      { prompt: "How many minutes are in 1 hour?", options: ["30", "45", "60", "90"], answer: "60" },
      { prompt: "What is half of 1 litre?", options: ["250ml", "500ml", "750ml", "1000ml"], answer: "500ml" },
      { prompt: "If a clock shows 3:45, what is the time in words?", options: ["Quarter past three", "Quarter to four", "Half past three", "Five to four"], answer: "Quarter to four" },
      { prompt: "A square has sides of 5 cm. What is the perimeter?", options: ["10cm", "15cm", "20cm", "25cm"], answer: "20cm" },
      { prompt: "Which is heavier: 1kg or 800g?", options: ["1kg", "800g", "They are equal", "Cannot tell"], answer: "1kg" },
      { prompt: "A toy car travels 40 cm in 1 second. How far in 3 seconds?", options: ["80cm", "100cm", "120cm", "150cm"], answer: "120cm" },
      { prompt: "What is the total of 2.5 kg and 1.5 kg?", options: ["3kg", "3.5kg", "4kg", "4.5kg"], answer: "4kg" }
    ]
  },
  geometry: {
    title: "Geometry and data",
    summary: [
      "Identify right angles and symmetry.",
      "Name 2D shapes and 3D objects.",
      "Read information from bar charts and tables."
    ],
    questions: [
      { prompt: "How many right angles does a square have?", options: ["1", "2", "3", "4"], answer: "4" },
      { prompt: "Which shape has 3 sides?", options: ["Square", "Triangle", "Pentagon", "Circle"], answer: "Triangle" },
      { prompt: "A bar chart shows 6 red, 4 blue and 2 green. Which colour is least popular?", options: ["Red", "Blue", "Green", "Yellow"], answer: "Green" },
      { prompt: "Which shape has 6 faces?", options: ["Cube", "Sphere", "Cylinder", "Cone"], answer: "Cube" },
      { prompt: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: "6" },
      { prompt: "Which angle is a right angle?", options: ["45°", "90°", "120°", "180°"], answer: "90°" },
      { prompt: "What do you call a shape with 8 sides?", options: ["Pentagon", "Hexagon", "Octagon", "Triangle"], answer: "Octagon" },
      { prompt: "If a table shows 7 apples, 5 bananas and 3 pears, which fruit is most popular?", options: ["Apples", "Bananas", "Pears", "Oranges"], answer: "Apples" },
      { prompt: "How many vertices does a cube have?", options: ["6", "8", "10", "12"], answer: "8" },
      { prompt: "A shape has 2 pairs of parallel sides and 4 right angles. What is it?", options: ["Triangle", "Rectangle", "Circle", "Pentagon"], answer: "Rectangle" }
    ]
  }
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getStudentMap() {
  const saved = localStorage.getItem(studentsStorageKey);
  if (!saved) {
    const initial = { "Class overview": { ...defaultProgress } };
    localStorage.setItem(studentsStorageKey, JSON.stringify(initial));
    return { "Class overview": { ...defaultProgress } };
  }

  try {
    const parsed = JSON.parse(saved);
    return { ...parsed };
  } catch (error) {
    const initial = { "Class overview": { ...defaultProgress } };
    localStorage.setItem(studentsStorageKey, JSON.stringify(initial));
    return initial;
  }
}

function getStudentAccountMap() {
  const saved = localStorage.getItem(studentAccountsKey);
  if (!saved) {
    localStorage.setItem(studentAccountsKey, JSON.stringify({}));
    return {};
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    localStorage.setItem(studentAccountsKey, JSON.stringify({}));
    return {};
  }
}

function getNotifications() {
  const saved = localStorage.getItem(notificationsKey);
  if (!saved) {
    localStorage.setItem(notificationsKey, JSON.stringify([]));
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    localStorage.setItem(notificationsKey, JSON.stringify([]));
    return [];
  }
}

function saveNotifications(list) {
  localStorage.setItem(notificationsKey, JSON.stringify(list));
}

function addNotification(type, message, studentName = "System") {
  const notifications = getNotifications();
  notifications.unshift({
    id: Date.now() + Math.random(),
    type,
    studentName,
    message,
    createdAt: new Date().toISOString()
  });

  saveNotifications(notifications.slice(0, 12));
  renderNotifications();
}

function getSelectedStudent() {
  const savedStudent = localStorage.getItem(currentStudentKey);
  if (savedStudent) {
    return savedStudent;
  }

  const students = getStudentMap();
  const firstStudent = Object.keys(students)[0] || "Class overview";
  localStorage.setItem(currentStudentKey, firstStudent);
  return firstStudent;
}

function saveSelectedStudent(studentName) {
  localStorage.setItem(currentStudentKey, studentName);
}

function ensureStudentEntry(studentName) {
  const students = getStudentMap();
  if (!students[studentName]) {
    students[studentName] = { ...defaultProgress };
    localStorage.setItem(studentsStorageKey, JSON.stringify(students));
  }
  return students[studentName];
}

function getProgress(studentName = getSelectedStudent()) {
  const students = getStudentMap();
  const selected = students[studentName] || { ...defaultProgress };
  return { ...defaultProgress, ...selected };
}

function saveProgress(studentName, storageState) {
  const students = getStudentMap();
  const currentEntry = students[studentName] || {};
  const nextEntry = {
    ...defaultProgress,
    ...currentEntry,
    ...storageState
  };

  students[studentName] = nextEntry;
  localStorage.setItem(studentsStorageKey, JSON.stringify(students));
}

function updateProgress(storageState, studentName = getSelectedStudent()) {
  saveProgress(studentName, storageState);

  const taskList = document.querySelectorAll(".task-list input[type='checkbox']");
  taskList.forEach((checkbox) => {
    const key = checkbox.dataset.key;
    checkbox.checked = Boolean(storageState[key]);
  });

  const total = Object.keys(defaultProgress).length;
  const completed = Object.keys(defaultProgress).filter((key) => Boolean(storageState[key])).length;
  const progressBar = document.querySelector(".progress-bar");
  const progressText = document.querySelector("#progressText");
  const studentTitle = document.getElementById("studentTitle");

  if (progressBar) {
    const percentage = (completed / total) * 100;
    progressBar.style.width = `${percentage}%`;
  }

  if (progressText) {
    progressText.textContent = `${completed}/${total} skills complete`;
  }

  if (studentTitle) {
    studentTitle.textContent = `${studentName}'s learning goals`;
  }

  renderStudentOverview();
  renderStudentResultSummary(studentName);
}

function attachProgressHandlers() {
  const taskList = document.querySelectorAll(".task-list input[type='checkbox']");
  taskList.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const studentName = getSelectedStudent();
      const state = getProgress(studentName);
      state[checkbox.dataset.key] = checkbox.checked;
      updateProgress(state, studentName);
    });
  });
}

function renderStudentOverview() {
  const overviewList = document.getElementById("studentOverview");
  if (!overviewList) {
    return;
  }

  const students = getStudentMap();
  const studentNames = Object.keys(students);

  overviewList.innerHTML = studentNames
    .map((studentName) => {
      const state = getProgress(studentName);
      const total = Object.keys(defaultProgress).length;
      const completed = Object.keys(defaultProgress).filter((key) => Boolean(state[key])).length;
      const percentage = Math.round((completed / total) * 100);
      return `<li><span>${escapeHtml(studentName)}<span class="small"> ${completed}/${total} complete</span></span><strong>${percentage}%</strong></li>`;
    })
    .join("");
}

function renderStudentOptions() {
  const select = document.getElementById("studentSelect");
  if (!select) {
    return;
  }

  const students = getStudentMap();
  const names = Object.keys(students);
  const current = getSelectedStudent();

  select.innerHTML = names
    .map((name) => `<option value="${name}" ${name === current ? "selected" : ""}>${escapeHtml(name)}</option>`)
    .join("");

  if (!names.includes(current)) {
    saveSelectedStudent(names[0] || "Class overview");
  }
}

function addStudent() {
  const input = document.getElementById("studentName");
  const select = document.getElementById("studentSelect");
  const studentName = input.value.trim();

  if (!studentName) {
    return;
  }

  const students = getStudentMap();
  if (!students[studentName]) {
    students[studentName] = { ...defaultProgress };
    localStorage.setItem(studentsStorageKey, JSON.stringify(students));
    addNotification("student-added", `${studentName} created a student account and is ready to work.`, studentName);
  }

  saveSelectedStudent(studentName);
  renderStudentOptions();
  const state = getProgress(studentName);
  updateProgress(state, studentName);
  input.value = "";
  if (select) {
    select.value = studentName;
  }
}

function renderNotifications() {
  const list = document.getElementById("teacherNotifications");
  if (!list) {
    return;
  }

  const notifications = getNotifications();
  if (!notifications.length) {
    list.innerHTML = "<li><span class='muted'>No new student accounts or lesson updates yet.</span></li>";
    return;
  }

  list.innerHTML = notifications
    .map((entry) => {
      const label = entry.studentName ? escapeHtml(entry.studentName) : "System";
      const time = new Date(entry.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      return `<li><strong>${label}</strong><span>${escapeHtml(entry.message)}</span><small>${time}</small></li>`;
    })
    .join("");
}

function renderStudentResultSummary(studentName = getSelectedStudent()) {
  const list = document.getElementById("studentResultSummary");
  if (!list) {
    return;
  }

  const students = getStudentMap();
  const student = students[studentName] || { ...defaultProgress };
  const lessonResults = student.lessonResults || {};
  const entries = Object.entries(lessonLabels);

  if (!entries.length || Object.keys(lessonResults).length === 0) {
    list.innerHTML = "<li><span class='muted'>No lesson results yet. Students will appear here after they answer questions.</span></li>";
    return;
  }

  list.innerHTML = entries
    .map(([key, label]) => {
      const result = lessonResults[key];
      if (!result) {
        return `<li><span>${label}</span><strong>Not attempted</strong></li>`;
      }
      const outcome = result.outcome === "correct" ? "Correct" : "Incorrect";
      const colourClass = result.outcome === "correct" ? "success" : "warning";
      return `<li><span>${label}</span><strong class="${colourClass}">${outcome}</strong></li>`;
    })
    .join("");
}

function updateWelcomeMessage() {
  const message = document.getElementById("welcomeMessage");
  if (!message) {
    return;
  }

  const studentName = localStorage.getItem(loggedInStudentKey);
  if (studentName) {
    message.textContent = `Welcome back, ${studentName}! Your maths journey is ready.`;
    return;
  }

  message.textContent = "Welcome to your own maths journey.";
}

function createStudentAccount(studentName, password) {
  const cleanName = studentName.trim();
  const cleanPassword = password.trim();

  if (!cleanName) {
    return { ok: false, message: "Please enter a student name." };
  }

  const accounts = getStudentAccountMap();
  const lookupKey = cleanName.toLowerCase();

  if (accounts[lookupKey] && accounts[lookupKey].password !== cleanPassword) {
    return { ok: false, message: "This student name is already taken. Try logging in instead." };
  }

  if (!accounts[lookupKey]) {
    accounts[lookupKey] = {
      name: cleanName,
      password: cleanPassword || "student123",
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(studentAccountsKey, JSON.stringify(accounts));
    addNotification("student-signup", `${cleanName} has created a student account and is ready for teacher tracking.`, cleanName);
  }

  localStorage.setItem(loggedInStudentKey, cleanName);
  ensureStudentEntry(cleanName);
  saveSelectedStudent(cleanName);
  renderStudentOptions();
  const state = getProgress(cleanName);
  updateProgress(state, cleanName);
  updateWelcomeMessage();

  return {
    ok: true,
    message: `Hello ${cleanName}! Your account is ready and the teacher can now track your progress.`
  };
}

function loginStudentAccount(studentName, password) {
  const cleanName = studentName.trim();
  const cleanPassword = password.trim();

  if (!cleanName) {
    return { ok: false, message: "Please enter a student name." };
  }

  const accounts = getStudentAccountMap();
  const account = accounts[cleanName.toLowerCase()];

  if (!account) {
    return { ok: false, message: "No account found for that student name. Please create an account first." };
  }

  if (account.password !== cleanPassword) {
    return { ok: false, message: "Incorrect password. Please try again." };
  }

  localStorage.setItem(loggedInStudentKey, cleanName);
  ensureStudentEntry(cleanName);
  saveSelectedStudent(cleanName);
  renderStudentOptions();
  const state = getProgress(cleanName);
  updateProgress(state, cleanName);
  updateWelcomeMessage();

  return {
    ok: true,
    message: `Hello ${cleanName}! Your student progress is ready.`
  };
}

function setupStudentAccountForm() {
  const form = document.getElementById("studentSignupForm");
  if (!form) {
    return;
  }

  const message = document.getElementById("studentSignupMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = document.getElementById("studentNameInput");
    const passwordInput = document.getElementById("studentPasswordInput");

    const result = createStudentAccount(nameInput.value, passwordInput.value);
    if (message) {
      message.textContent = result.message;
      message.classList.toggle("success", result.ok);
      message.classList.toggle("error", !result.ok);
    }

    if (result.ok) {
      form.reset();
    }
  });
}

function setupStudentLoginForm() {
  const form = document.getElementById("studentLoginForm");
  if (!form) {
    return;
  }

  const message = document.getElementById("studentLoginMessage");
  const createButton = document.getElementById("studentCreateAccountBtn");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = document.getElementById("studentLoginName");
    const passwordInput = document.getElementById("studentLoginPassword");
    const result = loginStudentAccount(nameInput.value, passwordInput.value);

    if (message) {
      message.textContent = result.message;
      message.classList.toggle("success", result.ok);
      message.classList.toggle("error", !result.ok);
    }

    if (result.ok) {
      form.reset();
    }
  });

  if (createButton) {
    createButton.addEventListener("click", () => {
      const nameInput = document.getElementById("studentLoginName");
      const passwordInput = document.getElementById("studentLoginPassword");
      const result = createStudentAccount(nameInput.value, passwordInput.value);

      if (message) {
        message.textContent = result.message;
        message.classList.toggle("success", result.ok);
        message.classList.toggle("error", !result.ok);
      }

      if (result.ok) {
        form.reset();
      }
    });
  }
}

function setLessonResult(studentName, lessonKey, outcome, answerText = "") {
  const students = getStudentMap();
  const entry = students[studentName] || { ...defaultProgress };
  entry.lessonResults = entry.lessonResults || {};
  entry.lessonResults[lessonKey] = {
    outcome,
    answer: answerText,
    updatedAt: new Date().toISOString()
  };
  students[studentName] = entry;
  localStorage.setItem(studentsStorageKey, JSON.stringify(students));
  renderStudentResultSummary(studentName);
}

function getOwnerPassword() {
  const savedPassword = localStorage.getItem(ownerPasswordKey);
  const defaultPassword = "umukoro3";

  if (!savedPassword || savedPassword === "teacher123") {
    localStorage.setItem(ownerPasswordKey, defaultPassword);
    return defaultPassword;
  }

  if (savedPassword !== defaultPassword) {
    localStorage.setItem(ownerPasswordKey, defaultPassword);
  }

  return defaultPassword;
}

function enforceLoginGate() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const teacherUnlocked = localStorage.getItem(ownerAccessKey) === "true";
  const studentLoggedIn = Boolean(localStorage.getItem(loggedInStudentKey));

  if (currentPage === "progress.html") {
    if (!teacherUnlocked) {
      window.location.href = "index.html";
      return false;
    }
    return true;
  }

  if (["lessons.html", "games.html"].includes(currentPage) && !(teacherUnlocked || studentLoggedIn)) {
    window.location.href = "index.html";
    return false;
  }

  return true;
}

function updateOwnerAccessView() {
  const ownerDashboard = document.getElementById("ownerDashboard");
  const ownerAccessPanel = document.getElementById("ownerAccessPanel");
  const unlocked = localStorage.getItem(ownerAccessKey) === "true";

  if (ownerDashboard) {
    ownerDashboard.classList.toggle("hidden", !unlocked);
  }

  if (ownerAccessPanel) {
    ownerAccessPanel.style.display = unlocked ? "none" : "flex";
  }
}

function unlockOwnerDashboard() {
  const input = document.getElementById("ownerPasswordInput");
  const message = document.getElementById("ownerLoginMessage");
  const password = input ? input.value.trim() : "";

  if (!password) {
    if (message) {
      message.textContent = "Please enter the teacher password.";
      message.classList.add("error");
      message.classList.remove("success");
    }
    return;
  }

  if (password === getOwnerPassword()) {
    localStorage.setItem(ownerAccessKey, "true");
    updateOwnerAccessView();
    if (message) {
      message.textContent = "Dashboard unlocked.";
      message.classList.add("success");
      message.classList.remove("error");
    }
    return;
  }

  if (message) {
    message.textContent = "Incorrect password. Please try again.";
    message.classList.add("error");
    message.classList.remove("success");
  }
}

function renderProgressPage() {
  updateOwnerAccessView();

  const selectedStudent = getSelectedStudent();
  const state = getProgress(selectedStudent);
  renderStudentOptions();
  updateProgress(state, selectedStudent);
  renderNotifications();
  renderStudentResultSummary(selectedStudent);

  const select = document.getElementById("studentSelect");
  if (select) {
    select.addEventListener("change", (event) => {
      const newStudent = event.target.value;
      saveSelectedStudent(newStudent);
      const nextState = getProgress(newStudent);
      updateProgress(nextState, newStudent);
      renderStudentResultSummary(newStudent);
    });
  }

  const addButton = document.getElementById("addStudentBtn");
  if (addButton) {
    addButton.addEventListener("click", addStudent);
  }

  const ownerLoginButton = document.getElementById("ownerLoginBtn");
  if (ownerLoginButton) {
    ownerLoginButton.addEventListener("click", unlockOwnerDashboard);
  }

  const ownerPasswordInput = document.getElementById("ownerPasswordInput");
  if (ownerPasswordInput) {
    ownerPasswordInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        unlockOwnerDashboard();
      }
    });
  }
}

function resetWarmUpPanel() {
  const questionEl = document.querySelector(".mini-problem h3");
  const answerEls = document.querySelectorAll(".mini-row span");
  const factEls = document.querySelectorAll(".mini-facts strong");

  if (!questionEl || !answerEls.length || !factEls.length) {
    return;
  }

  const chosen = warmUpTasks[Math.floor(Math.random() * warmUpTasks.length)];
  const shuffledAnswers = [...chosen.answers].sort(() => Math.random() - 0.5);

  questionEl.textContent = chosen.question;
  answerEls.forEach((element, index) => {
    element.textContent = shuffledAnswers[index] || "";
  });

  const minutes = [20, 25, 30, 35, 40, 45, 50, 55];
  const topics = [4, 5, 6, 7, 8];
  const games = [2, 3, 4, 5];

  factEls[0].textContent = String(minutes[Math.floor(Math.random() * minutes.length)]);
  factEls[1].textContent = String(topics[Math.floor(Math.random() * topics.length)]);
  factEls[2].textContent = String(games[Math.floor(Math.random() * games.length)]);
}

function initQuiz() {
  const scoreValue = document.getElementById("scoreValue");
  const questionCount = document.getElementById("questionCount");
  const questionCategory = document.getElementById("questionCategory");
  const questionText = document.getElementById("questionText");
  const answerButtons = document.getElementById("answerButtons");
  const feedback = document.getElementById("feedback");
  const nextButton = document.getElementById("nextButton");

  if (!scoreValue || !questionCount || !questionCategory || !questionText || !answerButtons || !feedback || !nextButton) {
    return;
  }

  let score = 0;
  let currentQuestionIndex = 0;
  let questionSet = [];

  function shuffleArray(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function updateScore() {
    scoreValue.textContent = score;
    questionCount.textContent = questionSet.length;
  }

  function finishQuiz() {
    questionText.textContent = `Well done! You scored ${score} out of ${questionSet.length}.`;
    questionCategory.textContent = "Quiz complete";
    answerButtons.innerHTML = "";
    feedback.textContent = "Keep practising to become even stronger with your Year 3 maths skills!";
    feedback.className = "feedback success";
    nextButton.classList.add("hidden");

    const selectedStudent = getSelectedStudent();
    const activeStudent = selectedStudent && selectedStudent !== "Class overview" ? selectedStudent : "Class overview";
    const state = getProgress(activeStudent);
    state.challenge = true;
    updateProgress(state, activeStudent);
    setLessonResult(activeStudent, "challenge", score >= 3 ? "correct" : "incorrect", `Quiz score: ${score}/${questionSet.length}`);
    addNotification("quiz", `${activeStudent} finished the maths challenge quiz with ${score}/${questionSet.length}.`, activeStudent);
  }

  function renderQuestion() {
    if (currentQuestionIndex >= questionSet.length) {
      finishQuiz();
      return;
    }

    const currentQuestion = questionSet[currentQuestionIndex];
    questionCategory.textContent = currentQuestion.category;
    questionText.textContent = currentQuestion.question;
    feedback.textContent = "";
    feedback.className = "feedback";
    nextButton.classList.add("hidden");

    const shuffledAnswers = shuffleArray(currentQuestion.answers);
    answerButtons.innerHTML = "";

    shuffledAnswers.forEach((answer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-btn";
      button.textContent = answer;
      button.setAttribute("aria-label", `Answer: ${answer}`);

      button.addEventListener("click", () => {
        const isCorrect = answer === currentQuestion.correct;
        const buttons = answerButtons.querySelectorAll("button");

        buttons.forEach((btn) => {
          btn.disabled = true;
          if (btn.textContent === currentQuestion.correct) {
            btn.classList.add("correct");
          }
        });

        if (isCorrect) {
          score += 1;
          updateScore();
          feedback.textContent = "Correct! Great job!";
          feedback.classList.add("success");
        } else {
          feedback.textContent = `Not quite. The correct answer is ${currentQuestion.correct}.`;
          feedback.classList.add("error");
          button.classList.add("incorrect");
        }

        nextButton.classList.remove("hidden");
      });

      answerButtons.appendChild(button);
    });
  }

  nextButton.addEventListener("click", () => {
    currentQuestionIndex += 1;
    renderQuestion();
  });

  score = 0;
  currentQuestionIndex = 0;
  questionSet = shuffleArray(questions).slice(0, 5);
  updateScore();
  renderQuestion();
}

function setupLessonTabs() {
  const tabs = document.querySelectorAll(".lesson-tab");
  const panels = document.querySelectorAll(".lesson-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tab;

      tabs.forEach((btn) => {
        const isActive = btn === tab;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-selected", String(isActive));
      });

      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === targetId);
      });
    });
  });
}

function renderLessonPanels() {
  document.querySelectorAll(".lesson-panel").forEach((panel) => {
    const lessonKey = panel.id.replace("-panel", "");
    const lesson = lessonQuestionBank[lessonKey];

    if (!lesson) {
      return;
    }

    const cardMarkup = `
      <div class="lesson-card">
        <div class="lesson-card-header">
          <span class="lesson-badge">Lesson goals</span>
          <span class="tag">${lesson.title}</span>
        </div>
        <h3>${lesson.title}</h3>
        <ul>
          ${lesson.summary.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `;

    const questionsMarkup = lesson.questions
      .map((question, index) => {
        const difficulty = index < 3 ? "Easy" : index < 7 ? "Medium" : "Hard";
        const difficultyClass = index < 3 ? "easy" : index < 7 ? "medium" : "hard";

        return `
          <div class="question-panel lesson-question-card">
            <div class="lesson-question-meta">
              <span class="category">${difficulty} • Question ${index + 1}</span>
              <span class="difficulty-pill ${difficultyClass}">${difficulty}</span>
            </div>
            <h4>${question.prompt}</h4>
            <div class="practice-answers" data-correct="${escapeHtml(String(question.answer))}">
              ${question.options
                .map(
                  (option) =>
                    `<button class="practice-option" type="button" data-answer="${escapeHtml(String(option))}">${option}</button>`
                )
                .join("")}
            </div>
            <p class="practice-feedback" aria-live="polite"></p>
          </div>
        `;
      })
      .join("");

    panel.innerHTML = `${cardMarkup}${questionsMarkup}`;
  });
}

function setupLessonQuestions() {
  document.querySelectorAll(".practice-answers").forEach((answerGroup) => {
    const correctAnswer = answerGroup.dataset.correct;
    const buttons = answerGroup.querySelectorAll(".practice-option");
    const feedback = answerGroup.parentElement.querySelector(".practice-feedback");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedAnswer = button.dataset.answer;
        buttons.forEach((btn) => {
          btn.disabled = true;
          if (btn.dataset.answer === correctAnswer) {
            btn.classList.add("correct");
          }
        });

        const studentName = getSelectedStudent();
        const lessonKey = button.closest(".lesson-panel").id.replace("-panel", "");
        const mappedKey = {
          counting: "counts",
          addition: "addition",
          multiplication: "multiplication",
          fractions: "fractions",
          measurement: "time",
          geometry: "shapes"
        }[lessonKey] || lessonKey;

        if (selectedAnswer === correctAnswer) {
          feedback.textContent = "Correct! Well done.";
          feedback.style.color = "#13a77d";

          const state = getProgress(studentName);
          state[mappedKey] = true;
          updateProgress(state, studentName);
          setLessonResult(studentName, mappedKey, "correct", selectedAnswer);
          addNotification("lesson-correct", `${studentName} got ${lessonLabels[mappedKey] || mappedKey} correct.`, studentName);
        } else {
          feedback.textContent = `Not quite. The correct answer is ${correctAnswer}.`;
          feedback.style.color = "#d93a3a";
          button.classList.add("incorrect");

          const state = getProgress(studentName);
          state[mappedKey] = Boolean(state[mappedKey]);
          updateProgress(state, studentName);
          setLessonResult(studentName, mappedKey, "incorrect", selectedAnswer);
          addNotification("lesson-incorrect", `${studentName} got ${lessonLabels[mappedKey] || mappedKey} incorrect.`, studentName);
        }
      });
    });
  });
}

function setupSpeedGame() {
  const panel = document.getElementById("speedQuestion");
  const timer = document.getElementById("speedTimer");
  const scoreValue = document.getElementById("speedScore");
  const input = document.getElementById("speedAnswerInput");
  const submitBtn = document.getElementById("speedSubmitBtn");
  const startBtn = document.getElementById("speedStartBtn");
  const message = document.getElementById("speedMessage");

  if (!panel || !timer || !scoreValue || !input || !submitBtn || !startBtn || !message) {
    return;
  }

  const bestScoreKey = "year3SpeedGameBest";
  let score = 0;
  let countdown = 10;
  let activeQuestion = null;
  let timerId = null;

  function updateBestScore(bestScore) {
    const currentBest = Number(localStorage.getItem(bestScoreKey) || "0");
    if (bestScore > currentBest) {
      localStorage.setItem(bestScoreKey, String(bestScore));
    }
  }

  function getRandomQuestion() {
    const factors = [3, 4, 6, 8];
    const first = factors[Math.floor(Math.random() * factors.length)];
    const second = Math.floor(Math.random() * 9) + 2;
    return { first, second, answer: first * second };
  }

  function setMessage(text, state) {
    message.textContent = text;
    message.classList.remove("success", "error");
    if (state) {
      message.classList.add(state);
    }
  }

  function endRound(finalMessage) {
    clearInterval(timerId);
    activeQuestion = null;
    input.disabled = true;
    submitBtn.disabled = true;
    startBtn.textContent = "Play again";
    const bestScore = Number(localStorage.getItem(bestScoreKey) || "0");
    if (score > bestScore) {
      updateBestScore(score);
    }
    setMessage(`${finalMessage} Game over! Your final score is ${score}.`, "error");
  }

  function nextQuestion() {
    clearInterval(timerId);
    countdown = 10;
    input.disabled = false;
    submitBtn.disabled = false;
    input.value = "";
    input.focus();
    activeQuestion = getRandomQuestion();
    panel.textContent = `${activeQuestion.first} × ${activeQuestion.second} = ?`;
    timer.textContent = `${countdown}s`;

    timerId = setInterval(() => {
      countdown -= 1;
      timer.textContent = `${countdown}s`;
      if (countdown <= 0) {
        endRound("Time is up!");
      }
    }, 1000);
  }

  function handleSubmit() {
    if (!activeQuestion) {
      return;
    }

    const answer = Number(input.value);
    if (!Number.isFinite(answer)) {
      setMessage("Type a number before you submit.", "error");
      return;
    }

    if (answer === activeQuestion.answer) {
      score += 1;
      scoreValue.textContent = String(score);
      setMessage("Correct! Keep going!", "success");
      nextQuestion();
      return;
    }

    endRound("Not quite this time!");
  }

  startBtn.addEventListener("click", () => {
    score = 0;
    scoreValue.textContent = "0";
    input.disabled = false;
    submitBtn.disabled = false;
    setMessage("Can you beat the clock?", "");
    nextQuestion();
  });

  submitBtn.addEventListener("click", handleSubmit);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  });

  input.disabled = true;
  submitBtn.disabled = true;
  scoreValue.textContent = "0";
  timer.textContent = "10s";
  panel.textContent = "Press start to begin.";
}

function setupGameButtons() {
  document.querySelectorAll(".game-card .mini-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const studentName = getSelectedStudent();
      const state = getProgress(studentName);
      state.game = true;
      updateProgress(state, studentName);
      button.textContent = "Played";
      button.disabled = true;
      addNotification("game", `${studentName} played a maths game.`, studentName);

      const speedBtn = document.getElementById("speedStartBtn");
      if (button.dataset.gameAction === "speed" && speedBtn) {
        speedBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        speedBtn.click();
      }
    });
  });
}

function setupLoginRoleButtons() {
  const teacherPanel = document.getElementById("teacherLoginPanel");
  const studentPanel = document.getElementById("studentLoginPanel");
  const teacherBtn = document.querySelector('[data-role="teacher"]');
  const studentBtn = document.querySelector('[data-role="student"]');

  if (!teacherPanel || !studentPanel || !teacherBtn || !studentBtn) {
    return;
  }

  teacherBtn.addEventListener("click", () => {
    teacherPanel.classList.remove("hidden");
    studentPanel.classList.add("hidden");
  });

  studentBtn.addEventListener("click", () => {
    studentPanel.classList.remove("hidden");
    teacherPanel.classList.add("hidden");
  });

  const teacherPasswordBtn = document.getElementById("teacherPasswordBtn");
  if (teacherPasswordBtn) {
    teacherPasswordBtn.addEventListener("click", () => {
      const passwordInput = document.getElementById("teacherPasswordInput");
      const message = document.getElementById("teacherLoginMessage");
      const value = passwordInput ? passwordInput.value.trim() : "";

      if (!value) {
        if (message) {
          message.textContent = "Please enter the teacher password.";
          message.classList.add("error");
          message.classList.remove("success");
        }
        return;
      }

      if (value === getOwnerPassword()) {
        localStorage.setItem(ownerAccessKey, "true");
        window.location.href = "progress.html";
        return;
      }

      if (message) {
        message.textContent = "Incorrect teacher password.";
        message.classList.add("error");
        message.classList.remove("success");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateWelcomeMessage();
  resetWarmUpPanel();

  if (!enforceLoginGate()) {
    return;
  }

  renderLessonPanels();
  setupLoginRoleButtons();
  setupStudentAccountForm();
  setupStudentLoginForm();
  attachProgressHandlers();
  renderProgressPage();
  setupLessonTabs();
  setupLessonQuestions();
  setupSpeedGame();
  setupGameButtons();
  initQuiz();
});
