// Color Customization
let timerColors = {
    stopwatch: '#4CAF50',
    countdown: '#2196F3',
    'split-lap': '#FF9800',
    interval: '#9C27B0',
    clock: '#00BCD4',
    alarm: '#F44336',
    metronome: '#E91E63',
    chess: '#795548'
};

// Load saved colors from localStorage
function loadSavedColors() {
    const saved = localStorage.getItem('timerColors');
    if (saved) {
        timerColors = JSON.parse(saved);
        Object.keys(timerColors).forEach(toolId => {
            const section = document.getElementById(toolId);
            if (section) {
                section.style.setProperty('--section-color', timerColors[toolId]);
            }
        });
    }
}

// Save colors to localStorage
function saveColors() {
    localStorage.setItem('timerColors', JSON.stringify(timerColors));
}

let currentColorPickerTool = null;

window.openColorPicker = function(toolId) {
    currentColorPickerTool = toolId;
    const modal = document.getElementById('color-picker-modal');
    modal.style.display = 'flex';
    const currentColor = timerColors[toolId] || '#4CAF50';
    document.getElementById('custom-color-picker').value = currentColor;
};

window.closeColorPicker = function() {
    document.getElementById('color-picker-modal').style.display = 'none';
    currentColorPickerTool = null;
};

// Color picker functionality
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', () => {
        if (currentColorPickerTool) {
            const color = option.dataset.color;
            applyColor(currentColorPickerTool, color);
        }
    });
});

document.getElementById('custom-color-picker').addEventListener('change', (e) => {
    if (currentColorPickerTool) {
        applyColor(currentColorPickerTool, e.target.value);
    }
});

function applyColor(toolId, color) {
    timerColors[toolId] = color;
    const section = document.getElementById(toolId);
    if (section) {
        section.style.setProperty('--section-color', color);
    }
    saveColors();
    closeColorPicker();
}

// Close modal when clicking outside
document.getElementById('color-picker-modal').addEventListener('click', (e) => {
    if (e.target.id === 'color-picker-modal') {
        closeColorPicker();
    }
});

// Navigation
document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        showTool(tool);
    });
});

