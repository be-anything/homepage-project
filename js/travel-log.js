const addBtn1Click = (btn) => {btn.addEventListener('click', (e) => {
    const slider = e.target.parentElement.parentElement.previousElementSibling.querySelector('.travel-img-wrap-full');
    const slideWidth = slider.querySelector('.travel-img');
    slider.style.transform = `translateX(0px)`;
    
    // 스타일 바꾸기
    const btns = [...document.querySelectorAll('.slider-btn')];
    btns.forEach((e) => {
        e.style['background-color'] = '#000';
    });
    e.target.style['background-color'] = '#ff00a1';
})};

[...document.querySelectorAll('.btn1')].forEach((btn) => {
    addBtn1Click(btn);
});
const addBtn2Click = (btn) => {btn.addEventListener('click', (e) => {
    const slider = e.target.parentElement.parentElement.previousElementSibling.querySelector('.travel-img-wrap-full');
    const slideWidth = slider.querySelector('.travel-img');
    slider.style.transform = `translateX(-${slideWidth.offsetWidth}px)`;
    
    // 스타일 바꾸기
    const btns = [...document.querySelectorAll('.slider-btn')];
    btns.forEach((e) => {
        e.style['background-color'] = '#000';
    });
    e.target.style['background-color'] = '#ff00a1';
})};

[...document.querySelectorAll('.btn2')].forEach((btn) => {
    addBtn2Click(btn);
});
const addBtn3Click = (btn) => {btn.addEventListener('click', (e) => {
    const slider = e.target.parentElement.parentElement.previousElementSibling.querySelector('.travel-img-wrap-full');
    const slideWidth = slider.querySelector('.travel-img');
    slider.style.transform = `translateX(-${slideWidth.offsetWidth*2}px)`;
    
    // 스타일 바꾸기
    const btns = [...document.querySelectorAll('.slider-btn')];
    btns.forEach((e) => {
        e.style['background-color'] = '#000';
    });
    e.target.style['background-color'] = '#ff00a1';
})};

[...document.querySelectorAll('.btn3')].forEach((btn) => {
    addBtn3Click(btn);
});





// body color event 
document.querySelector('body').addEventListener('scroll', (e) => {
    e.target.style['background-color'] = '#000';
});