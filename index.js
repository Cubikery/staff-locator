// This is the "Day 1" of the cycle
const ANCHOR_DATE = "2026-01-15";

// School day structure: all periods from morning to afternoon
const SCHOOL_DAY = {
  periods: [
    { period: 0, start: "08:40", end: "08:50", label: "Tutor" },
    { period: 1, start: "08:50", end: "09:40", label: "Period 1" },
    { period: 2, start: "09:40", end: "10:30", label: "Period 2" },
    { period: 3, start: "10:50", end: "11:40", label: "Period 3" },
    { period: 4, start: "11:40", end: "12:30", label: "Period 4" },
    { period: 5, start: "13:50", end: "14:40", label: "Period 5" },
    { period: 6, start: "14:40", end: "15:30", label: "Period 6" },
  ],
};

let allLessons = []; // Array of all lessons from the CSV file
let allTeachers = []; // Array of unique teacher names (sorted A-Z)
let currentTeacher = null; // Which teacher is currently selected (clicked)
let absentPeriods = {}; // Object: { teacherName: Set(periodNumbers) }

/**
 * Absences are kept in localStorage so they survive a reload and are still
 * there for everyone once the admin signs out. The day is stored alongside
 * them, so yesterday's absences are dropped rather than carried over.
 */
function saveAbsences() {
  const plain = {};
  // A Set cannot be turned into JSON, so each one becomes an array
  Object.keys(absentPeriods).forEach((name) => {
    plain[name] = Array.from(absentPeriods[name]);
  });
  localStorage.setItem(
    "absences",
    JSON.stringify({ day: getEffectiveTimetableDay(), teachers: plain }),
  );
}

function loadAbsences() {
  const raw = localStorage.getItem("absences");
  if (!raw) return;

  try {
    const saved = JSON.parse(raw);
    // Only reuse them if they were saved on the day showing now
    if (saved.day !== getEffectiveTimetableDay()) {
      localStorage.removeItem("absences");
      return;
    }
    Object.keys(saved.teachers).forEach((name) => {
      absentPeriods[name] = new Set(saved.teachers[name]);
    });
  } catch (e) {
    // A broken value is not worth keeping
    localStorage.removeItem("absences");
  }
}

/**
 * Converts CSV text into a structured array of lesson objects
 */
function parseCSV(text) {
  const lines = text.split("\n"); // Split by new lines
  if (lines.length < 2) return []; // Need at least header + 1 row

  const headers = lines[0].trim().split(","); // First line is column names
  const data = [];

  // Process each row (starting from row 1, skipping header)
  for (let i = 1; i < lines.length; i++) {
    const vals = lines[i].split(",");

    // Build an object using headers as keys
    const entry = {};
    headers.forEach((h, idx) => {
      let v = vals[idx] || "";
      // Convert day and period to numbers (not text)
      if (h === "day" || h === "period") v = parseInt(v, 10);
      entry[h] = v;
    });

    // Create a clean lesson object
    data.push({
      teacher: entry.teacher || "",
      tutorGroup: entry.tutor_group || "",
      day: entry.day,
      period: entry.period,
      className: entry.class || "",
      room: entry.room || "",
    });
  }

  // Only keep entries that have a teacher name
  return data.filter((d) => d.teacher);
}

/**
 * Load the timetable CSV file and initialize the application
 */
async function loadCSV() {
  const resp = await fetch("timetable.csv"); // Get the file
  const text = await resp.text(); // Read it as text
  allLessons = parseCSV(text); // Parse into lesson objects
  loadAbsences(); // Bring back anything marked earlier today

  // Get all unique teacher names
  const set = new Set(allLessons.map((l) => l.teacher));
  allTeachers = Array.from(set).sort(); // Sort alphabetically

  renderList(); // Show the teacher list
  updateUI(); // Update the display
}

/**
 * Get the set of absent periods for a teacher
 */
function getAbsencePeriodsForTeacher(name) {
  return absentPeriods[name] || new Set();
}

/**
 * Check if a teacher is absent at a specific period
 */
function isAbsentAtPeriod(name, period) {
  const set = absentPeriods[name];
  return !!(set && set.has(period));
}

/**
 * Check if a teacher is absent for the entire day
 */
function isFullyAbsentToday(name) {
  const set = getAbsencePeriodsForTeacher(name);
  const teacherLessons = getTeacherLessons(name);
  const allPeriods = new Set(teacherLessons.map((l) => l.period));
  return (
    set.size > 0 &&
    allPeriods.size > 0 &&
    Array.from(allPeriods).every((p) => set.has(p))
  );
}

/**
 * Toggle absence for a specific period
 */
function togglePeriodAbsence(name, period) {
  if (!name) return;
  if (!absentPeriods[name]) absentPeriods[name] = new Set();

  // Toggle: add if not present, remove if present
  if (absentPeriods[name].has(period)) {
    absentPeriods[name].delete(period);
  } else {
    absentPeriods[name].add(period);
  }

  // Clean up empty entries
  if (absentPeriods[name].size === 0) delete absentPeriods[name];
  saveAbsences();
  renderList(); // Update the list
  if (currentTeacher === name) showTimetable(name); // Update the view
}