function showTool(toolName) {
    document.querySelectorAll('.tool-section').forEach(section => {
        section.classList.remove('active');
    });
    const section = document.getElementById(toolName);
    if (section) {
        section.classList.add('active');
        currentActiveTool = toolName;
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Fullscreen Toggle
window.toggleFullscreen = function(toolId) {
    const section = document.getElementById(toolId);
    if (section) {
        const isFullscreen = section.classList.contains('fullscreen');
        if (isFullscreen) {
            section.classList.remove('fullscreen');
            document.body.classList.remove('fullscreen-mode');
            document.body.style.overflow = '';
        } else {
            // Remove fullscreen from all other sections
            document.querySelectorAll('.tool-section').forEach(s => {
                s.classList.remove('fullscreen');
            });
            section.classList.add('fullscreen');
            document.body.classList.add('fullscreen-mode');
            document.body.style.overflow = 'hidden';
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

// Keyboard Shortcuts
let currentActiveTool = 'stopwatch';

function getActiveTool() {
    const activeSection = document.querySelector('.tool-section.active');
    return activeSection ? activeSection.id : 'stopwatch';
}

document.addEventListener('keydown', (e) => {
    // Don't trigger shortcuts when typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    const activeTool = getActiveTool();
    
    // Escape - Exit fullscreen
    if (e.key === 'Escape') {
        document.querySelectorAll('.tool-section').forEach(section => {
            section.classList.remove('fullscreen');
        });
        document.body.classList.remove('fullscreen-mode');
        document.body.style.overflow = '';
        return;
    }
    
    // F - Toggle fullscreen
    if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen(activeTool);
        return;
    }
    
    // Tool-specific shortcuts
    if (activeTool === 'stopwatch') {
        // Space - Start/Stop
        if (e.key === ' ') {
            e.preventDefault();
            startStopwatch();
        }
        // S - Split
        else if (e.key === 's' || e.key === 'S') {
            e.preventDefault();
            recordStopwatchSplit();
        }
        // R - Reset
        else if (e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            resetStopwatch();
        }
    }
    else if (activeTool === 'countdown') {
        // Space - Start/Pause
        if (e.key === ' ') {
            e.preventDefault();
            if (countdownRunning) {
                pauseCountdown();
            } else {
                startCountdown();
            }
        }
        // R - Reset
        else if (e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            resetCountdown();
        }
    }
    else if (activeTool === 'split-lap') {
        // Space - Start/Stop
        if (e.key === ' ') {
            e.preventDefault();
            if (splitRunning) {
                pauseSplit();
            } else {
                startSplit();
            }
        }
        // S - Lap
        else if (e.key === 's' || e.key === 'S') {
            e.preventDefault();
            recordLap();
        }
        // R - Reset
        else if (e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            resetSplit();
        }
    }
    else if (activeTool === 'interval') {
        // Space - Start/Pause
        if (e.key === ' ') {
            e.preventDefault();
            if (intervalRunning) {
                pauseInterval();
            } else {
                startInterval();
            }
        }
        // R - Reset
        else if (e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            resetInterval();
        }
    }
    else if (activeTool === 'metronome') {
        // Space - Start/Stop
        if (e.key === ' ') {
            e.preventDefault();
            if (metronomeRunning) {
                stopMetronome();
            } else {
                startMetronome();
            }
        }
    }
    else if (activeTool === 'chess') {
        // Space - Start game
        if (e.key === ' ') {
            e.preventDefault();
            if (!chessRunning) {
                startChessGame();
            }
        }
        // R - Reset
        else if (e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            resetChessGame();
        }
    }
});

// Stopwatch
let stopwatchInterval = null;
let stopwatchTime = 0;
let stopwatchRunning = false;
let stopwatchLapCount = 0;
let stopwatchLapTimes = [];
let stopwatchLastLapTime = 0;

const stopwatchTimeEl = document.getElementById('stopwatch-time');
const stopwatchStartBtn = document.getElementById('stopwatch-start');
const stopwatchPauseBtn = document.getElementById('stopwatch-pause');
const stopwatchResetBtn = document.getElementById('stopwatch-reset');
const stopwatchSplitBtn = document.getElementById('stopwatch-split');
const stopwatchLapsEl = document.getElementById('stopwatch-laps');

stopwatchStartBtn.addEventListener('click', startStopwatch);
stopwatchPauseBtn.addEventListener('click', pauseStopwatch);
stopwatchResetBtn.addEventListener('click', resetStopwatch);
stopwatchSplitBtn.addEventListener('click', recordStopwatchSplit);

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        const startTime = Date.now() - stopwatchTime;
        stopwatchInterval = setInterval(() => {
            stopwatchTime = Date.now() - startTime;
            updateStopwatchDisplay();
        }, 10);
        stopwatchStartBtn.textContent = 'Stop <span class="shortcut">Space</span>';
        stopwatchStartBtn.classList.remove('btn-primary');
        stopwatchStartBtn.classList.add('btn-danger');
    } else {
        pauseStopwatch();
        stopwatchStartBtn.textContent = 'Start <span class="shortcut">Space</span>';
        stopwatchStartBtn.classList.remove('btn-danger');
        stopwatchStartBtn.classList.add('btn-primary');
    }
}

function pauseStopwatch() {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    stopwatchLapCount = 0;
    stopwatchLapTimes = [];
    stopwatchLastLapTime = 0;
    updateStopwatchDisplay();
    stopwatchLapsEl.innerHTML = '';
    stopwatchStartBtn.textContent = 'Start <span class="shortcut">Space</span>';
    stopwatchStartBtn.classList.remove('btn-danger');
    stopwatchStartBtn.classList.add('btn-primary');
}

function recordStopwatchSplit() {
    if (stopwatchRunning || stopwatchTime > 0) {
        stopwatchLapCount++;
        const currentLapTime = stopwatchTime - stopwatchLastLapTime;
        stopwatchLapTimes.push({
            lap: stopwatchLapCount,
            totalTime: stopwatchTime,
            lapTime: currentLapTime
        });
        stopwatchLastLapTime = stopwatchTime;
        updateStopwatchLaps();
    }
}

function updateStopwatchLaps() {
    stopwatchLapsEl.innerHTML = '';
    if (stopwatchLapTimes.length === 0) return;
    
    const header = document.createElement('div');
    header.className = 'lap-header';
    header.innerHTML = `
        <span class="lap-header-item">#</span>
        <span class="lap-header-item">Lap Time</span>
        <span class="lap-header-item">Total Time</span>
    `;
    stopwatchLapsEl.appendChild(header);
    
    stopwatchLapTimes.forEach((lapData, index) => {
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        const isFastest = stopwatchLapTimes.filter(l => l.lapTime === Math.min(...stopwatchLapTimes.map(l => l.lapTime))).some(l => l.lap === lapData.lap);
        const isSlowest = stopwatchLapTimes.filter(l => l.lapTime === Math.max(...stopwatchLapTimes.map(l => l.lapTime))).some(l => l.lap === lapData.lap);
        
        if (isFastest) lapItem.classList.add('fastest');
        if (isSlowest && stopwatchLapTimes.length > 1) lapItem.classList.add('slowest');
        
        lapItem.innerHTML = `
            <span class="lap-number">${lapData.lap}</span>
            <span class="lap-time">${formatTime(lapData.lapTime)}</span>
            <span class="lap-total">${formatTime(lapData.totalTime)}</span>
        `;
        stopwatchLapsEl.appendChild(lapItem);
    });
}

function updateStopwatchDisplay() {
    const totalMs = stopwatchTime;
    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const milliseconds = Math.floor((totalMs % 1000) / 10);
    
    stopwatchTimeEl.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

// Global formatTime function
function formatTime(ms) {
    const totalMs = ms;
    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const milliseconds = Math.floor((totalMs % 1000) / 10);
    
    if (hours > 0) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

// Countdown Timer
let countdownInterval = null;
let countdownTime = 0;
let countdownRunning = false;

const countdownTimeEl = document.getElementById('countdown-time');
const countdownHoursInput = document.getElementById('countdown-hours');
const countdownMinutesInput = document.getElementById('countdown-minutes');
const countdownSecondsInput = document.getElementById('countdown-seconds');
const countdownStartBtn = document.getElementById('countdown-start');
const countdownPauseBtn = document.getElementById('countdown-pause');
const countdownResetBtn = document.getElementById('countdown-reset');

countdownStartBtn.addEventListener('click', startCountdown);
countdownPauseBtn.addEventListener('click', pauseCountdown);
countdownResetBtn.addEventListener('click', resetCountdown);

document.querySelectorAll('#countdown .preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const minutes = parseInt(btn.dataset.minutes);
        countdownMinutesInput.value = minutes;
        countdownHoursInput.value = 0;
        countdownSecondsInput.value = 0;
        updateCountdownFromInputs();
    });
});

function updateCountdownFromInputs() {
    const hours = parseInt(countdownHoursInput.value) || 0;
    const minutes = parseInt(countdownMinutesInput.value) || 0;
    const seconds = parseInt(countdownSecondsInput.value) || 0;
    countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    updateCountdownDisplay();
}

function startCountdown() {
    updateCountdownFromInputs();
    if (countdownTime > 0 && !countdownRunning) {
        countdownRunning = true;
        countdownInterval = setInterval(() => {
            countdownTime -= 1000;
            if (countdownTime <= 0) {
                countdownTime = 0;
                pauseCountdown();
                playAlarmSound();
                alert('Countdown finished!');
            }
            updateCountdownDisplay();
        }, 1000);
    }
}

function pauseCountdown() {
    countdownRunning = false;
    clearInterval(countdownInterval);
}

function resetCountdown() {
    pauseCountdown();
    updateCountdownFromInputs();
}

function updateCountdownDisplay() {
    const totalSeconds = Math.ceil(countdownTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    countdownTimeEl.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Split Lap Timer
let splitInterval = null;
let splitTime = 0;
let splitRunning = false;
let splitLapCount = 0;
let splitLapTimes = [];

const splitTimeEl = document.getElementById('split-time');
const splitStartBtn = document.getElementById('split-start');
const splitLapBtn = document.getElementById('split-lap');
const splitPauseBtn = document.getElementById('split-pause');
const splitResetBtn = document.getElementById('split-reset');
const splitLapsEl = document.getElementById('split-laps');

splitStartBtn.addEventListener('click', startSplit);
splitLapBtn.addEventListener('click', recordLap);
splitPauseBtn.addEventListener('click', pauseSplit);
splitResetBtn.addEventListener('click', resetSplit);

function startSplit() {
    if (!splitRunning) {
        splitRunning = true;
        const startTime = Date.now() - splitTime;
        splitInterval = setInterval(() => {
            splitTime = Date.now() - startTime;
            updateSplitDisplay();
        }, 10);
    }
}

function pauseSplit() {
    splitRunning = false;
    clearInterval(splitInterval);
}

function resetSplit() {
    splitRunning = false;
    clearInterval(splitInterval);
    splitTime = 0;
    splitLapCount = 0;
    splitLapTimes = [];
    updateSplitDisplay();
    splitLapsEl.innerHTML = '';
}

function recordLap() {
    if (splitRunning) {
        splitLapCount++;
        const lapTime = splitTime;
        splitLapTimes.push(lapTime);
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${splitLapCount}</span>
            <span class="lap-time">${formatTime(lapTime)}</span>
        `;
        splitLapsEl.insertBefore(lapItem, splitLapsEl.firstChild);
    }
}

function updateSplitDisplay() {
    splitTimeEl.textContent = formatTime(splitTime);
}

// Interval Timer
let intervalInterval = null;
let intervalRunning = false;
let intervalCurrentTime = 0;
let intervalWorkTime = 30;
let intervalRestTime = 10;
let intervalRounds = 5;
let intervalCurrentRound = 0;
let intervalIsWork = true;

const intervalTimeEl = document.getElementById('interval-time');
const intervalStatusEl = document.getElementById('interval-status');
const intervalWorkInput = document.getElementById('interval-work');
const intervalRestInput = document.getElementById('interval-rest');
const intervalRoundsInput = document.getElementById('interval-rounds');
const intervalStartBtn = document.getElementById('interval-start');
const intervalPauseBtn = document.getElementById('interval-pause');
const intervalResetBtn = document.getElementById('interval-reset');
const currentRoundEl = document.getElementById('current-round');
const totalRoundsEl = document.getElementById('total-rounds');

intervalStartBtn.addEventListener('click', startInterval);
intervalPauseBtn.addEventListener('click', pauseInterval);
intervalResetBtn.addEventListener('click', resetInterval);

intervalWorkInput.addEventListener('change', () => {
    intervalWorkTime = parseInt(intervalWorkInput.value) || 30;
});

intervalRestInput.addEventListener('change', () => {
    intervalRestTime = parseInt(intervalRestInput.value) || 10;
});

intervalRoundsInput.addEventListener('change', () => {
    intervalRounds = parseInt(intervalRoundsInput.value) || 5;
    totalRoundsEl.textContent = intervalRounds;
});

function startInterval() {
    if (!intervalRunning) {
        intervalRunning = true;
        intervalWorkTime = parseInt(intervalWorkInput.value) || 30;
        intervalRestTime = parseInt(intervalRestInput.value) || 10;
        intervalRounds = parseInt(intervalRoundsInput.value) || 5;
        
        if (intervalCurrentRound === 0) {
            intervalCurrentRound = 1;
            intervalIsWork = true;
            intervalCurrentTime = intervalWorkTime;
        }
        
        intervalInterval = setInterval(() => {
            intervalCurrentTime--;
            if (intervalCurrentTime <= 0) {
                playAlarmSound();
                if (intervalIsWork) {
                    intervalIsWork = false;
                    intervalCurrentTime = intervalRestTime;
                    intervalStatusEl.textContent = 'Rest';
                } else {
                    intervalCurrentRound++;
                    if (intervalCurrentRound > intervalRounds) {
                        pauseInterval();
                        intervalStatusEl.textContent = 'Complete!';
                        alert('Interval training complete!');
                        return;
                    }
                    intervalIsWork = true;
                    intervalCurrentTime = intervalWorkTime;
                    intervalStatusEl.textContent = 'Work';
                }
            }
            updateIntervalDisplay();
        }, 1000);
    }
}

function pauseInterval() {
    intervalRunning = false;
    clearInterval(intervalInterval);
}

function resetInterval() {
    pauseInterval();
    intervalCurrentRound = 0;
    intervalIsWork = true;
    intervalCurrentTime = intervalWorkTime;
    intervalStatusEl.textContent = 'Ready';
    updateIntervalDisplay();
    currentRoundEl.textContent = '0';
}

function updateIntervalDisplay() {
    const minutes = Math.floor(intervalCurrentTime / 60);
    const seconds = intervalCurrentTime % 60;
    intervalTimeEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    currentRoundEl.textContent = intervalCurrentRound;
    
    if (intervalRunning) {
        intervalStatusEl.textContent = intervalIsWork ? 'Work' : 'Rest';
    }
}

// Digital Clock
let clock24Hour = true;
let clockTimezone = 'local';
const clockTimeEl = document.getElementById('clock-time');
const clockDateEl = document.getElementById('clock-date');
const clockFormatBtn = document.getElementById('clock-format');
const clockTimezoneSelect = document.getElementById('clock-timezone');

clockFormatBtn.addEventListener('click', () => {
    clock24Hour = !clock24Hour;
    clockFormatBtn.textContent = clock24Hour ? '12-Hour' : '24-Hour';
});

clockTimezoneSelect.addEventListener('change', (e) => {
    clockTimezone = e.target.value;
});

function updateClock() {
    let now;
    if (clockTimezone === 'local') {
        now = new Date();
    } else if (clockTimezone === 'UTC') {
        now = new Date();
    } else {
        // Use Intl API for timezone conversion
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: clockTimezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
        const parts = formatter.formatToParts(new Date());
        const timeStr = `${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value}:${parts.find(p => p.type === 'second').value}`;
        const dateStr = `${parts.find(p => p.type === 'weekday').value}, ${parts.find(p => p.type === 'month').value} ${parts.find(p => p.type === 'day').value}, ${parts.find(p => p.type === 'year').value}`;
        
        clockDateEl.textContent = dateStr;
        
        let hours = parseInt(parts.find(p => p.type === 'hour').value);
        const minutes = parseInt(parts.find(p => p.type === 'minute').value);
        const seconds = parseInt(parts.find(p => p.type === 'second').value);
        let ampm = '';
        
        if (!clock24Hour) {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12 || 12;
        }
        
        clockTimeEl.textContent = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}${ampm}`;
        return;
    }
    
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let ampm = '';
    
    if (clockTimezone === 'UTC') {
        hours = now.getUTCHours();
        const utcMinutes = now.getUTCMinutes();
        const utcSeconds = now.getUTCSeconds();
        if (!clock24Hour) {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12 || 12;
        }
        clockTimeEl.textContent = 
            `${String(hours).padStart(2, '0')}:${String(utcMinutes).padStart(2, '0')}:${String(utcSeconds).padStart(2, '0')}${ampm}`;
        const utcOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        clockDateEl.textContent = now.toLocaleDateString('en-US', utcOptions) + ' (UTC)';
        return;
    }
    
    if (!clock24Hour) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12 || 12;
    }
    
    clockTimeEl.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}${ampm}`;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    clockDateEl.textContent = now.toLocaleDateString('en-US', options);
}

setInterval(updateClock, 1000);
updateClock();

// Alarm Clock
let alarmInterval = null;
const alarmTimeEl = document.getElementById('alarm-time');
const alarmSetTimeInput = document.getElementById('alarm-set-time');
const alarmMessageInput = document.getElementById('alarm-message');
const alarmSetBtn = document.getElementById('alarm-set');
const alarmClearBtn = document.getElementById('alarm-clear');
const alarmStatusEl = document.getElementById('alarm-status');
const alarmListEl = document.getElementById('alarm-list');
let alarms = [];

alarmSetBtn.addEventListener('click', setAlarm);
alarmClearBtn.addEventListener('click', clearAlarms);

function updateAlarmDisplay() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    alarmTimeEl.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

setInterval(() => {
    updateAlarmDisplay();
    checkAlarms();
    updateAlarmCountdowns();
}, 1000);
updateAlarmDisplay();

function setAlarm() {
    const timeValue = alarmSetTimeInput.value;
    const message = alarmMessageInput.value.trim() || 'Alarm!';
    if (timeValue) {
        const [hours, minutes] = timeValue.split(':').map(Number);
        alarms.push({ 
            hours, 
            minutes, 
            message,
            id: Date.now()
        });
        alarmMessageInput.value = '';
        updateAlarmList();
        alarmStatusEl.textContent = `${alarms.length} alarm${alarms.length > 1 ? 's' : ''} set`;
    }
}

function clearAlarms() {
    alarms = [];
    updateAlarmList();
    alarmStatusEl.textContent = 'No alarm set';
}

function getTimeUntilAlarm(alarm) {
    const now = new Date();
    const alarmTime = new Date();
    alarmTime.setHours(alarm.hours, alarm.minutes, 0, 0);
    
    if (alarmTime <= now) {
        alarmTime.setDate(alarmTime.getDate() + 1);
    }
    
    const diff = alarmTime - now;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
}

function updateAlarmCountdowns() {
    document.querySelectorAll('.alarm-countdown').forEach(el => {
        const alarmId = parseInt(el.dataset.alarmId);
        const alarm = alarms.find(a => a.id === alarmId);
        if (alarm) {
            el.textContent = getTimeUntilAlarm(alarm);
        }
    });
}

function updateAlarmList() {
    alarmListEl.innerHTML = '';
    if (alarms.length === 0) {
        alarmStatusEl.textContent = 'No alarm set';
        return;
    }
    
    alarms.forEach((alarm, index) => {
        const alarmItem = document.createElement('div');
        alarmItem.className = 'alarm-item';
        alarmItem.innerHTML = `
            <div class="alarm-info">
                <div class="alarm-time-display">${String(alarm.hours).padStart(2, '0')}:${String(alarm.minutes).padStart(2, '0')}</div>
                <div class="alarm-message">${alarm.message}</div>
                <div class="alarm-countdown" data-alarm-id="${alarm.id}">${getTimeUntilAlarm(alarm)}</div>
            </div>
            <button class="btn btn-secondary" onclick="removeAlarm(${index})" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">Remove</button>
        `;
        alarmListEl.appendChild(alarmItem);
    });
    alarmStatusEl.textContent = `${alarms.length} alarm${alarms.length > 1 ? 's' : ''} set`;
}

window.removeAlarm = function(index) {
    alarms.splice(index, 1);
    updateAlarmList();
    if (alarms.length === 0) {
        alarmStatusEl.textContent = 'No alarm set';
    }
};

function checkAlarms() {
    const now = new Date();
    alarms.forEach((alarm, index) => {
        if (now.getHours() === alarm.hours && now.getMinutes() === alarm.minutes && now.getSeconds() === 0) {
            playAlarmSound();
            alert(`${alarm.message}\nIt's ${String(alarm.hours).padStart(2, '0')}:${String(alarm.minutes).padStart(2, '0')}`);
        }
    });
}

