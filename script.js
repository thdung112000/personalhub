const content=window.HUB_CONTENT;
const svg=(kind)=>{
const flower='<g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M65 76c-22-28-34-2-12 8-30 0-22 26-1 15-14 25 14 31 16 9 15 24 33 2 14-10 28 0 22-25 1-20 10-24-17-29-18-2Z"/><circle cx="67" cy="91" r="6"/><path d="M68 110v25m0-10c-17-16-23-6-10 0m11-10c13-16 23-7 9-1"/></g>';
const frames={lamp:'<path d="M31 142V63a39 39 0 0 1 78 0v79ZM26 146h88v9H26Z"/>',clock:'<circle cx="70" cy="87" r="53"/><path d="M70 44v8m43 35h-8m-35 43v-8m-43-35h8m35 0V62m0 25 18 10"/>',mirror:'<path d="M25 130V62a45 45 0 0 1 90 0v68Z"/><path d="M37 119V64a33 33 0 0 1 66 0v55Z"/>',table:'<ellipse cx="70" cy="70" rx="57" ry="27"/><path d="m26 89-7 62m95-62 7 62M42 96l-3 42m59-42 3 42"/>'};
return `<svg viewBox="0 0 140 170" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6">${frames[kind]}</g>${kind==='clock'?'':`<g transform="${kind==='table'?'translate(22,15) scale(.65)':kind==='mirror'?'translate(-9,20) scale(.65)':'translate(10,12) scale(.8)'}">${flower}</g>`}</svg>`;
};
const products=document.querySelector('#products');
content.products.forEach(p=>{const a=document.createElement('a');a.className='product reveal';a.href='#contact';a.dataset.interest='Thiết kế món quà đặc biệt';a.innerHTML=`<div class="product-top"><span>${p.number}</span><span>↗</span></div><div class="product-art">${svg(p.shape)}</div><h3>${p.name}</h3><p>${p.detail}</p><span class="product-cta">Cùng tạo nên điều đặc biệt</span>`;products.append(a);});
const productSvgs=document.querySelectorAll('.product-art svg');
if(productSvgs[1]){productSvgs[1].insertAdjacentHTML('beforeend','<g fill="none" stroke="currentColor" stroke-width="1.8" transform="translate(47 63) scale(.34)"><path d="M65 76c-22-28-34-2-12 8-30 0-22 26-1 15-14 25 14 31 16 9 15 24 33 2 14-10 28 0 22-25 1-20 10-24-17-29-18-2Z"/><circle cx="67" cy="91" r="6"/><path d="M68 110v25m0-10c-17-16-23-6-10 0m11-10c13-16 23-7 9-1"/></g>');}
if(productSvgs[2]){productSvgs[2].innerHTML='<g fill="none" stroke="currentColor" stroke-width="1.8"><rect x="34" y="25" width="72" height="120" rx="3"/><rect x="41" y="32" width="58" height="99" rx="1"/></g><g fill="none" stroke="currentColor" stroke-width="1.5" transform="translate(-7 34) scale(.66)"><path d="M65 76c-22-28-34-2-12 8-30 0-22 26-1 15-14 25 14 31 16 9 15 24 33 2 14-10 28 0 22-25 1-20 10-24-17-29-18-2Z"/><circle cx="67" cy="91" r="6"/><path d="M68 110v25m0-10c-17-16-23-6-10 0m11-10c13-16 23-7 9-1"/></g>';}
content.socials.forEach(s=>{const a=document.createElement('a');a.className='social reveal';a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';const mark=document.createElement('span');mark.className='social-mark';mark.textContent=s.mark;const d=document.createElement('div');const h=document.createElement('h3');h.textContent=s.name;const p=document.createElement('p');p.textContent=s.note;d.append(h,p);const arrow=document.createElement('span');arrow.textContent='↗';a.append(mark,d,arrow);document.querySelector('#socials').append(a);});
const menu=document.querySelector('.menu'),nav=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Đóng menu':'Mở menu');nav.classList.toggle('open',open);});
const closeMenu=()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Mở menu');nav.classList.remove('open');};
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.querySelectorAll('[data-interest]').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#interest').value=a.dataset.interest;}));
document.querySelector('#inquiry').addEventListener('submit',e=>{e.preventDefault();const type=document.querySelector('#interest').value;const story=document.querySelector('#story').value.trim();const message=`Chào Thùy Dung, mình quan tâm đến ${type.toLowerCase()}.${story?' '+story:''}`;const url='https://m.me/inespureart?text='+encodeURIComponent(message);const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.click();const status=document.querySelector('#form-status');status.replaceChildren(document.createTextNode('Đã mở Messenger. Nếu ứng dụng không điền sẵn nội dung, bạn có thể sao chép lời nhắn: '));const b=document.createElement('button');b.type='button';b.className='copy-button';b.textContent='Sao chép lời nhắn';b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(message);b.textContent='Đã sao chép ✓';}catch{status.textContent=message;}});const fallback=document.createElement('a');fallback.href=url;fallback.target='_blank';fallback.rel='noopener noreferrer';fallback.textContent='Mở Messenger ↗';status.append(b,document.createTextNode(' · '),fallback);});
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:0.07});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('will-reveal');io.observe(el);});}

