const addBtn1Click = (btn) => {btn.addEventListener('click', (e) => {
    const slider = e.target.parentElement.parentElement.previousElementSibling.querySelector('.travel-img-wrap-full');
    const slideWidth = slider.querySelector('.travel-img');
    slider.style.transform = `translateX(0px)`;
    
    // 스타일 바꾸기
    btnColor(e);
})};

[...document.querySelectorAll('.btn1')].forEach((btn) => {
    addBtn1Click(btn);
});
const addBtn2Click = (btn) => {btn.addEventListener('click', (e) => {
    const slider = e.target.parentElement.parentElement.previousElementSibling.querySelector('.travel-img-wrap-full');
    const slideWidth = slider.querySelector('.travel-img');
    slider.style.transform = `translateX(-${slideWidth.offsetWidth}px)`;
    
    // 스타일 바꾸기
    btnColor(e);
})};

[...document.querySelectorAll('.btn2')].forEach((btn) => {
    addBtn2Click(btn);
});
const addBtn3Click = (btn) => {btn.addEventListener('click', (e) => {
    const slider = e.target.parentElement.parentElement.previousElementSibling.querySelector('.travel-img-wrap-full');
    const slideWidth = slider.querySelector('.travel-img');
    slider.style.transform = `translateX(-${slideWidth.offsetWidth*2}px)`;
    
    // 스타일 바꾸기
    btnColor(e);
})};

[...document.querySelectorAll('.btn3')].forEach((btn) => {
    addBtn3Click(btn);
});

const btnColor = (e) => {
    const btns = [...e.target.parentElement.children];
    btns.forEach((btn) => {
        btn.style.backgroundColor = '#000';
    });
    e.target.style.backgroundColor = '#ff00a1';
};

