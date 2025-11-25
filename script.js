
<!-- ===== script.js ===== -->
// Small, dependency-free JS for RSVP + guestbook (stores in localStorage)
(function(){
  'use strict';

  // Elements
  const openBtn = document.getElementById('openInvite');
  const invite = document.getElementById('inviteCard');
  const closeBtn = document.getElementById('closeInvite');
  const form = document.getElementById('rsvpForm');
  const feedback = document.getElementById('formFeedback');
  const guestList = document.getElementById('guestList');
  const saveDraftBtn = document.getElementById('saveDraft');

  // Utilities
  function qs(selector, el=document){return el.querySelector(selector)}

  function openInvite(){
    invite.setAttribute('aria-hidden','false');
    invite.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeInvite(){
    invite.setAttribute('aria-hidden','true');
    invite.classList.remove('show');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openInvite);
  closeBtn.addEventListener('click', closeInvite);
  invite.addEventListener('click', (e)=>{ if(e.target===invite) closeInvite(); });

  // Load guestbook from storage
  function loadGuests(){
    const raw = localStorage.getItem('guestbook_vintage');
    try{
      return raw ? JSON.parse(raw) : [];
    }catch(e){ return []; }
  }
  function saveGuests(arr){
    localStorage.setItem('guestbook_vintage', JSON.stringify(arr));
  }
  function renderGuests(){
    const guests = loadGuests();
    guestList.innerHTML = '';
    if(!guests.length){ guestList.innerHTML = '<li class="guest-item">Belum ada ucapan. Jadilah yang pertama!</li>'; return; }
    guests.slice().reverse().forEach(g=>{
      const li = document.createElement('li');
      li.className='guest-item';
      li.innerHTML = `<strong>${escapeHtml(g.name)}</strong> — <span>${escapeHtml(g.attend)}</span><small>${escapeHtml(g.message || '')}</small>`;
      guestList.appendChild(li);
    });
  }

  function escapeHtml(str){ if(!str) return ''; return String(str).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

  // Form actions
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const formData = new FormData(form);
    const name = (formData.get('name')||'').trim();
    const email = (formData.get('email')||'').trim();
    const attend = formData.get('attend');
    const message = (formData.get('message')||'').trim();

    if(!name){ feedback.textContent='Masukkan nama terlebih dahulu.'; return; }

    const guests = loadGuests();
    guests.push({name, email, attend, message, at: new Date().toISOString()});
    saveGuests(guests);
    renderGuests();

    feedback.textContent = 'Terima kasih! Konfirmasi Anda telah disimpan.';
    form.reset();

    setTimeout(()=>{ feedback.textContent=''; }, 4500);
  });

  saveDraftBtn.addEventListener('click', function(){
    const name = qs('#name').value.trim();
    const email = qs('#email').value.trim();
    const attend = qs('#attend').value;
    const message = qs('#message').value.trim();
    const draft = {name,email,attend,message};
    localStorage.setItem('rsvp_draft', JSON.stringify(draft));
    feedback.textContent = 'Draft tersimpan.';
    setTimeout(()=>{ feedback.textContent=''; },2000);
  });

  // Load draft on init
  function loadDraft(){
    const raw = localStorage.getItem('rsvp_draft');
    if(!raw) return;
    try{
      const d = JSON.parse(raw);
      if(d.name) qs('#name').value = d.name;
      if(d.email) qs('#email').value = d.email;
      if(d.attend) qs('#attend').value = d.attend;
      if(d.message) qs('#message').value = d.message;
    }catch(e){}
  }

  // keyboard close
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeInvite(); });

  // init
  renderGuests();
  loadDraft();

})();
