const F={
  usgsPredict:{t:"USGS — Can you predict earthquakes?",u:"https://www.usgs.gov/faqs/can-you-predict-earthquakes"},
  usgsAnimals:{t:"USGS — Can animals predict earthquakes?",u:"https://www.usgs.gov/faqs/can-animals-predict-earthquakes"},
  usgsWeather:{t:"USGS — Is there earthquake weather?",u:"https://www.usgs.gov/faqs/there-earthquake-weather"},
  usgsMore:{t:"USGS — Has naturally occurring earthquake activity been increasing?",u:"https://www.usgs.gov/faqs/why-are-we-having-so-many-or-so-few-earthquakes-has-naturally-occurring-earthquake-activity"},
  usgsCause:{t:"USGS — What is an earthquake and what causes them to happen?",u:"https://www.usgs.gov/faqs/what-earthquake-and-what-causes-them-happen"},
  usgsHuman:{t:"USGS — Can we cause earthquakes? Is there any way to prevent earthquakes?",u:"https://www.usgs.gov/faqs/can-we-cause-earthquakes-there-any-way-prevent-earthquakes"},
  usgsMag:{t:"USGS — Earthquake magnitude, energy release, and shaking intensity",u:"https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity"},
  usgsAfter:{t:"USGS — Foreshocks, aftershocks: what's the difference?",u:"https://www.usgs.gov/faqs/foreshocks-aftershocks-whats-difference"},
  usgsTriangle:{t:"USGS — What is the “Triangle of Life” and is it legitimate?",u:"https://www.usgs.gov/faqs/what-triangle-life-and-it-legitimate"},
  nasa:{t:"NASA JPL — Can climate affect earthquakes, or are the connections shaky? (2019)",u:"https://science.nasa.gov/earth/climate-change/can-climate-affect-earthquakes-or-are-the-connections-shaky/"},
  caltech:{t:"Caltech — Is there any such thing as earthquake weather? (1998)",u:"https://www.caltech.edu/about/news/caltech-question-month-there-any-such-thing-earthquake-weather-288"},
  shakeout:{t:"Great ShakeOut — Drop, Cover, and Hold On",u:"https://shakeout.org/dropcoverholdon"},
  sgcFaq:{t:"SGC — Sismo de magnitud 7,4: preguntas frecuentes (14 ago. 2026)",u:"https://www2.sgc.gov.co/Noticias/Paginas/Sismo-de-magnitud-7-4-el-SGC-resolvio-las-preguntas-mas-frecuentes-para-entender-el-evento.aspx"},
  sgc2026:{t:"SGC — Actualización sobre el sismo de San José del Palmar, Chocó (10 ago. 2026)",u:"https://www2.sgc.gov.co/Noticias/Paginas/SGC-actualiza-la-informacion-sobre-el-sismo-ocurrido-en-San-Jose-del-Palmar-Choco.aspx"},
  sgcPop:{t:"SGC — Aniversario 40 del terremoto de Popayán",u:"https://www2.sgc.gov.co/Noticias/Paginas/Aniversario-No-40-del-terremoto-de-Popayan-un-momento-para-pensar-en-la-importancia-de-construir-bien-en-Colombia.aspx"},
  sgcArm:{t:"SGC — Infografía: sismo del 25 de enero de 1999 en el Eje Cafetero",u:"https://srvags.sgc.gov.co/PortalWeb/Infografias-sismos-historicos/15-Infografia-sismo-1999-01-25-Eje-Cafetero.pdf"},
  sgcTsu:{t:"SGC — Efectos del tsunami en la Costa Pacífica en 1979",u:"https://www2.sgc.gov.co/Noticias/Paginas/Fotos-ineditas-de-los-efectos-del-tsunami-en-la-Costa-Pacifica-en-1979.aspx"},
  nsr:{t:"NSR-10, Título A, numeral A.1.2.2 (Decreto 926 de 2010), copia de la Sociedad Colombiana de Geotecnia",u:"https://www.scg.org.co/Titulo-A-NSR-10-Decreto%20Final-2010-01-13.pdf"},
  heraldo:{t:"El Heraldo / EFE — Balance UNGRD del 15 de septiembre de 2026",u:"https://www.elheraldo.co/colombia/2026/09/15/sube-a-335-la-cifra-de-personas-muertas-por-el-terremoto-del-pasado-10-de-agoso/"},
  caracolLluvia:{t:"Caracol Radio — Lluvias agravan daños del terremoto en Roldanillo (17 ago. 2026)",u:"https://caracol.com.co/2026/08/17/lluvias-agravan-danos-del-terremoto-y-ponen-en-riesgo-viviendas-en-roldanillo-valle/"}
};