// Decorative motion uses the same botanical motif throughout the page.
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const atmosphere=document.createElement('div');atmosphere.className='atmosphere';atmosphere.setAttribute('aria-hidden','true');
for(let i=0;i<11;i++){const petal=document.createElement('i');petal.style.cssText=`--x:${4+i*9}%;--size:${6+(i%4)*2}px;--duration:${31+i*3}s;--delay:-${i*5}s`;atmosphere.append(petal);}document.body.prepend(atmosphere);
const thread='<svg viewBox="0 0 45 64" fill="none" aria-hidden="true"><path d="M22 60C28 43 14 34 23 19M23 43C7 44 7 31 18 35M23 34C39 35 38 23 27 27" stroke="currentColor" stroke-width="1"/><path d="M23 21C5 13 16 3 22 13C25-2 37 5 29 15C44 13 39 26 28 22C30 34 17 33 19 23C7 31 4 18 17 18" stroke="#F2A477" stroke-width="1.2"/><circle cx="23" cy="19" r="3" fill="#F2A477"/></svg>';
['moments','expertise','journal'].forEach(id=>{const d=document.createElement('div');d.className='botanical-thread';d.setAttribute('aria-hidden','true');d.innerHTML=thread;document.getElementById(id).before(d);});
const motionToggle=document.createElement('button');motionToggle.type='button';motionToggle.className='motion-toggle';motionToggle.textContent='Ⅱ  Tạm dừng hiệu ứng';motionToggle.setAttribute('aria-label','Tạm dừng hiệu ứng');motionToggle.setAttribute('aria-pressed','false');document.body.append(motionToggle);
motionToggle.addEventListener('click',()=>{const paused=document.body.classList.toggle('motion-paused');motionToggle.textContent=paused?'▷  Bật hiệu ứng':'Ⅱ  Tạm dừng hiệu ứng';motionToggle.setAttribute('aria-label',paused?'Bật hiệu ứng':'Tạm dừng hiệu ứng');motionToggle.setAttribute('aria-pressed',String(paused));});

// Use Thùy Dung as the personal signature in the header.
const wordmark=document.querySelector('.wordmark');
if(wordmark){wordmark.childNodes[0].nodeValue='Thùy Dung';}

const footerName=document.querySelector('.footer-name');
if(footerName){footerName.childNodes[0].nodeValue='Thùy Dung';const subline=footerName.querySelector('span');if(subline)subline.textContent='THE SOUL BEHIND INES PURE ART';const oldSlogan=document.querySelector('.footer-top p');if(oldSlogan)oldSlogan.remove();}

const creationHeadingCopy=document.querySelector('#creations .section-heading p');

const creationHeadingTitle=document.querySelector('#creations .section-heading h2');
if(creationHeadingTitle)creationHeadingTitle.innerHTML='Từ hoa tươi trên tay,<br><em>hóa thành kỷ vật trăm năm.</em>';
const creationSectionLabel=document.querySelector('#creations .section-label span:last-child');
if(creationSectionLabel)creationSectionLabel.textContent='TẠO TÁC RESIN THUẦN KHIẾT';

