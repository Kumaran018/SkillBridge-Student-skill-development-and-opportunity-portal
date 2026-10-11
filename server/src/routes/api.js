import express from 'express';
import {
  getAllUsers,
  getUserById,
  getLeaderboard,
  updateUser,
  upsertUser,
  getAllOpportunities,
  getOpportunityById,
  createOpportunity,
  applyOpportunity,
  updateApplicantStatus,
  getAllSkillQuizzes,
  getQuizBySkill,
  submitQuiz,
  getAllLearningResources,
  resetDatabase
} from '../db/database.js';

const router = express.Router();

// --- Health ---
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'SkillBridge API',
    timestamp: new Date().toISOString()
  });
});

// --- Dev Reset ---
router.post('/seed/reset', (req, res) => {
  const data = resetDatabase();
  res.json({ message: 'Database reset to initial seed data successfully', dataSummary: {
    users: data.users.length,
    opportunities: data.opportunities.length,
    skillQuizzes: data.skillQuizzes.length,
    resources: data.learningResources.length
  }});
});

// --- Users & Leaderboard ---
router.get('/users', (req, res) => {
  const { role } = req.query;
  const users = getAllUsers(role);
  res.json(users);
});

router.post('/users', (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json({ error: 'User name is required' });
  }
  const saved = upsertUser(req.body);
  res.status(200).json(saved);
});

router.get('/users/:id', (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.patch('/users/:id', (req, res) => {
  const updated = updateUser(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'User not found' });
  res.json(updated);
});

router.get('/leaderboard', (req, res) => {
  const leaderboard = getLeaderboard();
  res.json(leaderboard);
});

// --- Opportunities ---
router.get('/opportunities', (req, res) => {
  const { type, search, skill } = req.query;
  const list = getAllOpportunities({ type, search, skill });
  res.json(list);
});

router.get('/opportunities/:id', (req, res) => {
  const opp = getOpportunityById(req.params.id);
  if (!opp) return res.status(404).json({ error: 'Opportunity not found' });
  res.json(opp);
});

router.post('/opportunities', (req, res) => {
  const { title, company, type, requiredSkills, stipend, deadline, description } = req.body;
  if (!title || !company || !type) {
    return res.status(400).json({ error: 'Title, company, and type are required' });
  }
  const newOpp = createOpportunity(req.body);
  res.status(201).json(newOpp);
});

router.post('/opportunities/:id/apply', (req, res) => {
  const { studentId, studentName, email } = req.body;
  if (!studentId || !studentName) {
    return res.status(400).json({ error: 'studentId and studentName are required' });
  }

  const result = applyOpportunity(req.params.id, req.body);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.status(200).json(result);
});

router.patch('/opportunities/:id/applicants/:studentId', (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'status is required' });
  }
  const result = updateApplicantStatus(req.params.id, req.params.studentId, status);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.json(result);
});

// --- Skill Quizzes ---
router.get('/quizzes', (req, res) => {
  const quizzes = getAllSkillQuizzes();
  res.json(quizzes);
});

router.get('/quizzes/:skillName', (req, res) => {
  const quiz = getQuizBySkill(req.params.skillName);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found for skill' });
  res.json(quiz);
});

router.post('/quizzes/:id/submit', (req, res) => {
  const { studentId, studentName, answers } = req.body;
  const result = submitQuiz(req.params.id, { studentId, studentName, answers });
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.json(result);
});

// --- Learning Resources ---
router.get('/resources', (req, res) => {
  const { skill } = req.query;
  const resources = getAllLearningResources(skill);
  res.json(resources);
});

export default router;