const CARDS=[
 {id:1,a:"Los terremotos tienen que ver con el cambio climático.",v:"medias",
  s:"Los grandes terremotos vienen del movimiento de las placas, no del clima. La NASA explica que lluvias, sequías o deshielos pueden cambiar un poco la tensión sobre las fallas e influir en sismos muy pequeños, pero no hay base para decir que el clima desate uno grande.",
  l:"En el Himalaya, por ejemplo, los microsismos aumentan en la temporada seca y bajan con los monzones, y en California se ha estudiado cómo el bombeo de agua subterránea cambia la tensión en la falla de San Andrés. Son efectos pequeños. El geofísico Paul Lundgren, de la NASA, resume que hoy no se puede afirmar que los procesos climáticos disparen un sismo grande.",
  src:["nasa","usgsCause"]},
 {id:2,a:"Los terremotos ocurren porque estamos destruyendo la Tierra.",v:"medias",
  s:"La gran mayoría son naturales: las placas se traban por fricción y liberan de golpe la energía acumulada. Pero algunas actividades humanas sí pueden provocar sismos, casi siempre pequeños: llenar embalses, la minería, extraer o inyectar fluidos en el subsuelo.",
  l:"El USGS aclara que también ha habido sismos provocados por humanos que fueron grandes y dañinos, y que en Colorado, Ohio y Arkansas los sismos ligados a la inyección de aguas residuales se detuvieron cuando se suspendió la inyección. El terremoto del 10 de agosto de 2026 no entra en esa categoría: el SGC lo explicó como un sismo de subducción, de la placa de Nazca bajo la Sudamericana.",
  src:["usgsHuman","usgsCause","sgc2026"]},
 {id:3,a:"Cuando hay un terremoto, cambia el clima.",v:"mito",
  s:"No se conoce un mecanismo por el que un sismo cambie el tiempo atmosférico, y el USGS no encuentra relación entre sismos y clima. Lo que sí ocurre es lo contrario: la lluvia de los días siguientes puede agravar los daños.",
  l:"La sismóloga Kate Hutton, de Caltech, explica que el clima influye en cuánto daño deja un terremoto, por ejemplo cuando la lluvia provoca deslizamientos en laderas ya debilitadas. Eso pasó en Roldanillo: una semana después del sismo, las lluvias pusieron en riesgo viviendas con techos y muros afectados.",
  src:["usgsWeather","caltech","caracolLluvia"]},
 {id:4,a:"Existe un “clima de terremoto”: calor, bochorno o un cielo raro que lo anuncian.",v:"mito",
  s:"El USGS es claro: no existe. Los sismos ocurren casi por igual con frío, calor o lluvia, y se originan a kilómetros de profundidad, donde lo que pasa en la atmósfera no llega.",
  l:"Cada región tiene su propia versión del “clima de terremoto”: en California se asocia al calor seco y en Alaska, que tiene más sismos, al frío y la nieve. El USGS menciona que las grandes tormentas pueden disparar deslizamientos lentos en fallas, pero dice que la cifra es pequeña y no es estadísticamente significativa. En Roldanillo hubo quien notó calor y una nube extraña esa mañana: la percepción es real, pero no hay una relación que sirva como aviso.",
  src:["usgsWeather","caltech"]},
 {id:5,a:"Los animales sienten los terremotos antes y se pueden usar para predecirlos.",v:"mito",
  s:"Hay relatos de animales inquietos desde la Grecia antigua, pero ningún comportamiento animal ha resultado ser una señal confiable. Muchos terremotos llegan sin ningún aviso.",
  l:"El USGS cuenta que en China, hace décadas, una alerta basada en pequeños sismos y conducta animal hizo que mucha gente durmiera afuera y se salvara. El siguiente gran sismo en ese país llegó sin señales previas y murieron miles de personas. Que un perro se asuste durante o después de un sismo, como le pasó a muchas mascotas en Roldanillo, es otra cosa: es reacción, no predicción.",
  src:["usgsAnimals","usgsPredict"]},
 {id:6,a:"Los científicos pueden predecir cuándo va a ocurrir un terremoto.",v:"mito",
  s:"Ni el USGS ni ningún otro grupo científico ha predicho un gran terremoto. Una predicción tendría que dar fecha y hora, lugar y magnitud; lo que sí se puede es estimar la probabilidad de un sismo en una zona durante un número de años.",
  l:"El SGC lo repitió tras el sismo de 2026: la ciencia no tiene un método para predecir sismos. Su Modelo Nacional de Amenaza Sísmica es probabilístico, no predictivo, y la entidad pide no compartir supuestas predicciones de fecha, hora o magnitud que circulan en redes.",
  src:["usgsPredict","sgcFaq"]},
 {id:7,a:"Los sismos pequeños evitan que haya uno grande.",v:"mito",
  s:"No alcanzan. Cada punto de magnitud equivale a unas 32 veces más energía, así que haría falta cerca de un millar de sismos de magnitud 5 para igualar la energía de uno de 7.",
  l:"El USGS explica que muchos sismos pequeños liberan muchísima menos energía que un solo gran terremoto. Por eso un enjambre de temblores menores no “descarga” una falla. Tampoco es una señal segura de lo contrario: un sismo solo se reconoce como premonitor cuando ya llegó uno mayor.",
  src:["usgsMag","usgsAfter"]},
 {id:8,a:"Los terremotos son más frecuentes hoy que antes.",v:"mito",
  s:"No. Se registran más porque hay muchos más sismógrafos y las noticias corren más rápido. Desde 1900, el promedio mundial es de unos 16 sismos de magnitud 7 o más por año.",
  l:"Los años varían mucho alrededor de ese promedio: según el USGS, 2010 tuvo 23 sismos de magnitud 7 o más y 1989 solo 6. Esas subidas y bajadas son parte de la fluctuación normal y no anuncian un gran terremoto. Hoy el centro de información sísmica del USGS localiza unos 20.000 sismos al año, unos 55 por día.",
  src:["usgsMore"]},
 {id:9,a:"En Colombia no pasa nada grave porque casi no tiembla.",v:"mito",
  s:"Colombia está en el Cinturón de Fuego del Pacífico y tiene actividad sísmica y volcánica significativa, según el SGC. Solo el nido sísmico de Bucaramanga concentra entre el 40 % y el 50 % de los sismos del país.",
  l:"La historia reciente lo muestra: el sismo y tsunami de Tumaco de 1979 dejó 454 muertos, el de Armenia en 1999 dejó 1.185 víctimas mortales, y el del 10 de agosto de 2026 ya suma 335 muertos según el balance de la UNGRD del 15 de septiembre.",
  src:["sgcFaq","sgcTsu","sgcArm","heraldo"]},
 {id:10,a:"Debajo de un marco de puerta es el lugar más seguro durante un temblor.",v:"mito",
  s:"Es una idea vieja que viene de fotos de casas de adobe donde solo quedó en pie el marco. En casas y edificios actuales la puerta no es más segura y no protege de lo que cae o sale volando.",
  l:"La recomendación es agacharse, cubrirse bajo una mesa firme y sujetarse. El USGS también desaconseja el llamado “triángulo de la vida”, una cadena que circula hace años y que los expertos desacreditaron.",
  src:["shakeout","usgsTriangle"]},
 {id:11,a:"Los edificios modernos no se caen en un terremoto fuerte.",v:"medias",
  s:"La norma colombiana NSR-10 busca que un edificio bien diseñado resista un sismo fuerte sin colapsar, pero acepta que sufra daños en su estructura, y a veces repararlos no es económicamente viable. Y protege solo lo que se construyó cumpliéndola.",
  l:"El reglamento fija tres escenarios: un temblor leve sin daño, uno moderado sin daño estructural y uno fuerte con daños, pero sin colapso. Su primer objetivo es reducir al mínimo la pérdida de vidas. La primera norma obligatoria llegó en 1984, después del terremoto de Popayán, y se actualizó en 1998 y en 2010. Muchas casas anteriores no la siguieron: en la Calle de los Poetas de Roldanillo, según contó un comerciante a este reportaje, las paredes eran de tapia pisada.",
  src:["nsr","sgcPop"]},
 {id:12,a:"Un número más en la escala de magnitud significa solo “un poco más fuerte”.",v:"mito",
  s:"La escala es logarítmica: cada punto entero multiplica por 10 la amplitud de las ondas y por unas 32 la energía liberada. Un sismo de 7,4 libera unas 1.000 veces más energía que uno de 5,4.",
  l:"Por eso el salto de 6 a 7 no es pequeño. Aun así, más magnitud no siempre significa más daño: también pesan la profundidad, la distancia a las ciudades y cómo se construyó. El sismo de Popayán de 1983 tuvo magnitud 5,6 y dejó 250 muertos porque fue superficial y la ciudad estaba muy cerca.",
  src:["usgsMag","sgcPop"]},
 {id:13,a:"Un terremoto es más fuerte que un temblor, y un temblor más que un sismo.",v:"mito",
  s:"Para el SGC son el mismo fenómeno. La diferencia entre las tres palabras es de uso cotidiano, no científica, y ninguna indica la magnitud ni los efectos.",
  l:"Lo que sí distingue a un sismo de otro son medidas concretas: la magnitud (la energía liberada en la fuente), la intensidad (lo que se sintió y los daños en cada lugar) y la profundidad del foco.",
  src:["sgcFaq"]},
 {id:14,a:"El terremoto del 10 de agosto de 2026 lo causó el volcán Puracé.",v:"mito",
  s:"El SGC lo descartó: el sismo no tiene relación con la actividad actual del Puracé. Fue un sismo de subducción, a unos 100 km de profundidad, donde la placa de Nazca se hunde bajo la Sudamericana.",
  l:"El SGC ubicó el epicentro en San José del Palmar (Chocó), con magnitud 7,4 y 103 km de profundidad. Ese tipo de sismos profundos se sienten en áreas muy amplias: más de 20.000 personas de más de 1.200 centros poblados lo reportaron como sentido.",
  src:["sgcFaq","sgc2026"]},
 {id:15,a:"Cuando pasa el sismo principal, ya pasó el peligro.",v:"mito",
  s:"Después vienen réplicas que, según el SGC, pueden durar días, semanas o meses. Solo en las primeras horas del 10 de agosto el SGC registró 18 réplicas, la mayor de 4,8.",
  l:"Las réplicas son reacomodos de la falla que se rompió y su frecuencia baja con el tiempo, pero no se pueden predecir. El USGS añade que un sismo solo se reconoce como premonitor cuando ocurre otro mayor en la misma zona, así que nadie puede asegurar después del primero que ya pasó lo peor.",
  src:["sgcFaq","sgc2026","usgsAfter"]}
];
const LABEL={mito:"Mito",realidad:"Realidad",medias:"A medias"};
const LEVELS=[
 [0,5,"Conocimiento inicial","Varias creencias comunes siguen en pie. Vale la pena repasar las explicaciones de abajo, sobre todo las de predicción y seguridad."],
 [6,9,"Conocimiento básico","Distingues algunos mitos, pero otros todavía confunden. Revisa los veredictos que fallaste."],
 [10,12,"Bien informado","Reconoces la mayoría de los mitos. Los matices de las respuestas “a medias” son los que más cuestan."],
 [13,15,"Muy bien informado","Separas con claridad la evidencia de las creencias. Compartir estas explicaciones ayuda a frenar la desinformación después de un sismo."]
];

