/* ============================================================
   QUANTUM PORTFOLIO · main.js
   Cursor · Particle field · Magnetic · Tilt · Reveal · Counter
   ============================================================ */

/* ---------- 0. Personal data (edit me!) -----------------------
   Fill these in and the page will auto-populate every placeholder.
   You can also leave fields blank to keep the demo content.
----------------------------------------------------------------*/
const PROFILE = {
  name:      "Quantum",
  age:       "18",
  role:      "Web designer, crypto educator, trader, and AI tools builder",
  location:  "Nigeria",
  hobby:     "studying charts and redesigning interfaces",
  learning:  "AI automation, product design, and trading systems",

  // hero counters (numeric)
  years:     "3",   // years building
  projects:  "12",  // projects shipped

  // current projects
  "project1-name": "AI Tools Platform",
  "project1-desc": "I'm building an AI tools platform that helps creators and small teams work faster and ship better.",
  "project1-date": "2026",

  "project2-name": "Crypto Education Engine",
  "project2-desc": "A crypto education product focused on clear lessons, practical risk management, and real on-chain examples.",
  "project2-date": "2026",

  "project3-name": "QuantumUI Studio",
  "project3-desc": "A UI/UX kit for Web3 founders who want clean interfaces without overcomplicated design systems.",
  "project3-date": "Soon",

  // contact
  email:     "normaleasy045@gmail.com",
  github:    "",
  twitter:   "https://x.com/QuantUMYTE",
  linkedin:  "",
  dribbble:  "",
};

/* ---------------- 1. Populate placeholders ------------------- */
(() => {
  for (const [key, value] of Object.entries(PROFILE)) {
    if (!value) continue;
    document.querySelectorAll(`[data-fill="${key}"]`).forEach(el => {
      // anchor mailto / link
      if (key === "email" && el.tagName === "A") el.href = `mailto:${value}`;
      el.textContent = value;
    });
    document.querySelectorAll(`[data-fill-href="${key}"]`).forEach(el => {
      el.href = key === "email-href" ? `mailto:${PROFILE.email}` : value;
    });
    document.querySelectorAll(`[data-target-fill="${key}"]`).forEach(el => {
      el.dataset.count = value;
    });
  }
  // age counter
  if (PROFILE.age) {
    document.querySelectorAll('[data-target-fill="age"]').forEach(el => el.dataset.count = PROFILE.age);
  }
  document.getElementById("year").textContent = new Date().getFullYear();
})();

/* ---------------- 2. Custom magnetic cursor ------------------ */
(() => {
  if (window.matchMedia("(max-width: 880px)").matches) return;
  const cursor = document.getElementById("cursor");
  let tx = 0, ty = 0, cx = 0, cy = 0;
  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  const tick = () => {
    cx += (tx - cx) * 0.22;
    cy += (ty - cy) * 0.22;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(tick);
  };
  tick();
  document.querySelectorAll("a, button, [data-magnetic], [data-tilt]").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
  });
})();

/* ---------------- 3. Magnetic buttons ------------------------ */
(() => {
  if (window.matchMedia("(max-width: 880px)").matches) return;
  document.querySelectorAll("[data-magnetic]").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
})();

/* ---------------- 4. 3D tilt cards --------------------------- */
(() => {
  if (window.matchMedia("(max-width: 880px)").matches) return;
  document.querySelectorAll("[data-tilt]").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(0)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
})();

/* ---------------- 5. Scroll reveal + progress ---------------- */
(() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
  document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));

  // also reveal skill cards (they have data-reveal already, but mark them for bar fill)
  const progress = document.getElementById("progress");
  const onScroll = () => {
    const h = document.documentElement;
    const p = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = p + "%";
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* ---------------- 6. Counter animation ----------------------- */
(() => {
  const nums = document.querySelectorAll("[data-count]");
  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    if (!target || isNaN(target)) { el.textContent = el.dataset.count || "—"; return; }
    const dur = 1600; const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((es) => {
    es.forEach(en => { if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); } });
  }, { threshold: 0.5 });
  nums.forEach(el => io.observe(el));
})();

/* ---------------- 7. Quantum particle field ------------------ */
(() => {
  const canvas = document.getElementById("quantum-field");
  const ctx = canvas.getContext("2d");
  let w, h, dpr;
  let particles = [];
  let mouse = { x: -9999, y: -9999 };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    ctx.scale(1, 1);
    initParticles();
  };

  const COUNT = window.matchMedia("(max-width: 880px)").matches ? 50 : 110;

  const initParticles = () => {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25 * dpr,
        vy: (Math.random() - 0.5) * 0.25 * dpr,
        r: Math.random() * 1.4 * dpr + 0.4 * dpr,
      });
    }
  };

  const tick = () => {
    ctx.clearRect(0, 0, w, h);

    // particles
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(220, 226, 255, 0.55)";
      ctx.fill();
    }

    // connections
    const maxDist = 130 * dpr;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          const alpha = (1 - d / maxDist) * 0.18;
          ctx.strokeStyle = `rgba(160, 180, 255, ${alpha})`;
          ctx.lineWidth = 0.5 * dpr;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      // mouse interaction
      const mx = mouse.x * dpr, my = mouse.y * dpr;
      const dx = particles[i].x - mx, dy = particles[i].y - my;
      const d = Math.sqrt(dx * dx + dy * dy);
      const range = 180 * dpr;
      if (d < range) {
        const alpha = (1 - d / range) * 0.5;
        ctx.strokeStyle = `rgba(124, 92, 255, ${alpha})`;
        ctx.lineWidth = 0.6 * dpr;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mx, my);
        ctx.stroke();

        // gentle push
        particles[i].x += dx / d * 0.4;
        particles[i].y += dy / d * 0.4;
      }
    }

    requestAnimationFrame(tick);
  };

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });
  resize();
  tick();
})();