// Metronome
let metronomeInterval = null;
let metronomeRunning = false;
let metronomeBPM = 120;
let metronomeBeat = 0;

const metronomeBpmEl = document.getElementById('metronome-bpm');
const metronomeBpmSlider = document.getElementById('metronome-bpm-slider');
const metronomeBpmInput = document.getElementById('metronome-bpm-input');
const metronomeStartBtn = document.getElementById('metronome-start');
const metronomeStopBtn = document.getElementById('metronome-stop');
const beatIndicatorEl = document.getElementById('beat-indicator');

metronomeBpmSlider.addEventListener('input', (e) => {
    metronomeBPM = parseInt(e.target.value);
    metronomeBpmInput.value = metronomeBPM;
    metronomeBpmEl.textContent = `${metronomeBPM} BPM`;
    if (metronomeRunning) {
        restartMetronome();
    }
});

metronomeBpmInput.addEventListener('change', (e) => {
    metronomeBPM = Math.max(40, Math.min(200, parseInt(e.target.value) || 120));
    metronomeBpmSlider.value = metronomeBPM;
    metronomeBpmEl.textContent = `${metronomeBPM} BPM`;
    if (metronomeRunning) {
        restartMetronome();
    }
});

metronomeStartBtn.addEventListener('click', startMetronome);
metronomeStopBtn.addEventListener('click', stopMetronome);

