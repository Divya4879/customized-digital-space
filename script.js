// Global Variables
let currentTheme = 'pink';
let currentMode = 'light';
let currentTab = 'dashboard';
let timerInterval = null;
let timerMinutes = 25;
let timerSeconds = 0;
let isTimerRunning = false;
let workoutStats = {
    today: parseInt(localStorage.getItem('todayWorkouts') || '0'),
    week: parseInt(localStorage.getItem('weekWorkouts') || '0'),
    total: parseInt(localStorage.getItem('totalWorkouts') || '0')
};

// Drag and Drop Variables
let draggedElement = null;
let draggedFromColumn = null;

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupDragAndDrop();
    updateWorkoutStats();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    showWelcomeNotifications();
});

function initializeApp() {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') || 'pink';
    const savedMode = localStorage.getItem('mode') || 'light';
    
    setTheme(savedTheme);
    setMode(savedMode);
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize timer display
    updateTimerDisplay();
}

function setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    switchMode('dashboard');
                    break;
                case '2':
                    e.preventDefault();
                    switchMode('focus');
                    break;
                case '3':
                    e.preventDefault();
                    switchMode('learning');
                    break;
                case '4':
                    e.preventDefault();
                    switchMode('play');
                    break;
                case 't':
                    e.preventDefault();
                    toggleThemeDropdown();
                    break;
            }
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.theme-selector')) {
            document.getElementById('themeDropdown').classList.remove('show');
            document.getElementById('themeToggle').setAttribute('aria-expanded', 'false');
        }
    });

    // Focus input enhancement
    const focusInput = document.getElementById('focusInput');
    if (focusInput) {
        focusInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const value = this.value.trim();
                if (value) {
                    showNotification(`Focus set: ${value}`, 'success');
                    localStorage.setItem('dailyFocus', value);
                }
            }
        });

        // Load saved focus
        const savedFocus = localStorage.getItem('dailyFocus');
        if (savedFocus) {
            focusInput.value = savedFocus;
        }
    }
}

// Theme Management
function toggleThemeDropdown() {
    const dropdown = document.getElementById('themeDropdown');
    const toggle = document.getElementById('themeToggle');
    const isOpen = dropdown.classList.contains('show');
    
    dropdown.classList.toggle('show');
    toggle.setAttribute('aria-expanded', !isOpen);
    
    if (!isOpen) {
        // Focus first theme option
        dropdown.querySelector('.theme-option').focus();
    }
}

function setTheme(theme) {
    currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update active theme option
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
        option.setAttribute('tabindex', '-1');
    });
    
    const activeOption = document.querySelector(`.theme-option.${theme}`);
    if (activeOption) {
        activeOption.classList.add('active');
        activeOption.setAttribute('tabindex', '0');
    }
    
    showNotification(`Theme changed to ${theme}`, 'info');
}

function setMode(mode) {
    currentMode = mode;
    document.body.setAttribute('data-mode', mode);
    localStorage.setItem('mode', mode);
    
    // Update mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    const activeBtn = document.querySelector(`.mode-btn[onclick="setMode('${mode}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-pressed', 'true');
    }
    
    showNotification(`Switched to ${mode} mode`, 'info');
}

// Mode Switching
function switchMode(mode) {
    currentTab = mode;
    
    // Update tab states
    
    showNotification(`Switched to ${mode} mode`, 'info');
}

// Mode Switching
function switchMode(mode) {
    currentTab = mode;
    
    // Update tab states
    document.querySelectorAll('.mode-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });
    
    document.querySelectorAll('.mode-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Activate selected tab and content
    const activeTab = document.querySelector(`[onclick="switchMode('${mode}')"]`);
    const activeContent = document.getElementById(`${mode}-mode`);
    
    if (activeTab && activeContent) {
        activeTab.classList.add('active');
        activeTab.setAttribute('aria-selected', 'true');
        activeContent.classList.add('active');
    }
    
    // Announce mode change for screen readers
    const modeNames = {
        dashboard: 'Dashboard',
        focus: 'Focus Mode',
        learning: 'Learning Mode',
        play: 'Play Mode'
    };
    
    showNotification(`Switched to ${modeNames[mode]}`, 'info');
}

// Timer Functions
function updateTimerDisplay() {
    const display = document.getElementById('timerDisplay');
    const formattedTime = `${timerMinutes.toString().padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`;
    display.textContent = formattedTime;
    display.setAttribute('aria-label', `Timer: ${timerMinutes} minutes and ${timerSeconds} seconds`);
}

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        document.getElementById('startBtn').textContent = 'Running...';
        document.getElementById('startBtn').disabled = true;
        
        timerInterval = setInterval(() => {
            if (timerSeconds === 0) {
                if (timerMinutes === 0) {
                    // Timer finished
                    clearInterval(timerInterval);
                    isTimerRunning = false;
                    document.getElementById('startBtn').textContent = 'Start Focus';
                    document.getElementById('startBtn').disabled = false;
                    showNotification('Focus session completed! Great job! 🎉', 'success');
                    
                    // Play completion sound (if supported)
                    if ('speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance('Focus session completed');
                        utterance.volume = 0.3;
                        speechSynthesis.speak(utterance);
                    }
                    
                    return;
                }
                timerMinutes--;
                timerSeconds = 59;
            } else {
                timerSeconds--;
            }
            updateTimerDisplay();
        }, 1000);
        
        showNotification('Focus session started! 🎯', 'info');
    }
}

