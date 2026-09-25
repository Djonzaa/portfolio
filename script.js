document.querySelectorAll('a[href="#"]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
const reveal=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.card,.heading,.split,.stats,.faq details,.cta').forEach((el,i)=>{el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition=`opacity .7s ease ${i*50}ms,transform .7s cubic-bezier(.2,.8,.2,1) ${i*50}ms`;reveal.observe(el)});
const style=document.createElement('style');style.textContent='.visible{opacity:1!important;transform:none!important}';document.head.appendChild(style);
const cursor=document.createElement('div');cursor.className='cursor-glow';document.body.appendChild(cursor);document.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
