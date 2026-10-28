// Scheda di Draeven offline. A ogni aggiornamento cambia VERSION (es. draeven-v4).
const VERSION="draeven-v3";
const FONT_CSS="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800&family=Alegreya+Sans:ital,wght@0,400;0,500;0,700;0,800;1,400&display=swap";
const CORE=["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png","./icons/apple-touch-icon.png","./icons/favicon.png"];
self.addEventListener("install",e=>{e.waitUntil((async()=>{const c=await caches.open(VERSION);await c.addAll(CORE);
  try{const r=await fetch(FONT_CSS);if(r.ok){const css=await r.clone().text();await c.put(FONT_CSS,r);
    const urls=[...css.matchAll(/url\((https:[^)]+)\)/g)].map(m=>m[1]);
    await Promise.all(urls.map(u=>fetch(u).then(x=>{if(x.ok)return c.put(u,x)}).catch(()=>{})))}}catch(err){}
  await self.skipWaiting()})())});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(VERSION).then(x=>x.put("./index.html",c));return res}).catch(()=>caches.match("./index.html",{ignoreSearch:true})));return}
  if(u.origin===location.origin||u.host.endsWith("fonts.googleapis.com")||u.host.endsWith("fonts.gstatic.com")){
    e.respondWith(caches.match(r,{ignoreSearch:u.origin===location.origin}).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==="opaque"){const c=res.clone();caches.open(VERSION).then(x=>x.put(r,c))}return res})))}
});
