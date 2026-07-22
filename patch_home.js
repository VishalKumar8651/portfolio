const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, 'Portfolio');
const homeFile = path.join(portfolioDir, 'home', 'index.html');
const skillsFile = path.join(portfolioDir, 'skills', 'index.html');
const projectsFile = path.join(portfolioDir, 'projects', 'index.html');
const aboutFile = path.join(portfolioDir, 'about', 'index.html');
const contactFile = path.join(portfolioDir, 'contact', 'index.html');

function extractMainContent(html) {
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    return mainMatch ? mainMatch[1] : '';
}

let homeHtml = fs.readFileSync(homeFile, 'utf-8');
let skillsHtml = fs.readFileSync(skillsFile, 'utf-8');
let projectsHtml = fs.readFileSync(projectsFile, 'utf-8');
let aboutHtml = fs.readFileSync(aboutFile, 'utf-8');
let contactHtml = fs.readFileSync(contactFile, 'utf-8');

const skillsContent = extractMainContent(skillsHtml);
const projectsContent = extractMainContent(projectsHtml);
const aboutContent = extractMainContent(aboutHtml);
const contactContent = extractMainContent(contactHtml);

// 1. CSS Injection
const cssToInject = `
    /* Mobile Scroll Sections CSS */
    .neural-wrap { position: relative; width: 100%; height: 360px; border-radius: 16px; background: rgba(5, 20, 36, 0.7); border: 1px solid rgba(76, 215, 246, 0.15); overflow: hidden; backdrop-filter: blur(8px); }
    .hud-panel { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #4cd7f6; background: rgba(5, 20, 36, 0.85); border: 1px solid rgba(76, 215, 246, 0.25); border-radius: 10px; padding: 14px 18px; letter-spacing: 0.05em; display: flex; gap: 24px; flex-wrap: wrap; margin-top: 12px; }
    .hud-panel .hud-item { display: flex; align-items: center; gap: 7px; }
    .hud-dot { width: 6px; height: 6px; border-radius: 50%; background: #4cd7f6; box-shadow: 0 0 6px #4cd7f6; animation: hud-blink 2s ease-in-out infinite; }
    .hud-dot.purple { background: #ddb7ff; box-shadow: 0 0 6px #ddb7ff; animation-delay: 0.7s; }
    .hud-dot.blue { background: #b4c5ff; box-shadow: 0 0 6px #b4c5ff; animation-delay: 1.4s; }
    @keyframes hud-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    #nn-tooltip { position: fixed; pointer-events: none; background: rgba(5, 20, 36, 0.95); border: 1px solid rgba(76, 215, 246, 0.4); border-radius: 10px; padding: 10px 14px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #d4e4fa; backdrop-filter: blur(12px); box-shadow: 0 0 20px rgba(76, 215, 246, 0.15); transition: opacity 0.2s; z-index: 9999; min-width: 150px; }
    #nn-tooltip .tt-title { color: #4cd7f6; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 4px; }
    #nn-tooltip .tt-sub { color: #c2c6d9; font-size: 10px; margin-bottom: 3px; }
    #nn-tooltip .tt-tags { color: #b4c5ff; font-size: 10px; }
    .glass-card { background: rgba(18, 33, 49, 0.6); border: 1px solid rgba(76, 215, 246, 0.12); backdrop-filter: blur(16px); transition: border-color 0.3s, box-shadow 0.3s; }
    .glass-card:hover { border-color: rgba(76, 215, 246, 0.3); box-shadow: 0 0 20px rgba(76, 215, 246, 0.08); }
    .skill-pill { background: rgba(180, 197, 255, 0.07); border: 1px solid rgba(180, 197, 255, 0.2); transition: background 0.2s, border-color 0.2s; }
    .skill-pill:hover { background: rgba(180, 197, 255, 0.15); border-color: rgba(180, 197, 255, 0.4); }
    .tilt-card { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; transform-style: preserve-3d; }
    .tilt-card:hover { border-color: rgba(255, 255, 255, 0.4); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 98, 255, 0.2); }
    .btn-primary { background: linear-gradient(135deg, #0062ff, #ddb7ff); transition: all 0.3s ease; }
    .btn-primary:hover { box-shadow: 0 0 20px rgba(0, 98, 255, 0.4); }
    .skill-chip { background: rgba(0, 98, 255, 0.1); border: 1px solid rgba(0, 98, 255, 0.3); }
    .about-heading { font-family: 'Sora', sans-serif; font-weight: 900; text-transform: uppercase; line-height: 1; letter-spacing: -0.03em; font-size: clamp(3rem, 8vw, 6.5rem); background: linear-gradient(135deg, #b4c5ff 0%, #4cd7f6 50%, #ddb7ff 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
    .contact-btn { background: linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%); box-shadow: 0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset; outline: 2px solid rgba(255, 255, 255, 0.7); outline-offset: -3px; border: none; border-radius: 9999px; color: white; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; padding: 14px 40px; font-size: clamp(0.75rem, 1.2vw, 1rem); transition: opacity 0.2s ease, transform 0.2s ease; display: inline-block; }
    .contact-btn:hover { opacity: 0.85; transform: translateY(-2px); }
    .stat-card { background: rgba(18, 33, 49, 0.6); backdrop-filter: blur(16px); border: 1px solid rgba(76, 215, 246, 0.2); border-radius: 16px; padding: 20px 28px; text-align: center; transition: border-color 0.3s, box-shadow 0.3s; }
    .stat-card:hover { border-color: rgba(76, 215, 246, 0.5); box-shadow: 0 0 20px rgba(76, 215, 246, 0.15); }
    .tag-pill { background: rgba(180, 197, 255, 0.08); border: 1px solid rgba(180, 197, 255, 0.25); border-radius: 9999px; padding: 6px 16px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #b4c5ff; letter-spacing: 0.04em; transition: background 0.2s, border-color 0.2s; }
    .tag-pill:hover { background: rgba(180, 197, 255, 0.15); border-color: rgba(180, 197, 255, 0.5); }
    .fade-section { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .fade-section.in-view { opacity: 1; transform: translateY(0); }
    .gradient-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.4), rgba(4, 5, 7, 0.4), transparent); }
    #animated-about-text { margin-left: auto !important; margin-right: auto !important; text-align: center !important; }
    .input-field { background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 12px 12px; transition: box-shadow .25s ease, border-color .25s ease, transform .15s ease; }
    .input-field:focus { outline: none; border-color: rgba(34, 211, 238, 0.45); box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.14), 0 0 25px rgba(34, 211, 238, 0.12); }
    .contact-heading{ font-family: 'Sora', sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.95; letter-spacing: -0.03em; font-size: clamp(2.8rem, 6.5vw, 5.8rem); background: linear-gradient(135deg, #b4c5ff 0%, #22d3ee 35%, #3D81E3 60%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .no-break { word-break: normal; overflow-wrap: normal; white-space: normal; }
    .hint-text { color: rgba(255,255,255,0.6); font-size: 12px; line-height: 1.4; }
    .error-text { color: #ffb4ab; font-size: 12px; line-height: 1.4; }
    .success-text { color: rgba(34,211,238,0.95); font-size: 12px; line-height: 1.4; }
`;

