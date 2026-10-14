const C='nk-v24';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(['./','index.html','manifest.json','icon.svg','icon-192.png','icon-512.png','icon-maskable.png'].map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!=='nk-icons').map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(u.hostname==='cdn.jsdelivr.net'){e.respondWith(caches.open('nk-icons').then(c=>c.match(e.request).then(m=>m||fetch(e.request).then(r=>{c.put(e.request,r.clone());return r}))));return}
 if(e.request.method==='GET'&&u.origin===location.origin)e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request)))});
