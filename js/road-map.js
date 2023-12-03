window.addEventListener('scroll', (e) => {
    const direction = document.querySelector('#line-direction');
    direction.style = `transform : translate(-25px, ${window.scrollY + 200}px) scale(100%);`;
})