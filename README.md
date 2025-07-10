# 📊🎯📚 AetherDesk - Personalized All-In-One Digital Intranet Workspace

![project-dashboard](https://github.com/user-attachments/assets/3974ca2a-95c0-4537-9861-e1a7398a470c)

<div align="center">

<h3><strong>A beautiful, feature-rich developer workspace dashboard built with vanilla HTML, CSS, and JS</strong></h3>

<p>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
  </a>
  <a href="https://www.w3.org/WAI/WCAG21/quickref/">
    <img src="https://img.shields.io/badge/Accessibility-WCAG%202.1-blue.svg" alt="Accessibility: WCAG 2.1">
  </a>
</p>

[🌟 **Live Demo**](https://aetherdesk.netlify.app) • [🐛 **Report Bug**](https://github.com/Divya4879/customized-digital-space/issues) • [💡 **Request Feature**](https://github.com/Divya4879/customized-digital-space/issues)


</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎨 Themes & Customization](#-themes--customization)
- [♿ Accessibility](#-accessibility)
- [🚀 Getting Started](#-getting-started)
- [📂 Project Structure](#-project-structure)
- [🎯 Usage Guide](#-usage-guide)
- [🔧 Customization](#-customization)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## ✨ Features

### 🏠 **Dashboard**
- **Real-time Welcome Section** with dynamic greetings based on time of day
- **Quick Actions Panel** for common developer tasks
- **Enhanced Message Center** with unread indicators and real-time updates
- **Team Spotlight** showcasing team achievements
- **Upcoming Events Calendar** with visual date indicators
- **Development Metrics** with live statistics and progress tracking

### 🎯 **Focus Mode**
- **Productivity Analytics** with daily/weekly tracking
- **Developer Launch Pad** with quick access to essential tools
- **Daily Focus Goal Setting** with persistent storage
- **Advanced Pomodoro Timer** with custom intervals
- **Interactive Kanban Board** with drag-and-drop functionality
- **Project Management** with priority levels and due dates

### 📚 **Learning Mode**
- **Curated YouTube Playlists** for skill development
- **Technical Documentation Hub** with quick access to official docs
- **Coding Practice Platforms** added
- **Resource Categories** organized by technology
- **Progress Tracking** for learning goals

### 🎮 **Play Mode**
- **Social Media Integration** for developer networking
- **Interactive Workout Tracker** with desk exercises, HIIT routines and more
- **Online Games Collection** for mental breaks
- **Focus Music & Ambient Sounds** for productivity
- **Wellness Tracking** with workout statistics

---

## 🛠️ Tech Stack

### **Frontend**
- **HTML5** - Semantic markup with accessibility in mind
- **CSS3** - Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript** - No frameworks, pure ES6+ features
- **CSS Animations** - Smooth transitions and micro-interactions

### **Design System**
- **CSS Custom Properties** for theming
- **CSS Grid & Flexbox** for layouts
- **`Clamp()` Functions** for fluid typography

### **Accessibility**
- **ARIA Labels & Roles** for screen readers
- **Keyboard Navigation** support
- **Focus Management** with visible indicators
- **High Contrast Mode** support

### **Performance**
- **Vanilla JavaScript** - No external dependencies
- **CSS-only Animations** for smooth performance
- **Local Storage** for data persistence
- **Optimized Images** and icons/widgets

---

## 🎨 Themes & Customization

### **Available Themes**
| Theme | Primary Color | Secondary Color | Best For |
|-------|---------------|-----------------|----------|
| 🌸 **Pink** | `#e91e63` | `#9c27b0` | Creative work |
| 🔵 **Blue** | `#1976d2` | `#0d47a1` | Professional |
| 🌿 **Green** | `#388e3c` | `#2e7d32` | Focus sessions |
| 💜 **Purple** | `#7b1fa2` | `#6a1b9a` | Design work |

### **Display Modes**
- **☀️ Light Mode** - Clean and bright interface
- **🌙 Dark Mode** - Easy on the eyes for long coding sessions

### **Theme Features**
- **Dynamic Color Schemes** that adapt across all components
- **Gradient Backgrounds** with smooth transitions
- **Consistent Visual Hierarchy** maintained across themes
- **Accessibility Compliant** color contrasts

---

## ♿ Accessibility

### **WCAG 2.1 Compliance**
- **AA Level Compliance** for color contrast ratios
- **Keyboard Navigation** for all interactive elements
- **Screen Reader Support** with proper ARIA labels
- **Focus Management** with visible indicators

### **Accessibility Features**
```javascript
// Screen Reader Announcements
aria-live="polite"
aria-atomic="true"
role="alert"

// Keyboard Shortcuts
Ctrl/Cmd + 1-4: Switch between modes
Tab/Shift+Tab: Navigate elements
Enter/Space: Activate buttons
```

### **Inclusive Design**
- **High Contrast Mode** compatibility
- **Scalable Text** up to 200% without horizontal scrolling
- **Alternative Text** for all images and icons

---

## 🚀 Getting Started

### **Prerequisites**
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Local web server (optional, for development)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Divya4879/customized-digital-space.git
   cd customized-digital-space
   ```

2. **Open in browser**
   ```bash
   # Direct file opening
   open index.html
   ```

3. **Access the application**
   ```
   http://localhost:8000
   ```

### **Quick Setup**
No build process required! Simply open `index.html` in your browser and start using AetherDesk immediately.

---

## 📂 Project Structure

```
customized-digital-space/
├── 📄 index.html              # Main application file
├── 📄 style.css               # All styles
├── 📄 script.js               # All JS functionality
├── 📄 README.md               # Project documentation
├── 📄 LICENSE                 # MIT License

```

### **Core Components**
- **HTML Structure**: Semantic markup with accessibility
- **CSS Styling**: Modern CSS with custom properties
- **JavaScript Logic**: Vanilla JS with ES6+ features
- **Local Storage**: Data persistence without backend

---

## 🎯 Usage Guide

### **Getting Started**
1. **Choose Your Theme**: Click the 🎨 theme button to select colors and mode
2. **Set Daily Focus**: Enter your primary goal in Focus Mode
3. **Organize Projects**: Use the Kanban board to manage tasks
4. **Track Progress**: Monitor your productivity metrics
5. **Take Breaks**: Use the workout tracker, games and music for wellness

### **Keyboard Shortcuts**
| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + 1` | Switch to Dashboard |
| `Ctrl/Cmd + 2` | Switch to Focus Mode |
| `Ctrl/Cmd + 3` | Switch to Learning Mode |
| `Ctrl/Cmd + 4` | Switch to Play Mode |
| `Space` | Start/pause Pomodoro timer |

### **Data Persistence**
- **Theme Preferences**: Automatically saved
- **Daily Focus Goals**: Persisted across sessions
- **Workout Statistics**: Tracked over time
- **Kanban Board State**: Maintained between visits

---

## 🔧 Customization

### **Adding Custom Themes**
```css
/* Add to CSS custom properties */
[data-theme="custom"] {
    --primary: #your-color;
    --secondary: #your-secondary;
    --accent: #your-accent;
    --primary-rgb: r, g, b;
    --secondary-rgb: r, g, b;
}
```

### **Modifying Layouts**
```css
/* Customize grid layouts */
.widget-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
```

---

## 🤝 Contributing

I do welcome contributions from the community! Here's how you can help:

### **Ways to Contribute**
- 🐛 **Bug Reports**: Found an issue? Let me know!
- 💡 **Feature Requests**: Have an idea? I'd love to hear it!
- 🔧 **Code Contributions**: Submit pull requests
- 📖 **Documentation**: Wanna build docs for this project?
- 🎨 **Design**: Contribute themes and UI improvements

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly across devices
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### **Contribution Guidelines**
- Follow existing code style and conventions
- Ensure accessibility compliance
- Test on multiple browsers and devices
- Update documentation as needed
- Add comments for complex functionality

---

## 📊 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |

### **Feature Support**
- **CSS Grid**: Full support
- **CSS Custom Properties**: Full support
- **ES6+ JavaScript**: Full support
- **Local Storage**: Full support
- **Drag and Drop API**: Full support

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 DevFlow Pro Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

### **Inspiration & Resources**

- 🧭 **Axero Intranet** – The core inspiration behind the Dashboard layout and feature set  
- 🖥️ **Modern Developer Dashboards** – UI/UX ideas from tools like Linear, Notion, and Vercel  
- 🎨 **Color Palettes** – Influenced by Material Design, Tailwind UI tones, and Dribbble shots  
- ♿ **Accessibility Guidelines** – Referenced WCAG 2.1 and inclusive design best practices  
- ⚙️ **Performance Tips** – Insights from [Web.dev](https://web.dev/) and [MDN Web Docs](https://developer.mozilla.org/)  
- 📋 **Real Dev Routines** – Built to reflect my own dev day: focus sessions, learning breaks, and wellness  

This project was made possible by countless community tools, best practices, and personal daily habits that shaped every line of code and pixel of design.

---

<div align="center">

**Made with ❤️ by developer, for developers**

[![GitHub stars](https://img.shields.io/github/stars/Divya4879/customized-digital-space?style=social)](https://github.com/Divya4879/customized-digital-space/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Divya4879/customized-digital-space?style=social)](https://github.com/Divya4879/customized-digital-space/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/Divya4879/customized-digital-space?style=social)](https://github.com/Divya4879/customized-digital-space/watchers)

[⬆ Back to Top](#-devflow-pro---ultimate-developer-workspace)

</div>
