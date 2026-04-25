/* kobrasi955-ui */

/* kobrasi955-ui */
const STORE = {
  theme: "jamiafest:theme",
  lastFilter: "jamiafest:lastFilter",
};

/* kobrasi955-ui */
const EVENT_IMAGE_SLUGS = [
  "assets/img/event-talent-night.jpg",
  "assets/img/event-book-fair.jpg",
  "assets/img/event-campus-olympiad.jpg",
  "assets/img/event-data-workshop.jpg",
  "assets/img/event-food-festival.jpg",
  "assets/img/event-poetry-evening.jpg",
];

/* kobrasi955-ui */
const EVENTS = [
  {
    id: 1, title: "ليلة المواهب", category: "arts", date: "2026-05-05",
    location: "المسرح الكبير", image: "assets/img/event-talent-night.jpg",
    excerpt: "احتفالية بمواهب الطلاب من غناء وعزف وتمثيل.",
    description: "ستُفتتح الليلة بفقرات من أبرز فرق الجامعة، تليها منافسات فردية على جوائز قيمة، وتُختتم بعرض ضوئي مبهر في ساحة المسرح.",
    speakers: ["أ. رنا صالح", "أ. محمد درويش"],
  },
  {
    id: 2, title: "معرض الكتاب", category: "social", date: "2026-05-18",
    location: "البهو الرئيسي", image: "assets/img/event-book-fair.jpg",
    excerpt: "أكثر من 40 دار نشر عربية وأجنبية في مكان واحد.",
    description: "معرض سنوي تُشارك فيه دور النشر الكبرى، ويتضمن جلسات نقاش وتوقيع كتب لمؤلفين عرب بارزين، وخصومات حصرية للطلاب.",
    speakers: [],
  },
  {
    id: 3, title: "الأولمبياد الجامعي", category: "social", date: "2026-06-22",
    location: "المجمع الرياضي", image: "assets/img/event-campus-olympiad.jpg",
    excerpt: "منافسات رياضية بين الكليات بكافة الألعاب.",
    description: "ينطلق الأولمبياد بمسيرة افتتاحية، يليه أسبوع كامل من المنافسات في كرة القدم والسلة والطائرة وألعاب القوى، ويختتم بحفل توزيع جوائز.",
    speakers: [],
  },
  {
    id: 4, title: "ورشة تحليل البيانات", category: "workshop", date: "2026-06-02",
    location: "مختبر الحاسوب 2", image: "assets/img/event-data-workshop.jpg",
    excerpt: "ثلاث جلسات عملية على Python + Pandas للمبتدئين.",
    description: "ننتقل خلال الورشة من قراءة ملفات CSV إلى تصميم لوحات تفاعلية بسيطة. تشمل تطبيقاً على بيانات حضور الفعاليات السابقة في الجامعة.",
    speakers: ["م. ياسر فتاح"],
  },
  {
    id: 5, title: "مهرجان الطعام", category: "social", date: "2026-07-11",
    location: "الساحة الخارجية", image: "assets/img/event-food-festival.jpg",
    excerpt: "أطباق من 15 مطبخاً مختلفاً يقدمها طلاب الجامعة.",
    description: "مهرجان يومين يعرض تنوع المطابخ العربية والعالمية عبر أجنحة تُعدّها الجمعيات الطلابية. دخول مجاني، وقسائم شراء عبر التطبيق.",
    speakers: [],
  },
  {
    id: 6, title: "أمسية شعرية", category: "arts", date: "2026-08-01",
    location: "حديقة الآداب", image: "assets/img/event-poetry-evening.jpg",
    excerpt: "قراءات شعرية لطلاب الكلية مع عزف منفرد على العود.",
    description: "أمسية هادئة تحت النجوم، يشارك فيها عشرة شعراء من داخل الجامعة وخارجها، مع فقرة موسيقية مباشرة وجلسة نقاش مفتوحة مع الحضور.",
    speakers: ["أ. ديمة حمود"],
  },
];

const CATEGORY_LABELS = {
  tech: "تقنية",
  business: "أعمال",
  social: "اجتماعية",
  workshop: "ورش",
  arts: "فنون",
};