function pauseTimer() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        document.getElementById('startBtn').textContent = 'Resume';
        document.getElementById('startBtn').disabled = false;
        showNotification('Timer paused', 'warning');
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerMinutes = 25;
    timerSeconds = 0;
    document.getElementById('startBtn').textContent = 'Start Focus';
    document.getElementById('startBtn').disabled = false;
    updateTimerDisplay();
    showNotification('Timer reset', 'info');
}

function setTimerMode(mode, minutes) {
    if (!isTimerRunning) {
        timerMinutes = minutes;
        timerSeconds = 0;
        updateTimerDisplay();
        
        // Update active mode button
        document.querySelectorAll('.timer-mode').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        event.target.classList.add('active');
        event.target.setAttribute('aria-pressed', 'true');
        
        showNotification(`Timer set to ${minutes} minutes`, 'info');
    }
}

function setCustomTimer() {
    const customMinutes = parseInt(document.getElementById('customMinutes').value);
    if (customMinutes && customMinutes > 0 && customMinutes <= 120 && !isTimerRunning) {
        timerMinutes = customMinutes;
        timerSeconds = 0;
        updateTimerDisplay();
        
        // Clear active mode
        document.querySelectorAll('.timer-mode').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        showNotification(`Custom timer set to ${customMinutes} minutes`, 'success');
    } else if (isTimerRunning) {
        showNotification('Cannot change timer while running', 'warning');
    } else {
        showNotification('Please enter a valid time (1-120 minutes)', 'error');
    }
}

// Drag and Drop Functions
function setupDragAndDrop() {
    const taskCards = document.querySelectorAll('.task-card');
    const columns = document.querySelectorAll('.kanban-column');

    taskCards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        
        // Keyboard support
        card.addEventListener('keydown', handleCardKeydown);
    });

    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
        column.addEventListener('dragenter', handleDragEnter);
        column.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    draggedElement = this;
    draggedFromColumn = this.closest('.kanban-column').dataset.column;
    this.classList.add('dragging');
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    
    // Announce drag start for screen readers
    showNotification(`Started moving ${this.querySelector('.task-title').textContent}`, 'info');
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // Clean up drag over states
    document.querySelectorAll('.kanban-column').forEach(col => {
        col.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    // Only remove drag-over if we're actually leaving the column
    if (!this.contains(e.relatedTarget)) {
        this.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    const targetColumn = this.dataset.column;
    
    if (draggedElement && draggedFromColumn !== targetColumn) {
        // Move the task to new column
        const addButton = this.querySelector('.add-task-btn');
        this.insertBefore(draggedElement, addButton);
        
        // Update column counts
        updateColumnCounts();
        
        // Show success notification
        const taskTitle = draggedElement.querySelector('.task-title').textContent;
        const columnNames = {
            planning: 'Planning',
            development: 'In Development',
            review: 'Code Review',
            deployed: 'Deployed'
        };
        
        showNotification(`Moved "${taskTitle}" to ${columnNames[targetColumn]}`, 'success');
        
        // Save state to localStorage
        saveKanbanState();
    }

    this.classList.remove('drag-over');
    return false;
}

function handleCardKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Show task details or edit mode
        const taskTitle = this.querySelector('.task-title').textContent;
        showNotification(`Selected: ${taskTitle}`, 'info');
    }
}

function updateColumnCounts() {
    const columns = ['planning', 'development', 'review', 'deployed'];
    
    columns.forEach(columnId => {
        const column = document.querySelector(`[data-column="${columnId}"]`);
        const taskCount = column.querySelectorAll('.task-card').length;
        const countElement = document.getElementById(`${columnId}-count`);
        
        if (countElement) {
            countElement.textContent = taskCount;
            countElement.setAttribute('aria-label', `${taskCount} items`);
        }
    });
}

function saveKanbanState() {
    const kanbanState = {};
    const columns = document.querySelectorAll('.kanban-column');
    
    columns.forEach(column => {
        const columnId = column.dataset.column;
        const tasks = Array.from(column.querySelectorAll('.task-card')).map(task => ({
            id: task.dataset.taskId,
            title: task.querySelector('.task-title').textContent,
            description: task.querySelector('.task-description').textContent,
            priority: task.querySelector('.task-priority').textContent,
            meta: task.querySelector('.task-meta span:last-child').textContent
        }));
        kanbanState[columnId] = tasks;
    });
    
    localStorage.setItem('kanbanState', JSON.stringify(kanbanState));
}