document.querySelectorAll('#metronome .preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const bpm = parseInt(btn.dataset.bpm);
        metronomeBPM = bpm;
        metronomeBpmSlider.value = bpm;
        metronomeBpmInput.value = bpm;
        metronomeBpmEl.textContent = `${bpm} BPM`;
        if (metronomeRunning) {
            restartMetronome();
        }
    });
});

function startMetronome() {
    if (!metronomeRunning) {
        metronomeRunning = true;
        const interval = 60000 / metronomeBPM;
        metronomeInterval = setInterval(() => {
            playMetronomeTick();
            beatIndicatorEl.classList.add('active');
            setTimeout(() => {
                beatIndicatorEl.classList.remove('active');
            }, 50);
        }, interval);
    }
}

function stopMetronome() {
    metronomeRunning = false;
    clearInterval(metronomeInterval);
    beatIndicatorEl.classList.remove('active');
}

function restartMetronome() {
    stopMetronome();
    startMetronome();
}

function playMetronomeTick() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Chess Clock
let chessInterval = null;
let chessRunning = false;
let chessPlayer1Time = 600000; // 10 minutes in ms
let chessPlayer2Time = 600000;
let chessActivePlayer = 1;

const chessTime1El = document.getElementById('chess-time-1');
const chessTime2El = document.getElementById('chess-time-2');
const chessSwitch1Btn = document.getElementById('chess-switch-1');
const chessSwitch2Btn = document.getElementById('chess-switch-2');
const chessStartBtn = document.getElementById('chess-start');
const chessResetBtn = document.getElementById('chess-reset');
const chessTimeSettingInput = document.getElementById('chess-time-setting');
const player1El = document.getElementById('player1');
const player2El = document.getElementById('player2');

