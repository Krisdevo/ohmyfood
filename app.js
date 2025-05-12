
// gsap.to('.text', {y: 100, duration: 1})
gsap.fromTo('.text', {opacity: 0, y: 80}, {opacity: 1, y:0, duration: 2})

const time = gsap.timeline({defaults : {duration: 0.75 , ease: "power1.in"}});

time.fromTo('.cookie-container', {scale: 0}, {scale: 1});

const btn = document.getElementById('btn');

btn.addEventListener('click', () =>{
    time.to('.logo-cookie', {rotation: "180deg", duration: 0.75});
    gsap.to('.cookie-container', {opacity: 0, duration: 2} );
});