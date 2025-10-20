// Basic JS for mobile menu and smooth scrolling
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
if(menuBtn){
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
    if(menu.classList.contains('open')){
      menu.style.display='flex';
    }else{
      menu.style.display='';
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth'});
    }
  });
});