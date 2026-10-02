const $=s=>document.querySelector(s),T=['Citadine','Berline','SUV & Break','Familiale / Monovolume','Camionnette'];
const D={
"Intérieur":[["Essentielle",[50,60,70,80,50],["Aspiration","Dégraissage plastiques","Pédalier & rails","Vitres"]],["Confort+",[110,120,130,160,80],["Tout l'Essentielle","Shampoing sièges","Traitement vapeur"],1],["Ultime",[140,150,160,190,110],["Tout Confort+","Tapis & moquettes","Nettoyage cuirs","Protection plastiques"]]],
"Extérieur":[["Essentielle",[35,40,45,50,50],["Mousse active","Jantes & pneus","Lavage main","Protection 3 mois"]],["Brillance",[150,160,170,200,200],["Décontamination","Dégoudronnant","Cire céramique 4-6 mois","Protection plastiques"],1]],
"Intérieur + Extérieur":[["Duo",[75,90,105,120,90],["Intérieur Essentielle","Extérieur Essentielle"]],["Signature",[150,165,180,200,200],["Intérieur Ultime","Extérieur Brillance","Céramique vitres offerte"],1],["Prestige",[290,310,330,390,310],["Prestations complètes","Protection céramique","Finitions premium"]]]};
const O=[["Shampoing des sièges",60],["Céramique vitres 1 an",80],["Protection hydrophobe vitres",40],["Rénovation des phares + protection",50],["Protection céramique capote",150],["Cire céramique",50],["Céramique carrosserie 1 an",150],["Protection des sièges",100],["Protection céramique des cuirs",100],["Protection plastiques",50]];
let vi=1,cat="Intérieur + Extérieur";
function tabs(el,arr,cur,fn){el.innerHTML="";arr.forEach((a,i)=>{const b=document.createElement("button");b.textContent=a;if(i===cur||a===cur)b.className="on";b.onclick=()=>fn(i,a);el.append(b)})}
function draw(){tabs($("#vt"),T,vi,i=>{vi=i;draw()});tabs($("#ct"),Object.keys(D),cat,(i,a)=>{cat=a;draw()});
$("#pcs").innerHTML=D[cat].map(([n,p,f,h])=>`<div class="pc ${h?'hot':''}"><span class="eyebrow" style="margin:0">${n}${h?' · Populaire':''}</span><div class="p">${p[vi]} €</div><small style="color:var(--mu)">${T[vi]}</small><ul>${f.map(x=>`<li>${x}</li>`).join("")}</ul><a class="btn ${h?'solid':''}" href="#/contact" style="text-align:center">Réserver</a></div>`).join("")}
draw();$("#opts").innerHTML=O.map(o=>`<tr><td>${o[0]}</td><td>${o[1]} €</td></tr>`).join("");
// galerie
const G=[[12,"Lavage des jantes à la mousse active"],[1,"Optiques et carrosserie"],[13,"Polissage de la carrosserie"],[3,"Tableau de bord et finitions cuir"],[10,"Nettoyage des optiques à la microfibre"],[6,"Cuir cognac matelassé"],[14,"Polissage et protection des phares"],[7,"Aérations et détails"],[9,"Nettoyage des pneus et jantes"],[5,"Sellerie cuir noir"],[11,"Soin du volant et du poste de conduite"],[2,"Aspiration des sièges"],[4,"Console centrale"],[8,"Commandes de porte"]];
$("#gal").innerHTML=G.map(([k,c])=>`<figure class="rv"><img data-i="${k}" alt="${c}" loading="lazy"><figcaption>${c}</figcaption></figure>`).join("");
// formulaire
function chips(id,name,arr,type){$(id).innerHTML=arr.map((a,i)=>`<span><input type="${type}" name="${name}" id="${name}${i}" value="${a}" ${type==='radio'&&i===0?'checked':''}><label for="${name}${i}">${a}</label></span>`).join("")}
chips("#c1","s",["Intérieur","Extérieur","Signature","Céramique","Préparation vente / leasing"],"checkbox");chips("#c2","k",T,"radio");chips("#c3","e",["Oui, enlèvement à domicile","Non, je dépose"],"radio");
$("#f").onsubmit=e=>{e.preventDefault();const d=new FormData(e.target),s=d.getAll("s").join(", ")||"à définir";
const m=`Bonjour Wash Work, je suis ${d.get("n")} (${d.get("t")}). Demande : ${s}. Véhicule : ${d.get("k")} ${d.get("v")}. ${d.get("e")}. ${d.get("m")}`;
open("https://api.whatsapp.com/send?phone=32470401038&text="+encodeURIComponent(m),"_blank")};
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
const t={"/":"Detailing auto à Mons & Quaregnon | Wash Work","/tarifs":"Tarifs detailing & nettoyage voiture à Mons | Wash Work","/a-propos":"Atelier de detailing à Quaregnon | Wash Work","/galerie":"Réalisations detailing automobile | Wash Work","/contact":"Devis detailing auto à Mons | Wash Work"};document.title=t[p]||t["/"];
scrollTo(0,0);document.querySelectorAll(".page.on .rv:not(.in)").forEach(x=>io.observe(x));if(p==="/")setTimeout(sweep,900)}
addEventListener("hashchange",route);route();