chessSwitch1Btn.addEventListener('click', () => switchPlayer(2));
chessSwitch2Btn.addEventListener('click', () => switchPlayer(1));
chessStartBtn.addEventListener('click', startChessGame);
chessResetBtn.addEventListener('click', resetChessGame);

chessTimeSettingInput.addEventListener('change', () => {
    const minutes = parseInt(chessTimeSettingInput.value) || 10;
    chessPlayer1Time = minutes * 60000;
    chessPlayer2Time = minutes * 60000;
    updateChessDisplay();
});

function startChessGame() {
    if (!chessRunning) {
        chessRunning = true;
        chessActivePlayer = 1;
        updateChessActivePlayer();
        chessInterval = setInterval(() => {
            if (chessActivePlayer === 1) {
                chessPlayer1Time -= 100;
                if (chessPlayer1Time <= 0) {
                    chessPlayer1Time = 0;
                    pauseChessGame();
                    alert('Player 2 wins! Time is up for Player 1.');
                }
            } else {
                chessPlayer2Time -= 100;
                if (chessPlayer2Time <= 0) {
                    chessPlayer2Time = 0;
                    pauseChessGame();
                    alert('Player 1 wins! Time is up for Player 2.');
                }
            }
            updateChessDisplay();
        }, 100);
    }
}

