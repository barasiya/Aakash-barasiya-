/* ==========================================================================
   main.js
   Core data rendering (skills, education, testing, certifications, journey),
   navigation, theme toggle, custom cursor, modals, contact form, init
   ========================================================================== */

/* --------------------------------------------------------------------------
   DATA — Skills
   -------------------------------------------------------------------------- */
const skillsData = [
  { icon:"fa-solid fa-code", title:"Programming Languages",
    items:["JavaScript","Python","C++","Java"] },
  { icon:"fa-solid fa-vial", title:"Software Testing",
    items:["Manual Testing","Test Case Design","Bug Reporting & Tracking","API Testing","Postman","Functional Testing","Regression Testing","SDLC","STLC","Debugging"] },
  { icon:"fa-brands fa-react", title:"MERN Stack",
    items:["React.js","Node.js","Express.js","MongoDB","RESTful APIs","WebSockets"] },
  { icon:"fa-brands fa-python", title:"Python / Django",
    items:["Python","Django","Django REST Framework","REST API Architecture","ORM","Server-Side Development"] },
  { icon:"fa-solid fa-display", title:"Frontend",
    items:["HTML5","CSS3","Responsive Web Design","Reusable Components"] },
  { icon:"fa-solid fa-database", title:"Database",
    items:["MongoDB","SQL Server","CRUD Operations","Data Modeling","Query Optimization"] },
  { icon:"fa-solid fa-shield-halved", title:"Web Concepts",
    items:["JWT","Authentication","Authorization","RBAC","REST APIs","Real-Time Applications","DSA","OOP"] },
  { icon:"fa-solid fa-toolbox", title:"Tools",
    items:["Git","GitHub","VS Code","Postman","npm"] },
  { icon:"fa-solid fa-cloud", title:"CRM",
    items:["Salesforce Trailhead","Agentblazer Champion"] }
];

