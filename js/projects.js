/* ==========================================================================
   projects.js
   Project data, GitHub/Live link configuration, rendering, filtering & modal
   ========================================================================== */

/* --------------------------------------------------------------------------
   CONFIGURE YOUR PROJECT LINKS HERE
   Fill in the "github" and "live" URLs once your repositories / deployed
   apps are ready. Leave a value as an empty string "" to keep that
   button disabled with a "Coming Soon" label.
   -------------------------------------------------------------------------- */
const PROJECT_LINKS = {
  studentJobPortal: {
    github: "",
    live: ""
  },
  attendanceSystem: {
    github: "",
    live: ""
  }
};

/* --------------------------------------------------------------------------
   PROJECT DATA (based only on real, provided project information)
   -------------------------------------------------------------------------- */
const projectsData = [
  {
    id: "studentJobPortal",
    number: "01",
    title: "Student Job Portal",
    date: "April 2025",
    category: "MERN Stack / Full Stack",
    filterTags: ["full-stack", "mern", "javascript"],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Tailwind CSS", "REST APIs", "Postman"],
    description: "Developed a full-stack job portal for students to register, upload resumes and apply for jobs. Implemented secure authentication using JWT and role-based access control.",
    features: [
      "Student registration",
      "Resume upload",
      "Job application",
      "Authentication",
      "JWT",
      "Role-based access control",
      "Responsive UI",
      "MongoDB database",
      "API integration",
      "Application tracking",
      "Real-time notifications"
    ],
    testing: "Performed API testing using Postman and functional testing of key user flows.",
    visual: "job"
  },
  {
    id: "attendanceSystem",
    number: "02",
    title: "Attendance System",
    date: "December 2024",
    category: "MERN Stack / Full Stack",
    filterTags: ["full-stack", "mern", "javascript"],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "REST APIs", "WebSockets"],
    description: "Developed a full-stack attendance management system with dedicated dashboards for administrators, faculty and students.",
    features: [
      "Admin dashboard",
      "Faculty dashboard",
      "Student dashboard",
      "Secure authentication",
      "JWT authentication",
      "Role-based access control",
      "Attendance marking",
      "Attendance reports",
      "Analytics",
      "REST APIs",
      "MongoDB storage",
      "Real-time attendance tracking",
      "Report downloads",
      "Responsive interface"
    ],
    testing: "Wrote test cases and debugged end-to-end workflows across admin, faculty and student user roles.",
    visual: "attendance"
  }
];

/* --------------------------------------------------------------------------
   CSS-only visual markup for each project (no stock images / screenshots)
   -------------------------------------------------------------------------- */
function projectVisualMarkup(type){
  if(type === "job"){
    return `
      <div class="mock-dashboard" aria-hidden="true">
        <div class="mock-topbar"><span></span><span></span><span></span></div>
        <div class="mock-row">
          <div class="mock-block accent"></div>
          <div class="mock-block"></div>
          <div class="mock-block"></div>
        </div>
        <div class="mock-row">
          <div class="mock-block tall"></div>
          <div class="mock-block tall"></div>
        </div>
        <div class="mock-stat-row">
          <div class="mock-pill">APPLIED</div>
          <div class="mock-pill">SHORTLISTED</div>
          <div class="mock-pill">JWT ✓</div>
        </div>
      </div>`;
  }
  return `
    <div class="mock-dashboard" aria-hidden="true">
      <div class="mock-topbar"><span></span><span></span><span></span></div>
      <div class="mock-stat-row">
        <div class="mock-pill">PRESENT 92%</div>
        <div class="mock-pill">ABSENT 8%</div>
      </div>
      <div class="mock-chart">
        <span style="height:40%"></span><span style="height:70%"></span><span style="height:55%"></span>
        <span style="height:85%"></span><span style="height:60%"></span><span style="height:75%"></span>
        <span style="height:45%"></span>
      </div>
      <div class="mock-row">
        <div class="mock-block"></div>
        <div class="mock-block"></div>
        <div class="mock-block"></div>
      </div>
    </div>`;
}

