const findMember = (inputId, inputPwd) => {
    let result = false;
    const $member = $("members").getMember(inputId);
    
    if($member === undefined){
        return result;
    }

    if($member.id === inputId) {
        if($member.pwd === inputPwd){
            result = true;
        }
    }
    return result;
};

const loginUser = () => {
    const id = document.querySelector('#id');
    sessionStorage.setItem('loginUser', JSON.stringify($("members").getMember(id.value)));
    openLoginWindow()();
};

const openLoginWindow = () => {
    open('../login-window.html', 'logout', 'width=500, height=300, top=400, left=400');
    return window.location.href = "../homepage-project/index.html";
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

