# SkillBridge – Student Skill Development & Campus Opportunity Portal

An end-to-end, full-stack Student Skill Development & Campus Placement Intelligence Platform designed with a high-fidelity **Deep Midnight Navy & Emerald** interface. SkillBridge bridges the disconnect between academic coursework and real-world tech hiring through proof-of-work benchmarks, automated skill-match calculations, and recruiter candidate management.

---

## 🚀 Key Features

### 🎓 Student Ecosystem
- **Interactive Technical Benchmarks**: Timed 5-question MCQ skill verification tests (Python, React, Docker, SQL, etc.). Achieving $\ge$80% awards verified credential badges and XP points.
- **Dynamic Leaderboard**: Live campus ranking system benchmarked against verified XP, quiz completion accuracy, and earned badges.
- **Smart Skill-Match & Gap Analyzer**: Real-time algorithmic matching comparing student skill tags against opportunity requisitions (Green $\ge$75%, Amber 40–74%, Red <40%) with actionable next steps to close skill gaps.
- **Verified Portfolio & Certificate Modal**: On-demand printable and shareable skill certificates and verified resumes.
- **Profile Customization**: Customizable student profile, bio, avatar, and GitHub/LinkedIn integrations.

### 🏢 Recruiter & Admin Intelligence Portal
- **Role-Segregated Access**: Dedicated private authentication flow with recruiter recommendations.
- **Campus Talent Radar**: Aggregated metrics including **Total Campus XP Pool**, candidate supply vs. industry demand, and campus readiness scores.
- **Job Posting & Management**: Post, update, and manage full-time and internship opportunities.
- **Application Pipeline Review**: Review student applicants, inspect verified credentials, and change application statuses (Applied, Reviewing, Shortlisted, Hired).

---

## 🛠️ Tech Stack

- **Client**: React 19, Vite, Tailwind CSS, Lucide React, Canvas Confetti
- **Server**: Node.js, Express, CORS
- **Storage / Database**: JSON-based persistent local database with initial seed restore engine

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 1. Clone the Repository
```bash
git clone https://github.com/Kumaran018/SkillBridge-Student-skill-development-and-opportunity-portal.git
cd SkillBridge-Student-skill-development-and-opportunity-portal
```

### 2. Install Dependencies
```bash
# Install server dependencies
npm --prefix server install

# Install client dependencies
npm --prefix client install
```

### 3. Run the Development Servers
```bash
# Terminal 1: Backend Server (runs on http://localhost:5000)
npm --prefix server run dev

# Terminal 2: Frontend Client (runs on http://localhost:5173)
npm --prefix client run dev
```

---

## 👤 Author
Developed by [Kumaran018](https://github.com/Kumaran018).
