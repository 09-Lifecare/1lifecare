# 1lifecare
 “Stay healthy. Stay organized. Stay prepared. Stay in control.”


**LifeCare** is a comprehensive web application designed to help students manage their academic responsibilities, health, wellness, and daily routines in one place. It's particularly targeted at nursing students and those in demanding academic programs.

### Mission
Our mission is to empower students to succeed academically, emotionally, and physically with LifeCare, an all-in-one digital companion. It helps students manage their academic workload, track physical and mental health, and maintain a balanced lifestyle through task management, wellness monitoring, emotional support, and self-care recommendations.

###  Vision
We envision a future where students can effortlessly balance academic responsibilities, health, and personal life. LifeCare aims to be the leading tool that helps students manage tasks, prioritize self-care, and achieve their goals.

---

## Features

### 1. **Smart Academic Planner**
- Class and clinical schedule organizer
- Task and assignment tracker with priority levels (High, Medium, Low)
- Deadline reminders and notifications
- Examination countdown timer
- Priority-based to-do lists

### 2. **Health & Wellness Monitoring**
- Water intake tracker (ml)
- Sleep monitoring (hours)
- Physical activity tracking
- Medication reminders with dosage
- Meal and nutrition logs

### 3. **Mental Health & Stress Support**
- Daily mood tracker
- Stress level check-ins (1-10 scale)
- Guided breathing exercises with visual prompts
- Motivational quotes and wellness tips
- Journaling feature with daily prompts

### 4. **Daily Life Management Tools**
- Budget and expense tracker
- Set desired monthly budget
- Habit tracker with progress monitoring
- Personal notes and checklist organizer
- Emergency contacts storage

### 5. **Scheduled Duties**
- Duty/shift calendar management
- Add shifts with date, time, and duration
- Notes and reminders for each duty
- Quick access to upcoming schedules

### 6. **Student Support System**
- Peer support community features
- Academic encouragement tools
- Self-care recommendations based on stress levels
- Personalized reminders and productivity insights
- Motivational quote generator (click to activate)
- Emergency contacts management

---

## 🔐 Authentication & Login

### Demo Credentials:

**Student Account:**
- Email: `student@lifecare.com`
- Password: `password123`
- Role: Student

**Nursing Student Account:**
- Email: `nurse@lifecare.com`
- Password: `password123`
- Role: Nursing Student

**Professional Account:**
- Email: `prof@lifecare.com`
- Password: `password123`
- Role: Professional

### Login Features:
- Email validation
- Password authentication
- Role selection (Nursing Student, Student, Professional)
- Error message for invalid credentials
- Session management with localStorage
- Logout functionality

---

## 📱 User Interface

### Navigation
- **Home Page** - Landing page with features overview
- **Features Page** - Detailed feature breakdown
- **About Page** - Company mission and vision
- **Contact Page** - Contact information
- **Dashboard** - Main hub after login
- **Profile** - User profile and nickname editing

