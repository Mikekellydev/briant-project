(function(){'use strict';
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
/* Menu */
const menuBtn=$('#menu-btn'),menu=$('#menu');
if(menuBtn&&menu){menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-controls','menu');
const t=()=>{const o=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(o)); if(o){menu.style.display='flex';(menu.querySelector('a')||menuBtn).focus({preventScroll:true});}else{menu.style.display='';menuBtn.focus({preventScroll:true});}};
menuBtn.addEventListener('click',t);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open'))t();});
menu.addEventListener('click',e=>{const a=e.target.closest('a');if(a&&menu.classList.contains('open')){menu.classList.remove('open');menu.style.display='';menuBtn.setAttribute('aria-expanded','false');}});}
/* Year */
const y=$('#year'); if(y) y.textContent=new Date().getFullYear();

/* Delivery Capacity Calculator */
function yardsToTons(yards, material){ // rough common densities
  const densities = {
    mulch: 400,     // lb/yd³
    topsoil: 2000,  // lb/yd³
    gravel: 2700,   // lb/yd³ (limestone)
    sand: 2600
  };
  const lb = (densities[material]||2000) * yards;
  return lb/2000; // tons
}
function updateCalc(){
  const length = parseFloat($('#trailer-length').value)||0;
  const width  = parseFloat($('#trailer-width').value)||0;
  const height = parseFloat($('#trailer-height').value)||0;
  const material = $('#material').value;
  const capacityYd = (length*width*height)/27; // ft³ -> yd³
  const tons = yardsToTons(capacityYd, material);
  $('#calc-yd').textContent = capacityYd.toFixed(2);
  $('#calc-tons').textContent = tons.toFixed(2);
}
['#trailer-length','#trailer-width','#trailer-height','#material'].forEach(id=>{
  const el = $(id);
  if(el){ el.addEventListener('input', updateCalc); el.addEventListener('change', updateCalc); }
});
window.addEventListener('load', updateCalc);
})();