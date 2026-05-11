// ===== USER DATABASE =====
const users = [
    { email: 'student@lifecare.com', password: 'password123', role: 'Student', name: 'Jo Student' },
    { email: 'nurse@lifecare.com', password: 'password123', role: 'Nursing Student', name: 'Juna Nurse' },
    { email: 'prof@lifecare.com', password: 'password123', role: 'Professional', name: 'Prof. Pascua' }
];

const quotes = [
    "You are stronger than you believe!",
    "Every accomplishment starts with a decision to try.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "Your potential is endless. Push yourself!",
    "Great things never came from comfort zones.",
    "You've got this! Keep pushing forward.",
    "Success is not final, failure is not fatal.",
    "Your dreams are closer than you think.",
    "Keep going, you're doing amazing!"
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (user) {
        showPage('dashboardPage');
        initializeDashboard();
    } else {
        showPage('loginPage');
        initializeLoginForm();
    }
    
    // Navigation links
    setupNavigation();
}

function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            showPage(page);
        });
    });
    
    // Sidebar navigation
    document.querySelectorAll('.sidebar-link:not(.logout-link)').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            navigateSection(section);
            
            // Update active sidebar link
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// ===== PAGE NAVIGATION =====
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageName).classList.add('active');
}

function goToLogin() {
    showPage('loginPage');
    window.scrollTo(0, 0);
}

function navigateSection(sectionName) {
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName + 'Section').classList.add('active');
    window.scrollTo(0, 0);
}

// ===== LOGIN FUNCTIONALITY =====
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });
}

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Validate credentials
    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    
    if (user) {
        // Store user in localStorage
        const userData = {
            email: user.email,
            role: user.role,
            name: user.name,
            nickname: user.name
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Initialize dashboard data
        initializeDashboardData(userData);
        
        // Redirect to dashboard
        showPage('dashboardPage');
        initializeDashboard();
        
        // Clear form
        document.getElementById('loginForm').reset();
    } else {
        errorMessage.textContent = 'Invalid login credentials!';
        errorMessage.classList.add('show');
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('dashboardData');
    showPage('loginPage');
    document.getElementById('loginForm').reset();
}

// ===== DASHBOARD INITIALIZATION =====
function initializeDashboardData(user) {
    let dashboardData = JSON.parse(localStorage.getItem('dashboardData')) || {};
    
    if (!dashboardData[user.email]) {
        dashboardData[user.email] = {
            academic: { tasks: [] },
            health: { water: 0, sleep: 0, activity: 0, medications: [], meals: [] },
            mental: { mood: '', stress: 0, journalEntries: [] },
            daily: { budget: 0, spent: 0, expenses: [], habits: [], notes: [] },
            duties: { shifts: [] },
            student: { contacts: [], notes: '' }
        };
        localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    }
}

function initializeDashboard() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) return;
    
    // Update user greeting and role
    document.getElementById('userGreeting').textContent = `Hi, ${user.nickname}`;
    document.getElementById('userRole').textContent = `Role: ${user.role}`;
    
    // Load profile data
    document.getElementById('profileName').value = user.nickname || user.name;
    document.getElementById('profileEmail').value = user.email;
    document.getElementById('profileRole').value = user.role;
    
    // Update dashboard summaries
    updateDashboardSummaries();
}

function updateDashboardSummaries() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    const userData = dashboardData[user.email];
    
    // Academic summary
    const taskCount = userData.academic.tasks.length;
    document.getElementById('academicSummary').textContent = `${taskCount} tasks | 0 exams`;
    
    // Health summary
    document.getElementById('healthSummary').textContent = `Water: ${userData.health.water}ml | Sleep: ${userData.health.sleep}hr | Activity: ${userData.health.activity}min`;
    
    // Mental summary
    const moodText = userData.mental.mood || 'Not logged';
    document.getElementById('mentalSummary').textContent = `Mood: ${moodText} | Stress: ${userData.mental.stress}/10`;
    
    // Daily summary
    document.getElementById('dailySummary').textContent = `Budget: $${userData.daily.budget} | Spent: $${userData.daily.spent}`;
    
    // Duties summary
    const dutiesCount = userData.duties.shifts.length;
    document.getElementById('dutiesSummary').textContent = `${dutiesCount} upcoming duties`;
}