homeHtml = homeHtml.replace('</style>', cssToInject + '\n  </style>');

// 2. HTML Injection
const htmlToInject = `
    <!-- Mobile Scroll Sections -->
    <div id="mobile-scroll-sections" class="block md:hidden w-full flex flex-col gap-32 pb-24">
      <!-- Skills -->
      <section class="mobile-fade-section w-full">
        ${skillsContent}
      </section>
      <!-- Projects -->
      <section class="mobile-fade-section w-full">
        ${projectsContent}
      </section>
      <!-- About -->
      <section class="mobile-fade-section w-full">
        ${aboutContent}
      </section>
      <!-- Contact -->
      <section class="mobile-fade-section w-full">
        ${contactContent}
      </section>
    </div>
`;

// Refactor <main> to <section> for the hero
homeHtml = homeHtml.replace(
    /<main\s+class="flex-grow relative z-10 flex flex-col items-center justify-center min-h-screen pt-\[120px\] pb-stack-lg px-margin-mobile">/g,
    '<main class="flex-grow relative z-10 w-full">\n    <section class="flex flex-col items-center justify-center min-h-screen pt-[120px] pb-stack-lg px-margin-mobile">'
);
homeHtml = homeHtml.replace(
    /<\/div>\n    <\/div>\n  <\/main>/g,
    '</div>\n    </div>\n    </section>\n' + htmlToInject + '\n  </main>'
);