/* --------------------------------------------------------------------------
   Render project cards
   -------------------------------------------------------------------------- */
function linkButton(url, label, icon){
  if(url && url.trim() !== ""){
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm"><i class="fa-solid ${icon}"></i><span>${label}</span></a>`;
  }
  return `<button class="btn btn-outline btn-sm btn-disabled" disabled aria-disabled="true"><i class="fa-solid ${icon}"></i><span>Coming Soon</span></button>`;
}

function renderProjects(){
  const grid = document.getElementById("projectsGrid");
  if(!grid) return;

  grid.innerHTML = projectsData.map(p => {
    const links = PROJECT_LINKS[p.id] || { github:"", live:"" };
    return `
    <article class="project-card reveal-up" data-filters="${p.filterTags.join(' ')}">
      <div class="project-visual">
        <span class="project-number">${p.number}</span>
        ${projectVisualMarkup(p.visual)}
      </div>
      <div class="project-body">
        <div class="project-top">
          <div>
            <span class="project-category">${p.category}</span>
            <h3>${p.title}</h3>
          </div>
          <span class="project-date">${p.date}</span>
        </div>
        <p class="project-desc">${p.description}</p>
        <div class="tech-tags">
          ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-actions">
          ${linkButton(links.github, "GitHub", "fa-github")}
          ${linkButton(links.live, "Live Demo", "fa-arrow-up-right-from-square")}
          <button class="btn btn-primary btn-sm" onclick="openProjectModal('${p.id}')"><span>View Details</span></button>
        </div>
      </div>
    </article>`;
  }).join('');

  /* fix GitHub icon (font-awesome brand icon needs fa-brands, not fa-solid) */
  grid.querySelectorAll('.project-actions a i.fa-github, .project-actions button i.fa-github').forEach(i=>{
    i.classList.remove('fa-solid'); i.classList.add('fa-brands');
  });
}

/* --------------------------------------------------------------------------
   Filtering
   -------------------------------------------------------------------------- */
function initProjectFilter(){
  const bar = document.getElementById("filterBar");
  if(!bar) return;

  bar.addEventListener("click", (e)=>{
    const btn = e.target.closest(".filter-btn");
    if(!btn) return;

    bar.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    const cards = document.querySelectorAll("#projectsGrid .project-card");

    cards.forEach(card=>{
      const filters = card.dataset.filters.split(' ');
      const show = filter === "all" || filters.includes(filter);
      card.classList.toggle("hidden", !show);
    });
  });
}

/* --------------------------------------------------------------------------
   Project details modal
   -------------------------------------------------------------------------- */
function openProjectModal(id){
  const p = projectsData.find(x => x.id === id);
  if(!p) return;
  const links = PROJECT_LINKS[p.id] || { github:"", live:"" };

  const modal = document.getElementById("projectModal");
  const content = document.getElementById("modalContent");

  content.innerHTML = `
    <h3 id="modalTitle">${p.title}</h3>
    <div class="modal-meta">
      <span><i class="fa-regular fa-calendar"></i> ${p.date}</span>
      <span><i class="fa-solid fa-layer-group"></i> ${p.category}</span>
    </div>
    <p>${p.description}</p>

    <div class="modal-section-label">Technologies</div>
    <div class="tech-tags">${p.tech.map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div>

    <div class="modal-section-label">Key Features</div>
    <ul class="modal-feature-list">
      ${p.features.map(f=>`<li><i class="fa-solid fa-check"></i>${f}</li>`).join('')}
    </ul>

    <div class="modal-section-label">Testing Performed</div>
    <p>${p.testing}</p>

    <div class="modal-actions">
      ${linkButton(links.github, "View on GitHub", "fa-github")}
      ${linkButton(links.live, "Live Demo", "fa-arrow-up-right-from-square")}
    </div>
  `;

  content.querySelectorAll('.modal-actions a i.fa-github, .modal-actions button i.fa-github').forEach(i=>{
    i.classList.remove('fa-solid'); i.classList.add('fa-brands');
  });

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal(){
  const modal = document.getElementById("projectModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}