const stickerIntro=document.querySelector('#creations .sticker');
if(stickerIntro){
  stickerIntro.querySelector('.tiny-flower')?.remove();
  const bottle=document.createElement('div');
  bottle.className='sticker-bottle';
  bottle.setAttribute('role','img');
  bottle.setAttribute('aria-label','Minh hoạ bình nước được trang trí sticker hoa và ngôi sao');
  bottle.innerHTML='<svg viewBox="0 0 100 130" aria-hidden="true"><defs><linearGradient id="bottleFill" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#fbe4d5" stop-opacity=".9"/><stop offset="1" stop-color="#a8c8d6" stop-opacity=".52"/></linearGradient></defs><path d="M39 15h22v13l8 10v72c0 7-5 12-12 12H43c-7 0-12-5-12-12V38l8-10Z" fill="url(#bottleFill)" stroke="currentColor" stroke-width="2.2"/><path d="M39 15h22M37 28h26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M38 45c11-7 22-7 33 0M38 102c11 7 22 7 33 0" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".7"/><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M50 73v21m0-10c-10-12-17-3-8 1m8-7c9-12 17-4 8 1"/><path d="M50 58c-12-2-11-15-2-12 0-10 12-10 12 0 9-3 10 10 1 12 1 10-11 12-11 0Z"/><path d="m40 63 3 3m17 24 3 3m1-30 3-3"/></g><circle cx="38" cy="89" r="3" fill="#f2a477"/><circle cx="64" cy="78" r="2.5" fill="#f2a477"/></svg>';
  stickerIntro.prepend(bottle);
}

const journalHeadingCopy=document.querySelector('#journal .section-heading p');
if(journalHeadingCopy)journalHeadingCopy.textContent='Mình tìm thấy vẻ đẹp trong những miền đất đã đi qua và cả những điều bình dị vẫn ở bên mỗi ngày. Mỗi cuộc gặp gỡ dạy mình nhìn xa hơn điều mắt thấy để lắng nghe những cảm xúc và câu chuyện phía sau. Những trải nghiệm ấy bồi đắp tâm hồn và làm giàu gu thẩm mỹ để mình có thể thấu hiểu điều bạn trân quý rồi gửi gắm vào từng kỷ vật. Đổi lại, mỗi tác phẩm cũng dạy mình thêm kiên nhẫn và tinh tế trong cách cảm nhận cuộc đời. Cuộc sống trao chất liệu cho sáng tạo còn những ngày làm nghề lại giúp mình sống sâu hơn và biết nâng niu những điều nhỏ bé.';