// Workout Functions
function updateWorkoutStats() {
    document.getElementById('todayWorkouts').textContent = workoutStats.today;
    document.getElementById('weekWorkouts').textContent = workoutStats.week;
    document.getElementById('totalWorkouts').textContent = workoutStats.total;
}

function startWorkout(type) {
    const workoutElement = document.getElementById(`${type}Workout`);
    if (workoutElement.style.display === 'none') {
        // Hide all other workouts
        document.querySelectorAll('.workout-routine').forEach(routine => {
            routine.style.display = 'none';
        });
        
        // Show selected workout
        workoutElement.style.display = 'block';
        workoutElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        const workoutNames = {
            desk: 'Desk Workout',
            hiit: 'HIIT Workout',
            tabata: 'Tabata Training',
            cardio: 'Short Cardio'
        };
        
        showNotification(`Started ${workoutNames[type]}! Let's go! 💪`, 'success');
    } else {
        workoutElement.style.display = 'none';
    }
}

function completeWorkout(type) {
    const button = event.target;
    
    if (!button.classList.contains('completed')) {
        // Mark as completed
        button.classList.add('completed');
        button.textContent = 'Completed! ✅';
        
        // Update stats
        workoutStats.today++;
        workoutStats.week++;
        workoutStats.total++;
        
        // Save to localStorage
        localStorage.setItem('todayWorkouts', workoutStats.today.toString());
        localStorage.setItem('weekWorkouts', workoutStats.week.toString());
        localStorage.setItem('totalWorkouts', workoutStats.total.toString());
        
        updateWorkoutStats();
        
        const workoutNames = {
            desk: 'Desk Workout',
            hiit: 'HIIT Workout',
            tabata: 'Tabata Training',
            cardio: 'Short Cardio'
        };
        
        showNotification(`${workoutNames[type]} completed! Great job! 🎉`, 'success');
        
        // Hide workout after 2 seconds
        setTimeout(() => {
            document.getElementById(`${type}Workout`).style.display = 'none';
        }, 2000);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        ${message}
        <button class="notification-close" onclick="closeNotification(this)" aria-label="Close notification">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification.querySelector('.notification-close'));
        }
    }, 4000);
    
    // Announce to screen readers
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
}

function closeNotification(button) {
    const notification = button.parentNode;
    notification.style.animation = 'slideOutUp 0.3s ease';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Date and Time Functions
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    document.getElementById('currentDateTime').textContent = now.toLocaleDateString('en-US', options);
    
    // Update greeting based on time
    updateGreeting(now);
}

function updateGreeting(now) {
    const hour = now.getHours();
    const minute = now.getMinutes();
    const totalMinutes = hour * 60 + minute;
    
    let greeting;
    
    // Time ranges in minutes from midnight
    const nightStart = 21 * 60; // 9:00 PM
    const morningStart = 4 * 60; // 4:00 AM
    const afternoonStart = 11 * 60 + 55; // 11:55 AM
    const eveningStart = 17 * 60; // 5:00 PM
    
    if (totalMinutes >= nightStart || totalMinutes < morningStart) {
        greeting = "Good night";
    } else if (totalMinutes >= morningStart && totalMinutes < afternoonStart) {
        greeting = "Good morning";
    } else if (totalMinutes >= afternoonStart && totalMinutes < eveningStart) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    
    const welcomeTitle = document.querySelector('.welcome-title');
    if (welcomeTitle) {
        welcomeTitle.textContent = `${greeting}, Divya! ✨`;
    }
}

// Mobile Functions
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
    
    // Update aria-expanded
    const toggle = document.querySelector('.mobile-menu-toggle');
    const isOpen = sidebar.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
    
    if (isOpen) {
        showNotification('Navigation menu opened', 'info');
    } else {
        showNotification('Navigation menu closed', 'info');
    }
}

// Welcome Notifications
function showWelcomeNotifications() {
    setTimeout(() => {
        showNotification('Welcome to your ultimate workspace, Divya! 🎉', 'success');
    }, 1000);
    
    setTimeout(() => {
        showNotification('23 new messages waiting for you! 💬', 'info');
    }, 3000);
    
    setTimeout(() => {
        showNotification('Your productivity score is 87% today! 📈', 'success');
    }, 5000);
}

// Accessibility Enhancements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Focus Management
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trapping for theme dropdown
document.addEventListener('DOMContentLoaded', function() {
    const themeDropdown = document.getElementById('themeDropdown');
    if (themeDropdown) {
        trapFocus(themeDropdown);
    }
});