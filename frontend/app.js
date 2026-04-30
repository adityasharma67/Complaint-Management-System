const API = 'http://localhost:5000/api';

function qs(sel){return document.querySelector(sel)}
const sections = {
  login: qs('#login-section'), signup: qs('#signup-section'), submit: qs('#submit-section'), view: qs('#view-section'), admin: qs('#admin-section')
};

function show(name){ Object.values(sections).forEach(s=>s.classList.add('hidden')); sections[name].classList.remove('hidden'); }

qs('#nav-login').onclick = ()=> show('login');
qs('#nav-signup').onclick = ()=> show('signup');
qs('#nav-submit').onclick = ()=> show('submit');
qs('#nav-view').onclick = ()=> { show('view'); loadComplaints(); };
qs('#nav-admin').onclick = ()=> { show('admin'); loadAdmin(); };
qs('#logout').onclick = ()=> { localStorage.removeItem('token'); alert('Logged out'); show('login'); };

qs('#signup-form').onsubmit = async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = { name: fd.get('name'), email: fd.get('email'), password: fd.get('password') };
  const res = await fetch(API+'/auth/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const j = await res.json();
  alert(j.message || 'Signed up');
  if(res.ok) show('login');
};

qs('#login-form').onsubmit = async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = { email: fd.get('email'), password: fd.get('password') };
  const res = await fetch(API+'/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const j = await res.json();
  if(res.ok){ localStorage.setItem('token', j.token); alert('Logged in'); show('submit'); } else { alert(j.message || 'Login failed'); }
};

qs('#submit-form').onsubmit = async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = { title: fd.get('title'), description: fd.get('description') };
  const token = localStorage.getItem('token');
  const res = await fetch(API+'/complaints',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify(body)});
  const j = await res.json();
  if(res.ok){ alert('Submitted'); e.target.reset(); } else alert(j.message || 'Error');
};

async function loadComplaints(){
  const token = localStorage.getItem('token');
  const res = await fetch(API+'/complaints',{headers:{'Authorization':'Bearer '+token}});
  const list = qs('#complaints-list'); list.innerHTML='';
  if(!res.ok){ list.textContent = 'Error loading'; return }
  const data = await res.json();
  if(data.length===0) list.textContent='No complaints yet.';
  data.forEach(c=>{
    const el = document.createElement('div'); el.className='item';
    el.innerHTML = `<div><strong>${c.title}</strong> <span class="status">[${c.status}]</span></div><div>${c.description}</div><div class="meta">${new Date(c.createdAt).toLocaleString()}</div>`;
    list.appendChild(el);
  });
}

async function loadAdmin(){
  const token = localStorage.getItem('token');
  const res = await fetch(API+'/admin/complaints',{headers:{'Authorization':'Bearer '+token}});
  const list = qs('#admin-list'); list.innerHTML='';
  if(!res.ok){ list.textContent = 'Error loading or unauthorized'; return }
  const data = await res.json();
  if(data.length===0) list.textContent='No complaints.';
  data.forEach(c=>{
    const el = document.createElement('div'); el.className='item';
    el.innerHTML = `<div><strong>${c.title}</strong> <span class="status">[${c.status}]</span></div>
      <div>${c.description}</div>
      <div>By: ${c.userId?.name || 'N/A'} (${c.userId?.email || ''})</div>
      <div>
        <select data-id="${c._id}" class="status-select">
          <option>${c.status}</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
        <button data-id="${c._id}" class="update-btn">Update</button>
      </div>`;
    list.appendChild(el);
  });

  document.querySelectorAll('.update-btn').forEach(btn=>{
    btn.onclick = async ()=>{
      const id = btn.dataset.id;
      const sel = document.querySelector(`select[data-id="${id}"]`);
      const status = sel.value;
      const res = await fetch(API+`/complaints/${id}`,{method:'PUT',headers:{'Content-Type':'application/json','Authorization':'Bearer '+localStorage.getItem('token')},body:JSON.stringify({status})});
      if(res.ok){ alert('Updated'); loadAdmin(); } else { alert('Failed'); }
    };
  });
}

show('login');