function pauseChessGame() {
    chessRunning = false;
    clearInterval(chessInterval);
}

function switchPlayer(player) {
    if (chessRunning) {
        chessActivePlayer = player;
        updateChessActivePlayer();
    }
}

function updateChessActivePlayer() {
    if (chessActivePlayer === 1) {
        player1El.classList.add('active');
        player2El.classList.remove('active');
    } else {
        player2El.classList.add('active');
        player1El.classList.remove('active');
    }
}

function resetChessGame() {
    pauseChessGame();
    const minutes = parseInt(chessTimeSettingInput.value) || 10;
    chessPlayer1Time = minutes * 60000;
    chessPlayer2Time = minutes * 60000;
    chessActivePlayer = 1;
    updateChessActivePlayer();
    updateChessDisplay();
}

function updateChessDisplay() {
    chessTime1El.textContent = formatChessTime(chessPlayer1Time);
    chessTime2El.textContent = formatChessTime(chessPlayer2Time);
}

function formatChessTime(ms) {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Utility function for alarm sound
function playAlarmSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Routine Builder for Interval Timer
let routineSteps = [];
let routineRunning = false;
let routineCurrentStep = 0;
let routineCurrentTime = 0;
let routineInterval = null;

const routineNameInput = document.getElementById('routine-name');
const routineStepsEl = document.getElementById('routine-steps');
const addStepBtn = document.getElementById('add-step');
const saveRoutineBtn = document.getElementById('save-routine');
const loadRoutineBtn = document.getElementById('load-routine');
const deleteRoutineBtn = document.getElementById('delete-routine');
const savedRoutinesList = document.getElementById('saved-routines-list');
const routineTimerDisplay = document.getElementById('routine-timer-display');
const routineTimeEl = document.getElementById('routine-time');
const routineStepNameEl = document.getElementById('routine-step-name');
const routineControls = document.getElementById('routine-controls');
const routineStartBtn = document.getElementById('routine-start');
const routinePauseBtn = document.getElementById('routine-pause');
const routineResetBtn = document.getElementById('routine-reset');

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tab === 'simple' ? 'simple-timer' : 'routine-builder').classList.add('active');
    });
});