/* kobrasi955-ui */
const EASTERN_DIGITS = "٠١٢٣٤٥٦٧٨٩";
function toEasternDigits(str) {
  return String(str).replace(/\d/g, (d) => EASTERN_DIGITS[d]);
}
function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("ar-SY", {
      year: "numeric",
      month: "long",
      day: "numeric",
      numberingSystem: "arab",
    });
  } catch (_) {
    return iso;
  }
}
function getParam(k) { return new URLSearchParams(location.search).get(k); }
function variantFor(cat) {
  return cat === "arts" ? "variant-amber" : (cat === "tech" ? "variant-ink" : "");
}
function cardHTML(ev) {
  return `
    <article class="j-card h-100 ${variantFor(ev.category)}">
      <img src="${ev.image}" alt="${ev.title}" class="card-img-top" loading="lazy">
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="j-badge ${ev.category}">${CATEGORY_LABELS[ev.category] || ev.category}</span>
          <small class="text-muted">${fmtDate(ev.date)}</small>
        </div>
        <h3 class="h6">${ev.title}</h3>
        <p class="small flex-grow-1" style="color: var(--j-muted);">${ev.excerpt}</p>
        <div class="d-flex gap-2">
          <a href="event.html?id=${ev.id}" class="btn-j-primary btn-sm flex-grow-1 text-center text-decoration-none">التفاصيل</a>
          <button class="btn-j-outline btn-sm" data-bs-toggle="modal" data-bs-target="#bookModal" data-event-id="${ev.id}">حجز</button>
        </div>
      </div>
    </article>
  `;
}

/* kobrasi955-ui */
function renderHomeLatest() {
  const el = document.getElementById("latestGrid");
  if (!el) return;
  const latest = [...EVENTS].sort((a,b) => b.date.localeCompare(a.date)).slice(0, 3);
  el.innerHTML = latest.map(e => `<div class="col-md-6 col-lg-4">${cardHTML(e)}</div>`).join("");
}

/* kobrasi955-ui */
function setupEventsPage() {
  const grid = document.getElementById("eventsGrid");
  if (!grid) return;
  const q = document.getElementById("searchInput");
  const cat = document.getElementById("categoryFilter");
  const emptyMsg = document.getElementById("emptyMsg");

  const saved = JSON.parse(localStorage.getItem(STORE.lastFilter) || "{}");
  if (saved.q && q) q.value = saved.q;
  if (saved.cat && cat) cat.value = saved.cat;

  function render() {
    const qv = (q?.value || "").trim().toLowerCase();
    const cv = cat?.value || "";
    const filtered = EVENTS.filter(ev =>
      (!qv || ev.title.toLowerCase().includes(qv) || ev.excerpt.toLowerCase().includes(qv)) &&
      (!cv || ev.category === cv)
    );
    grid.innerHTML = filtered.map(e => `<div class="col-md-6 col-lg-4">${cardHTML(e)}</div>`).join("");
    if (emptyMsg) emptyMsg.classList.toggle("d-none", filtered.length > 0);
    localStorage.setItem(STORE.lastFilter, JSON.stringify({ q: qv, cat: cv }));
    const count = document.getElementById("resultsCount");
    if (count) count.textContent = toEasternDigits(filtered.length);
  }
  [q, cat].forEach(el => el && el.addEventListener("input", render));
  render();
}

/* kobrasi955-ui */
function setupEventDetailsPage() {
  const host = document.getElementById("eventDetails");
  if (!host) return;
  const id = parseInt(getParam("id") || "1", 10);
  const ev = EVENTS.find(e => e.id === id) || EVENTS[0];
  document.title = `${ev.title} — JamiaFest`;

  host.innerHTML = `
    <div class="row g-4">
      <div class="col-lg-7">
        <span class="j-badge ${ev.category} mb-3 d-inline-block">${CATEGORY_LABELS[ev.category]}</span>
        <h1 class="display-5" style="font-weight:900;">${ev.title}</h1>
        <p class="event-meta mb-4"><strong>التاريخ:</strong> ${fmtDate(ev.date)} · <strong>المكان:</strong> ${ev.location}</p>
        <img src="${ev.image}" alt="${ev.title}" class="img-fluid mb-4" style="border:3px solid var(--j-border); aspect-ratio:16/8; object-fit:cover; width:100%;">
        <h2 class="h5">التفاصيل</h2>
        <p>${ev.description}</p>
        ${ev.speakers?.length ? `<h2 class="h6 mt-4">المتحدثون</h2><ul>${ev.speakers.map(s=>`<li>${s}</li>`).join("")}</ul>` : ""}
        <h2 class="h6 mt-4">معرض الصور</h2>
        <div class="row g-3 event-gallery">
          <div class="col-6 col-md-4"><img src="${ev.image}" alt=""></div>
          <div class="col-6 col-md-4"><img src="${EVENT_IMAGE_SLUGS[ev.id % 6]}" alt=""></div>
          <div class="col-6 col-md-4"><img src="${EVENT_IMAGE_SLUGS[(ev.id + 1) % 6]}" alt=""></div>
        </div>
      </div>
      <aside class="col-lg-5">
        <div class="j-card p-4">
          <h2 class="h6 mb-3">الموقع</h2>
          <div class="small mb-3" style="color:var(--j-muted); line-height:1.75;">
            <p class="mb-2"><strong style="color:var(--j-ink);">مكان الفعالية:</strong><br>${ev.location}</p>
            <p class="mb-0">للاستفسار عن نقاط الدخول والمواقف، راجع صفحة <a href="contact.html">اتصل بنا</a>.</p>
          </div>
          <div class="d-grid gap-2">
            <a class="btn-j-primary text-decoration-none text-center" href="#" id="calendarBtn">إضافة للتقويم</a>
            <button class="btn-j-outline" data-bs-toggle="modal" data-bs-target="#bookModal" data-event-id="${ev.id}">حجز مقعد</button>
          </div>
        </div>
      </aside>
    </div>
  `;

  document.getElementById("calendarBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    const dt = ev.date.replace(/-/g, "");
    const ics = ["BEGIN:VCALENDAR","VERSION:2.0","BEGIN:VEVENT",
      `SUMMARY:${ev.title}`,`DTSTART;VALUE=DATE:${dt}`,`DTEND;VALUE=DATE:${dt}`,
      `LOCATION:${ev.location}`,`DESCRIPTION:${ev.excerpt}`,"END:VEVENT","END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url; a.download = `jamiafest-${ev.id}.ics`; a.click();
    URL.revokeObjectURL(url);
  });

  const similar = EVENTS.filter(e => e.category === ev.category && e.id !== ev.id).slice(0, 3);
  const similarEl = document.getElementById("similarGrid");
  if (similarEl) {
    similarEl.innerHTML = similar.length
      ? similar.map(e => `<div class="col-md-6 col-lg-4">${cardHTML(e)}</div>`).join("")
      : `<p class="text-muted">لا توجد فعاليات مشابهة حالياً.</p>`;
  }
}