// 3. JS Injection
const jsToInject = `
  <!-- Tooltip for Neural Canvas -->
  <div id="nn-tooltip" style="opacity:0;position:fixed;top:0;left:0;"></div>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const mobileSections = document.getElementById('mobile-scroll-sections');
      if (!mobileSections || mobileSections.offsetParent === null) return; // Only run on mobile

      // Fade-in animations
      const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
      document.querySelectorAll('.mobile-fade-section, .fade-section').forEach(el => fadeObserver.observe(el));

      // Tilt effect for glass cards
      document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const py = ((e.clientY - rect.top) / rect.height) * 2 - 1;
          card.style.transform = \`rotateX(\${(-py * 6).toFixed(2)}deg) rotateY(\${(px * 6).toFixed(2)}deg) translateZ(0)\`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
        });
      });

      // Animated text
      const ABOUT_TEXT = "I am Vishal Kumar Sah, I am from Bihar and I am currently pursuing a Bachelor of Technology in Computer Science with a specialization in Artificial Intelligence and Machine Learning at Galgotias University, Greater Noida. I am passionate about web development and machine learning. Apart from software development, I have a strong interest in data analysis and machine learning. I have worked with tools and libraries such as NumPy, Pandas, Matplotlib, and Seaborn for data processing, visualization, and analytical tasks. These technologies have helped me understand how data can be transformed into meaningful insights and used to build intelligent systems. In addition, I have worked with workflow automation using n8n and Docker. One of the automations I built delivers the top five technology news updates directly to my Telegram account every day. Through this project, I gained practical experience in API integration, workflow orchestration, containerization, and automation. Looking ahead, my goal is to build a successful career in Machine Learning and Artificial Intelligence.";
      const textEl = document.getElementById('animated-about-text');
      if (textEl) textEl.textContent = ABOUT_TEXT;

      // Contact Form Validation
      const form = document.getElementById('contactForm');
      const statusEl = document.getElementById('formStatus');
      if (form) {
        const fields = [
          { id: 'name', errorId: 'nameError', rules: (v) => v.trim().length >= 2 },
          { id: 'email', errorId: 'emailError', rules: (v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v) },
          { id: 'subject', errorId: 'subjectError', rules: (v) => v.trim().length >= 3 },
          { id: 'message', errorId: 'messageError', rules: (v) => v.trim().length >= 10 }
        ];

        function setError(errorId, msg) {
          const el = document.getElementById(errorId);
          if (!el) return;
          if (msg) {
            el.textContent = msg;
            el.classList.remove('hidden');
          } else {
            el.textContent = '';
            el.classList.add('hidden');
          }
        }

        function validate() {
          let ok = true;
          statusEl.classList.add('hidden');
          statusEl.textContent = '';

          for (const f of fields) {
            const input = document.getElementById(f.id);
            const value = input ? input.value : '';
            const pass = f.rules(value);

            if (!pass) {
              ok = false;
              const msg =
                f.id === 'name' ? 'Please enter your name (min 2 characters).' :
                f.id === 'email' ? 'Please enter a valid email address.' :
                f.id === 'subject' ? 'Please enter a subject (min 3 characters).' :
                'Please enter a message (min 10 characters).';

              setError(f.errorId, msg);
            } else {
              setError(f.errorId, '');
            }
          }
          return ok;
        }

        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const ok = validate();
          if (!ok) return;
          statusEl.textContent = 'Message saved locally (demo). You can view it from localStorage.';
          statusEl.classList.remove('hidden');
          form.reset();
        });
      }
    });
  </script>
`;