addStepBtn.addEventListener('click', addRoutineStep);
saveRoutineBtn.addEventListener('click', saveRoutine);
loadRoutineBtn.addEventListener('click', loadRoutine);
deleteRoutineBtn.addEventListener('click', deleteRoutine);
routineStartBtn.addEventListener('click', startRoutine);
routinePauseBtn.addEventListener('click', pauseRoutine);
routineResetBtn.addEventListener('click', resetRoutine);

function addRoutineStep() {
    const step = {
        id: Date.now(),
        name: `Step ${routineSteps.length + 1}`,
        duration: 30
    };
    routineSteps.push(step);
    renderRoutineSteps();
}

function removeRoutineStep(id) {
    routineSteps = routineSteps.filter(s => s.id !== id);
    renderRoutineSteps();
}

function renderRoutineSteps() {
    routineStepsEl.innerHTML = '';
    routineSteps.forEach((step, index) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'routine-step-item';
        stepEl.innerHTML = `
            <div class="step-number">${index + 1}</div>
            <input type="text" class="step-name" value="${step.name}" placeholder="Step name" data-id="${step.id}">
            <input type="number" class="step-duration" value="${step.duration}" min="1" placeholder="Seconds" data-id="${step.id}">
            <button class="btn btn-secondary" onclick="removeRoutineStep(${step.id})" style="padding: 0.5rem 1rem;">Remove</button>
        `;
        routineStepsEl.appendChild(stepEl);
    });
    
    // Add event listeners
    document.querySelectorAll('.step-name').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = parseInt(e.target.dataset.id);
            const step = routineSteps.find(s => s.id === id);
            if (step) step.name = e.target.value;
        });
    });
    
    document.querySelectorAll('.step-duration').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = parseInt(e.target.dataset.id);
            const step = routineSteps.find(s => s.id === id);
            if (step) step.duration = parseInt(e.target.value) || 30;
        });
    });
}