### Color Scheme
- **Primary Color**: Soft Blue (#5B9BD5) - Buttons, links, backgrounds
- **Secondary Color**: White (#FFFFFF) - Card backgrounds
- **Accent Colors**: 
  - Green (#70AD47) - Call-to-action buttons
  - Yellow (#FFC000) - Highlights and important actions

### Typography
- **Body Text**: Roboto (clean, modern, readable)
- **Headings**: Montserrat (bold, clear, professional)
- **Font Sizes**: 16px body, 24px-32px for headings

---

## 📊 Dashboard Overview

After successful login, users see a dashboard with the following interactive cards:

### Dashboard Cards:

1. **Smart Academic Planner Card**
   - Shows: Number of upcoming tasks, exams, current priorities
   - Click to open: Full task management modal
   - Features: Add/edit/delete tasks with priorities

2. **Health & Wellness Card**
   - Shows: Water intake, exercise minutes, sleep hours
   - Click to open: Complete health tracking modal
   - Features: Log water, sleep, exercise, medications, meals

3. **Mental Health & Stress Card**
   - Shows: Current mood and stress level
   - Click to open: Mental health tracking modal
   - Features: Mood logger, stress slider (1-10), breathing exercise, journaling

4. **Daily Life Management Card**
   - Shows: Budget vs. spent, remaining balance
   - Click to open: Budget and notes management modal
   - Features: Set budget, log expenses, personal notes, checklist

5. **Scheduled Duties Card**
   - Shows: Number of upcoming shifts/duties
   - Click to open: Duty schedule modal
   - Features: Add/view/edit shifts with dates and times

6. **Student Support Card**
   - Shows: Support options and emergency info
   - Click to open: Support features modal
   - Features: Notes, emergency contacts, "Get Inspired" button for quotes

---

## 🛠️ How to Use

### Getting Started:

1. **Open the application** in your web browser
2. **Login with demo credentials** (see Authentication section)
3. **Explore the Dashboard** - You'll see 6 interactive cards

### Using Dashboard Features:

#### Adding Data:
1. Click on any dashboard card
2. A popup modal will open
3. Enter your information in the input fields
4. Click **"Save"** or **"Add"** button
5. Data automatically saves to localStorage
6. Close modal by clicking **"Close"** button or the **X**

#### Viewing Saved Data:
- Click the dashboard card again
- All previously saved data appears in the modal
- Edit or delete entries as needed

#### Editing Profile:
1. Click **"Profile"** in the sidebar
2. Update your nickname and email
3. Click **"Save Changes"**
4. Changes reflect immediately in the dashboard header

### Quick Tips:

- **Set Budget First**: In Daily Life Management, set your desired monthly budget
- **Priority Tasks**: Mark important tasks as "High" priority in Academic Planner
- **Track Mood Daily**: Log your mood in Mental Health section to get better recommendations
- **Use Motivational Quotes**: Click "Get Inspired" in Student Support for motivation boost
- **Breathing Exercise**: Follow the visual guide in Mental Health section for stress relief
- **Check Reminders**: Medication and deadline reminders help you stay on track

---

## 💾 Data Storage

### LocalStorage Implementation:
All user data is stored locally in the browser using localStorage:

- **User Session**: Email, name, role, login status
- **Academic Data**: Tasks, assignments, deadlines
- **Health Data**: Water intake, sleep hours, exercise, medications, meals
- **Mental Health**: Mood logs, stress levels, journal entries
- **Finance Data**: Budget settings, expenses, spending categories
- **Daily Life**: Notes, checklists, emergency contacts, duties
- **Support Data**: Personal notes, contacts, saved preferences

### Data Persistence:
- Data remains saved even after closing the browser
- Logging out clears the session but keeps user preferences
- Each user has their own separate data space
- No server required - everything works offline

---

## 📱 Responsive Design

### Device Support:
- **Desktop** (1024px and above) - Full layout with sidebar navigation
- **Tablet** (768px - 1023px) - Adjusted card layout, hamburger menu
- **Mobile** (below 768px) - Stacked layout, hamburger menu, optimized for touch

### Responsive Features:
- Hamburger menu on smaller screens
- Grid cards adjust to screen size
- Touch-friendly buttons and inputs
- Optimized modal sizes for all devices
- Readable font sizes across all breakpoints

---

## 🎨 Design Elements

### Buttons:
- **Primary Buttons**: Green (#70AD47) - "Save", "Add", "Get Started"
- **Secondary Buttons**: Blue (#5B9BD5) - Navigation links
- **Danger Buttons**: Red (#E74C3C) - Delete, Logout
- **Hover Effects**: Slight enlargement and color change

### Cards:
- **Summary Cards**: White background with blue header
- **Hover Effect**: Shadow enlargement on hover
- **Interactive**: Clickable to open detailed modals

### Modals:
- **Centered Overlay**: Dark background with focused content
- **Close Button**: X button in top-right corner
- **Input Fields**: Clean, modern styling
- **Smooth Animation**: Fade-in effect

---

## 🔧 Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: Browser LocalStorage API
- **No Dependencies**: Pure vanilla code, no frameworks or libraries
- **Browser Compatibility**: Chrome, Firefox, Safari, Edge (latest versions)

### File Structure:
