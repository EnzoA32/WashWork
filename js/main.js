const $=s=>document.querySelector(s);
const D={"Voitures":[["Car clean",65,["Jantes et prélavage","Lavage adapté à la surface du véhicule","Cire de protection","Séchage main et air chaud sans contact","Dressing des pneus","Aspiration complète de l'habitacle","Plastiques, cuir et vitres","Parfum d'ambiance"],0],["Car care",89,["Aspiration complète","Vitres intérieures et extérieures","Nettoyage vapeur de toutes les surfaces","Vapeur moquettes et sièges","Injection / extraction ou soin du cuir","Shampoing de tous les tapis","Écrans et surfaces multimédia","Parfum d'ambiance"],0],["Car’actère",139,["Traitement anti-goudron","Nettoyage en profondeur des jantes","Lavage à la main et ouvrants (portes, seuils, coffre)","Séchage microfibre et air chaud sans contact","Protection de carrosserie, dressing des pneus","Intérieur Car care complet"],1]],
"Utilitaires & camions":[["Utilitaires",0,["Particuliers et entrepreneurs","Nettoyage adapté à votre véhicule","Uniquement sur devis"],0],["Camions",0,["Particuliers et professionnels","Nettoyage adapté à votre véhicule","Uniquement sur devis"],0],["Flottes",0,["Jusqu'à 10 véhicules","Pour les professionnels","Uniquement sur devis"],1]]};
const O=[["Polissage : correction des défauts de la peinture","Sur devis"],["Traitement céramique (après polissage)","Sur devis"],["Traitement à l'ozone","Sur devis"],["Nettoyage moteur","Sur devis"]];
let cat="Voitures";
function tabs(el,arr,cur,fn){el.innerHTML="";arr.forEach((a,i)=>{const b=document.createElement("button");b.textContent=a;if(a===cur)b.className="on";b.onclick=()=>fn(i,a);el.append(b)})}
function draw(){tabs($("#ct"),Object.keys(D),cat,(i,a)=>{cat=a;draw()});
$("#pcs").innerHTML=D[cat].map(([n,p,f,h])=>`<div class="pc ${h?'hot':''}"><span class="eyebrow" style="margin:0">${n}${h&&p?' · Formule complète':''}</span>${p?`<div class="p">${p} €</div><small style="color:var(--mu)">À partir de</small>`:`<div class="p" style="font-size:2.2rem;line-height:1.3">Sur devis</div>`}<ul>${f.map(x=>`<li>${x}</li>`).join("")}</ul><a class="btn ${h?'solid':''}" href="#/contact" style="text-align:center">${p?'Réserver':'Demander un devis'}</a></div>`).join("")}
draw();$("#opts").innerHTML=O.map(o=>`<tr><td>${o[0]}</td><td>${o[1]}</td></tr>`).join("");
// galerie
const G=[[12,"Lavage des jantes à la mousse active"],[1,"Optiques et carrosserie"],[13,"Polissage de la carrosserie"],[3,"Tableau de bord et finitions cuir"],[10,"Nettoyage des optiques à la microfibre"],[6,"Cuir cognac matelassé"],[14,"Polissage et protection des phares"],[7,"Aérations et détails"],[9,"Nettoyage des pneus et jantes"],[5,"Sellerie cuir noir"],[11,"Soin du volant et du poste de conduite"],[2,"Aspiration des sièges"],[4,"Console centrale"],[8,"Commandes de porte"]];
$("#gal").innerHTML=G.map(([k,c])=>`<figure class="rv"><img data-i="${k}" alt="${c}" loading="lazy"><figcaption>${c}</figcaption></figure>`).join("");
// formulaire
function chips(id,name,arr,type){$(id).innerHTML=arr.map((a,i)=>`<span><input type="${type}" name="${name}" id="${name}${i}" value="${a}" ${type==="radio"&&i===0?"checked":""}><label for="${name}${i}">${a}</label></span>`).join("")}
chips("#c1","s",["Car clean","Car care","Car’actère","Polissage","Traitement céramique","Autre / devis"],"checkbox");chips("#c2","k",["Voiture","Utilitaire","Camion","Flotte (jusqu'à 10 véhicules)"],"radio");chips("#c3","e",["Particulier","Professionnel"],"radio");
$("#f").onsubmit=e=>{e.preventDefault();const d=new FormData(e.target),s=d.getAll("s").join(", ")||"à définir";
const m="Bonjour Car’actère Detailing,\n\nNom : "+d.get("n")+"\nTéléphone : "+d.get("t")+"\nProfil : "+d.get("e")+"\nVéhicule : "+d.get("k")+" "+d.get("v")+"\nDemande : "+s+"\n\n"+d.get("m");
location.href="mailto:caractere.detailing@gmail.com?subject="+encodeURIComponent("Demande de devis")+"&body="+encodeURIComponent(m)};
// avant/apres
const ba=$("#ba"),r=ba.querySelector("input");let touched=0;
r.oninput=()=>{touched=1;ba.style.setProperty("--p",r.value+"%")};
function sweep(){if(touched)return;let t=0;const id=setInterval(()=>{t+=.025;const v=50+45*Math.sin(t*2);r.value=v;ba.style.setProperty("--p",v+"%");if(touched||t>6.3)clearInterval(id)},16)}
const IM={"1": "images/feu-arriere-microfibre.jpg", "2": "images/aspiration-siege.jpg", "3": "images/tableau-de-bord-cuir.jpg", "4": "images/console-centrale.jpg", "5": "images/sellerie-cuir-noir.jpg", "6": "images/cuir-cognac.jpg", "7": "images/pinceau-aerations.jpg", "8": "images/pinceau-commandes-porte.jpg", "9": "images/pneus-jantes-pinceau.jpg", "10": "images/optique-microfibre.jpg", "11": "images/volant-microfibre.jpg", "12": "images/jante-mousse.jpg", "13": "images/polissage-carrosserie.jpg", "14": "images/polissage-phares-masquage.jpg", "15": "images/remise-des-cles.jpg"};
document.querySelectorAll("img[data-i]").forEach(i=>i.src=IM[i.dataset.i]);
// photos
const fi=document.createElement("input");fi.type="file";fi.accept="image/*,video/*";let cur=null;
fi.onchange=()=>{const f=fi.files[0];if(f&&cur)setMedia(cur,f);fi.value=""};
function setMedia(el,f){const u=URL.createObjectURL(f);el.querySelectorAll("video.vid").forEach(v=>v.remove());
if(f.type.startsWith("video")){const v=document.createElement("video");Object.assign(v,{src:u,autoplay:true,muted:true,loop:true,playsInline:true});v.className="vid";el.prepend(v)}else el.style.backgroundImage="linear-gradient(0deg,rgba(0,0,0,.0),rgba(0,0,0,.0)),url("+u+")";
el.style.backgroundSize="cover";el.style.backgroundPosition="center";el.querySelectorAll("svg,.sweep,img").forEach(x=>x.style.display="none");el.style.filter="none"}
document.querySelectorAll("[data-slot]").forEach(el=>{if(getComputedStyle(el).position==="static")el.style.position="relative";const b=document.createElement("button");b.className="add";b.type="button";b.textContent="＋ Photo / vidéo";b.onclick=()=>{cur=el;fi.click()};el.append(b)});
document.querySelectorAll(".pick").forEach(b=>b.onclick=()=>{cur=document.querySelector("#ba "+b.dataset.t);fi.click()});
$("#ed").onclick=()=>document.body.classList.toggle("edit");
// routeur + reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
function route(){const p=(location.hash.replace("#","")||"/");document.querySelectorAll(".page").forEach(x=>x.classList.toggle("on",x.id==="p-"+p));
if(!$(".page.on"))$("[id='p-/']").classList.add("on");
document.querySelectorAll("nav ul a").forEach(a=>a.classList.toggle("on",a.dataset.r===p));
const t={"/":"Detailing auto à Mons & Baudour | Car’actère Detailing","/tarifs":"Formules et tarifs detailing à Mons | Car’actère Detailing","/a-propos":"Detailing à Baudour, région de Mons | Car’actère Detailing","/galerie":"Réalisations detailing automobile | Car’actère Detailing","/contact":"Devis detailing auto à Mons et Borinage | Car’actère Detailing"};document.title=t[p]||t["/"];
scrollTo(0,0);document.querySelectorAll(".page.on .rv:not(.in)").forEach(x=>io.observe(x));if(p==="/")setTimeout(sweep,900)}
addEventListener("hashchange",route);route();
