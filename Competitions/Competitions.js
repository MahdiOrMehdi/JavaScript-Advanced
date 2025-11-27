document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const competitionEl = document.getElementById('competition');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const phoneEl = document.getElementById('phone');
  const ageEl = document.getElementById('age');
  const participantsListEl = document.getElementById('participantsList');
  const countEl = document.getElementById('count');
  const searchEl = document.getElementById('search');
  const exportBtn = document.getElementById('exportJson');

  let participants = loadParticipants();

  function loadParticipants(){
    try{
      const raw = localStorage.getItem('participants_v1');
      return raw ? JSON.parse(raw) : [];
    }catch(e){
      return [];
    }
  }

  function saveParticipants(){
    localStorage.setItem('participants_v1', JSON.stringify(participants));
  }

  function getInitials(fullName){
    if(!fullName) return '';
    const first = fullName.trim().split(/\s+/)[0] || fullName.trim();
    // take first two characters of the first name
    return first.slice(0,2).toUpperCase();
  }

  function renderList(filter = ''){
    const q = String(filter || '').trim().toLowerCase();
    participantsListEl.innerHTML = '';

    const filtered = participants.filter(p => p.name.toLowerCase().includes(q));

    if(filtered.length === 0){
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = q ? 'شرکت‌کننده‌ای مطابق جستجو پیدا نشد.' : 'هیچ شرکت‌کننده‌ای ثبت نشده است.';
      participantsListEl.appendChild(li);
    }else{
      for(const p of filtered){
        const li = document.createElement('li');
        li.className = 'participant';

        li.innerHTML = `
          <div class="avatar">${escapeHtml(p.initials)}</div>
          <div class="p-info">
            <div class="p-name">${escapeHtml(p.name)}</div>
            <div class="p-meta">${escapeHtml(p.competition)} · ${escapeHtml(p.email)} · ${escapeHtml(p.phone)}</div>
          </div>
          <div class="p-actions">
            <button class="btn ghost btn-remove" data-id="${p.id}">حذف</button>
          </div>
        `;

        participantsListEl.appendChild(li);
      }
    }

    countEl.textContent = participants.length;
  }

  function escapeHtml(str){
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function showMessage(container, text, type = 'error'){
    const msg = document.createElement('div');
    msg.className = 'form-message ' + (type === 'error' ? 'form-message--error' : 'form-message--success');
    msg.textContent = text;

    // host: prefer designated host at top of form
    const host = container.querySelector('.form-message-container') || container;

    // remove old
    const existing = host.querySelector('.form-message');
    if(existing) existing.remove();
    // insert at top so it appears above the form fields
    if(host.firstChild){ host.insertBefore(msg, host.firstChild); } else { host.appendChild(msg); }
    setTimeout(()=>{ msg.remove(); }, 3500);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const competition = competitionEl.value.trim();
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const phone = phoneEl.value.trim();
    const age = Number(ageEl.value);

    const formCard = document.querySelector('.form-card');

    if(!competition){ showMessage(formCard, 'لطفاً یک مسابقه انتخاب کنید.'); return; }
    if(!name || name.length < 2){ showMessage(formCard, 'لطفاً نام معتبر وارد کنید.'); return; }
    if(!validateEmail(email)){ showMessage(formCard, 'ایمیل نامعتبر است.'); return; }
    if(!validatePhone(phone)){ showMessage(formCard, 'شماره همراه نامعتبر است. مثال: 0912xxxxxxx'); return; }
    if(!Number.isFinite(age) || age < 18){ showMessage(formCard, 'شرط شرکت: حداقل 18 سال.'); return; }

    const participant = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2,6),
      competition,
      name,
      email,
      phone,
      age,
      initials: getInitials(name),
      createdAt: new Date().toISOString()
    };

    participants.unshift(participant);
    saveParticipants();
    renderList(searchEl.value);
    showMessage(formCard, 'شرکت‌کننده با موفقیت ثبت شد.', 'success');
    form.reset();
    competitionEl.focus();
  });

  function validateEmail(email){
    // simple email check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone){
    // simple iran mobile match (starts with 09 and 11 digits)
    return /^09\d{9}$/.test(phone);
  }

  searchEl.addEventListener('input', () => {
    renderList(searchEl.value);
  });

  participantsListEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-remove');
    if(!btn) return;
    const id = btn.getAttribute('data-id');
    participants = participants.filter(p => p.id !== id);
    saveParticipants();
    renderList(searchEl.value);
  });

  exportBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify(participants, null, 2);
    const blob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'participants.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // initial render
  renderList();
});
