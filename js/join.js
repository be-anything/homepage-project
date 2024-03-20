// 필수입력사항 미입력시 안내문구 출력(아이디, 비밀번호, 비밀번호확인, 이름)
// sub1 : 필수사항임을 안내
// sub2 : 조건사항 안내
// sub3 : 사용 가능시 노출
// sub4 : 사용 불가시 노출

const idIsValid = (userId) => {
    const members = $('members') || [];
    let bool = true;
    for(let i = 0; i < members.length; i++){
        const {id} = members[i];
        if(id === userId){
            // 동일한 아이디있으면 false반환
            bool = false;
            break;
        } 
    }
    return bool;
}
const regExp = [/^[a-zA-Z0-9]{4,12}$/, [/^.{8,16}$/, /\d/, /[a-zA-Z]/, /[!@#$%^&*()]/], /^[가-힣]{2,}$/, /^010[0-9]{8}$/];
const regTest = (input) => {
    switch(input.id){
        case "id" : 
        return regExp[0].test(input.value) && idIsValid(input.value);   
        case "pwd" : 
        let bools = [];
            regExp[1].forEach((regExpPwd, i) => {
                bools[i] = regExpPwd.test(input.value);
            });
            for(let i = 0; i < bools.length; i ++){
                if(!bools[i]) return false;
            }
            return true;
        case "pwdConfirm" :
            return input.value === document.querySelector('#pwd').value;     
            ;
        case "name" :
            return regExp[2].test(input.value);   
        ;
    }
}
const inputSubEvent = (input, i) => {
    input.addEventListener('blur', (e) => {
        if(!e.target.value){
            e.target.nextElementSibling.style = 'display: inline';
        }
        else {
            if(regTest(e.target)){
                e.target.nextElementSibling.nextElementSibling.nextElementSibling.style = 'display: inline';
            }
            else {
                e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style = 'display: inline';
            }
        }
        e.target.nextElementSibling.nextElementSibling.style = 'display: none';
    });
    
    input.addEventListener('focus', (e) => {
        e.target.nextElementSibling.style = 'display: none';
        e.target.nextElementSibling.nextElementSibling.style = 'display: inline';
        e.target.nextElementSibling.nextElementSibling.nextElementSibling.style = 'display: none';
        e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style = 'display: none';
    });
};

[...document.querySelectorAll('input[required]')].forEach((input, i) => {
    inputSubEvent(input, i)
});



class Member {
    constructor(id, pwd, name, birth, phone, createdAt = Date.now(), isManager = false, profile = `https://source.boringavatars.com/beam/300/${id}`) {
        this.id = id;
        this.pwd = pwd;
        this.name = name;
        this.birth = birth;
        this.phone = phone;
        this.createdAt = createdAt;
        this.isManager = isManager;
        this.profile = profile;
        // 기본 이미지 생성
    };
};

const saveMemberInfo = () => {
    const userId = document.querySelector('#id');
    const pwd = document.querySelector('#pwd');
    const name = document.querySelector('#name');
    const birth = shortInputMerge([...document.querySelectorAll('input[name=birth]')]);
    const phone = shortInputMerge([...document.querySelectorAll('input[name=phone]')]);
    
    const members = JSON.parse(localStorage.getItem("members")) || [];
    members.push(new Member(userId.value, pwd.value, name.value, birth, phone));

    // 내 관리자 계정 및 테스트 계정 셋팅
    localStorage.setItem('members', JSON.stringify(members));

    // 초기화
    document.joinfrm.reset();
    openLoginWindow()();
}

const openLoginWindow = () => {
    open('../join-window.html', 'join', 'width=500, height=300, top=400, left=400');
    return window.location.href = "../homepage-project/login.html";
}

// input으로 입력한 값 유효성 검사하기
document.joinfrm.addEventListener('submit', (e) => {
    const userId = document.querySelector('#id');
    const pwd = document.querySelector('#pwd');
    const pwdConfirm = document.querySelector('#pwdConfirm');
    const name = document.querySelector('#name');
    
    // 1. 아이디 검사
    if(!(regExp[0].test(userId.value) && idIsValid(userId.value))) {
        e.preventDefault();
    }
    
    // 2. 비밀번호 검사
    // console.log(!regExpPwd.test(pwd.value));
    regExp[1].forEach((regExpPwd) => {
        if(!regExpPwd.test(pwd.value)){
            e.preventDefault();
        }
    });
    
    // 3. 비밀번호 일치여부 검사
    if(!(pwd.value === pwdConfirm.value)) {
        e.preventDefault();
    }
    
    // 4. 이름 검사
    if(!regExp[2].test(name.value)) {
        e.preventDefault();
    }
});


// 생년월일과 핸드폰 번호 문자열 합치기
const shortInputMerge = (inputs) => {
    return inputs.reduce((merge, input) => {
        merge += input.value;
        return merge;
    }, "")
}

// 관리자 계정 셋팅
(() => {
    const members = JSON.parse(localStorage.getItem("members")) || [];
    
    // 내 관리자 계정 및 테스트 계정 셋팅
    // 이미 셋팅되어있으면 return
    if($('members').getMember('admin')){
        return;
    }

    members.push(new Member('admin', 'admin123*', '관리자', '19930727', '01025326864', Date.now(), true));
    localStorage.setItem('members', JSON.stringify(members));
})()