const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
let order,idx,answers,hits,streak,answered,errors=0,maxSeen=0;
const choices=[...document.querySelectorAll(".choice")];

/* ======== Escena: bloque de terreno en 3D + sismógrafo ======== */
const cv=$("#scene"), g=cv.getContext("2d");
let W=0,H=0,DPR=1,colors={},cracks=[],rocks=[],dust=[],shakeT=0,shakeAmp=0,trace=[],tick=0,tint=0,glow=0;
let B={};
function readColors(){const cs=getComputedStyle(document.documentElement);["--sky","--s1","--s2","--s3","--s4","--s5","--crack","--trace","--rojo","--musgo","--ink-3","--line","--land","--water","--side","--accent"].forEach(k=>colors[k]=cs.getPropertyValue(k).trim());}
function geom(){
  const narrow=W<700;
  B.x0=W*(narrow?-.05:.05); B.x1=W*(narrow?.82:.80); B.top=H*(narrow?.8:.74);
  B.dx=Math.max(60,W*(narrow?.2:.14)); B.dy=-Math.max(40,H*.09);
  B.fault=B.x0+(B.x1-B.x0)*.58;
}
function resize(){DPR=Math.min(2,devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;g.setTransform(DPR,0,0,DPR,0,0);readColors();geom();
  trace=new Array(Math.ceil(W/2)).fill(0); if(!dust.length) for(let i=0;i<40;i++) dust.push({x:Math.random(),y:Math.random(),v:.02+Math.random()*.05,r:.6+Math.random()*1.4});
  if(reduced) draw();}
function addCrack(){
  const x0=B.x0+(B.x1-B.x0)*(.08+Math.random()*.84), pts=[[x0,B.top]]; let x=x0,y=B.top; const depth=H*(.1+Math.random()*.12);
  while(y<B.top+depth){x+=(Math.random()-.5)*26;y+=8+Math.random()*14;pts.push([x,y]);}
  const tp=[[x0,B.top]]; let tx=x0,tt=0; while(tt<1){tt+=.12+Math.random()*.1; tp.push([x0+B.dx*Math.min(tt,1)+(Math.random()-.5)*14, B.top+B.dy*Math.min(tt,1)]);}
  cracks.push({pts,tp,grow:reduced?1:0,w:2+Math.random()*1.5});
}
function addRocks(n){for(let i=0;i<n;i++){const t=Math.random(), fx=B.x0+(B.x1-B.x0)*Math.random();
  rocks.push({x:fx+B.dx*t,y:reduced?0:-20-Math.random()*H*.4,ly:B.top+B.dy*t,vy:0,vx:(Math.random()-.5)*.5,r:3+Math.random()*7,rot:Math.random()*6,vr:(Math.random()-.5)*.2,landed:reduced,shade:Math.random()<.5?"--s1":"--s3",sides:5+Math.floor(Math.random()*3)});
  if(reduced){const r=rocks[rocks.length-1]; r.y=r.ly-r.r*.5;}}
  if(rocks.length>90) rocks.splice(0,rocks.length-90);}
function quake(strength){shakeT=reduced?0:1;shakeAmp=strength;tint=strength?1:0;}
function poly(pts,fill){g.fillStyle=fill;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fill();}
function draw(){
  tick++;
  const sx= shakeT>0 ? (Math.random()-.5)*14*shakeAmp*shakeT : 0, sy= shakeT>0 ? (Math.random()-.5)*8*shakeAmp*shakeT : 0;
  g.clearRect(0,0,W,H); g.fillStyle=colors["--sky"]; g.fillRect(0,0,W,H);
  // curvas de nivel
  g.strokeStyle=colors["--line"]; g.lineWidth=1; g.globalAlpha=.6;
  for(let r=0;r<12;r++){g.beginPath(); for(let a=0;a<=60;a++){const th=a/60*Math.PI*2, rr=50+r*44+Math.sin(th*3+r)*14+Math.cos(th*5-r)*8; const x=W*.92+Math.cos(th)*rr*1.3, y=H*.2+Math.sin(th)*rr; a?g.lineTo(x,y):g.moveTo(x,y);} g.stroke();}
  g.globalAlpha=1;
  // polvo
  g.fillStyle=colors["--ink-3"]; g.globalAlpha=.16+tint*.25;
  dust.forEach(d=>{ if(!reduced){d.y-= d.v*.004*(1+shakeT*6); d.x+=Math.sin((tick+d.y*800)/120)*.0004; if(d.y<0)d.y=1;} g.beginPath();g.arc(d.x*W,d.y*H*.7,d.r,0,7);g.fill();});
  g.globalAlpha=1;
  // sismógrafo
  const amp = 2 + shakeT*shakeAmp*H*.07 + Math.min(errors,8)*0.6;
  if(!reduced){trace.shift(); trace.push((Math.random()-.5)*2*amp*(0.6+0.4*Math.sin(tick/7)));}
  const ty=H*.15;
  g.strokeStyle=colors["--ink-3"]; g.globalAlpha=.3; g.lineWidth=1;
  for(let x=0;x<W;x+=60){g.beginPath();g.moveTo(x+.5,ty-H*.06);g.lineTo(x+.5,ty+H*.06);g.stroke();}
  g.globalAlpha=.6; g.strokeStyle= shakeT>0.05?colors["--rojo"]:colors["--trace"]; g.lineWidth=1.4; g.beginPath();
  trace.forEach((v,i)=>{const x=i*2,y=ty+v; i?g.lineTo(x,y):g.moveTo(x,y);}); g.stroke(); g.globalAlpha=1;
  // bloque
  g.save(); g.translate(sx,sy);
  const {x0,x1,top,dx,dy}=B, bot=H+40, L=["--s1","--s2","--s3","--s4","--s5"], cut=[0,.05,.11,.19,.29];
  // cara superior
  poly([[x0,top],[x1,top],[x1+dx,top+dy],[x0+dx,top+dy]],colors["--land"]);
  poly([[x0,top],[x0+(x1-x0)*.22,top],[x0+(x1-x0)*.22+dx,top+dy],[x0+dx,top+dy]],colors["--water"]);
  // cara frontal por capas
  for(let i=0;i<5;i++){
    const o= shakeT>0 ? Math.sin(tick/2+i)*shakeAmp*shakeT*3 : 0;
    g.fillStyle=colors[L[i]]; g.beginPath(); g.moveTo(x0,bot);
    for(let x=x0;x<=x1;x+=14){const yy=top+cut[i]*H+(i?Math.sin((x-x0)/(x1-x0)*Math.PI*2*(1.1+i*.25)+i)*H*.007*i:0)+o; g.lineTo(x,yy);}
    g.lineTo(x1,bot); g.closePath(); g.fill();
  }
  // cara lateral
  for(let i=0;i<5;i++){const y0=top+cut[i]*H; poly([[x1,y0],[x1+dx,y0+dy],[x1+dx,bot+dy],[x1,bot]],colors[L[i]]);}
  g.globalAlpha=.45; poly([[x1,top],[x1+dx,top+dy],[x1+dx,bot+dy],[x1,bot]],colors["--side"]); g.globalAlpha=1;
  // falla con brillo
  const f=B.fault, fg=Math.min(1,errors/5);
  g.strokeStyle=colors["--crack"]; g.lineWidth=2; g.beginPath(); g.moveTo(f,top); g.lineTo(f-10,top+H*.1); g.lineTo(f+6,bot); g.stroke();
  g.beginPath(); g.moveTo(f,top); g.lineTo(f+dx,top+dy); g.stroke();
  if(errors>0){g.strokeStyle=colors["--rojo"]; g.globalAlpha=.35+fg*.5; g.lineWidth=2+fg*2; g.shadowColor=colors["--rojo"]; g.shadowBlur=8+fg*14;
    g.beginPath(); g.moveTo(f,top); g.lineTo(f+dx,top+dy); g.stroke(); g.beginPath(); g.moveTo(f,top); g.lineTo(f-10,top+H*.1); g.lineTo(f+6,bot); g.stroke(); g.shadowBlur=0; g.globalAlpha=1;}
  // grietas
  g.strokeStyle=colors["--crack"]; g.lineCap="round"; g.lineJoin="round";
  cracks.forEach(c=>{ if(c.grow<1) c.grow=Math.min(1,c.grow+.03);
    const n=Math.max(2,Math.ceil(c.pts.length*c.grow)); g.lineWidth=c.w; g.beginPath(); for(let i=0;i<n;i++){const p=c.pts[i]; i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]);} g.stroke();
    const m=Math.max(2,Math.ceil(c.tp.length*c.grow)); g.lineWidth=c.w*.7; g.beginPath(); for(let i=0;i<m;i++){const p=c.tp[i]; i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]);} g.stroke();
  });
  // foco y ondas sobre la cara superior
  if(errors>0 || shakeT>0){const ex=f+dx*.45, ey=top+dy*.45; g.strokeStyle=colors["--rojo"]; g.lineWidth=1.6;
    for(let k=0;k<3;k++){const p=reduced?.35+k*.25:((tick/90+k/3)%1); g.globalAlpha=(1-p)*.9; g.beginPath(); g.ellipse(ex,ey,10+p*90,(10+p*90)*.42,0,0,7); g.stroke();}
    g.globalAlpha=1; g.fillStyle=colors["--rojo"]; g.beginPath(); g.ellipse(ex,ey,6,3,0,0,7); g.fill();}
  g.restore();
  // rocas
  rocks.forEach(r=>{
    if(!r.landed){r.vy+=.35;r.y+=r.vy;r.x+=r.vx;r.rot+=r.vr; if(r.y>=r.ly-r.r*.5){r.y=r.ly-r.r*.5;r.landed=true;}}
    g.save(); g.translate(r.x+(r.landed?sx:0),r.y+(r.landed?sy:0)); g.rotate(r.rot); g.fillStyle=colors[r.shade]; g.strokeStyle=colors["--crack"]; g.lineWidth=1;
    g.beginPath(); for(let k=0;k<r.sides;k++){const a=k/r.sides*Math.PI*2, rr=r.r*(.75+((k*37)%10)/40); k?g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):g.moveTo(Math.cos(a)*rr,Math.sin(a)*rr);} g.closePath(); g.fill(); g.stroke(); g.restore();
  });
  if(tint>0){g.fillStyle=colors["--rojo"]; g.globalAlpha=tint*.10; g.fillRect(0,0,W,H); g.globalAlpha=1; if(!reduced) tint=Math.max(0,tint-.012);}
  if(shakeT>0) shakeT=Math.max(0,shakeT-.012);
  const app=$("#s-play"); if(app) app.style.transform = shakeT>0 ? `translate(${(sx*.5).toFixed(1)}px,${(sy*.5).toFixed(1)}px)` : "";
}
function loop(){ if(!document.hidden) draw(); requestAnimationFrame(loop); }
addEventListener("resize",resize);
matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{readColors(); if(reduced) draw();});
new MutationObserver(()=>{readColors(); if(reduced) draw();}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
resize(); if(reduced){draw();} else loop();

function groundWrong(){ errors++; addCrack(); if(errors%2===0) addCrack(); addRocks(6+Math.min(errors,6)); quake(1); if(reduced) draw();
  $("#ground-msg").textContent = errors===1 ? "Respuesta incorrecta: la falla se activa y el terreno se agrieta." : `Respuesta incorrecta: la falla acumula ${errors} rupturas.`; }
function groundRight(){ quake(0); tint=0; if(cracks.length>0 && Math.random()<.5) cracks.shift(); if(reduced) draw();
  $("#ground-msg").textContent = "Respuesta correcta: el terreno se aquieta."; }
function groundReset(){ errors=0; cracks=[]; rocks=[]; shakeT=0; tint=0; if(reduced) draw(); }

/* ======== Pantallas ======== */
function screen(name){
  ["menu","rules","play","final"].forEach(n=>$("#s-"+n).hidden = n!==name);
  $("#topbar").hidden = name==="menu"||name==="rules";
}
function openPanel(id){ $(id).hidden=false; $(id).querySelector("[data-close]").focus(); }
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>{b.closest(".panel").hidden=true;const t=$("#s-play").hidden?$("#m-start"):$("#t-src");t.focus();}));
$("#m-start").addEventListener("click",()=>{screen("rules");$("#r-go").focus();});
$("#r-go").addEventListener("click",()=>start(false));
$("#t-src").addEventListener("click",()=>openPanel("#p-src"));
$("#to-menu").addEventListener("click",()=>{screen("menu");$("#m-start").focus();});