/* kobrasi955-ui */
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const alertBox = document.getElementById("formAlert");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const msg = form.elements["message"].value.trim();
    const errors = [];
    if (name.length < 3) errors.push("الاسم قصير — على الأقل 3 أحرف.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("صيغة البريد غير صحيحة.");
    if (msg.length < 10) errors.push("الرسالة قصيرة — على الأقل 10 أحرف.");

    if (errors.length) {
      alertBox.className = "alert alert-danger";
      alertBox.innerHTML = errors.map(x => `<div>• ${x}</div>`).join("");
      alertBox.classList.remove("d-none");
    } else {
      alertBox.className = "alert alert-success";
      alertBox.textContent = "شكراً! تم استلام رسالتك وسنرد قريباً.";
      alertBox.classList.remove("d-none");
      form.reset();
    }
  });
}

/* kobrasi955-ui */
function setupBookModal() {
  const modal = document.getElementById("bookModal");
  if (!modal) return;
  const title = modal.querySelector(".modal-title");
  modal.addEventListener("show.bs.modal", (ev) => {
    const btn = ev.relatedTarget;
    const id = btn?.getAttribute("data-event-id");
    const found = EVENTS.find(e => String(e.id) === String(id));
    if (found && title) title.textContent = `حجز: ${found.title}`;
  });
  modal.querySelector("#bookConfirm")?.addEventListener("click", () => {
    showToast("تم تسجيل حجزك في JamiaFest");
    bootstrap.Modal.getInstance(modal)?.hide();
  });
}

/* kobrasi955-ui */
function setupScrollTop() {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;
  window.addEventListener("scroll", () => btn.classList.toggle("show", window.scrollY > 400));
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* kobrasi955-ui */
function updateDarkToggleLabel(toggle) {
  if (!toggle) return;
  const isDark = document.body.classList.contains("dark");
  toggle.textContent = isDark ? "الوضع الفاتح" : "الوضع الداكن";
  toggle.setAttribute("title", isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن");
}

function setupDarkMode() {
  const toggle = document.getElementById("darkToggle");
  const saved = localStorage.getItem(STORE.theme);
  if (saved === "dark") document.body.classList.add("dark");
  updateDarkToggleLabel(toggle);
  toggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(STORE.theme, document.body.classList.contains("dark") ? "dark" : "light");
    updateDarkToggleLabel(toggle);
  });
}

/* kobrasi955-ui */
function showToast(msg) {
  let t = document.getElementById("jToast");
  if (!t) {
    t = document.createElement("div");
    t.id = "jToast";
    t.style.cssText = "position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:#111827;color:#FFF3C4;padding:.7rem 1.1rem;border:3px solid #F59E0B;z-index:1080;opacity:0;transition:opacity .2s;font-weight:800;";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = "1";
  setTimeout(() => t.style.opacity = "0", 2200);
}

/* kobrasi955-ui */
function highlightActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".j-navbar .nav-link").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });
}

/* kobrasi955-ui */
document.addEventListener("DOMContentLoaded", () => {
  highlightActiveNav();
  setupDarkMode();
  setupScrollTop();
  setupBookModal();
  renderHomeLatest();
  setupEventsPage();
  setupEventDetailsPage();
  setupContactForm();
});