// ===== MODAL FUNCTIONALITY =====
function openModal(section) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    const userData = dashboardData[user.email];
    
    let content = '';
    
    if (section === 'academic') {
        content = getAcademicModal(userData);
    } else if (section === 'health') {
        content = getHealthModal(userData);
    } else if (section === 'mental') {
        content = getMentalModal(userData);
    } else if (section === 'daily') {
        content = getDailyModal(userData);
    } else if (section === 'duties') {
        content = getDutiesModal(userData);
    } else if (section === 'student') {
        content = getStudentModal(userData);
    }
    
    modalBody.innerHTML = content;
    modal.classList.add('show');
    
    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
}

// ===== ACADEMIC MODAL =====
function getAcademicModal(userData) {
    let tasksHTML = '';
    userData.academic.tasks.forEach((task, index) => {
        tasksHTML += `
            <div class="modal-list-item">
                <div class="modal-list-item-text">
                    <strong>${task.name}</strong> - ${task.priority}<br>
                    Due: ${task.deadline}
                </div>
                <button class="modal-list-item-delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
    });
    
    return `
        <h2>📚 Smart Academic Planner</h2>
        <div class="modal-form-group">
            <label for="taskName">Task Name</label>
            <input type="text" id="taskName" placeholder="Enter task name">
        </div>
        <div class="modal-form-group">
            <label for="taskDeadline">Deadline</label>
            <input type="date" id="taskDeadline">
        </div>
        <div class="modal-form-group">
            <label for="taskPriority">Priority</label>
            <select id="taskPriority">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>
        </div>
        <button class="modal-btn" onclick="addTask()">Add Task</button>
        
        <h3 style="margin-top: 30px; color: #5B9BD5;">Your Tasks</h3>
        <div>${tasksHTML || '<p>No tasks yet. Add one to get started!</p>'}</div>
    `;
}

function addTask() {
    const name = document.getElementById('taskName').value;
    const deadline = document.getElementById('taskDeadline').value;
    const priority = document.getElementById('taskPriority').value;
    
    if (!name || !deadline) {
        alert('Please fill in all fields');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].academic.tasks.push({ name, deadline, priority });
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    updateDashboardSummaries();
    openModal('academic');
}

function deleteTask(index) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].academic.tasks.splice(index, 1);
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    updateDashboardSummaries();
    openModal('academic');
}

// ===== HEALTH MODAL =====
function getHealthModal(userData) {
    let medsHTML = '';
    userData.health.medications.forEach((med, index) => {
        medsHTML += `
            <div class="modal-list-item">
                <div class="modal-list-item-text">
                    <strong>${med.name}</strong><br>
                    ${med.dose} at ${med.time}
                </div>
                <button class="modal-list-item-delete" onclick="deleteMedication(${index})">Delete</button>
            </div>
        `;
    });
    
    let mealsHTML = '';
    userData.health.meals.forEach((meal, index) => {
        mealsHTML += `
            <div class="modal-list-item">
                <div class="modal-list-item-text">
                    <strong>${meal.name}</strong> - ${meal.calories} cal
                </div>
                <button class="modal-list-item-delete" onclick="deleteMeal(${index})">Delete</button>
            </div>
        `;
    });
    
    return `
        <h2>🏥 Health & Wellness Monitoring</h2>
        
        <h3 style="color: #5B9BD5; margin-top: 20px;">Water Intake</h3>
        <div class="modal-form-group">
            <label for="waterIntake">Water (ml)</label>
            <input type="number" id="waterIntake" value="${userData.health.water}" placeholder="0">
        </div>
        
        <h3 style="color: #5B9BD5; margin-top: 20px;">Sleep</h3>
        <div class="modal-form-group">
            <label for="sleepHours">Hours of Sleep</label>
            <input type="number" id="sleepHours" value="${userData.health.sleep}" placeholder="0" step="0.5">
        </div>
        
        <h3 style="color: #5B9BD5; margin-top: 20px;">Exercise</h3>
        <div class="modal-form-group">
            <label for="activityMinutes">Activity (minutes)</label>
            <input type="number" id="activityMinutes" value="${userData.health.activity}" placeholder="0">
        </div>
        
        <h3 style="color: #5B9BD5; margin-top: 20px;">Medication Reminders</h3>
        <div class="modal-form-group">
            <label for="medName">Medication Name</label>
            <input type="text" id="medName" placeholder="e.g., Aspirin">
        </div>
        <div class="modal-form-group">
            <label for="medDose">Dosage</label>
            <input type="text" id="medDose" placeholder="e.g., 500mg">
        </div>
        <div class="modal-form-group">
            <label for="medTime">Time</label>
            <input type="time" id="medTime">
        </div>
        <button class="modal-btn" onclick="addMedication()">Add Medication</button>
        
        <div>${medsHTML ? '<h4 style="margin-top: 20px;">Medications:</h4>' + medsHTML : ''}</div>
        
        <h3 style="color: #5B9BD5; margin-top: 20px;">Meal Logging</h3>
        <div class="modal-form-group">
            <label for="mealName">Meal Name</label>
            <input type="text" id="mealName" placeholder="e.g., Breakfast">
        </div>
        <div class="modal-form-group">
            <label for="mealCalories">Calories</label>
            <input type="number" id="mealCalories" placeholder="0">
        </div>
        <button class="modal-btn" onclick="addMeal()">Add Meal</button>
        
        <div>${mealsHTML ? '<h4 style="margin-top: 20px;">Meals:</h4>' + mealsHTML : ''}</div>
        
        <button class="modal-btn" style="background: #70AD47;" onclick="saveHealthData()">Save Health Data</button>
    `;
}

function addMedication() {
    const name = document.getElementById('medName').value;
    const dose = document.getElementById('medDose').value;
    const time = document.getElementById('medTime').value;
    
    if (!name || !dose || !time) {
        alert('Please fill in all fields');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].health.medications.push({ name, dose, time });
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    openModal('health');
}

function deleteMedication(index) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].health.medications.splice(index, 1);
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    openModal('health');
}

function addMeal() {
    const name = document.getElementById('mealName').value;
    const calories = document.getElementById('mealCalories').value;
    
    if (!name || !calories) {
        alert('Please fill in all fields');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].health.meals.push({ name, calories });
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    openModal('health');
}

function deleteMeal(index) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].health.meals.splice(index, 1);
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    openModal('health');
}

function saveHealthData() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].health.water = parseInt(document.getElementById('waterIntake').value) || 0;
    dashboardData[user.email].health.sleep = parseFloat(document.getElementById('sleepHours').value) || 0;
    dashboardData[user.email].health.activity = parseInt(document.getElementById('activityMinutes').value) || 0;
    
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    updateDashboardSummaries();
    closeModal();
}

// ===== MENTAL HEALTH MODAL =====
function getMentalModal(userData) {
    let journalHTML = '';
    userData.mental.journalEntries.forEach((entry, index) => {
        journalHTML += `
            <div class="modal-list-item">
                <div class="modal-list-item-text">
                    <strong>${entry.date}</strong><br>
                    ${entry.content.substring(0, 100)}...
                </div>
                <button class="modal-list-item-delete" onclick="deleteJournal(${index})">Delete</button>
            </div>
        `;
    });
    
    return `
        <h2>🧠 Mental Health & Stress Support</h2>
        
        <h3 style="color: #5B9BD5; margin-top: 20px;">Mood Tracker</h3>
        <div class="modal-form-group">
            <label for="moodSelect">How are you feeling?</label>
            <select id="moodSelect">
                <option value="">Select mood</option>
                <option>😊 Happy</option>
                <option>😐 Neutral</option>
                <option>😢 Sad</option>
                <option>😰 Anxious</option>
                <option>😤 Stressed</option>
            </select>
        </div>
        
        <h3 style="color: #5B9BD5; margin-top: 20px;">Stress Level</h3>
        <div class="modal-form-group">
            <label for="stressLevel">Stress Level (1-10)</label>
            <input type="range" id="stressLevel" min="1" max="10" value="${userData.mental.stress}" style="width: 100%;">
            <span id="stressValue" style="display: inline-block; margin-top: 10px;">Current: ${userData.mental.stress}/10</span>
        </div>
        
        <h3 style="color: #5B9BD5; margin-top: 20px;">Breathing Exercise</h3>
        <p style="color: #666; margin-bottom: 15px;">Follow the circle animation: Breathe in and out slowly</p>
        <div id="breathingCircle" style="width: 100px; height: 100px; background: #5B9BD5; border-radius: 50%; margin: 20px auto; animation: breathing 4s infinite;"></div>
        
        <h3 style="color: #5B9BD5; margin-top: 30px;">Daily Journaling</h3>
        <div class="modal-form-group">
            <label for="journalEntry">Write your thoughts...</label>
            <textarea id="journalEntry" placeholder="What's on your mind today? What made you stressed? What are you grateful for?"></textarea>
        </div>
        <button class="modal-btn" onclick="addJournalEntry()">Save Entry</button>
        
        <div>${journalHTML ? '<h4 style="margin-top: 20px;">Past Entries:</h4>' + journalHTML : ''}</div>
        
        <button class="modal-btn" style="background: #70AD47; margin-top: 20px;" onclick="saveMentalData()">Save Mental Health Data</button>
    `;
}

function addJournalEntry() {
    const content = document.getElementById('journalEntry').value;
    
    if (!content) {
        alert('Please write something');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    const date = new Date().toLocaleDateString();
    
    dashboardData[user.email].mental.journalEntries.push({ date, content });
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    document.getElementById('journalEntry').value = '';
    openModal('mental');
}

function deleteJournal(index) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].mental.journalEntries.splice(index, 1);
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    openModal('mental');
}

function saveMentalData() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    const mood = document.getElementById('moodSelect').value;
    const stress = parseInt(document.getElementById('stressLevel').value);
    
    dashboardData[user.email].mental.mood = mood || 'Not logged';
    dashboardData[user.email].mental.stress = stress;
    
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    updateDashboardSummaries();
    closeModal();
}

document.addEventListener('DOMContentLoaded', () => {
    const stressSlider = document.getElementById('stressLevel');
    if (stressSlider) {
        stressSlider.addEventListener('input', (e) => {
            document.getElementById('stressValue').textContent = `Current: ${e.target.value}/10`;
        });
    }
});

// ===== DAILY LIFE MODAL =====
function getDailyModal(userData) {
    let expensesHTML = '';
    userData.daily.expenses.forEach((exp, index) => {
        expensesHTML += `
            <div class="modal-list-item">
                <div class="modal-list-item-text">
                    <strong>${exp.category}</strong> - $${exp.amount}
                </div>
                <button class="modal-list-item-delete" onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;
    });
    
    let notesHTML = '';
    userData.daily.notes.forEach((note, index) => {
        notesHTML += `
            <div class="modal-list-item">
                <div class="modal-list-item-text">
                    ${note}
                </div>
                <button class="modal-list-item-delete" onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
    });
    
    const remaining = userData.daily.budget - userData.daily.spent;
    
    return `
        <h2>💰 Daily Life Management</h2>
        
        <h3 style="color: #5B9BD5; margin-top: 20px;">Budget Management</h3>
        <div class="modal-form-group">
            <label for="budgetAmount">Monthly Budget ($)</label>
            <input type="number" id="budgetAmount" value="${userData.daily.budget}" placeholder="0">
        </div>
        
        <h3 style="color: #5B9BD5; margin-top: 20px;">Expense Tracking</h3>
        <p style="color: #666; margin-bottom: 15px;">Budget: $${userData.daily.budget} | Spent: $${userData.daily.spent} | Remaining: $${remaining}</p>
        
        <div class="modal-form-group">
            <label for="expenseCategory">Category</label>
            <input type="text" id="expenseCategory" placeholder="e.g., groceries, transport">
        </div>
        <div class="modal-form-group">
            <label for="expenseAmount">Amount ($)</label>
            <input type="number" id="expenseAmount" placeholder="0" step="0.01">
        </div>
        <button class="modal-btn" onclick="addExpense()">Add Expense</button>
        
        <div>${expensesHTML ? '<h4 style="margin-top: 20px;">Expenses:</h4>' + expensesHTML : ''}</div>
        
        <h3 style="color: #5B9BD5; margin-top: 30px;">Personal Notes & Checklist</h3>
        <div class="modal-form-group">
            <label for="noteInput">Add Note</label>
            <input type="text" id="noteInput" placeholder="e.g., Pick up groceries, Bring stethoscope">
        </div>
        <button class="modal-btn" onclick="addNote()">Add Note</button>
        
        <div>${notesHTML ? '<h4 style="margin-top: 20px;">Notes:</h4>' + notesHTML : ''}</div>
        
        <button class="modal-btn" style="background: #70AD47; margin-top: 20px;" onclick="saveDailyData()">Save Daily Data</button>
    `;
}

function addExpense() {
    const category = document.getElementById('expenseCategory').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    
    if (!category || !amount) {
        alert('Please fill in all fields');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].daily.expenses.push({ category, amount });
    dashboardData[user.email].daily.spent = dashboardData[user.email].daily.expenses.reduce((sum, e) => sum + e.amount, 0);
    
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    openModal('daily');
}

function deleteExpense(index) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].daily.expenses.splice(index, 1);
    dashboardData[user.email].daily.spent = dashboardData[user.email].daily.expenses.reduce((sum, e) => sum + e.amount, 0);
    
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    openModal('daily');
}

function addNote() {
    const note = document.getElementById('noteInput').value;
    
    if (!note) {
        alert('Please enter a note');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].daily.notes.push(note);
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    openModal('daily');
}

function deleteNote(index) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].daily.notes.splice(index, 1);
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    openModal('daily');
}

function saveDailyData() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].daily.budget = parseInt(document.getElementById('budgetAmount').value) || 0;
    
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    updateDashboardSummaries();
    closeModal();
}

// ===== DUTIES MODAL =====
function getDutiesModal(userData) {
    let shiftsHTML = '';
    userData.duties.shifts.forEach((shift, index) => {
        shiftsHTML += `
            <div class="modal-list-item">
                <div class="modal-list-item-text">
                    <strong>${shift.date}</strong><br>
                    ${shift.time} - Duration: ${shift.duration}min<br>
                    Notes: ${shift.notes}
                </div>
                <button class="modal-list-item-delete" onclick="deleteShift(${index})">Delete</button>
            </div>
        `;
    });
    
    return `
        <h2>📅 Scheduled Duties</h2>
        
        <div class="modal-form-group">
            <label for="shiftDate">Date</label>
            <input type="date" id="shiftDate">
        </div>
        <div class="modal-form-group">
            <label for="shiftTime">Time</label>
            <input type="time" id="shiftTime">
        </div>
        <div class="modal-form-group">
            <label for="shiftDuration">Duration (minutes)</label>
            <input type="number" id="shiftDuration" placeholder="0">
        </div>
        <div class="modal-form-group">
            <label for="shiftNotes">Notes</label>
            <textarea id="shiftNotes" placeholder="e.g., Bring stethoscope, Attend workshop"></textarea>
        </div>
        <button class="modal-btn" onclick="addShift()">Add Shift</button>
        
        <div>${shiftsHTML ? '<h4 style="margin-top: 20px;">Upcoming Shifts:</h4>' + shiftsHTML : '<p>No scheduled duties yet.</p>'}</div>
    `;
}

function addShift() {
    const date = document.getElementById('shiftDate').value;
    const time = document.getElementById('shiftTime').value;
    const duration = document.getElementById('shiftDuration').value;
    const notes = document.getElementById('shiftNotes').value;
    
    if (!date || !time || !duration) {
        alert('Please fill in required fields');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].duties.shifts.push({ date, time, duration, notes });
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    updateDashboardSummaries();
    openModal('duties');
}

function deleteShift(index) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].duties.shifts.splice(index, 1);
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    updateDashboardSummaries();
    openModal('duties');
}

// ===== STUDENT SUPPORT MODAL =====
function getStudentModal(userData) {
    return `
        <h2> Student Support System</h2>
        
        <h3 style="color: #5B9BD5; margin-top: 20px;"> Motivational Quotes</h3>
        <p style="color: #666; margin-bottom: 15px;">Click to get a random motivational quote!</p>
        <button class="modal-btn" onclick="showQuoteModal()">Get Inspired</button>
        
        <h3 style="color: #5B9BD5; margin-top: 30px;"> Support Notes & Reminders</h3>
        <div class="modal-form-group">
            <label for="supportNotes">Type your thoughts, goals, or reminders</label>
            <textarea id="supportNotes" placeholder="e.g., Study group meeting, My goals for this week, Things to remember...">${userData.student.notes}</textarea>
        </div>
        <button class="modal-btn" onclick="saveStudentNotes()">Save Notes</button>
        
        <h3 style="color: #5B9BD5; margin-top: 30px;"> Emergency Contacts</h3>
        <p style="color: #666; margin-bottom: 15px;">Store important contact information</p>
        <div class="modal-form-group">
            <label for="contactName">Contact Name</label>
            <input type="text" id="contactName" placeholder="e.g., Mom, Doctor, Friend">
        </div>
        <div class="modal-form-group">
            <label for="contactPhone">Phone Number</label>
            <input type="tel" id="contactPhone" placeholder="e.g., 09123456789">
        </div>
        <button class="modal-btn" onclick="addEmergencyContact()">Add Contact</button>
        
        <h3 style="color: #5B9BD5; margin-top: 30px;">Self-Care Recommendations</h3>
        <p style="color: #666; margin-bottom: 15px;"> Based on your stress level and mood, here are some recommendations:</p>
        <ul style="color: #555; line-height: 2;">
            <li>✓ Take a 5-10 minute break and stretch</li>
            <li>✓ Practice deep breathing exercises</li>
            <li>✓ Go for a short walk outdoors</li>
            <li>✓ Drink water and stay hydrated</li>
            <li>✓ Connect with friends for support</li>
            <li>✓ Listen to your favorite music or podcast</li>
            <li>✓ Practice journaling or meditation</li>
        </ul>
    `;
}

function showQuoteModal() {
    const quoteModal = document.getElementById('quoteModal');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quoteText').textContent = `"${randomQuote}"`;
    quoteModal.classList.add('show');
}

function getNewQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quoteText').textContent = `"${randomQuote}"`;
}

function closeQuoteModal() {
    document.getElementById('quoteModal').classList.remove('show');
}

function saveStudentNotes() {
    const notes = document.getElementById('supportNotes').value;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    dashboardData[user.email].student.notes = notes;
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    alert('Notes saved successfully!');
}

function addEmergencyContact() {
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    
    if (!name || !phone) {
        alert('Please fill in all fields');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    if (!dashboardData[user.email].student.contacts) {
        dashboardData[user.email].student.contacts = [];
    }
    
    dashboardData[user.email].student.contacts.push({ name, phone });
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    
    alert('Contact added successfully!');
    document.getElementById('contactName').value = '';
    document.getElementById('contactPhone').value = '';
}

// ===== PROFILE MANAGEMENT =====
function saveProfile() {
    const nickname = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    
    if (!nickname || !email) {
        alert('Please fill in all fields');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.nickname = nickname;
    user.email = email;
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    document.getElementById('userGreeting').textContent = `Hi, ${nickname}`;
    alert('Profile updated successfully!');
}

// ===== CSS ANIMATION FOR BREATHING =====
const style = document.createElement('style');
style.textContent = `
    @keyframes breathing {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