function start(shuffle){
  order=CARDS.map((_,i)=>i);
  if(shuffle){for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}}
  idx=0; maxSeen=0; answers={}; hits=0; streak=0; answered=false; groundReset();
  $("#ground-msg").textContent="Elige una respuesta con el ratón, con las flechas y Enter o con las teclas 1, 2 y 3.";
  screen("play"); show(); choices[0].focus({preventScroll:true});
}
function show(){
  const c=CARDS[order[idx]]; const prevAns=answers[c.id];
  $("#f-n").textContent=`Afirmación ${idx+1} de 15`; $("#f-claim").textContent=c.a; $("#b-more").open=false;
  $("#prev").hidden=idx===0; $("#prev2").hidden=idx===0;
  if(prevAns){ answered=true; renderBack(c,prevAns,false); }
  else{
    answered=false;
    $("#card").classList.remove("flipped"); $("#front").setAttribute("aria-hidden","false"); $("#back").setAttribute("aria-hidden","true");
    choices.forEach(b=>{b.disabled=false;b.classList.remove("picked");});
  }
  $("#s-play").scrollTop=0; renderScore();
}
function prev(){ if(idx>0){ idx--; show(); (answered?$("#next"):choices[0]).focus({preventScroll:true}); } }
function goTo(i){ if(i<0||i>maxSeen||i===idx) return; idx=i; show(); (answered?$("#next"):choices[0]).focus({preventScroll:true}); }
function renderBack(c,v,fresh){
  const ok=v===c.v;
  choices.forEach(b=>{b.disabled=true;b.classList.toggle("picked",b.dataset.v===v);});
  $("#b-tag").textContent=LABEL[c.v]; $("#b-tag").className="tag "+c.v;
  $("#b-res").textContent= ok?"Respuesta correcta":`Respuesta incorrecta: elegiste “${LABEL[v].toLowerCase()}”`;
  $("#b-res").className="result "+(ok?"ok":"bad");
  $("#b-short").textContent=c.s;
  $("#b-src").innerHTML=`Fuente: <a href="${F[c.src[0]].u}" target="_blank" rel="noopener">${esc(F[c.src[0]].t)}</a>`;
  $("#b-long").textContent=c.l;
  $("#b-links").innerHTML=c.src.map(k=>`<li><a href="${F[k].u}" target="_blank" rel="noopener">${esc(F[k].t)}</a></li>`).join("");
  const allDone=Object.keys(answers).length===15;
  $("#next").textContent= idx===14?(allDone?"Ver el resultado":"Ver el resultado"):"Siguiente afirmación";
  $("#card").classList.add("flipped"); $("#front").setAttribute("aria-hidden","true"); $("#back").setAttribute("aria-hidden","false");
  if(fresh) $("#live").textContent=`${ok?"Respuesta correcta":"Respuesta incorrecta"}. Veredicto: ${LABEL[c.v]}. ${c.s}`;
  else $("#live").textContent=`Afirmación ${idx+1}, ya respondida. Veredicto: ${LABEL[c.v]}.`;
}
function answer(v){
  if(answered) return; answered=true;
  const c=CARDS[order[idx]], ok=v===c.v; answers[c.id]=v;
  if(ok){hits++;streak++;groundRight();}else{streak=0;groundWrong();}
  renderBack(c,v,true);
  renderScore();
  setTimeout(()=>$("#next").focus({preventScroll:true}), reduced?0:450);
}
function next(){ if(!answered) return; if(idx<14){idx++;maxSeen=Math.max(maxSeen,idx);show();(answered?$("#next"):choices[0]).focus({preventScroll:true});} else finish(); }
function renderScore(){
  $("#hits").textContent=hits; $("#streak").textContent=streak;
  $("#track").innerHTML=order.map((ci,i)=>{const c=CARDS[ci];let cl="";if(answers[c.id]) cl=answers[c.id]===c.v?"ok":"bad"; else if(i===idx&&!$("#s-play").hidden) cl="cur";if(i<=maxSeen&&i!==idx) cl+=" seen";return `<span class="${cl}" data-i="${i}" title="Afirmación ${i+1}"></span>`;}).join("");
  $("#ptxt").textContent=`Afirmación ${idx+1} de 15, ${Object.keys(answers).length} respondidas`;
}
function finish(){
  const lvl=LEVELS.find(l=>hits>=l[0]&&hits<=l[1]);
  screen("final");
  $("#s-final").innerHTML=`<div class="final">
    <h2 tabindex="-1" id="final-h">${hits} de 15 respuestas correctas</h2>
    <p class="lvl"><b>${esc(lvl[2])}.</b> ${esc(lvl[3])}</p>
    <div class="scale">${LEVELS.map(l=>`<div class="${l===lvl?"on":""}">${l[0]} a ${l[1]} correctas<br>${esc(l[2])}</div>`).join("")}</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin:0 0 18px"><button class="btn" type="button" id="again">Empezar de nuevo</button><button class="btn ghost" type="button" id="again-sh">Orden aleatorio</button><button class="btn ghost" type="button" id="f-src">Ver fuentes</button></div>
    <h3 style="font-size:1.6rem;margin-bottom:6px">Las 15 afirmaciones y su veredicto</h3>
    <ol class="review">${CARDS.map(c=>{const u=answers[c.id];return `<li><div><span class="v ${c.v}">${LABEL[c.v]}</span><br><span class="tu">${u?(u===c.v?"Respondiste bien":"Respondiste “"+LABEL[u].toLowerCase()+"”"):"Sin responder"}</span></div><div><b>${esc(c.a)}</b><p>${esc(c.s)}</p><p><a href="${F[c.src[0]].u}" target="_blank" rel="noopener">${esc(F[c.src[0]].t)}</a></p></div></li>`;}).join("")}</ol>
  </div>`;
  $("#again").addEventListener("click",()=>start(false));
  $("#again-sh").addEventListener("click",()=>start(true));
  $("#f-src").addEventListener("click",()=>openPanel("#p-src"));
  renderScore(); $("#final-h").focus();
}
choices.forEach(b=>b.addEventListener("click",()=>answer(b.dataset.v)));
$("#next").addEventListener("click",next);
$("#prev").addEventListener("click",prev);
$("#prev2").addEventListener("click",prev);
$("#track").addEventListener("click",e=>{const sp=e.target.closest("[data-i]");if(sp) goTo(+sp.dataset.i);});
document.addEventListener("keydown",e=>{
  const openP=[...document.querySelectorAll(".panel")].find(p=>!p.hidden);
  if(e.key==="Escape"){ if(openP){openP.hidden=true;} else if($("#s-menu").hidden){screen("menu");$("#m-start").focus();} return; }
  if(openP) return;
  if(!$("#s-menu").hidden){ if(e.key==="Enter"||e.key==="ArrowRight"){e.preventDefault();screen("rules");$("#r-go").focus();} return; }
  if(!$("#s-rules").hidden){ if(e.key==="ArrowRight"){e.preventDefault();start(false);} return; }
  if($("#s-play").hidden) return;
  if(e.target.tagName==="SUMMARY"||e.target.tagName==="A") return;
  if(!answered){
    if(["1","2","3"].includes(e.key)){answer(choices[+e.key-1].dataset.v);return;}
    if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();let i=choices.indexOf(document.activeElement);if(i<0)i=e.key==="ArrowRight"?-1:1;i=(i+(e.key==="ArrowRight"?1:-1)+3)%3;choices[i].focus();}
  } else if(e.key==="ArrowRight"){e.preventDefault();next();} else if(e.key==="ArrowLeft"){e.preventDefault();prev();}
});
$("#fuentes-list").innerHTML=Object.values(F).map(s=>`<li><a href="${s.u}" target="_blank" rel="noopener">${esc(s.t)}</a></li>`).join("");