function renderSkills(){
  const grid = document.getElementById("skillsGrid");
  if(!grid) return;
  grid.innerHTML = skillsData.map(cat => `
    <div class="skill-category">
      <div class="skill-category-head">
        <span class="skill-category-icon"><i class="${cat.icon}"></i></span>
        <h3>${cat.title}</h3>
      </div>
      <div class="skill-tags">
        ${cat.items.map(i => `<span class="skill-tag">${i}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   DATA — Education
   -------------------------------------------------------------------------- */
const educationData = [
  { degree:"B.Tech in Computer Science", org:"Sagar Institute of Science, Technology & Research, Bhopal",
    date:"Aug 2023 – 2026", score:"CGPA: 6.94/10", location:"Bhopal, Madhya Pradesh, India" },
  { degree:"Diploma in Information Technology", org:"Govt. Polytechnic College Khirsadoh, Chhindwara",
    date:"Aug 2019 – July 2022", score:"CGPA: 6.87/10", location:"Chhindwara, Madhya Pradesh, India" },
  { degree:"Senior Secondary (12th)", org:"Govt. Adarsh Multi Purpose H.S. Excellence School",
    date:"April 2018 – March 2019", score:"Percentage: 65%", location:"" },
  { degree:"Secondary (10th)", org:"Govt. High School, Chhindwara",
    date:"April 2016 – March 2017", score:"Percentage: 71.33%", location:"" }
];

function renderEducation(){
  const wrap = document.getElementById("educationTimeline");
  if(!wrap) return;
  wrap.innerHTML = educationData.map(ed => `
    <div class="timeline-item reveal-up">
      <span class="timeline-dot"></span>
      <div class="timeline-card">
        <span class="timeline-date"><i class="fa-regular fa-calendar"></i> ${ed.date}</span>
        <h3>${ed.degree}</h3>
        <span class="timeline-org">${ed.org}</span>
        <div class="timeline-meta">
          <span><i class="fa-solid fa-chart-simple"></i> ${ed.score}</span>
          ${ed.location ? `<span><i class="fa-solid fa-location-dot"></i> ${ed.location}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   DATA — Software Testing cards
   -------------------------------------------------------------------------- */
const testingData = [
  { icon:"🧪", label:"Manual Testing" },
  { icon:"🔌", label:"API Testing" },
  { icon:"📝", label:"Test Case Design" },
  { icon:"✅", label:"Functional Testing" },
  { icon:"🔁", label:"Regression Testing" },
  { icon:"🐞", label:"Bug Reporting" },
  { icon:"🛠", label:"Debugging" },
  { icon:"📊", label:"SDLC / STLC" }
];

function renderTesting(){
  const grid = document.getElementById("testingGrid");
  if(grid){
    grid.innerHTML = testingData.map(t => `
      <div class="testing-card">
        <span class="testing-icon">${t.icon}</span>
        <p>${t.label}</p>
      </div>
    `).join('');
  }
}

/* --------------------------------------------------------------------------
   DATA — Certifications
   "image": local certificate file in assets/certificates/ (shown in the modal)
   "url": optional external verification link (e.g. Trailhead profile)
   -------------------------------------------------------------------------- */
const certificationsData = [
  { icon:"fa-brands fa-python", name:"Python Essentials 1", org:"Cisco Networking Academy (NetAcad)", date:"April 2025",
    desc:"Covers Python programming fundamentals — variables, control flow, functions, data types and basic I/O.",
    image:"assets/certificates/python-essentials-1.jpg", url:"" },
  { icon:"fa-brands fa-python", name:"Python Essentials 2", org:"Cisco Networking Academy (NetAcad)", date:"April 2025",
    desc:"Covers intermediate Python concepts including OOP, modules, exception handling and file processing.",
    image:"assets/certificates/python-essentials-2.jpg", url:"" },
  { icon:"fa-solid fa-network-wired", name:"CCNA: Introduction to Networks", org:"Cisco Networking Academy", date:"May 2025",
    desc:"Foundational networking concepts — network models, addressing, protocols and connectivity.",
    image:"assets/certificates/ccna-introduction-to-networks.jpg", url:"" },
  { icon:"fa-solid fa-network-wired", name:"CCNA: Switching, Routing & Wireless Essentials", org:"Cisco Networking Academy", date:"May 2025",
    desc:"Covers switching concepts, VLANs, inter-VLAN routing, and wireless LAN fundamentals.",
    image:"assets/certificates/ccna-switching-routing-wireless.jpg", url:"" },
  { icon:"fa-solid fa-network-wired", name:"CCNA: Enterprise Networking, Security & Automation", org:"Cisco Networking Academy", date:"May 2025",
    desc:"Covers enterprise network design, security fundamentals and network automation basics.",
    image:"assets/certificates/ccna-enterprise-networking-security.jpg", url:"" },
  { icon:"fa-solid fa-shield-halved", name:"Cybersecurity Essentials", org:"Cisco Networking Academy", date:"May 2025",
    desc:"Covers core cybersecurity principles, threats, vulnerabilities and defense techniques.",
    image:"assets/certificates/cybersecurity-essentials.jpg", url:"" },
  { icon:"fa-solid fa-server", name:"Certificate Program in IT and Network Essentials", org:"NIIT Foundation", date:"April 2022",
    desc:"Foundational course covering core IT and networking concepts and principles.",
    image:"assets/certificates/niit-network-essentials.jpg", url:"" },
  { icon:"fa-solid fa-table-cells", name:"Microsoft Excel — Beginners to Advance", org:"Skill Course", date:"July 2026",
    desc:"Covers Excel from fundamentals to advanced formulas, data analysis and reporting techniques.",
    image:"assets/certificates/excel-beginners-to-advance.jpg", url:"" },
  { icon:"fa-solid fa-cloud", name:"Salesforce Trailhead Profile", org:"Salesforce", date:"",
    desc:"Verified Trailhead profile showcasing completed trails, badges and skill points.",
    image:"", url:"https://www.salesforce.com/trailblazer/t7mpse1x1tpvquslsp" },
  { icon:"fa-solid fa-robot", name:"Salesforce Agentblazer Champion", org:"Salesforce Trailhead", date:"",
    desc:"Achieved Agentblazer Champion status through Salesforce Trailhead.",
    image:"", url:"" }
];

function renderCertifications(){
  const grid = document.getElementById("certGrid");
  if(!grid) return;
  grid.innerHTML = certificationsData.map((c, idx) => `
    <div class="cert-card reveal-up">
      <span class="cert-icon"><i class="${c.icon}"></i></span>
      <div class="cert-body">
        <h3>${c.name}</h3>
        <span class="cert-org">${c.org}${c.date ? ' · ' + c.date : ''}</span>
        <p class="cert-desc">${c.desc}</p>
        <button class="btn btn-outline btn-sm" onclick="openCertModal(${idx})"><i class="fa-solid fa-eye"></i><span>View Certificate</span></button>
      </div>
    </div>
  `).join('');
}

function openCertModal(idx){
  const cert = certificationsData[idx];
  const modal = document.getElementById("certModal");
  const content = document.getElementById("certModalContent");

  let visual;
  if(cert.image){
    visual = `<img src="${cert.image}" alt="${cert.name} certificate" loading="lazy" style="width:100%;border-radius:var(--radius-md);border:1px solid var(--border-color);display:block;">`;
  } else if(cert.url){
    visual = `<div class="cert-image-frame"><i class="fa-solid fa-certificate" style="font-size:1.8rem;color:var(--accent-secondary);"></i></div>`;
  } else {
    visual = `<div class="cert-image-frame">Certificate image not yet added.<br>Place the file in <code>assets/certificates/</code> and link it in <code>js/main.js</code>.</div>`;
  }

  content.innerHTML = `
    <h3 id="certModalTitle">${cert.name}</h3>
    <span class="cert-org">${cert.org}${cert.date ? ' · ' + cert.date : ''}</span>
    <div style="margin-top:18px; margin-bottom:18px;">${visual}</div>
    <p>${cert.desc}</p>
    ${cert.url ? `<div class="modal-actions"><a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i><span>Open Certificate</span></a></div>` : ''}
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCertModal(){
  const modal = document.getElementById("certModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

/* --------------------------------------------------------------------------
   DATA — Journey timeline
   -------------------------------------------------------------------------- */
const journeyData = [
  { year:"2016", text:"Completed Secondary Education" },
  { year:"2018", text:"Started Senior Secondary Education" },
  { year:"2019", text:"Started Diploma in Information Technology" },
  { year:"2022", text:"Completed Diploma" },
  { year:"2023", text:"Started B.Tech in Computer Science Engineering" },
  { year:"2024", text:"Built Attendance System" },
  { year:"2025", text:"Built Student Job Portal" },
  { year:"2025", text:"Secured 1st Rank at SISTec Innovation Hackathon" },
  { year:"2026", text:"Preparing for Software Development opportunities" }
];

function renderJourney(){
  const wrap = document.getElementById("journeyTimeline");
  if(!wrap) return;
  wrap.innerHTML = journeyData.map(j => `
    <div class="journey-item">
      <span class="journey-year">${j.year}</span>
      <p>${j.text}</p>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   Loader
   -------------------------------------------------------------------------- */
function initLoader(){
  const loader = document.getElementById("loader");
  if(!loader) return;
  window.addEventListener("load", ()=>{
    setTimeout(()=> loader.classList.add("hidden"), 500);
  });
  /* safety fallback in case 'load' already fired */
  setTimeout(()=> loader.classList.add("hidden"), 1600);
}

/* --------------------------------------------------------------------------
   Navbar: scroll state, active section highlight, smooth scroll
   -------------------------------------------------------------------------- */
function initNavbar(){
  const navbar = document.getElementById("navbar");
  const progress = document.getElementById("scrollProgress");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-link");
  const sections = document.querySelectorAll("main section[id], .hero[id]");

  function onScroll(){
    navbar.classList.toggle("scrolled", window.scrollY > 30);

    if(progress){
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      progress.style.width = pct + "%";
    }

    let current = "home";
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if(window.scrollY >= top) current = sec.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.dataset.section === current);
    });

    /* back to top visibility */
    const backToTop = document.getElementById("backToTop");
    if(backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
  }

  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();
}

/* --------------------------------------------------------------------------
   Mobile menu
   -------------------------------------------------------------------------- */
function initMobileMenu(){
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("mobileMenuClose");

  const backdrop = document.createElement("div");
  backdrop.className = "menu-backdrop";
  document.body.appendChild(backdrop);

  function openMenu(){
    menu.classList.add("active");
    backdrop.classList.add("active");
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu(){
    menu.classList.remove("active");
    backdrop.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", ()=>{
    menu.classList.contains("active") ? closeMenu() : openMenu();
  });
  closeBtn.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);

  menu.querySelectorAll(".mobile-link").forEach(link=>{
    link.addEventListener("click", closeMenu);
  });
}

/* --------------------------------------------------------------------------
   Theme toggle (persisted in localStorage)
   -------------------------------------------------------------------------- */
function initTheme(){
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const root = document.documentElement;

  const saved = localStorage.getItem("aakash-portfolio-theme");
  if(saved === "light"){
    root.setAttribute("data-theme", "light");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  toggle.addEventListener("click", ()=>{
    const isLight = root.getAttribute("data-theme") === "light";
    if(isLight){
      root.removeAttribute("data-theme");
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("aakash-portfolio-theme", "dark");
    }else{
      root.setAttribute("data-theme", "light");
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("aakash-portfolio-theme", "light");
    }
  });
}

/* Custom cursor removed for a simpler, distraction-free experience */


/* --------------------------------------------------------------------------
   Modals: close via X, outside click, Escape key
   -------------------------------------------------------------------------- */
function initModals(){
  document.getElementById("modalClose").addEventListener("click", closeProjectModal);
  document.getElementById("certModalClose").addEventListener("click", closeCertModal);

  document.getElementById("projectModal").addEventListener("click", (e)=>{
    if(e.target.id === "projectModal") closeProjectModal();
  });
  document.getElementById("certModal").addEventListener("click", (e)=>{
    if(e.target.id === "certModal") closeCertModal();
  });

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape"){
      closeProjectModal();
      closeCertModal();
    }
  });
}

