// Insaf Shop - Patch V4 FINAL ACCURATE
// V50 Accurate - Submit + WA/Messenger + Gmail + Bell Only Offer
(function(){
console.log("✅ Patch V4 Accurate Loaded");

const S="service_4mv2qxq";
const T="template_w3l8ct7";
const P="CvIMoz2LCj_qR1N_v";

// --- 1. Submit + Contact Button 100% Accurate ---
function fixCheckoutUI(){
 try{
  let btn=document.getElementById('placeOrderBtn');
  if(!btn) return;
  let totEl=document.getElementById('btnTotal');
  let tot=totEl?totEl.innerText:"";
  btn.innerHTML="✅ Submit করুন - "+tot;
  btn.style.background="#16a34a";
  btn.style.color="#fff";

  if(document.getElementById('contactPatch')) return;
  let set=window.settings||{};
  let waRaw=(set.whatsapp||set.bkash||"01895280130")
  .toString().replace(/[^0-9]/g,'');
  if(waRaw.startsWith('0')) waRaw='88'+waRaw;
  if(!waRaw.startsWith('88')) waRaw='88'+waRaw;

  let msgr=set.messenger||"insafshopbd";
  let msgrLink=msgr.startsWith("http")?msgr:
   "https://m.me/"+msgr.replace("@","")
  .replace("https://m.me/","").replace("m.me/","");

  let div=document.createElement('div');
  div.id='contactPatch';
  div.style.cssText='margin-top:12px;border-top:1px solid #e2e8f0;'
   +'padding-top:10px;text-align:center';
  div.innerHTML=`
   <p style="font-size:11px;font-weight:800;
   color:#0f172a;margin:0 0 8px">
   📞 বিস্তারিত জানতে ইনসাফ শপকে যোগাযোগ করুন
   </p>
   <div style="display:flex;gap:8px">
    <a id="waPatch" href="https://wa.me/${waRaw}"
    target="_blank" style="flex:1;background:#25D366;
    color:#fff;padding:10px;border-radius:10px;
    text-decoration:none;font-weight:800;
    font-size:13px;text-align:center">💬 WhatsApp</a>
    <a id="msPatch" href="${msgrLink}"
    target="_blank" style="flex:1;background:#0084FF;
    color:#fff;padding:10px;border-radius:10px;
    text-decoration:none;font-weight:800;
    font-size:13px;text-align:center">💬 Messenger</a>
   </div>`;
  btn.parentNode.insertBefore(div, btn.nextSibling);
 }catch(e){}
}

// ভিতরের "WhatsApp বন্ধ" লেখা গ্রাহকের থেকে লুকানো
function hideInternal(){
 try{
  let m=document.getElementById('checkoutModal');
  if(!m) return;
  m.querySelectorAll('p,div,span,small').forEach(el=>{
   let t=(el.innerText||"").toLowerCase();
   if(el.id==='contactPatch') return;
   if(el.closest('#contactPatch')) return;
   if(t.includes("whatsapp বন্ধ")||
      t.includes("শুধু ওয়েবসাইট")||
      t.includes("website এ অর্ডার")||
      t.includes("whatsapp এ যাবে না")){
     if(el.children.length===0&&
        el.tagName!=="BUTTON"&&el.tagName!=="A"){
       el.style.display='none';
     }
   }
  });
 }catch(e){}
}

let oldCheckout=window.checkout;
window.checkout=function(){
 if(oldCheckout) oldCheckout();
 setTimeout(()=>{fixCheckoutUI();hideInternal();},120);
};
setInterval(hideInternal,1000);

// --- 2. Gmail + Bell Only Offer - Accurate ---
window.sendBroadcastEmail=async function(){
 let msgEl=document.getElementById("broadcastMsg");
 let imgEl=document.getElementById("broadcastImg");
 let st=document.getElementById("broadcastStatus");
 let msg=msgEl?msgEl.value.trim():"";
 let img=imgEl?imgEl.value.trim():"";
 if(window.broadcastTempImg) img=window.broadcastTempImg||img;
 if(!msg&&!img){alert("অফার লেখা বা ছবি দিন");return;}
 if(!window.settings.usersList||
    window.settings.usersList.length==0){
  alert("কোনো ইউজার নাই!");return;
 }
 st.innerText="⏳ পাঠানো হচ্ছে... "+
  window.settings.usersList.length+" জনকে";
 try{ emailjs.init(P); }catch(e){}

 // 🔔 তে শুধু অফার যাবে, অন্য কিছু না
 if(!window.settings.notifications)
  window.settings.notifications=[];
 window.settings.notifications.push({
  name:msg.slice(0,40)||"📢 নতুন অফার",
  slug:"",
  date:new Date().toLocaleString('bn-BD'),
  time:Date.now(),
  isBroadcast:true,
  fullMsg:msg,
  img:img
 });
 if(window.settings.notifications.length>20){
  window.settings.notifications=
   window.settings.notifications.slice(-20);
 }
 await window.syncToCloud();
 if(window.updateBell) window.updateBell();

 // Gmail এ 100% যাবে
 let sent=0;
 for(let u of window.settings.usersList){
  if(!u.email) continue;
  if(window.settings.blockedEmails&&
     window.settings.blockedEmails.includes(u.email))
   continue;
  try{
   await emailjs.send(S,T,{
    to_name:u.email.split('@')[0],
    to_email:u.email,
    product_name:msg||"নতুন অফার",
    product_price:"",
    product_link:(img?img+"\n\n":"")+
     "https://insafshop.net",
    product_img:img,
    shop_name:"ইনসাফ শপ",
    message:msg,
    offer_text:msg,
    offer_image:img
   });
   sent++;
  }catch(e){}
  st.innerText="⏳ "+sent+" জনকে পাঠানো হলো...";
  await new Promise(r=>setTimeout(r,650));
 }
 st.innerText="✅ সম্পন্ন! "+sent+
  " জনকে Gmail + 🔔 তে গেছে";
 if(msgEl) msgEl.value="";
 if(imgEl) imgEl.value="";
 let pv=document.getElementById("broadcastPreview");
 if(pv) pv.style.display="none";
 window.broadcastTempImg="";
};

// নতুন প্রোডাক্টে শুধু Gmail যাবে, 🔔 তে উঠবে না (আপনার কথা মতো)
window.sendEmailToAllNewProduct=async function(name,price,img,slug){
 try{
  emailjs.init(P);
  let link="https://insafshop.net/?book="+
   encodeURIComponent(slug);
  if(!window.settings.usersList) return;
  for(let u of window.settings.usersList){
   if(!u.email) continue;
   if(window.settings.blockedEmails&&
      window.settings.blockedEmails.includes(u.email))
    continue;
   try{
    await emailjs.send(S,T,{
     to_name:u.email.split('@')[0],
     to_email:u.email,
     product_name:name,
     product_price:price,
     product_link:link,
     product_img:img,
     shop_name:"ইনসাফ শপ"
    });
    await new Promise(r=>setTimeout(r,600));
   }catch(e){}
  }
 }catch(e){}
};

// --- 3. Social Original + Eye ---
window.toggleLoginPass=function(){
 let i=document.getElementById('adminPassInput');
 if(i) i.type=(i.type=='password')?'text':'password';
};
window.togglePass=function(){
 let p=document.getElementById('sAdminPass');
 if(p) p.type=(p.type=='password')?'text':'password';
};
function socialFix(){
 try{
  let s=window.settings; if(!s) return;
  let w=document.getElementById('footerSocial');
  if(!w) return;
  let h='';
  if(s.facebook&&s.facebook.trim()!=""){
   h+='<a href="'+s.facebook+
    '" target="_blank" style="display:inline-flex;'
    +'align-items:center;justify-content:center;'
    +'width:32px;height:32px;background:#1877F2;'
    +'border-radius:50%;color:#fff;font-weight:900;'
    +'font-size:18px;text-decoration:none;margin:3px">f</a>';
  }
  if(s.whatsappChannel&&s.whatsappChannel.trim()!=""){
   h+='<a href="'+s.whatsappChannel+
    '" target="_blank" style="display:inline-flex;'
    +'align-items:center;justify-content:center;'
    +'width:32px;height:32px;background:#25D366;'
    +'border-radius:50%;color:#fff;font-weight:900;'
    +'font-size:16px;text-decoration:none;margin:3px">W</a>';
  }
  if(s.youtube&&s.youtube.trim()!=""){
   h+='<a href="'+s.youtube+
    '" target="_blank" style="display:inline-flex;'
    +'align-items:center;justify-content:center;'
    +'width:32px;height:32px;background:#FF0000;'
    +'border-radius:50%;color:#fff;font-weight:900;'
    +'font-size:14px;text-decoration:none;margin:3px">▶</a>';
  }
  if(s.instagram&&s.instagram.trim()!=""){
   h+='<a href="'+s.instagram+
    '" target="_blank" style="display:inline-flex;'
    +'align-items:center;justify-content:center;'
    +'width:32px;height:32px;background:linear-gradient'
    +'(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5);'
    +'border-radius:50%;color:#fff;font-weight:900;'
    +'font-size:16px;text-decoration:none;margin:3px">📸</a>';
  }
  w.innerHTML=h;
 }catch(e){}
}
let oldApply=window.applySettings;
window.applySettings=function(){
 if(oldApply) oldApply();
 setTimeout(()=>{socialFix();fixCheckoutUI();},200);
};
setTimeout(socialFix,800);
setTimeout(fixCheckoutUI,1000);
})();