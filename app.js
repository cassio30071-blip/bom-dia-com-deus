const themes = [
["Confie em Deus","Provérbios 3:5–6"],["Deus renova suas forças","Isaías 40:28–31"],["Não tenha medo","Isaías 41:10"],["O poder da oração","Filipenses 4:6–7"],["Vencendo as batalhas espirituais","Efésios 6:10–18"],["Fé nos dias difíceis","Hebreus 11:1"],["O propósito de Deus","Jeremias 29:11"],["Deus nunca abandona você","Deuteronômio 31:8"],["Aprendendo a perdoar","Efésios 4:32"],["O poder da gratidão","1 Tessalonicenses 5:18"],["Vencendo a ansiedade","Mateus 6:25–34"],["Colocando Deus em primeiro lugar","Mateus 6:33"],["A força da perseverança","Tiago 1:2–4"],["O poder da Palavra","Hebreus 4:12"],["Jesus é o caminho","João 14:6"],["Como vencer as tentações","1 Coríntios 10:13"],["Deus conhece seu coração","Salmos 139"],["A importância da família","Josué 24:15"],["Seja luz neste mundo","Mateus 5:14–16"],["Aprendendo a esperar em Deus","Salmos 27:14"],["A verdadeira paz","João 14:27"],["O poder do Espírito Santo","Atos 1:8"],["Não desista dos seus sonhos","Filipenses 3:13–14"],["A importância da humildade","Filipenses 2:3–5"],["Deus restaura vidas","Joel 2:25–27"],["O amor de Deus","Romanos 8:38–39"],["Seja forte e corajoso","Josué 1:9"],["A armadura de Deus","Efésios 6:11"],["Vivendo pela fé","2 Coríntios 5:7"],["Uma nova vida com Cristo","2 Coríntios 5:17"]
];
const defaultDev = {id:"day-5",day:5,title:themes[4][0],ref:themes[4][1],verse:"“Fortalecei-vos no Senhor e na força do seu poder.”",body:`Uma palavra para hoje\nNem todas as batalhas que enfrentamos são visíveis. Há dias em que o cansaço, o medo, a dúvida e o desânimo tentam enfraquecer nossa fé. A Palavra nos lembra que nossa força não precisa vir apenas de nós mesmos: podemos encontrar força no Senhor.\n\nEm Efésios 6, Paulo ensina sobre a armadura de Deus. Ele nos chama a permanecer firmes, revestidos da verdade, da justiça, da fé e da Palavra. Isso não significa viver com medo, mas caminhar com consciência de que Deus nos sustenta.\n\nPraticando a Palavra\nHoje, antes de reagir a um problema, faça uma pausa e ore. Alimente sua mente com aquilo que é verdadeiro. Escolha agir com amor, integridade e fé. Você não precisa resolver tudo de uma vez; dê o próximo passo com Deus.\n\nPara refletir\nQual situação tem roubado sua paz? Entregue-a a Deus em oração e peça sabedoria para agir com firmeza e serenidade.\n\nOração da manhã\nSenhor meu Deus, obrigado por este novo dia. Reveste meu coração com tua verdade, fortalece minha fé e guia minhas decisões. Ajuda-me a enfrentar as dificuldades sem perder a paz e a confiança em ti. Que minhas palavras e atitudes revelem teu amor. Em nome de Jesus, amém.\n\nDeclare com fé\nMinha força vem do Senhor. Com Deus, permanecerei firme e seguirei em fé.`};
let active = defaultDev, tab = "journey", deferredPrompt = null;
const $ = id => document.getElementById(id);
const escapeHTML = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const getCustom = () => JSON.parse(localStorage.getItem("bdd_custom")||"[]");
const getFavs = () => JSON.parse(localStorage.getItem("bdd_favs")||"[]");
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2300)}
function showDev(dev){
 active=dev;
 $("dayLabel").textContent=dev.day?`DIA ${dev.day} • JORNADA DE 30 DIAS`:"MINHA MENSAGEM";
 $("devTitle").textContent=dev.title;$("devRef").textContent=dev.ref||"";
 $("devVerse").textContent=dev.verse||"Uma mensagem para fortalecer sua fé.";
 const paras=(dev.body||"").split(/\n+/).filter(Boolean);
 $("devBody").innerHTML=paras.map(p=>{let h=["Uma palavra para hoje","Praticando a Palavra","Para refletir","Oração da manhã","Declare com fé"].includes(p);return h?`<h3>${escapeHTML(p)}</h3>`:`<p>${escapeHTML(p)}</p>`}).join("");
 $("favoriteBtn").classList.toggle("saved",getFavs().includes(dev.id));
 $("favoriteBtn").textContent=getFavs().includes(dev.id)?"♥":"♡";
}
function renderLibrary(){
 const list=$("libraryList");let items=[];
 if(tab==="journey") items=themes.map((t,i)=>({id:"theme-"+i,day:i+1,title:t[0],ref:t[1],body:i===4?defaultDev.body:`Estudo bíblico de ${t[1]}. O tema de hoje é: ${t[0]}. Abra sua Bíblia, leia a passagem com calma, ore e registre o que Deus falar ao seu coração. O devocional completo será acrescentado aqui quando você salvar a mensagem recebida.`}));
 if(tab==="saved") items=[...themes.map((t,i)=>({id:"theme-"+i,day:i+1,title:t[0],ref:t[1]})),defaultDev,...getCustom()].filter(x=>getFavs().includes(x.id));
 if(tab==="custom") items=getCustom();
 list.innerHTML=items.length?items.map(x=>`<article class="library-item" data-id="${escapeHTML(x.id)}"><span class="item-day">${x.day?`DIA ${x.day}`:"MINHA MENSAGEM"}</span><h3>${escapeHTML(x.title)}</h3><p>${escapeHTML(x.ref||"Toque para abrir")}</p></article>`).join(""):`<div class="empty-state">${tab==="saved"?"Você ainda não salvou favoritos. Toque no coração de uma mensagem.":"Você ainda não adicionou mensagens. Use o botão “Adicionar mensagem”."}</div>`;
 list.querySelectorAll(".library-item").forEach(el=>el.addEventListener("click",()=>{let id=el.dataset.id;let item=id==="day-5"?defaultDev:getCustom().find(x=>x.id===id)|| (id.startsWith("theme-")?{id,day:Number(id.split("-")[1])+1,title:themes[Number(id.split("-")[1])][0],ref:themes[Number(id.split("-")[1])][1],body:"Leia a passagem bíblica indicada, medite no tema e converse com Deus em oração."}:null);if(item){showDev(item);$("devocional").scrollIntoView({behavior:"smooth"})}}));
}
$("todayDate").textContent=new Intl.DateTimeFormat("pt-BR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(new Date());
$("favoriteBtn").addEventListener("click",()=>{let f=getFavs();f=f.includes(active.id)?f.filter(x=>x!==active.id):[...f,active.id];localStorage.setItem("bdd_favs",JSON.stringify(f));showDev(active);renderLibrary();toast(f.includes(active.id)?"Adicionado aos favoritos":"Removido dos favoritos")});
$("listenBtn").addEventListener("click",()=>{if(!("speechSynthesis"in window)){toast("Seu navegador não oferece leitura em voz alta.");return}speechSynthesis.cancel();let text=[active.title,active.ref,active.verse,active.body].filter(Boolean).join(". ");let u=new SpeechSynthesisUtterance(text);u.lang="pt-BR";u.rate=.92;u.onstart=()=>$("audioStatus").textContent="Reproduzindo…";u.onend=()=>$("audioStatus").textContent="Narração concluída.";speechSynthesis.speak(u)});
$("stopBtn").addEventListener("click",()=>{if("speechSynthesis"in window)speechSynthesis.cancel();$("audioStatus").textContent="Áudio parado."});
$("shareBtn").addEventListener("click",async()=>{let text=`${active.title}\n${active.ref||""}\n${active.body||""}`;try{if(navigator.share)await navigator.share({title:active.title,text});else{await navigator.clipboard.writeText(text);toast("Mensagem copiada para compartilhar")}}catch(e){}});
$("showPrayer").addEventListener("click",()=>{$("miniPrayer").hidden=!$("miniPrayer").hidden});
$("openJourney").addEventListener("click",()=>{document.querySelector('[data-tab="journey"]').click();$("biblioteca").scrollIntoView({behavior:"smooth"})});
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");tab=b.dataset.tab;renderLibrary()}));
$("addBtn").addEventListener("click",()=>{$("addPanel").hidden=false;$("addPanel").scrollIntoView({behavior:"smooth"})});
$("closeAdd").addEventListener("click",()=>$("addPanel").hidden=true);
$("devForm").addEventListener("submit",e=>{e.preventDefault();let arr=getCustom();let d={id:"custom-"+Date.now(),title:$("newTitle").value.trim(),ref:$("newRef").value.trim(),body:$("newBody").value.trim()};arr.unshift(d);localStorage.setItem("bdd_custom",JSON.stringify(arr));showDev(d);$("devForm").reset();$("addPanel").hidden=true;tab="custom";document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x.dataset.tab==="custom"));renderLibrary();toast("Mensagem salva neste aparelho")});
$("themeBtn").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("bdd_dark",document.body.classList.contains("dark")?"1":"0")});
if(localStorage.getItem("bdd_dark")==="1")document.body.classList.add("dark");
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("installBtn").hidden=false});
$("installBtn").addEventListener("click",async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$("installBtn").hidden=true});
if("serviceWorker"in navigator && location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
showDev(defaultDev);renderLibrary();
