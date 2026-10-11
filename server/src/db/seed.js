import { resetDatabase } from './database.js';

console.log('🌱 Seeding SkillBridge database with rich mock data...');
const data = resetDatabase();

console.log(`✅ Seed complete! Loaded:`);
console.log(`   - ${data.users.length} Users (${data.users.filter(u => u.role === 'student').length} Students, ${data.users.filter(u => u.role === 'recruiter').length} Recruiters, ${data.users.filter(u => u.role === 'admin').length} Admins)`);
console.log(`   - ${data.opportunities.length} Opportunities`);
console.log(`   - ${data.skillQuizzes.length} Skill Quizzes`);
console.log(`   - ${data.learningResources.length} Curated Learning Resources`);