/* ---------------- 8. Smooth anchor offsets ------------------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

/* ---------------- 9. Live crypto ticker (CoinGecko) ---------- */
(() => {
  const COINS = ["solana", "bitcoin", "ethereum"];
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${COINS.join(",")}&vs_currencies=usd&include_24hr_change=true`;

  const fmt = (n) => {
    if (n >= 1000) return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
    if (n >= 1)    return "$" + n.toFixed(2);
    return "$" + n.toFixed(4);
  };

  const update = async () => {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("rate limited");
      const data = await res.json();
      for (const id of COINS) {
        const px = data[id]?.usd;
        const ch = data[id]?.usd_24h_change;
        if (px == null) continue;
        document.querySelectorAll(`[data-coin="${id}"]`).forEach(el => el.textContent = fmt(px));
        document.querySelectorAll(`[data-coin-chg="${id}"]`).forEach(el => {
          const sign = ch >= 0 ? "+" : "";
          el.textContent = `${sign}${ch.toFixed(2)}%`;
          el.classList.toggle("up", ch >= 0);
          el.classList.toggle("down", ch < 0);
        });
      }
    } catch (_) {
      // silent fail — leave em-dashes; retry on next tick
    }
  };

  update();
  setInterval(update, 60_000); // refresh every minute
})();

/* ---------------- 10. Signature year + small fills ---------- */
(() => {
  const sig = document.getElementById("sig-year");
  if (sig) sig.textContent = new Date().getFullYear();
})();

/* ---------------- 11. Easter egg: type "gm" for terminal ---- */
(() => {
  let buf = "";
  const terminal = document.createElement("div");
  terminal.className = "terminal";
  terminal.innerHTML = `
    <div class="terminal__box" role="dialog" aria-label="Quantum terminal">
      <div class="terminal__bar">
        <span></span><span></span><span></span>
        <small>quantum@trenches  ~  zsh</small>
      </div>
      <div class="terminal__body" id="termBody"></div>
    </div>`;
  document.body.appendChild(terminal);

  const lines = [
    { t: 200,  html: '<span class="prompt">quantum@trenches</span> <span class="out">~ %</span> whoami' },
    { t: 600,  html: '<span class="out">Quantum · 18 · Nigeria</span>' },
    { t: 900,  html: '<span class="out">designer | crypto educator | trader | AI tools builder</span>' },
    { t: 1300, html: '<span class="prompt">quantum@trenches</span> <span class="out">~ %</span> cat ./mission.txt' },
    { t: 1700, html: '<span class="key">→</span> <span class="out">build a billion-dollar project before the world catches up.</span>' },
    { t: 2100, html: '<span class="prompt">quantum@trenches</span> <span class="out">~ %</span> ./status.sh' },
    { t: 2500, html: '<span class="out">[ ok ] design ............. shipping</span>' },
    { t: 2700, html: '<span class="out">[ ok ] solana trenches .... locked in</span>' },
    { t: 2900, html: '<span class="out">[ ok ] rust journey ....... in progress</span>' },
    { t: 3100, html: '<span class="out">[ ok ] ai tools platform .. building</span>' },
    { t: 3400, html: '<span class="prompt">quantum@trenches</span> <span class="out">~ %</span> echo "gm to whoever is reading this 🌅"' },
    { t: 3800, html: '<span class="out">gm to whoever is reading this 🌅</span>' },
    { t: 4200, html: '<span class="prompt">quantum@trenches</span> <span class="out">~ %</span> <span class="terminal__cursor"></span>' },
  ];

  const open = () => {
    const body = terminal.querySelector("#termBody");
    body.innerHTML = "";
    terminal.classList.add("is-open");
    lines.forEach(l => setTimeout(() => {
      const div = document.createElement("div");
      div.innerHTML = l.html;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }, l.t));
  };
  const close = () => terminal.classList.remove("is-open");

  terminal.addEventListener("click", (e) => { if (e.target === terminal) close(); });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") return close();
    if (terminal.classList.contains("is-open")) return;
    // ignore typing inside inputs (none, but safe)
    if (/^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName || "")) return;
    if (e.key.length === 1) {
      buf = (buf + e.key.toLowerCase()).slice(-4);
      if (buf.endsWith("gm")) open();
    }
  });
})();

