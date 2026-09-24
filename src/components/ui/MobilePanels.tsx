import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import {
  Mail,
  MapPin,
  Award,
  Cpu,
  GraduationCap,
  Calendar,
  Building2,
  ChevronDown,
  ChevronUp,
  Send,
  Code,
  Database,
  Globe,
  Wrench,
  CheckCircle2,
  ShieldCheck,
  Film
} from 'lucide-react';

interface MobilePanelProps {
  isDark: boolean;
}

/**
 * 01. MOBILE IDENTITY PANEL
 */
export const MobileIdentityPanel: React.FC<MobilePanelProps> = ({ isDark }) => {
  const { identity, summary } = PORTFOLIO_DATA;

  return (
    <div className="space-y-4">
      {/* Category Indicator */}
      <div className="text-[11px] font-mono-tech tracking-widest uppercase font-semibold text-blue-400">
        01 · CANDIDATE PROFILE
      </div>

      {/* Main Name & Role */}
      <div>
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight font-editorial ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {identity.name}
        </h2>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 text-xs font-mono-tech font-medium text-blue-400/90">
          {identity.tagline.map((tag, idx) => (
            <React.Fragment key={idx}>
              <span>{tag}</span>
              {idx < identity.tagline.length - 1 && <span className="opacity-40 text-slate-400">/</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Narrative Summary */}
      <div className={`p-4 rounded-xl border text-sm leading-relaxed ${
        isDark ? 'bg-white/[0.04] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
      }`}>
        <p>{summary}</p>
      </div>

      {/* Quick Contact Points */}
      <div className="space-y-2 pt-1">
        <a
          href={`mailto:${identity.email}`}
          className={`min-h-[46px] p-3 rounded-xl border flex items-center gap-3 transition-colors ${
            isDark ? 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-slate-200' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase font-mono-tech opacity-60">Email</div>
            <div className="text-xs font-mono-tech font-semibold truncate">{identity.email}</div>
          </div>
        </a>

        <div className={`min-h-[46px] p-3 rounded-xl border flex items-center gap-3 ${
          isDark ? 'bg-white/[0.03] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase font-mono-tech opacity-60">Location</div>
            <div className="text-xs font-mono-tech font-semibold">{identity.location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 02. MOBILE SKILLS PANEL
 */
export const MobileSkillsPanel: React.FC<MobilePanelProps> = ({ isDark }) => {
  const { skills } = PORTFOLIO_DATA;

  const categories = [
    { title: 'PROGRAMMING', icon: Code, items: skills.programming, color: 'text-blue-400' },
    { title: 'DATABASE SYSTEMS', icon: Database, items: skills.database, color: 'text-emerald-400' },
    { title: 'WEB TECHNOLOGIES', icon: Globe, items: skills.webTechnologies, color: 'text-amber-400' },
    { title: 'DEVELOPMENT TOOLS', icon: Wrench, items: skills.tools, color: 'text-purple-400' }
  ];

  return (
    <div className="space-y-4">
      <div className="text-[11px] font-mono-tech tracking-widest uppercase font-semibold text-indigo-400">
        02 · TECHNICAL CAPABILITIES
      </div>

      <div className="space-y-3">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border ${
                isDark ? 'bg-white/[0.03] border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <Icon className={`w-4 h-4 ${cat.color}`} />
                <h3 className="font-mono-tech text-xs tracking-wider font-semibold uppercase">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    className={`px-2.5 py-1 text-xs font-mono-tech rounded-md border ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-slate-200'
                        : 'bg-white border-slate-300 text-slate-800 shadow-xs'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * 03. MOBILE PROJECT PANEL
 */
export const MobileProjectPanel: React.FC<MobilePanelProps> = ({ isDark }) => {
  const { project } = PORTFOLIO_DATA;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <div className="text-[11px] font-mono-tech tracking-widest uppercase font-semibold text-emerald-400">
        03 · FEATURE PROJECT
      </div>

      {/* Project Title & Context */}
      <div>
        <div className="text-xs font-mono-tech text-slate-400 mb-1">
          {project.institution} · {project.date}
        </div>
        <h2 className={`text-lg sm:text-xl font-bold tracking-tight font-editorial leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {project.title}
        </h2>
      </div>

      {/* Academic Grade / Metrics */}
      <div className="grid grid-cols-2 gap-2 font-mono-tech">
        <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
          isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
        }`}>
          <Award className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <div className="text-[9px] uppercase opacity-70">GRADE</div>
            <div className="text-xs font-bold">{project.grade}</div>
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
          isDark ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-900'
        }`}>
          <Cpu className="w-4 h-4 text-blue-400 shrink-0" />
          <div>
            <div className="text-[9px] uppercase opacity-70">CREDITS</div>
            <div className="text-xs font-bold">{project.credits} Credits</div>
          </div>
        </div>
      </div>

      {/* Summary paragraphs */}
      <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
        <div className={`p-3 rounded-xl border ${
          isDark ? 'bg-white/[0.03] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <p>{project.description[0]}</p>
        </div>

        {/* Collapsible remaining paragraphs */}
        {isExpanded && (
          <div className="space-y-2 pt-1">
            {project.description.slice(1).map((para, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-white/[0.03] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <p>{para}</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-1.5 text-xs font-mono-tech text-blue-400 hover:underline pt-1 cursor-pointer"
        >
          <span>{isExpanded ? 'LESS DETAILS' : 'RESEARCH METHODOLOGY DETAILS'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Key Focus Domains */}
      <div>
        <div className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>KEY RESEARCH DOMAINS</span>
        </div>
        <div className="flex flex-wrap gap-1.5 text-xs font-mono-tech">
          {project.keyAreas.map((area, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded border ${
                isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Computational Toolset */}
      <div>
        <div className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-400 mb-1.5">
          COMPUTATIONAL TOOLSET
        </div>
        <div className="flex flex-wrap gap-1.5 text-xs font-mono-tech">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded border ${
                isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * 04. MOBILE EDUCATION PANEL
 */
export const MobileEducationPanel: React.FC<MobilePanelProps> = ({ isDark }) => {
  const { education } = PORTFOLIO_DATA;

  return (
    <div className="space-y-4">
      <div className="text-[11px] font-mono-tech tracking-widest uppercase font-semibold text-amber-400">
        04 · ACADEMIC TIMELINE
      </div>

      <div className="space-y-3">
        {education.map((edu, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border ${
              isDark ? 'bg-white/[0.03] border-white/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            {/* Timeline Year Header */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-mono-tech text-xs font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {edu.period}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono-tech text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{edu.division}</span>
              </div>
            </div>

            {/* Degree & Institution */}
            <h3 className={`font-mono-tech text-xs sm:text-sm font-bold tracking-wide mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {edu.degree}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {edu.institution}
            </p>

            <div className="mt-2 text-xs font-mono-tech font-semibold text-amber-400/90">
              {edu.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 05. MOBILE CERTIFICATIONS PANEL
 */
export const MobileCertificationsPanel: React.FC<MobilePanelProps> = ({ isDark }) => {
  const { certifications } = PORTFOLIO_DATA;

  return (
    <div className="space-y-4">
      <div className="text-[11px] font-mono-tech tracking-widest uppercase font-semibold text-cyan-400">
        05 · ACCREDITATIONS
      </div>

      <div className="space-y-2.5">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border flex items-start gap-3 ${
              isDark ? 'bg-white/[0.03] border-white/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
              <Award className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className={`font-mono-tech text-xs sm:text-sm font-bold tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {cert.title}
                </h3>
                <span className="font-mono-tech text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 shrink-0">
                  {cert.year}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mt-1 text-xs font-mono-tech text-slate-400">
                <Building2 className="w-3.5 h-3.5 opacity-60" />
                <span className="truncate">{cert.issuer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 06. MOBILE CONTACT PANEL
 */
export const MobileContactPanel: React.FC<MobilePanelProps> = ({ isDark }) => {
  const { contact, credits } = PORTFOLIO_DATA;

  return (
    <div className="space-y-4">
      <div className="text-[11px] font-mono-tech tracking-widest uppercase font-semibold text-purple-400">
        06 · CONTACT & ARCHIVE
      </div>

      <div>
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight font-editorial ${isDark ? 'text-white' : 'text-slate-900'}`}>
          GET IN TOUCH
        </h2>
        <p className="text-xs font-mono-tech text-slate-400 mt-1">
          Open for software development, Python, and machine learning opportunities.
        </p>
      </div>

      {/* Primary Action Button */}
      <a
        href={`mailto:${contact.email}?subject=Portfolio%20Inquiry%20-%20Sarang%20R%20N`}
        className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono-tech text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-colors cursor-pointer"
      >
        <Send className="w-4 h-4" />
        <span>SEND DIRECT EMAIL</span>
      </a>

      {/* Contact Cards */}
      <div className="space-y-2 pt-1 font-mono-tech text-xs">
        <div className={`p-3 rounded-xl border flex items-center gap-3 ${
          isDark ? 'bg-white/[0.03] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <Mail className="w-4 h-4 text-purple-400 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase opacity-60">Email</div>
            <div className="font-semibold truncate">{contact.email}</div>
          </div>
        </div>

        <div className={`p-3 rounded-xl border flex items-center gap-3 ${
          isDark ? 'bg-white/[0.03] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase opacity-60">Location</div>
            <div className="font-semibold">{contact.location}</div>
          </div>
        </div>
      </div>

      {/* Colophon & Credits */}
      <div className={`mt-4 pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2 mb-2 text-[11px] font-mono-tech tracking-widest text-slate-400">
          <Film className="w-3.5 h-3.5" />
          <span>COLOPHON</span>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-bold font-editorial">{credits.name}</div>
          <div className="flex flex-wrap gap-x-2 text-[11px] font-mono-tech text-slate-400">
            {credits.disciplines.map((d, i) => (
              <span key={i}>
                {d}{i < credits.disciplines.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>
          <div className="text-[10px] font-mono-tech text-slate-500 pt-1">
            {credits.byline} · {credits.copyright}
          </div>
        </div>
      </div>
    </div>
  );
};
