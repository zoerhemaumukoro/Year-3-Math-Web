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
        const lessonKey = answerGroup.closest(".lesson-panel").id.replace("-panel", "");
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
  if (!enforceLoginGate()) {
    return;
  }

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