const growthStages=[
  {title:'Nâng niu từ cành hoa đầu tiên',copy:'Bó hoa được sơ chế cẩn thận, tỉa bỏ những cành lá héo úa theo mong muốn của bạn. Nếu từng cành hoa đều là một phần ký ức bạn muốn giữ, mình sẽ trân trọng giữ lại tất cả — kể cả những cành đã héo, không bỏ sót cành nào.',art:'<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M18 72c22-7 42-7 64 0"/><ellipse cx="50" cy="61" rx="10" ry="7" fill="currentColor" stroke="none"/></svg>'},
  {title:'Giữ dáng hoa, nâng niu sắc cũ',copy:'Hoa được làm khô bằng vật liệu chuyên dụng, với sự chăm chút để giữ dáng và màu gần với ban đầu nhất có thể. Mình nâng niu từng bông hoa để những đường nét mong manh không bị đè ép, bởi vẻ đẹp ấy cũng là một phần kỷ niệm bạn gửi gắm.',art:'<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 76V42M50 56C30 54 28 39 43 39M50 64c20-2 22-18 8-21M18 78c22-7 42-7 64 0"/></svg>'},
  {title:'Để ký ức tìm thấy hình hài',copy:'Từ bó hoa bạn gửi, mình thiết kế một bố cục riêng và cùng bạn chốt mẫu trước khi thực hiện. Chỉ khi bạn đã ưng ý, hoa mới được sắp đặt vào khuôn và lưu giữ trong resin, để câu chuyện của bạn có một hình hài có thể nâng niu mỗi ngày.',art:'<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 78V51M18 80c22-7 42-7 64 0"/><path d="M50 52c-20 0-19-22-4-17C39 18 56 14 54 33c15-9 25 9 9 18 1 17-16 19-13 1Z"/></svg>'},
  {title:'Mài êm từng cạnh, đánh thức vẻ trong suốt',copy:'Khi resin đã đông cứng, mình mài nhẵn từng cạnh để tạo tác êm tay khi cầm chạm, rồi kiên nhẫn đánh bóng bề mặt để những cành hoa bên trong hiện lên rõ nét hơn. Qua từng lượt hoàn thiện, vẻ trong suốt dần được đánh thức, để khi nhận lại mùa hoa ấy, bạn có thể ngắm nhìn những đường nét thân quen và nhớ về câu chuyện mình đã gửi gắm.',art:'<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M30 78h40M36 78V35c0-18 28-18 28 0v43M50 40v25M42 53c-11 0-10-13-2-11-2-9 10-10 10 0 9-2 11 11 2 11 1 10-11 11-10 0Z"/></svg>'}
];
document.querySelectorAll('#expertise .process article').forEach((article,index)=>{const stage=growthStages[index];if(!stage)return;const order=article.querySelector(':scope > span')?.textContent.trim()||String(index+1).padStart(2,'0');const copy=article.querySelector('div');if(copy){const title=copy.querySelector('h3');title.innerHTML=`<span class="process-number">${order}</span>${stage.title}`;copy.querySelector('p').textContent=stage.copy;}article.querySelector(':scope > span')?.remove();const art=document.createElement('div');art.className='process-growth';art.innerHTML=stage.art;article.insertBefore(art,copy);});