window.removeRoutineStep = removeRoutineStep;

function saveRoutine() {
    const name = routineNameInput.value.trim();
    if (!name) {
        alert('Please enter a routine name');
        return;
    }
    if (routineSteps.length === 0) {
        alert('Please add at least one step');
        return;
    }
    
    const routine = {
        name,
        steps: routineSteps.map(s => ({ name: s.name, duration: s.duration }))
    };
    
    let savedRoutines = JSON.parse(localStorage.getItem('savedRoutines') || '[]');
    savedRoutines.push(routine);
    localStorage.setItem('savedRoutines', JSON.stringify(savedRoutines));
    
    updateSavedRoutinesList();
    routineNameInput.value = '';
    routineSteps = [];
    renderRoutineSteps();
    alert('Routine saved!');
}

function updateSavedRoutinesList() {
    const savedRoutines = JSON.parse(localStorage.getItem('savedRoutines') || '[]');
    savedRoutinesList.innerHTML = '<option value="">Select a routine...</option>';
    savedRoutines.forEach((routine, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = routine.name;
        savedRoutinesList.appendChild(option);
    });
}

function loadRoutine() {
    const index = parseInt(savedRoutinesList.value);
    if (isNaN(index)) return;
    
    const savedRoutines = JSON.parse(localStorage.getItem('savedRoutines') || '[]');
    const routine = savedRoutines[index];
    if (!routine) return;
    
    routineNameInput.value = routine.name;
    routineSteps = routine.steps.map((s, i) => ({
        id: Date.now() + i,
        name: s.name,
        duration: s.duration
    }));
    renderRoutineSteps();
    
    // Show timer display and controls
    routineTimerDisplay.style.display = 'block';
    routineControls.style.display = 'flex';
    resetRoutine();
}

function deleteRoutine() {
    const index = parseInt(savedRoutinesList.value);
    if (isNaN(index)) {
        alert('Please select a routine to delete');
        return;
    }
    
    if (!confirm('Are you sure you want to delete this routine?')) return;
    
    const savedRoutines = JSON.parse(localStorage.getItem('savedRoutines') || '[]');
    savedRoutines.splice(index, 1);
    localStorage.setItem('savedRoutines', JSON.stringify(savedRoutines));
    updateSavedRoutinesList();
    savedRoutinesList.value = '';
}

function startRoutine() {
    if (routineSteps.length === 0) {
        alert('Please load or create a routine first');
        return;
    }
    
    if (!routineRunning) {
        routineRunning = true;
        if (routineCurrentStep === 0) {
            routineCurrentStep = 0;
            routineCurrentTime = routineSteps[0].duration;
        }
        
        routineInterval = setInterval(() => {
            routineCurrentTime--;
            if (routineCurrentTime <= 0) {
                playAlarmSound();
                routineCurrentStep++;
                if (routineCurrentStep >= routineSteps.length) {
                    pauseRoutine();
                    routineStepNameEl.textContent = 'Complete!';
                    alert('Routine complete!');
                    return;
                }
                routineCurrentTime = routineSteps[routineCurrentStep].duration;
            }
            updateRoutineDisplay();
        }, 1000);
    }
}

function pauseRoutine() {
    routineRunning = false;
    clearInterval(routineInterval);
}

function resetRoutine() {
    pauseRoutine();
    routineCurrentStep = 0;
    if (routineSteps.length > 0) {
        routineCurrentTime = routineSteps[0].duration;
    }
    updateRoutineDisplay();
}

function updateRoutineDisplay() {
    if (routineSteps.length === 0) return;
    
    const minutes = Math.floor(routineCurrentTime / 60);
    const seconds = routineCurrentTime % 60;
    routineTimeEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (routineCurrentStep < routineSteps.length) {
        routineStepNameEl.textContent = routineSteps[routineCurrentStep].name;
    }
}

// Initialize
updateChessDisplay();
loadSavedColors();
updateSavedRoutinesList();

