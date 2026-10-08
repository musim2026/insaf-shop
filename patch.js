// Patch V62 FINAL SAFE - Insaf Shop
// All fixes are inside index.html V62
console.log('✅ Patch V62 SAFE Loaded');
(function(){
function fix(){
try{
var s=window.settings||{};
var btn=document.getElementById('placeOrderBtn');
if(btn && btn.innerText.indexOf('কনফার্ম')>=0){
var tot=document.getElementById('btnTotal');
btn.innerText='✅ Submit করুন - '+(tot?tot.innerText:'');
btn.style.background='#16a34a';
btn.style.color='#fff';
}
}catch(e){}
}
setInterval(fix,1000);
setTimeout(fix,500);
})();;