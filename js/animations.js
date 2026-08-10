/* ==========================================================================
   animations.js
   Typing animation, scroll reveal, counters, particle background, card tilt
   ========================================================================== */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------------------------------------------------
   Typing animation
   -------------------------------------------------------------------------- */
const typingPhrases = [
  "Software Developer",
  "MERN Stack Developer",
  "Django Developer",
  "Frontend Developer",
  "Software Testing Enthusiast"
];

function initTyping(){
  const el = document.getElementById("typingText");
  if(!el) return;

  if(reduceMotion){
    el.textContent = typingPhrases[0];
    return;
  }

  let phraseIndex = 0, charIndex = 0, deleting = false;

  function tick(){
    const current = typingPhrases[phraseIndex];

    if(!deleting){
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if(charIndex === current.length){
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    }else{
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if(charIndex === 0){
        deleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
}

/* --------------------------------------------------------------------------
   Scroll reveal (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal(){
  const targets = document.querySelectorAll(".reveal-up");
  if(!targets.length) return;

  if(reduceMotion){
    targets.forEach(t => t.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold:0.15, rootMargin:"0px 0px -40px 0px" });

  targets.forEach(t => observer.observe(t));
}

/* --------------------------------------------------------------------------
   Skill tag pop-in (staggered) once category enters view
   -------------------------------------------------------------------------- */
function initSkillPop(){
  const categories = document.querySelectorAll(".skill-category");
  if(!categories.length) return;

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const tags = entry.target.querySelectorAll(".skill-tag");
        tags.forEach((tag, i)=>{
          setTimeout(()=> tag.classList.add("pop"), reduceMotion ? 0 : i * 40);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold:0.2 });

  categories.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   Journey timeline reveal
   -------------------------------------------------------------------------- */
function initJourneyReveal(){
  const items = document.querySelectorAll(".journey-item");
  if(!items.length) return;

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold:0.3 });

  items.forEach(i => observer.observe(i));
}

/* --------------------------------------------------------------------------
   Animated counters (trigger once in viewport)
   -------------------------------------------------------------------------- */
function initCounters(){
  const counters = document.querySelectorAll(".stat-number");
  if(!counters.length) return;

  const animateCounter = (el)=>{
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || "";

    if(reduceMotion){
      el.textContent = target + suffix;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    function step(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = value + suffix;
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold:0.6 });

  counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   Subtle particle background for hero
   -------------------------------------------------------------------------- */
function initParticles(){
  const canvas = document.getElementById("particlesCanvas");
  if(!canvas || reduceMotion) return;

  const ctx = canvas.getContext("2d");
  let width, height, particles;

  function resize(){
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createParticles(){
    const count = Math.min(46, Math.floor((width * height) / 26000));
    particles = Array.from({ length: count }, ()=>({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      o: Math.random() * 0.5 + 0.15
    }));
  }

  function draw(){
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0) p.x = width; if(p.x > width) p.x = 0;
      if(p.y < 0) p.y = height; if(p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(148,180,255,${p.o})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener("resize", ()=>{
    resize();
    createParticles();
  });
}

/* --------------------------------------------------------------------------
   Project card 3D tilt on mouse move (desktop only)
   -------------------------------------------------------------------------- */
function initCardTilt(){
  if(reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;

  document.addEventListener("mousemove", (e)=>{
    const card = e.target.closest(".project-card");
    if(!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--ry", (px * 6).toFixed(2) + "deg");
    card.style.setProperty("--rx", (-py * 6).toFixed(2) + "deg");
  });

  document.addEventListener("mouseout", (e)=>{
    const card = e.target.closest(".project-card");
    if(!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
}

/* --------------------------------------------------------------------------
   Button ripple effect
   -------------------------------------------------------------------------- */
function initRipple(){
  document.addEventListener("click", (e)=>{
    const btn = e.target.closest(".btn");
    if(!btn || btn.disabled) return;

    const ripple = document.createElement("span");
    ripple.className = "btn-ripple";
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
    btn.appendChild(ripple);
    setTimeout(()=> ripple.remove(), 650);
  });
}
