import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Search,
  ExternalLink,
  Award,
  Clock
} from 'lucide-react';

export default function LearningHubPage({ resources = [], currentUser }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');

  // Unique skills in resources
  const allSkills = Array.from(new Set(resources.map((r) => r.skillName))).sort();
  const allTypes = Array.from(new Set(resources.map((r) => r.type))).sort();

  // Filter resources
  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.skillName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.provider.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDiff =
      selectedDifficulty === 'All' || res.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    const matchesType =
      selectedType === 'All' || res.type.toLowerCase() === selectedType.toLowerCase();

    const matchesSkill =
      selectedSkillFilter === 'All' || res.skillName.toLowerCase() === selectedSkillFilter.toLowerCase();

    return matchesSearch && matchesDiff && matchesType && matchesSkill;
  });

  const handleLaunchQuiz = (skillName) => {
    navigate('/quizzes', { state: { selectedSkill: skillName } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-100">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2638] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              Curated Learning Hub
            </h1>
            <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-[#101726] text-[#00E699] border border-[#1C2638]">
              {resources.length} Modules
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Free technical roadmaps, documentation, and university courses across 50+ software domains.
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 p-3 rounded-xl bg-[#101726] border border-[#1C2638] shadow-xl">
        
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-5 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by topic, course title, or provider..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-hidden focus:border-[#00E699] transition-colors"
          />
        </div>

        {/* Skill Filter */}
        <div className="lg:col-span-3">
          <select
            value={selectedSkillFilter}
            onChange={(e) => setSelectedSkillFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-[#00E699] font-medium transition-colors"
          >
            <option value="All">All Disciplines ({allSkills.length})</option>
            {allSkills.map((sk) => (
              <option key={sk} value={sk}>{sk}</option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="lg:col-span-2">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-[#00E699] font-medium transition-colors"
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Resource Type Filter */}
        <div className="lg:col-span-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-[#00E699] font-medium transition-colors"
          >
            <option value="All">All Formats</option>
            {allTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Results Count & Quick Reset */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing <strong className="font-mono text-[#00E699]">{filteredResources.length}</strong> of {resources.length} learning modules</span>
        {(searchTerm || selectedDifficulty !== 'All' || selectedSkillFilter !== 'All' || selectedType !== 'All') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDifficulty('All');
              setSelectedType('All');
              setSelectedSkillFilter('All');
            }}
            className="text-slate-300 hover:text-[#00E699] underline font-semibold transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => {
          return (
            <div
              key={res.id}
              className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 flex flex-col justify-between shadow-xl hover:border-[#2A3952] transition-all group"
            >
              <div className="space-y-3">
                
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#00E699] uppercase tracking-wider">
                    {res.skillName}
                  </span>
                  
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold uppercase tracking-wider border ${
                    res.difficulty === 'Beginner'
                      ? 'bg-[#00E699]/15 text-[#00E699] border-[#00E699]/40'
                      : res.difficulty === 'Intermediate'
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                      : 'bg-rose-500/15 text-rose-400 border-rose-500/40'
                  }`}>
                    {res.difficulty}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
                  {res.courseTitle}
                </h3>

                {/* Metadata */}
                <div className="p-2.5 rounded-lg bg-[#0B101B] border border-[#1C2638] text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Provider</span>
                    <span className="text-slate-200 font-medium">{res.provider}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Est. Duration</span>
                    <span className="font-mono text-slate-200 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {res.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Format</span>
                    <span className="text-slate-200 font-medium">{res.type}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons Footer */}
              <div className="mt-4 pt-3 border-t border-[#1C2638] flex items-center justify-between gap-2 text-xs">
                
                {/* Take Quiz Button */}
                <button
                  onClick={() => handleLaunchQuiz(res.skillName)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0B101B] hover:bg-[#162033] text-slate-300 hover:text-[#00E699] border border-[#1C2638] font-medium transition-colors"
                  title={`Take ${res.skillName} quiz`}
                >
                  <Award className="w-3.5 h-3.5 text-[#00E699]" />
                  Quiz
                </button>

                {/* External Link */}
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00E699] hover:bg-[#00c985] text-[#070B12] font-bold shadow-[0_0_12px_rgba(0,230,153,0.3)] transition-all"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 p-6 rounded-xl bg-[#101726] border border-[#1C2638] shadow-xl space-y-3">
          <p className="text-sm text-slate-400">No learning resources matched your search filter.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDifficulty('All');
              setSelectedType('All');
              setSelectedSkillFilter('All');
            }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#0B101B] border border-[#1C2638] text-slate-300 hover:text-white"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
