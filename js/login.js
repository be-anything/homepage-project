const findMember = (inputId, inputPwd) => {
    let result = false;
    const members = JSON.parse(localStorage.getItem('members'));
    
    if(members === null)
        return result;

    members.forEach(({ id, pwd }) => {
        if (id === inputId) {
            if (pwd === inputPwd) {
                result = true;
            }
        }
    });
    return result;
};


const loginUser = () => {
    const id = document.querySelector('#id');
    sessionStorage.setItem('loginUser', JSON.stringify(id.value));
    openLoginWindow()();
};


const openLoginWindow = () => {
    open('../login-window.html', 'logout', 'width=500, height=300, top=400, left=400');
    return window.location.href = "../index.html";
}




document.loginFrm.addEventListener('submit', (e) => {
    const id = document.querySelector('#id');
    const pwd = document.querySelector('#pwd');


    if (findMember(id.value, pwd.value)) {
        // loginUser(id.value);
        return true;
    }
    else {
        alert('회원아이디 또는 비밀번호가 틀렸습니다.');
        e.preventDefault();
        e.target.reset();
    }
});