/* --------------------------------------------------------------------------
   Back to top
   -------------------------------------------------------------------------- */
function initBackToTop(){
  const btn = document.getElementById("backToTop");
  if(!btn) return;
  btn.addEventListener("click", ()=>{
    window.scrollTo({ top:0, behavior: reduceMotion ? "auto" : "smooth" });
  });
}

/* --------------------------------------------------------------------------
   Contact form: validation + FormSubmit AJAX submission
   -------------------------------------------------------------------------- */
function initContactForm(){
  const form = document.getElementById("contactForm");
  if(!form) return;

  const fields = {
    fullName: { input: document.getElementById("fullName"), error: document.getElementById("err-fullName") },
    email: { input: document.getElementById("email"), error: document.getElementById("err-email") },
    subject: { input: document.getElementById("subject"), error: document.getElementById("err-subject") },
    message: { input: document.getElementById("message"), error: document.getElementById("err-message") }
  };

  const status = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");

  function setError(field, msg){
    fields[field].error.textContent = msg;
    fields[field].input.closest(".form-group").classList.toggle("invalid", !!msg);
  }

  function validate(){
    let valid = true;

    if(fields.fullName.input.value.trim().length < 2){
      setError("fullName", "Please enter your full name."); valid = false;
    } else setError("fullName", "");

    const emailVal = fields.email.input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(emailVal)){
      setError("email", "Please enter a valid email address."); valid = false;
    } else setError("email", "");

    if(fields.subject.input.value.trim().length < 3){
      setError("subject", "Please enter a subject."); valid = false;
    } else setError("subject", "");

    if(fields.message.input.value.trim().length < 10){
      setError("message", "Message should be at least 10 characters."); valid = false;
    } else setError("message", "");

    return valid;
  }

  Object.values(fields).forEach(f=>{
    f.input.addEventListener("blur", validate);
  });

  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    if(!validate()){
      status.textContent = "Please fix the highlighted fields.";
      status.classList.add("error");
      return;
    }

    submitBtn.classList.add("submitting");
    submitBtn.disabled = true;

    try{
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if(response.ok){
        status.textContent = "Message sent successfully! I'll get back to you soon.";
        status.classList.add("success");
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch(err){
      status.textContent = "Something went wrong. Please email me directly at aakashbarasiya2001@gmail.com.";
      status.classList.add("error");
    } finally {
      submitBtn.classList.remove("submitting");
      submitBtn.disabled = false;
    }
  });
}