/**
 * Set entire day as absent or present for a teacher
 */
function setWholeDayAbsence(name, makeAbsent) {
  if (!name) return;
  if (makeAbsent) {
    // Mark all periods as absent
    const teacherLessons = getTeacherLessons(name);
    const allPeriods = teacherLessons.map((l) => l.period);
    absentPeriods[name] = new Set(allPeriods);
  } else {
    // Remove all absences
    delete absentPeriods[name];
  }
  saveAbsences();
  renderList();

  // The admin list shows every absent teacher, so it is always redrawn
  if (localStorage.getItem("isLoggedIn") === "true" && currentTeacher) {
    showTimetable(currentTeacher);
  } else if (currentTeacher === name) {
    showTimetable(name);
  }
}

/**
 * Toggle whole day absence status
 */
function toggleWholeDayAbsence(name) {
  setWholeDayAbsence(name, !isFullyAbsentToday(name));
}

/**
 * Set up login/logout button functionality
 */
function setupLogin() {
  const loginBtn = document.getElementById("loginBtn");
  loginBtn.onclick = function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
      localStorage.setItem("isLoggedIn", "false");
      location.reload();
    } else {
      window.location.href = "login.html";
    }
  };
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  loginBtn.innerText = isLoggedIn ? "Sign out" : "Sign in";
  if (isLoggedIn) updateUI();
}

/**
 * Calculate which day of the 7-day cycle we're on
 */
function getEffectiveTimetableDay() {
  const from = new Date(ANCHOR_DATE + "T00:00:00");
  const to = new Date();
  to.setHours(0, 0, 0, 0);
  const elapsed = Math.floor((to - from) / (1000 * 60 * 60 * 24));
  return (elapsed % 7) + 1;
}

/**
 * Turns a "HH:MM" string into the number of minutes since midnight
 */
function toMinutes(time) {
  const parts = time.split(":");
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

/**
 * Works out which period to show, based on the clock.
 * Before school it shows the first period, after school the last,
 * so the panel always has something on it rather than going blank.
 */
function getCurrentPeriod() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();

  // During school hours, find the period we are inside
  for (let i = 0; i < SCHOOL_DAY.periods.length; i++) {
    const p = SCHOOL_DAY.periods[i];
    if (mins >= toMinutes(p.start) && mins < toMinutes(p.end)) return p.period;
  }

  // Between two periods, jump forward to whichever is next
  for (let i = 0; i < SCHOOL_DAY.periods.length; i++) {
    if (mins < toMinutes(SCHOOL_DAY.periods[i].start))
      return SCHOOL_DAY.periods[i].period;
  }

  // The school day has finished, so fall back to the last period
  return SCHOOL_DAY.periods[SCHOOL_DAY.periods.length - 1].period;
}

/**
 * Get all lessons for a teacher, sorted by day and period
 */
function getTeacherLessons(name) {
  return allLessons
    .filter((l) => l.teacher === name)
    .sort((a, b) => a.day - b.day || a.period - b.period);
}

/**
 * Renders the teacher list with search filtering
 */
function renderList() {
  const search = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();
  let filtered = allTeachers;

  // Filter teachers by search term
  if (search) {
    filtered = allTeachers.filter((t) => {
      // Search by teacher name
      if (t.toLowerCase().includes(search)) return true;
      // Search by class name, tutor group, or room
      return getTeacherLessons(t).some(
        (l) =>
          (l.className && l.className.toLowerCase().includes(search)) ||
          (l.tutorGroup && l.tutorGroup.toLowerCase().includes(search)) ||
          (l.room && l.room.toLowerCase().includes(search)),
      );
    });
  }

  const container = document.getElementById("teacherListContainer");
  if (!filtered.length) {
    container.innerHTML = `<div class="no-results">No teachers match "${search}"</div>`;
    return;
  }

  // Build the teacher list HTML
  let html = filtered
    .map((name) => {
      const isSelected = name === currentTeacher;
      const lessons = getTeacherLessons(name);
      const today = getEffectiveTimetableDay();
      const todayLessons = lessons.filter((l) => l.day === today);

      return `
        <div class="teacher ${isSelected ? "selected" : ""} ${isFullyAbsentToday(name) ? "is-absent" : ""}"
             data-name="${escapeHtml(name)}"
             draggable="${localStorage.getItem("isLoggedIn") === "true" ? "true" : "false"}">
          <div class="teacher-name">${escapeHtml(name)}</div>
        </div>
      `;
    })
    .join("");

  container.innerHTML = html;
  attachEvents();
}

/**
 * Display the timetable and status for a selected teacher
 */