// Four illustrated stages in a stationary vertical carousel.
const processGrid=document.querySelector('#expertise .expertise-grid');
if(processGrid){
  const heading=processGrid.querySelector('h2');
  const steps=Array.from(processGrid.querySelectorAll('.process article'));
  const lineFlower='<path d="M100 104v59m0-22c-25-23-39-8-13 0m14-12c25-24 39-8 13 0M100 103c-29 9-43-16-19-27-25-15-4-39 13-18-3-29 30-30 27-2 25-13 41 15 15 26 25 18 2 41-16 20-1 28-31 29-20 1Z"/><circle cx="106" cy="83" r="9"/>';
  const drawings=[
    '<g transform="translate(-5,-7)">'+lineFlower+'</g><path d="m66 135 18 50h40l22-50M84 185l-8 20m48-20 8 20M156 161l37 35m-37 0 37-35"/><circle cx="154" cy="158" r="9"/><circle cx="154" cy="198" r="9"/>',
    '<path d="M25 151 145 134l65 27-126 23ZM25 151v45l59 28 126-25v-38M84 184v40"/><g transform="translate(117 139) rotate(72) scale(.45)">'+lineFlower+'</g><path d="m160 49-22 28 28 27 26-33ZM138 77l-9 5 30 27 7-5M176 54l10-12 17 14-12 15M185 37l16-10 26 9m-43 7 12-10 12 10m-8 0 13 12 17-2M161 108l-7 15m-1-13-8 18m-1-13-8 15"/><g stroke-dasharray="1 7"><path d="m143 115-20 33m29-32-15 39m21-33-9 33m-10-24-17 25"/></g><path d="m45 178 13-2m102-3 13-2m-73 28 12-2"/>',
    '<rect x="39" y="37" width="155" height="164" rx="20"/><rect x="47" y="45" width="139" height="148" rx="14"/><g transform="translate(40,48) scale(.72)">'+lineFlower+'</g><path d="M66 179c19 5 38 5 56 1M57 61c13-8 27-11 42-11M154 155l15-15m-12 24 19-19"/>',
    '<path d="M48 195V91a63 63 0 0 1 126 0v104ZM39 201h144v12H39Z"/><g transform="translate(40,69) scale(.65)">'+lineFlower+'</g><path d="m192 48 5 17 17 5-17 5-5 17-5-17-17-5 17-5ZM34 38l3 10 10 3-10 3-3 10-3-10-10-3 10-3"/>'
  ];
  const drawingLabels=['Bó hoa được nâng niu và sơ chế','Bông hoa nằm trong hộp chữ nhật, bàn tay nghiêng ca đổ vật liệu ướp hoa vào hộp','Hoa được sắp đặt trong khuôn resin nhìn từ trên xuống','Tạo tác hoa hình vòm được hoàn thiện và đánh bóng'];
  const intro=document.createElement('div');intro.className='process-intro';intro.append(heading);
  const hint=document.createElement('p');hint.className='process-scroll-hint';hint.textContent='Lia chuột để khám phá từng bước →';intro.append(hint);
  const navigation=document.createElement('nav');navigation.className='process-navigation';navigation.setAttribute('aria-label','Bốn bước trong hành trình của hoa');
  const carousel=document.createElement('div');carousel.className='process-carousel';
  steps.forEach((step,index)=>{
    step.className='process-step';step.id=`flower-step-${index+1}`;
    const art=step.querySelector('.process-growth');
    const copy=step.querySelector('div:last-child');copy.className='process-step-copy';
    art.className='process-drawing';art.setAttribute('role','img');art.setAttribute('aria-label',drawingLabels[index]);art.innerHTML=`<svg viewBox="0 0 240 240" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${drawings[index]}</g></svg>`;
    const panel=document.createElement('div');panel.className='process-panel';panel.append(art,copy);step.replaceChildren(panel);carousel.append(step);
    const link=document.createElement('a');link.href=`#${step.id}`;link.textContent=String(index+1).padStart(2,'0');link.setAttribute('aria-label',`Bước ${index+1}: ${growthStages[index].title}`);navigation.append(link);
  });
  intro.append(navigation);processGrid.className='process-story';processGrid.replaceChildren(intro,carousel);
  let currentStep=0,lastChange=0,touchStartY=null;
  carousel.tabIndex=0;
  carousel.setAttribute('role','region');
  carousel.setAttribute('aria-roledescription','carousel');
  carousel.setAttribute('aria-label','Hành trình bốn bước. Cuộn chuột hoặc dùng phím mũi tên để chuyển bước.');
  const status=document.createElement('p');status.className='process-status';status.setAttribute('aria-live','polite');carousel.append(status);
  const showStep=(index)=>{
    currentStep=Math.max(0,Math.min(steps.length-1,index));
    steps.forEach((step,i)=>{
      const offset=i-currentStep;
      step.dataset.position=offset===0?'current':offset===-1?'previous':offset===1?'next':'hidden';
      step.setAttribute('aria-hidden',String(offset!==0));
      step.inert=offset!==0;
    });
    navigation.querySelectorAll('a').forEach((link,index)=>{if(index===currentStep)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current');});
    status.textContent=`Bước ${currentStep+1} / ${steps.length}`;
  };
  navigation.querySelectorAll('a').forEach((link,index)=>link.addEventListener('click',event=>{
    event.preventDefault();showStep(index);
  }));
  processGrid.addEventListener('wheel',event=>{
    if(event.ctrlKey||event.deltaY===0)return;
    event.preventDefault();
    if(Math.abs(event.deltaY)<2)return;
    const direction=event.deltaY>0?1:-1;
    const now=performance.now();
    // Keep the page still throughout the hovered journey, including the first and last steps.
    if(now-lastChange<750)return;
    if(currentStep+direction<0||currentStep+direction>=steps.length)return;
    lastChange=now;showStep(currentStep+direction);
  },{passive:false});
  carousel.addEventListener('keydown',event=>{
    if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
    event.preventDefault();showStep(event.key==='Home'?0:event.key==='End'?steps.length-1:currentStep+(event.key==='ArrowDown'?1:-1));
  });
  carousel.addEventListener('touchstart',event=>{touchStartY=event.touches[0]?.clientY??null;},{passive:true});
  carousel.addEventListener('touchend',event=>{
    if(touchStartY===null)return;
    const delta=touchStartY-(event.changedTouches[0]?.clientY??touchStartY);
    if(Math.abs(delta)>40)showStep(currentStep+(delta>0?1:-1));touchStartY=null;
  },{passive:true});
  showStep(0);
}

const journalGrid=document.querySelector('#journal .journal-grid');
if(journalGrid){
  const familyFlower='<div class="family-flower" role="img" aria-label="Bông hoa gia đình"><div class="family-petal"><img loading="lazy" decoding="async" src="assets/optimized/thumbs/con1-small.jpg" alt=""></div><div class="family-petal"><img loading="lazy" decoding="async" src="assets/optimized/thumbs/con2.webp" alt=""></div><div class="family-petal"><img loading="lazy" decoding="async" src="assets/optimized/thumbs/con3.webp" alt=""></div><div class="family-petal"><img loading="lazy" decoding="async" src="assets/optimized/thumbs/con4.webp" alt=""></div><div class="family-core"><img loading="lazy" decoding="async" src="assets/optimized/thumbs/sum.webp" alt="Sum"><img loading="lazy" decoding="async" src="assets/optimized/thumbs/vosum.webp" alt="Vosum"></div></div>';
  const wheelCluster=(images,label)=>`<div class="wheel-cluster" role="img" aria-label="${label}">${images.map(src=>`<img loading="lazy" decoding="async" src="assets/${src}" alt="">`).join('')}</div>`;
  journalGrid.innerHTML=`<div class="journal-wheel">
    <div class="wheel-spire" aria-hidden="true">✦</div><div class="wheel-stand" aria-hidden="true"></div><div class="wheel-spokes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="wheel-stars" aria-hidden="true"><i>✦</i><i>✦</i><i>✦</i><i>✦</i><i>✦</i><i>✦</i></div>
    <div class="wheel-core"><span>CỘI NGUỒN CẢM HỨNG</span><strong>Gom sắc đời,<br>ươm hồn hoa.</strong><p>Những điều mình sống và yêu lặng lẽ nở thành cảm hứng trong từng tạo tác.</p></div>
    <article class="wheel-card wheel-work">${wheelCluster(['optimized/thumbs/nhanbang.webp','optimized/thumbs/desk.webp','optimized/thumbs/xuonghoc.webp'],'Góc làm việc và khoảnh khắc nhận bằng của Thùy Dung')}<div><span>01 / KHỞI NGUỒN Ý TƯỞNG</span><h3>Nơi ý tưởng bắt đầu</h3><p>Mình luôn chủ động học hỏi và bồi dưỡng kiến thức, để năng lực làm việc thêm vững vàng và tâm hồn ngày một sâu sắc.</p></div></article>
    <article class="wheel-card wheel-flowers">${wheelCluster(['optimized/thumbs/img-2886.webp','optimized/thumbs/flowers.webp','optimized/thumbs/img-1576.webp'],'Những sắc hoa Thùy Dung tìm thấy')}<div><span>02 / SĂN HOA</span><h3>Đi chậm giữa sắc hoa</h3><p>Mỗi lần dừng lại trước một bông hoa lạ là một lần bảng màu trong mình mở rộng.</p></div></article>
    <article class="wheel-card wheel-friends">${wheelCluster(['optimized/thumbs/banbe.webp','optimized/thumbs/community.webp','optimized/thumbs/doi-tac.webp'],'Khoảnh khắc cùng bạn bè')}<div><span>03 / BẠN BÈ &amp; ĐỐI TÁC</span><h3>Những cuộc hẹn ấm áp</h3><p>Tiếng cười và sự sẻ chia giúp mình trở về với năng lượng dịu dàng.</p></div></article>
    <article class="wheel-card wheel-home">${familyFlower}<div><span>04 / VỀ NHÀ</span><h3>Gia đình nhỏ</h3><p>Sau một ngày dài, trở về bên gia đình nhỏ là lúc mình tìm lại bình yên.</p></div></article>
    <article class="wheel-card wheel-notebook">${wheelCluster(['optimized/thumbs/img-1627.webp','optimized/thumbs/sotay.webp','optimized/thumbs/img-1628-no-signature.webp'],'Sổ tay và những phác thảo của Thùy Dung')}<div><span>05 / SỔ TAY</span><h3>Ước mơ từ những nét vẽ</h3><p>Từ những phác thảo nhỏ trong cuốn sổ, mình từng bước ấp ủ ước mơ xây dựng Ines Pure Art.</p></div></article>
    <article class="wheel-card wheel-journey">${wheelCluster(['optimized/thumbs/thuy-dung-ho-hoa.jpg','optimized/thumbs/nhatho.webp','optimized/thumbs/hanoi.webp'],'Những chuyến đi bên hồ hoa, phố cổ và Hà Nội')}<div><span>06 / NHỮNG CHUYẾN ĐI</span><h3>Việt Nam trong tim mình</h3><p>Mình yêu đất nước nơi mình sinh ra. Càng đi qua nhiều miền đất và hiểu thêm những câu chuyện nơi đây, mình càng thấy tự hào về Việt Nam.</p></div></article>
  </div>`;
}

// Turn the wheel and carry its cabins clockwise while keeping their contents upright.
const memoryWheel=document.querySelector('.journal-wheel');
if(memoryWheel){
  const cabins=[...memoryWheel.querySelectorAll('.wheel-card')];
  const rotatingParts=[...memoryWheel.querySelectorAll('.wheel-spokes,.wheel-stars')];
  const desktopWheel=matchMedia('(min-width:901px) and (hover:hover) and (pointer:fine)');
  let wheelAngle=0,wheelFrame=0,wheelTime=0,wheelHovered=false;
  let cabinOrigins=[],orbitRx=1,orbitRy=1;
  const measureWheel=()=>{
    cabins.forEach(card=>card.style.removeProperty('translate'));
    const bounds=memoryWheel.getBoundingClientRect();
    cabinOrigins=cabins.map(card=>{const box=card.getBoundingClientRect();return {x:box.left+box.width/2-bounds.left-bounds.width/2,y:box.top+box.height/2-bounds.top-bounds.height/2};});
    orbitRx=Math.max(1,...cabinOrigins.map(p=>Math.abs(p.x)));
    orbitRy=Math.max(1,...cabinOrigins.map(p=>Math.abs(p.y)));
    renderWheel();
  };
  const renderWheel=()=>{
    const angle=wheelAngle*Math.PI/180,cos=Math.cos(angle),sin=Math.sin(angle);
    const rx=orbitRx,ry=orbitRy;
    cabins.forEach((card,index)=>{
      const p=cabinOrigins[index];if(!p)return;
      card.style.translate=desktopWheel.matches?`${(p.x*cos-p.y/ry*rx*sin-p.x).toFixed(3)}px ${(p.x/rx*ry*sin+p.y*cos-p.y).toFixed(3)}px`:'none';
    });
    rotatingParts.forEach(part=>part.style.transform=`translate(-50%,-50%) rotate(${desktopWheel.matches?wheelAngle:0}deg)`);
  };
  const turnWheel=time=>{
    wheelFrame=0;
    if(!wheelHovered||!desktopWheel.matches||reducedMotion.matches||document.hidden||document.body.classList.contains('motion-paused')){wheelTime=0;return;}
    if(wheelTime)wheelAngle=(wheelAngle+Math.min(time-wheelTime,50)*.003)%360;
    wheelTime=time;renderWheel();wheelFrame=requestAnimationFrame(turnWheel);
  };
  const startWheel=()=>{if(!wheelFrame){wheelTime=0;wheelFrame=requestAnimationFrame(turnWheel);}};
  memoryWheel.addEventListener('pointerenter',()=>{wheelHovered=true;startWheel();});
  memoryWheel.addEventListener('pointerleave',()=>{wheelHovered=false;cancelAnimationFrame(wheelFrame);wheelFrame=0;wheelTime=0;});
  motionToggle.addEventListener('click',()=>{if(wheelHovered)startWheel();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&wheelHovered)startWheel();});
  reducedMotion.addEventListener('change',()=>{if(wheelHovered)startWheel();});
  new ResizeObserver(measureWheel).observe(memoryWheel);
  document.fonts.ready.then(measureWheel);
  window.addEventListener('resize',measureWheel,{passive:true});
}
