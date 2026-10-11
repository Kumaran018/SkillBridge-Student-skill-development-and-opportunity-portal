import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialSeedData } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

// In-memory cache synced with data.json
let databaseState = null;

export function loadDatabase() {
  if (databaseState) return databaseState;

  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      databaseState = JSON.parse(raw);
      return databaseState;
    } catch (err) {
      console.error('Failed to parse database file, resetting to initial seed:', err);
    }
  }

  // If no file exists or parse failed, initialize with seed
  databaseState = JSON.parse(JSON.stringify(initialSeedData));
  saveDatabase();
  return databaseState;
}

export function saveDatabase() {
  if (!databaseState) return;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(databaseState, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error persisting database:', err);
  }
}

export function resetDatabase() {
  databaseState = JSON.parse(JSON.stringify(initialSeedData));
  saveDatabase();
  return databaseState;
}

// User Models & Queries
export function getAllUsers(role) {
  const db = loadDatabase();
  if (role) {
    return db.users.filter(u => u.role.toLowerCase() === role.toLowerCase());
  }
  return db.users;
}

export function getUserById(id) {
  const db = loadDatabase();
  return db.users.find(u => u.id === id) || null;
}

export function getLeaderboard() {
  const db = loadDatabase();
  return db.users
    .filter(u => u.role === 'student')
    .sort((a, b) => b.xpPoints - a.xpPoints);
}

export function updateUser(id, updates) {
  const db = loadDatabase();
  const index = db.users.findIndex(u => u.id === id);
  if (index === -1) return null;

  db.users[index] = { ...db.users[index], ...updates };
  saveDatabase();
  return db.users[index];
}

export function upsertUser(user) {
  const db = loadDatabase();
  const index = db.users.findIndex(
    u => u.id === user.id ||
         (user.email && u.email?.toLowerCase() === user.email?.toLowerCase()) ||
         (user.name && u.name?.toLowerCase() === user.name?.toLowerCase())
  );
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...user };
    saveDatabase();
    return db.users[index];
  } else {
    const newUser = {
      id: user.id || `usr_${Date.now()}`,
      name: user.name || 'Student',
      email: user.email || `${(user.name || 'student').toLowerCase()}@campus.edu`,
      role: user.role || 'student',
      avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      skills: user.skills || ['React', 'JavaScript'],
      verifiedBadges: user.verifiedBadges || ['React', 'JavaScript'],
      xpPoints: Number(user.xpPoints) || 0,
      cgpa: user.cgpa || '9.1',
      bio: user.bio || 'Verified Student Developer',
      college: user.college || 'National Institute of Technology',
      year: user.year || '3rd Year',
      ...user
    };
    db.users.push(newUser);
    saveDatabase();
    return newUser;
  }
}

// Opportunity Models & Queries
export function getAllOpportunities({ type, search, skill } = {}) {
  const db = loadDatabase();
  let list = db.opportunities;

  if (type) {
    list = list.filter(o => o.type.toLowerCase() === type.toLowerCase());
  }

  if (skill) {
    list = list.filter(o =>
      o.requiredSkills.some(s => s.toLowerCase() === skill.toLowerCase())
    );
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(o =>
      o.title.toLowerCase().includes(q) ||
      o.company.toLowerCase().includes(q) ||
      o.description.toLowerCase().includes(q)
    );
  }

  return list;
}

export function getOpportunityById(id) {
  const db = loadDatabase();
  return db.opportunities.find(o => o.id === id) || null;
}

export function createOpportunity(data) {
  const db = loadDatabase();
  const newOpp = {
    id: `opp_${Date.now()}`,
    postedDate: new Date().toISOString().split('T')[0],
    applicants: [],
    ...data
  };
  db.opportunities.unshift(newOpp);
  saveDatabase();
  return newOpp;
}

export function applyOpportunity(opportunityId, applicantData) {
  const db = loadDatabase();
  const opp = db.opportunities.find(o => o.id === opportunityId);
  if (!opp) return { error: 'Opportunity not found' };

  opp.applicants = opp.applicants || [];

  const alreadyApplied = opp.applicants.some(
    a => a.studentId === applicantData.studentId ||
         (a.studentName && applicantData.studentName && a.studentName.toLowerCase() === applicantData.studentName.toLowerCase())
  );
  if (alreadyApplied) {
    return { error: 'You have already applied to this opportunity' };
  }

  const newApplicant = {
    studentId: applicantData.studentId,
    studentName: applicantData.studentName,
    email: applicantData.email,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Applied',
    matchScore: applicantData.matchScore || Math.floor(Math.random() * 20 + 80)
  };

  opp.applicants.push(newApplicant);
  saveDatabase();
  return { success: true, applicant: newApplicant, opportunity: opp };
}

export function updateApplicantStatus(opportunityId, studentId, newStatus) {
  const validStatuses = ['Applied', 'Shortlisted', 'Selected', 'Rejected'];
  if (!validStatuses.includes(newStatus)) {
    return { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` };
  }

  const db = loadDatabase();
  const opp = db.opportunities.find(o => o.id === opportunityId);
  if (!opp) return { error: 'Opportunity not found' };

  const applicant = opp.applicants.find(a => a.studentId === studentId);
  if (!applicant) return { error: 'Applicant record not found in this opportunity' };

  applicant.status = newStatus;
  saveDatabase();
  return { success: true, applicant, opportunity: opp };
}

// Skill Quizzes & Verification
export function getAllSkillQuizzes() {
  const db = loadDatabase();
  return db.skillQuizzes;
}

export function getQuizBySkill(skillName) {
  const db = loadDatabase();
  return db.skillQuizzes.find(q => q.skillName.toLowerCase() === skillName.toLowerCase()) || null;
}

export function submitQuiz(quizId, { studentId, studentName, answers }) {
  const db = loadDatabase();
  const quiz = db.skillQuizzes.find(q => q.id === quizId);
  if (!quiz) return { error: 'Quiz not found' };

  let score = 0;
  quiz.questions.forEach((q, idx) => {
    if (answers && answers[idx] === q.correctAnswer) {
      score += 1;
    }
  });

  const totalQuestions = quiz.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 80; // 80% passing mark as requested
  const xpAwarded = passed ? 100 : 0;

  let updatedUser = null;
  const student = db.users.find(u =>
    (studentId && u.id === studentId) ||
    (studentName && u.name?.toLowerCase() === studentName.toLowerCase())
  );

  if (student) {
    if (passed) {
      student.xpPoints = (Number(student.xpPoints) || 0) + xpAwarded;
      student.verifiedBadges = student.verifiedBadges || [];
      if (!student.verifiedBadges.includes(quiz.badgeTitle)) {
        student.verifiedBadges.push(quiz.badgeTitle);
      }
      student.skills = student.skills || [];
      if (!student.skills.includes(quiz.skillName)) {
        student.skills.push(quiz.skillName);
      }
    }
    saveDatabase();
    updatedUser = student;
  }

  return {
    success: true,
    passed,
    score,
    totalQuestions,
    percentage,
    xpAwarded,
    badgeAwarded: passed ? quiz.badgeTitle : null,
    user: updatedUser
  };
}

// Learning Resources
export function getAllLearningResources(skill) {
  const db = loadDatabase();
  if (skill) {
    return db.learningResources.filter(r => r.skillName.toLowerCase() === skill.toLowerCase());
  }
  return db.learningResources;
}