function showTimetable(name) {
  if (!name) {
    updateUI();
    return;
  }
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  document.getElementById("selectedTeacherName").innerText = name;
  const lessons = getTeacherLessons(name);
  const today = getEffectiveTimetableDay();
  const todayLessons = lessons.filter((l) => l.day === today);
  // --- ADMIN PANEL ---
  // Absences are set by dragging a teacher into this panel, so all that is
  // shown here is who is currently marked absent
  if (isLoggedIn) {
    const absent = isFullyAbsentToday(name);
    document.getElementById("statusDisplay").innerHTML = "";

    // Absent teachers get the status under their name, everyone else gets
    // the prompt sitting in the middle of the empty panel
    document.getElementById("adminStatus").innerHTML = absent
      ? `<span class="admin-msg">Absent</span>
         <button class="clear-btn" id="clearBtn">Mark as present</button>`
      : "";

    document.getElementById("timetableView").innerHTML = absent
      ? ""
      : `<div class="drop-msg">
            <div class="main">Click or drag a teacher to mark them absent</div>
         </div>`;

    // The button is rebuilt each time, so the handler is attached here
    const clearBtn = document.getElementById("clearBtn");
    if (clearBtn) {
      clearBtn.onclick = function () {
        setWholeDayAbsence(name, false);
      };
    }
    return;
  }

  // --- LOCATION SUMMARY ---
  // The class and room the teacher is in right now
  const period = getCurrentPeriod();
  const nowLesson = todayLessons.find((l) => l.period === period);

  const className =
    nowLesson && nowLesson.className ? nowLesson.className : "Free";
  const room = nowLesson && nowLesson.room ? nowLesson.room : "";

  // If they are away, the room they would have been in is misleading,
  // so the absence replaces the location entirely
  if (isAbsentAtPeriod(name, period)) {
    document.getElementById("statusDisplay").innerHTML = "";
    document.getElementById("timetableView").innerHTML = `
        <div class="location">
            <div>
                <div class="field-label">Class</div>
                <div class="class-name">Absent</div>
            </div>
        </div>`;
    return;
  }

  document.getElementById("statusDisplay").innerHTML = "";

  let html = `
        <div class="location">
            <div>
                <div class="field-label">Class</div>
                <div class="class-name">${escapeHtml(className)}</div>
            </div>
            ${
              room
                ? `<div>
                <div class="field-label">Room</div>
                <span class="room-pill">${escapeHtml(room)}</span>
            </div>`
                : ""
            }
        </div>`;

  document.getElementById("timetableView").innerHTML = html;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(
    /[&<>]/g,
    (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[m] || m,
  );
}

/**
 * Sets up dragging. Dropping a teacher on the middle panel marks them absent
 * for the day, and dropping them back on the list marks them present again
 */
function setupDragAndDrop() {
  const panel = document.getElementById("dropZonePanel");
  const list = document.getElementById("teacherListContainer");

  [panel, list].forEach((zone) => {
    zone.ondragover = function (e) {
      if (localStorage.getItem("isLoggedIn") !== "true") return;
      e.preventDefault(); // Needed, otherwise the browser blocks the drop
      zone.classList.add("drag-over");
    };
    zone.ondragleave = function () {
      zone.classList.remove("drag-over");
    };
  });

  panel.ondrop = function (e) {
    e.preventDefault();
    panel.classList.remove("drag-over");
    const name = e.dataTransfer.getData("text/plain");
    if (!allTeachers.includes(name)) return;
    currentTeacher = name;
    // Dropping toggles, the same as clicking, so dragging them back in
    // a second time marks them present again
    toggleWholeDayAbsence(name);
  };

  list.ondrop = function (e) {
    e.preventDefault();
    list.classList.remove("drag-over");
    const name = e.dataTransfer.getData("text/plain");
    if (!allTeachers.includes(name)) return;
    setWholeDayAbsence(name, false);
  };
}

/**
 * Update the UI based on current state
 */
function updateUI() {
  const title = document.getElementById("selectedTeacherName");
  const container = document.getElementById("timetableView");

  document.getElementById("adminStatus").innerHTML = "";

  if (!currentTeacher) {
    title.innerText = "Select a teacher";
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    container.innerHTML = `
            <div class="drop-msg">
                <div class="main">Click or drag a teacher to ${isLoggedIn ? "mark absent" : "view location"}</div>
            </div>`;
  } else {
    showTimetable(currentTeacher);
  }
}

/**
 * Attach click events to teacher list items
 */
function attachEvents() {
  document.querySelectorAll(".teacher").forEach((el) => {
    const name = el.getAttribute("data-name");
    // Click handler - Select a teacher and update the UI
    el.onclick = function () {
      if (!name) return;
      currentTeacher = name;

      // Signed in, a click does the same job as dragging them across
      if (localStorage.getItem("isLoggedIn") === "true") {
        toggleWholeDayAbsence(name);
        return;
      }

      renderList();
      showTimetable(name);
    };

    // Drag handler - carries the name across to the drop zone
    el.ondragstart = function (e) {
      e.dataTransfer.setData("text/plain", name);
      el.classList.add("dragging");
    };
    el.ondragend = function () {
      el.classList.remove("dragging");
    };
  });
}

/**
 * Set up search input button functionality
 */
function setupSearchControls() {
  const searchInput = document.getElementById("searchInput");
  // Live search as user types
  searchInput.oninput = function () {
    renderList();
  };
}

loadCSV();
setupDragAndDrop();
setupSearchControls();
setupLogin();
