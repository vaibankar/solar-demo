# ⏱️ Timer Tools - Free Online Stopwatch & Countdown Timer

A modern, feature-rich web application offering free online timer tools including stopwatch, countdown timer, split lap timer, interval timer, digital clock, alarm clock, metronome, and chess clock.

## 🚀 Features

### Core Timer Tools
- **⏱️ Stopwatch** - High-precision stopwatch with split recording
- **⏳ Countdown Timer** - Set custom countdowns with presets
- **🏃 Split Lap Timer** - Track multiple lap times
- **🔄 Interval Timer** - Work/rest interval training
- **🕐 Digital Clock** - Real-time clock with timezone support
- **🔔 Alarm Clock** - Multiple alarms with custom messages
- **🎵 Metronome** - Adjustable BPM metronome
- **♟️ Chess Clock** - Dual timer for chess games

### Advanced Features

#### 🎨 Customization
- **Color Customization** - Change timer colors to your preference
- **Fullscreen Mode** - Giant digits for easy viewing from distance
- **Responsive Design** - Works on desktop, tablet, and mobile

#### ⌨️ Keyboard Shortcuts
- **Space** - Start/Stop timers
- **S** - Record split/lap
- **R** - Reset timer
- **F** - Toggle fullscreen
- **Escape** - Exit fullscreen

#### 📊 Split Recording
- Track lap times and total time
- Visual indicators for fastest/slowest splits
- Perfect for runners, workouts, and group activities

#### 🌍 Digital Clock Features
- 12-hour / 24-hour format toggle
- Multiple timezone support (11 timezones)
- Real-time updates

#### 🔔 Alarm Clock Features
- Set multiple alarms
- Custom messages for each alarm
- Live countdown to each alarm
- Audio alerts

#### 💪 Custom Routines
- Create saveable workout routines
- Name and time each step
- Perfect for workouts, study sessions, breaks
- Save and reload routines anytime

## 📦 Installation

### Option 1: Direct Use (No Installation)
Simply open `index.html` in your web browser. No server required!

### Option 2: Using Docker

#### Method A: Docker Compose (Recommended)
```bash
docker-compose up -d
```

The application will be available at `http://localhost:8080`

To stop:
```bash
docker-compose down
```

#### Method B: Docker Commands
Build the Docker image:
```bash
docker build -t timer-tools .
```

Run the container:
```bash
docker run -d -p 8080:80 --name timer-tools timer-tools
```

The application will be available at `http://localhost:8080`

Stop the container:
```bash
docker stop timer-tools
```

Remove the container:
```bash
docker rm timer-tools
```

### Option 3: Using Kubernetes

See the [k8s/README.md](k8s/README.md) for detailed Kubernetes deployment instructions.

Quick start:
```bash
# Build and push image to your registry
docker build -t your-registry/timer-tools:latest .
docker push your-registry/timer-tools:latest

# Update image in k8s/deployment.yaml, then deploy
kubectl apply -k k8s/
```

### Option 4: Using a Local Web Server

#### Python 3:
```bash
python -m http.server 8000
```

#### Node.js (http-server):
```bash
npx http-server -p 8000
```

#### PHP:
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎯 Usage Guide

### Stopwatch
1. Click the **Stopwatch** button in the navigation
2. Press **Space** or click **Start** to begin
3. Press **S** or click **Split** to record lap times
4. Press **R** or click **Reset** to clear
5. Press **F** or click the fullscreen button (⛶) for fullscreen mode

### Countdown Timer
1. Enter hours, minutes, and seconds
2. Use preset buttons for quick setup (1, 5, 10, 15, 30 minutes)
3. Click **Start** to begin countdown
4. Audio alert plays when timer reaches zero

### Split Lap Timer
1. Start the timer
2. Click **Lap** button to record each lap
3. View all lap times with fastest/slowest highlighted

### Interval Timer
**Simple Mode:**
- Set work time, rest time, and number of rounds
- Click **Start** to begin interval training

**Custom Routine Mode:**
1. Switch to "Custom Routine" tab
2. Click **+ Add Step** to create steps
3. Name each step (e.g., "Warm-up", "Push-ups")
4. Set duration for each step
5. Click **Save Routine** to save
6. Load saved routines from dropdown
7. Click **Start Routine** to begin

### Digital Clock
1. Toggle between 12-hour and 24-hour format
2. Select timezone from dropdown
3. View real-time clock updates

### Alarm Clock
1. Set alarm time using time picker
2. (Optional) Add custom message
3. Click **Set Alarm** to add
4. View countdown to each alarm
5. Audio alert plays at set time

### Metronome
1. Adjust BPM using slider or input
2. Use preset buttons for common tempos
3. Click **Start** to begin beats
4. Visual indicator shows each beat

### Chess Clock
1. Set time per player (in minutes)
2. Click **Start Game** to begin
3. Click **Switch** button to alternate between players
4. Timer automatically counts down for active player

### Color Customization
1. Click the 🎨 button on any timer
2. Choose from preset colors or use custom color picker
3. Colors are saved automatically

## 🎨 Customization

### Changing Timer Colors
- Click the color picker button (🎨) on any timer section
- Choose from 12 preset colors or use the custom color picker
- Your color preferences are saved in browser localStorage

### Fullscreen Mode
- Click the fullscreen button (⛶) or press **F**
- Press **Escape** to exit fullscreen
- Perfect for viewing from a distance

## 💾 Data Storage

- **Timer Colors** - Saved in browser localStorage
- **Saved Routines** - Stored in browser localStorage
- **No Server Required** - All data stored locally in your browser

## 🌐 Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 📱 Mobile Support

Fully responsive design works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔧 Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks required
- **No Dependencies** - Works offline
- **LocalStorage** - Data persists in browser
- **Web Audio API** - For metronome and alarm sounds

## 📝 Keyboard Shortcuts Reference

| Key | Action |
|-----|--------|
| **Space** | Start/Stop timer |
| **S** | Record split/lap |
| **R** | Reset timer |
| **F** | Toggle fullscreen |
| **Escape** | Exit fullscreen |

## 🎯 Use Cases

- **Fitness & Workouts** - Track exercise intervals and rest periods
- **Running** - Record lap times and splits
- **Study Sessions** - Pomodoro technique with custom routines
- **Cooking** - Multiple countdown timers for different dishes
- **Gaming** - Chess clock for board games
- **Music Practice** - Metronome for tempo training
- **Group Activities** - Multiple timers for coordination

## 🤝 Contributing

This is a standalone project. Feel free to fork and customize for your needs!

## 📄 License

Free to use for personal and commercial projects.

## 🐛 Troubleshooting

### Audio not working?
- Ensure your browser allows audio autoplay
- Check browser audio settings

### Colors not saving?
- Check if localStorage is enabled in your browser
- Try clearing browser cache and reloading

### Fullscreen not working?
- Some browsers require user interaction before allowing fullscreen
- Try clicking the fullscreen button directly

## 📞 Support

For issues or questions, please check:
- Browser console for error messages
- Browser compatibility requirements
- localStorage permissions

---

**Enjoy your timer tools! ⏱️**