homeHtml = homeHtml.replace('</body>', jsToInject + '\n</body>');

// Fix the neural canvas script to only run on mobile
const neuralCanvasScript = `
    // Neural Network Visualization (Mobile Only)
    <script>
    (function () {
      const canvas = document.getElementById('neural-canvas');
      const tooltip = document.getElementById('nn-tooltip');
      if (!canvas) return;
      
      // Check if mobile sections are visible
      const mobileSections = document.getElementById('mobile-scroll-sections');
      if (!mobileSections || mobileSections.offsetParent === null) return;

      const ctx = canvas.getContext('2d');

      const SKILLS = [
        { label: 'JAVA', sub: 'Primary Language', tags: 'DSA · OOP · Backend', color: '#b4c5ff', r: 26 },
        { label: 'PYTHON', sub: 'Core Language', tags: 'ML · Scripting · Data', color: '#4cd7f6', r: 26 },
        { label: 'ML', sub: 'Machine Learning', tags: 'Scikit · TF · Models', color: '#ddb7ff', r: 24 },
        { label: 'REACT', sub: 'Frontend Framework', tags: 'SPA · Hooks · UI', color: '#4cd7f6', r: 22 },
        { label: 'NODE.JS', sub: 'Backend Runtime', tags: 'REST · Express · APIs', color: '#b4c5ff', r: 22 },
        { label: 'MONGODB', sub: 'NoSQL Database', tags: 'Documents · Atlas · ODM', color: '#ddb7ff', r: 20 },
        { label: 'DATA ANALYSIS', sub: 'Analytics', tags: 'Pandas · NumPy · Seaborn', color: '#4cd7f6', r: 20 },
        { label: 'SCIKIT-LEARN', sub: 'ML Library', tags: 'Models · Pipelines · CV', color: '#b4c5ff', r: 18 }
      ];

      let W, H, cx, cy;
      let mouse = { x: -999, y: -999 };
      let hoveredIdx = -1;
      let globalAngle = 0;
      const particles = [];

      const floatPhase = SKILLS.map(() => Math.random() * Math.PI * 2);
      const floatAmp = SKILLS.map(() => 10 + Math.random() * 14);
      const floatSpeed = SKILLS.map(() => 0.4 + Math.random() * 0.5);
      const baseAngles = [0, 45, 105, 160, 210, 265, 315, 355].map(d => d * Math.PI / 180);
      const baseRadii = [170, 155, 175, 160, 165, 150, 170, 155];

      function resize() {
        const wrap = canvas.parentElement;
        W = canvas.width = wrap.clientWidth || 420;
        H = canvas.height = wrap.clientHeight || 520;
        cx = W / 2;
        cy = H / 2;
      }

      function getNodePos(i, t) {
        const angle = baseAngles[i] + globalAngle;
        const rad = baseRadii[i];
        const fx = Math.cos(floatPhase[i] + t * floatSpeed[i]) * floatAmp[i];
        const fy = Math.sin(floatPhase[i] + t * floatSpeed[i] * 0.8) * floatAmp[i] * 0.6;
        const px = (mouse.x / W - 0.5) * 18;
        const py = (mouse.y / H - 0.5) * 18;
        return {
          x: cx + Math.cos(angle) * rad + fx + px,
          y: cy + Math.sin(angle) * rad + fy + py
        };
      }

      function spawnParticle(nx, ny) {
        particles.push({ x: nx, y: ny, progress: 0, speed: 0.004 + Math.random() * 0.006, size: 1.5 + Math.random() * 1.5 });
      }

      function drawGrid() {
        ctx.save();
        ctx.strokeStyle = 'rgba(76,215,246,0.04)';
        ctx.lineWidth = 1;
        for (let r = 50; r <= Math.max(W, H) * 0.7; r += 55) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }
        for (let a = 0; a < 360; a += 30) {
          const rad = a * Math.PI / 180;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(rad) * W, cy + Math.sin(rad) * W);
          ctx.stroke();
        }
        ctx.restore();
      }

      function drawLine(x1, y1, x2, y2, hovered, t) {
        const pulse = 0.3 + 0.2 * Math.sin(t * 1.5);
        const alpha = hovered ? 0.7 : (hoveredIdx >= 0 ? 0.06 : pulse);
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, \`rgba(180, 197, 255, \${alpha})\`);
        grad.addColorStop(1, \`rgba(76, 215, 246, \${alpha})\`);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = hovered ? 1.5 : 0.8;
        if (hovered) { ctx.shadowColor = '#4cd7f6'; ctx.shadowBlur = 8; }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      function drawNode(i, pos, t) {
        const sk = SKILLS[i];
        const isHov = (i === hoveredIdx);
        const isDim = (hoveredIdx >= 0 && !isHov);
        const r = sk.r + (isHov ? 6 : 0);
        const alpha = isDim ? 0.25 : 1;

        ctx.save();
        ctx.globalAlpha = alpha;

        const glowSize = isHov ? 28 : (12 + 4 * Math.sin(t * 1.2 + i));
        const grd = ctx.createRadialGradient(pos.x, pos.y, r * 0.3, pos.x, pos.y, r + glowSize);
        grd.addColorStop(0, sk.color + '55');
        grd.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r + glowSize, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        const body = ctx.createRadialGradient(pos.x - r * 0.3, pos.y - r * 0.3, 1, pos.x, pos.y, r);
        body.addColorStop(0, 'rgba(30,50,70,0.95)');
        body.addColorStop(1, 'rgba(5,20,36,0.9)');
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = body;
        ctx.shadowColor = sk.color;
        ctx.shadowBlur = isHov ? 20 : 8;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = sk.color + (isHov ? 'ff' : '99');
        ctx.lineWidth = isHov ? 2 : 1;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = isHov ? '#ffffff' : (isDim ? sk.color + '66' : sk.color);
        ctx.font = \`500 \${r < 22 ? 8 : 9}px 'JetBrains Mono', monospace\`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const words = sk.label.split(' ');
        if (words.length > 1) {
          ctx.fillText(words[0], pos.x, pos.y - 5);
          ctx.fillText(words[1], pos.x, pos.y + 6);
        } else {
          ctx.fillText(sk.label, pos.x, pos.y);
        }
        ctx.restore();
      }

      function drawCenter(t) {
        const pulse = 1 + 0.06 * Math.sin(t * 1.8);
        const R = 44 * pulse;
        const px = (mouse.x / W - 0.5) * 8;
        const py = (mouse.y / H - 0.5) * 8;
        const nx = cx + px, ny = cy + py;

        const glowR = R + 30 + 15 * Math.sin(t * 1.2);
        const g = ctx.createRadialGradient(nx, ny, R * 0.2, nx, ny, glowR);
        g.addColorStop(0, 'rgba(76,215,246,0.25)');
        g.addColorStop(0.5, 'rgba(76,215,246,0.08)');
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(nx, ny, glowR, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.save();
        ctx.translate(nx, ny);
        ctx.rotate(t * 0.4);
        ctx.beginPath();
        ctx.arc(0, 0, R + 10, 0, Math.PI * 1.5);
        ctx.strokeStyle = 'rgba(76,215,246,0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        const body = ctx.createRadialGradient(nx - R * 0.3, ny - R * 0.3, 2, nx, ny, R);
        body.addColorStop(0, 'rgba(0,98,255,0.6)');
        body.addColorStop(1, 'rgba(5,20,36,0.95)');
        ctx.beginPath();
        ctx.arc(nx, ny, R, 0, Math.PI * 2);
        ctx.fillStyle = body;
        ctx.shadowColor = '#4cd7f6';
        ctx.shadowBlur = 24;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(nx, ny, R, 0, Math.PI * 2);
        ctx.strokeStyle = '#4cd7f6cc';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#4cd7f6';
        ctx.font = "bold 9px 'JetBrains Mono', monospace";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('VKS', nx, ny - 7);
        ctx.fillText('NEURAL', nx, ny + 2);
        ctx.fillText('CORE', nx, ny + 11);

        return { x: nx, y: ny };
      }

      function updateParticles(t, nodePositions, centerPos) {
        if (Math.random() < 0.04 && particles.length < 18) {
          const i = Math.floor(Math.random() * SKILLS.length);
          spawnParticle(nodePositions[i].x, nodePositions[i].y);
          particles[particles.length - 1].sourceIdx = i;
        }
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.progress += p.speed;
          if (p.progress >= 1) { particles.splice(i, 1); continue; }
          const src = nodePositions[p.sourceIdx];
          const x = src.x + (centerPos.x - src.x) * p.progress;
          const y = src.y + (centerPos.y - src.y) * p.progress;
          const alpha = Math.sin(p.progress * Math.PI) * 0.8;
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = \`rgba(76, 215, 246, \${alpha})\`;
          ctx.shadowColor = '#4cd7f6';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      function hitTest(mx, my, i, pos) {
        const dx = mx - pos.x, dy = my - pos.y;
        return Math.sqrt(dx * dx + dy * dy) <= SKILLS[i].r + 8;
      }

      function showTooltip(i, screenX, screenY) {
        const sk = SKILLS[i];
        tooltip.innerHTML = \`<div class="tt-title">\${sk.label}</div><div class="tt-sub">\${sk.sub}</div><div class="tt-tags">\${sk.tags}</div>\`;
        const tx = Math.min(screenX + 16, window.innerWidth - 180);
        const ty = Math.max(screenY - 60, 10);
        tooltip.style.left = tx + 'px';
        tooltip.style.top = ty + 'px';
        tooltip.style.opacity = '1';
      }

      function hideTooltip() {
        tooltip.style.opacity = '0';
      }

      let lastT = 0;
      function draw(ts) {
        requestAnimationFrame(draw);
        const t = ts * 0.001;
        globalAngle += 0.0012;
        ctx.clearRect(0, 0, W, H);
        drawGrid();
        const nPos = SKILLS.map((_, i) => getNodePos(i, t));
        const cPos = { x: cx + (mouse.x / W - 0.5) * 8, y: cy + (mouse.y / H - 0.5) * 8 };
        nPos.forEach((p, i) => { drawLine(cPos.x, cPos.y, p.x, p.y, i === hoveredIdx, t); });
        nPos.forEach((p, i) => drawNode(i, p, t));
        drawCenter(t);
        updateParticles(t, nPos, cPos);
        lastT = t;
      }

      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        const nPos = SKILLS.map((_, i) => getNodePos(i, lastT));
        let found = -1;
        for (let i = 0; i < SKILLS.length; i++) {
          if (hitTest(mouse.x, mouse.y, i, nPos[i])) { found = i; break; }
        }
        if (found !== hoveredIdx) {
          hoveredIdx = found;
          if (found >= 0) { showTooltip(found, e.clientX, e.clientY); canvas.style.cursor = 'pointer'; }
          else { hideTooltip(); canvas.style.cursor = 'crosshair'; }
        } else if (found >= 0) {
          const tx = Math.min(e.clientX + 16, window.innerWidth - 180);
          const ty = Math.max(e.clientY - 60, 10);
          tooltip.style.left = tx + 'px';
          tooltip.style.top = ty + 'px';
        }
      });

      canvas.addEventListener('mouseleave', () => {
        mouse.x = -999; mouse.y = -999;
        hoveredIdx = -1;
        hideTooltip();
        canvas.style.cursor = 'crosshair';
      });

      resize();
      new ResizeObserver(resize).observe(canvas.parentElement);
      requestAnimationFrame(draw);
    })();
    </script>
`;

homeHtml = homeHtml.replace('</body>', neuralCanvasScript + '\n</body>');

fs.writeFileSync(homeFile, homeHtml);
console.log('Successfully patched home/index.html');
