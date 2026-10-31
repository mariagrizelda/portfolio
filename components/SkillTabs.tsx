"use client";

import { useState } from "react";
import { stackGroups } from "@/lib/content";

export default function SkillTabs() {
  const [active, setActive] = useState(0);
  const group = stackGroups[active];

  return (
    <div className="skills">
      <div className="skills-index" role="tablist" aria-label="Skill groups" aria-orientation="vertical">
        {stackGroups.map((g, i) => (
          <button
            key={g.name}
            type="button"
            role="tab"
            id={`skill-tab-${i}`}
            aria-selected={i === active}
            aria-controls="skill-panel"
            className="skills-tab"
            onClick={() => setActive(i)}
          >
            <span className="skills-tab-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="skills-tab-name">{g.name}</span>
            <span className="skills-tab-count">{g.items.length}</span>
          </button>
        ))}
      </div>

      <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${active}`} className="skills-panel" key={active}>
        <h2 className="skills-title">{group.name}</h2>
        <p className="skills-desc">{group.description}</p>
        <ul className="skills-grid">
          {group.items.map((s) => (
            <li key={s.name} className="skills-item">
              <div className="skills-row">
                <span className="skills-name">{s.name}</span>
                <span className="skills-level">{s.note}</span>
              </div>
              <div className="skills-bar" role="meter" aria-label={s.name} aria-valuenow={s.pct} aria-valuemin={0} aria-valuemax={100}>
                <div style={{ width: `${s.pct}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
