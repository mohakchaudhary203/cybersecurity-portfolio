document.addEventListener('DOMContentLoaded', () => {
  /* ---------------- Projects ---------------- */
  const projects = [
    { name: "Crypto_auth", desc: "Authentication system with crypto algorithms (Defensive)", type: "defensive", link: "https://github.com/mohakchaudhary203/Cyber_project/tree/main/Crypto_auth" },
    { name: "File_malware_analysis", desc: "Analyze files for malicious patterns (Defensive)", type: "defensive", link: "https://github.com/mohakchaudhary203/Cyber_project/tree/main/File_malware_analysis" },
    { name: "Log_analyzer", desc: "Log monitoring & suspicious event detection (Defensive)", type: "defensive", link: "https://github.com/mohakchaudhary203/Cyber_project/tree/main/Log_analyzer" },
    { name: "Pass_check", desc: "Password strength & security checker (Defensive)", type: "defensive", link: "https://github.com/mohakchaudhary203/Cyber_project/tree/main/Pass_check" },
    { name: "Phishing_email_detection", desc: "Detect phishing attempts in emails (Defensive)", type: "defensive", link: "https://github.com/mohakchaudhary203/Cyber_project/tree/main/Phishing_email_detection" },
    { name: "Port_scanner_banner_grabbing", desc: "Active scanning & banner grabbing (Offensive)", type: "offensive", link: "https://github.com/mohakchaudhary203/Cyber_project/tree/main/Port_scanner_banner_grabbing" },
    { name: "Stenography_tool", desc: "Hide secret text inside images (Offensive)", type: "offensive", link: "https://github.com/mohakchaudhary203/Cyber_project/tree/main/Stenography_tool" },
    { name: "Text_encrypt_decrypt", desc: "Encrypt & decrypt messages securely (Defensive)", type: "defensive", link: "https://github.com/mohakchaudhary203/Cyber_project/tree/main/Text_encrypt_decrypt" },
    { name: "Wifi_security_assessment", desc: "Wi-Fi vulnerability & security checks (Offensive)", type: "offensive", link: "https://github.com/mohakchaudhary203/Cyber_project/tree/main/Wifi_security_assessment" }
  ];

  const projectListEl = document.getElementById('projectList');
  const searchInput = document.getElementById('searchBar');
  const filterButtons = document.querySelectorAll('.filter-buttons button');

  function renderProjects(list) {
    if (!projectListEl) return;
    projectListEl.innerHTML = '';
    list.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `<h3>${p.name}</h3><p>${p.desc}</p><a href="${p.link}" target="_blank">🔗 View on GitHub</a>`;
      projectListEl.appendChild(card);
    });
  }

  function loadProjects(filter='all') {
    const filtered = projects.filter(p => filter==='all' || p.type===filter);
    renderProjects(filtered);
  }

  loadProjects();

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const q = (e.target.value || '').trim().toLowerCase();
      renderProjects(projects.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)));
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      loadProjects(btn.getAttribute('data-filter') || 'all');
    });
  });

  /* ---------------- Back to Top & Social Bar ---------------- */
  const backToTopBtn = document.getElementById('backToTop');
  const socialBar = document.querySelector('.social-bar');
  let lastScrollY = window.scrollY || 0;
  let rafPending = false;

  function handleScroll() {
    const currentY = window.scrollY || 0;

    if (backToTopBtn) {
      if (currentY > 200) backToTopBtn.classList.add('show');
      else backToTopBtn.classList.remove('show');
    }

    if (currentY > lastScrollY) {
      if (socialBar) socialBar.classList.add('hide');
      if (backToTopBtn) backToTopBtn.classList.add('hide');
    } else {
      if (socialBar) socialBar.classList.remove('hide');
      if (backToTopBtn) backToTopBtn.classList.remove('hide');
      if (currentY <= 200 && backToTopBtn) backToTopBtn.classList.remove('show');
    }

    lastScrollY = Math.max(0, currentY);
    rafPending = false;
  }

  window.addEventListener('scroll', () => {
    if (!rafPending) { rafPending = true; requestAnimationFrame(handleScroll); }
  }, { passive:true });

  if (backToTopBtn) backToTopBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  /* ---------------- Contact Form ---------------- */
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', e=>{
      e.preventDefault();
      const name = contactForm.querySelector('input[name="name"]').value.trim();
      const email = contactForm.querySelector('input[name="email"]').value.trim();
      const message = contactForm.querySelector('textarea[name="message"]').value.trim();
      if(!name||!email||!message){ alert('⚠️ Please fill all fields!'); return; }
      alert(`📩 Thank you, ${name}! I will reply to ${email} soon.`); contactForm.reset();
    });
  }

  /* ---------------- Skills ---------------- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if(skillBars.length){
    const skillObserver = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const el = entry.target;
        if(entry.isIntersecting){
          el.style.width = el.getAttribute('data-skill-level')||'70%';
        }else{ el.style.width='0'; }
      });
    },{threshold:0.5});
    skillBars.forEach(b=>skillObserver.observe(b));
  }

  /* ---------------- Resume Modal ---------------- */
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResume');
  const closeResumeBtn = resumeModal ? resumeModal.querySelector('.close') : null;

  if(openResumeBtn && resumeModal){
    openResumeBtn.addEventListener('click', ()=>{ resumeModal.style.display='block'; });
  }
  if(closeResumeBtn){
    closeResumeBtn.addEventListener('click', ()=>{ resumeModal.style.display='none'; });
  }
  window.addEventListener('click', e=>{ if(e.target===resumeModal) resumeModal.style.display='none'; });

});
