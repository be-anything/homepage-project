const showHideNavMenu = () => {
    const nav = document.querySelector('#main-nav');
    nav.classList.toggle('nav-hide-position');
};
const hideNavMenu = () => {
    const nav = document.querySelector('#main-nav');
    nav.classList.toggle('nav-hide-position');
};

// bgc
// document.querySelector("#main-section-intro div:first-child h1").addEventListener('click', () => {
//     console.log('dddd');
// });

const openLogoutWindow = () => {
    const logoutWindow = open('../logout-window.html', 'logout', 'width=500, height=300, top=400, left=400');
    // 기존 창 reload
    logoutWindow.opener.location.reload();
};

const logoutBtnAddEvent = () => {
    document.querySelector("#logout-btn").addEventListener('click', () => {
        openLogoutWindow();
        sessionStorage.removeItem('loginUser');
    });
};


// 로그인된 유저가 존재할 때, login 제거
(()=> {
    // const existLogin = JSON.parse(localStorage.getItem('loginUser'));
    const existLogin = JSON.parse(sessionStorage.getItem('loginUser'));
    
    // console.log(existLogin);
    // 디자인 변경
    const p = document.querySelector('#main-header p');
    const underLine = document.querySelector('.under-line');


    if(window.document.title === 'Login')
        return;

    if(existLogin) {
        p.innerHTML = '<a id="logout-btn">logout</a>';
        // p.innerHTML = '<a onclick="openLogoutWindow();">logout</a>';
        underLine.style.width = '57px';
        p.style.margin = '0 48px 0 auto';
        p.style.cursor = 'pointer';
        // // logout-btn event핸들러
        logoutBtnAddEvent();

        // bgc가 검정인 aboutme만 폰트 하얀색으로
        if(window.document.title === 'Aboutme' || window.document.title === 'RoadMap'){
            p.style.color = '#fff';
        }
    }
    else {
        p.innerHTML = '<a href="login.html">login</a>';
        underLine.style.width = '50px';
        p.style.margin = '0 40px 0 auto';
    }
})();


// 로그인된 유저가 admin일때 admin 메뉴 노출
(() => {
    const existLogin = JSON.parse(sessionStorage.getItem('loginUser'));
    if(existLogin === 'admin'){
        const nav = document.querySelector('#nav-hide');
        const li = document.createElement('li');
        li.innerHTML = `
        <a href="../admin.html">admin</a>
        <div class="under-line"></div>
        `;
        nav.append(li);
    }
})();

// 로그인되었을때 해당 회원정보 nav에 출력
(() => {
    const loginId = JSON.parse(sessionStorage.getItem('loginUser'));

    if(!loginId)
        return;

    const members = JSON.parse(localStorage.getItem('members'));
    if(members === null) return;

    let selectIdIndex;
    // id만 순회해서 찾아오기
    members.forEach(({ id }, i) => {
        if (id === loginId)
            selectIdIndex = i;
    })
    const {id, profile} = members[selectIdIndex];
    document.querySelector('#loginUser-info').style = 'display: flex;';
    document.querySelector('#user-img-wrap').style = `
    background-image: url(${profile});`
    document.querySelector('#loginUser-info p').innerHTML = `
    ${id}님`;
})();