/* --------------------------------------------------------------------------
   PWA: register service worker (only works when served over http(s), not
   from a local file:// double-click — deploy on Vercel for this to activate)
   -------------------------------------------------------------------------- */
function initServiceWorker(){
  if("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")){
    window.addEventListener("load", ()=>{
      navigator.serviceWorker.register("/service-worker.js").catch(()=>{
        /* silently ignore — non-critical enhancement */
      });
    });
  }
}

/* --------------------------------------------------------------------------
   PWA: custom "Install this app" banner
   Shows immediately (instead of waiting for the browser's own menu) by
   capturing the browser's beforeinstallprompt event. On iOS Safari, which
   never fires that event, shows manual "Add to Home Screen" instructions
   instead. Shows on every visit until the app is actually installed.
   -------------------------------------------------------------------------- */
function initInstallBanner(){
  const banner = document.getElementById("installBanner");
  const btn = document.getElementById("installBannerBtn");
  const closeBtn = document.getElementById("installBannerClose");
  const subtext = document.getElementById("installBannerSubtext");
  const backToTop = document.getElementById("backToTop");
  if(!banner) return;

  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  if(isStandalone) return;

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;

  function showBanner(){
    banner.classList.add("visible");
    if(backToTop) backToTop.classList.add("banner-open");
  }
  function hideBanner(){
    banner.classList.remove("visible");
    if(backToTop) backToTop.classList.remove("banner-open");
  }
  function dismiss(){
    hideBanner();
  }

  closeBtn.addEventListener("click", dismiss);

  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (e)=>{
    e.preventDefault();
    deferredPrompt = e;
    subtext.textContent = "Add to your home screen for quick access, app-style.";
    btn.textContent = "Install";
    showBanner();
  });

  btn.addEventListener("click", async ()=>{
    if(deferredPrompt){
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      if(outcome === "accepted" || outcome === "dismissed"){
        dismiss();
      }
    } else if(isIOS){
      subtext.textContent = "Tap the Share icon below, then \"Add to Home Screen\".";
      btn.style.display = "none";
    }
  });

  /* iOS never fires beforeinstallprompt — show manual instructions instead */
  if(isIOS){
    setTimeout(()=>{
      if(deferredPrompt) return;
      subtext.textContent = "Tap the Share icon below, then \"Add to Home Screen\".";
      btn.textContent = "Got it";
      showBanner();
    }, 2500);
  }
}

/* --------------------------------------------------------------------------
   INIT
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", ()=>{
  initLoader();

  renderSkills();
  renderEducation();
  renderTesting();
  renderCertifications();
  renderJourney();
  renderProjects();

  initNavbar();
  initMobileMenu();
  initTheme();
  initModals();
  initBackToTop();
  initContactForm();
  initProjectFilter();
  initServiceWorker();
  initInstallBanner();

  initTyping();
  initScrollReveal();
  initSkillPop();
  initJourneyReveal();
  initCounters();
  initParticles();
  initCardTilt();
  initRipple();
});
