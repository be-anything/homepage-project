// 필수입력사항 미입력시 안내문구 출력(아이디, 비밀번호, 비밀번호확인, 이름)
// sub1 : 필수사항임을 안내
// sub2 : 조건사항 안내
// sub3 : 사용 가능시 노출
// sub4 : 사용 불가시 노출

const regExp = [/^[a-zA-Z0-9]{4,12}$/, [/^.{8,16}$/, /\d/, /[a-zA-Z]/, /[!@#$%^&*()]/], /^[가-힣]{2,}$/, /^010[0-9]{8}$/];
const regTest = (input) => {
    switch(input.id){
        case "id" : 
        return regExp[0].test(input.value);   
        case "pwd" : 
        let bools = [];
            regExp[1].forEach((regExpPwd, i) => {
                bools[i] = regExpPwd.test(input.value);
            });
            console.log(bools);
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
            // console.dir(e.target);
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


const printResult = () => {
    console.log('왜 안돼');
}


// input으로 입력한 값 유효성 검사하기
document.querySelector('#join-submit').onclick = () => {
    const userId = document.querySelector('#id');
    const pwd = document.querySelector('#pwd');
    const pwdConfirm = document.querySelector('#pwdConfirm');
    const name = document.querySelector('#name');
    // const birth = shortInputMerge([...document.querySelectorAll('input[name=birth]')]);
    const phone = shortInputMerge([...document.querySelectorAll('input[name=phone]')]);

    // 1. 아이디 검사
    if(!regExp[0].test(userId.value)) {
        console.log(regExp[0].test(userId.value));
        return false;
    }

    // 2. 비밀번호 검사
    regExp[1].forEach((regExpPwd) => {
        if(!regExpPwd.test(pwd.value))
            return false;
    });

    // 3. 비밀번호 일치여부 검사
    if(!pwd.value === pwdConfirm.value) {
        console.log(!pwd.value === pwdConfirm.value);
        return false;
    }

    // 4. 이름 검사
    if(!regExp[2].test(name.value)) {
        console.log(regExp[2].test(name.value));
        return false;
    }

    // // 5. 생년월일 검사
    // if(regExp[2].test(userId.value)) {
    //     return false;
    // }
    // 5. 핸드폰 번호 검사
    if(!regExp[3].test(phone)) {
        console.log(phone);
        console.log(regExp[3].test(phone));
        return false;
    }

    printResult(); // localStorage에 저장하도록 변경
};

// 생년월일과 핸드폰 번호 문자열 합치기
const shortInputMerge = (inputs) => {
    return inputs.reduce((merge, input) => {
        merge += input.value;
        // console.log(merge);
        // console.log(input.value);
        return merge;
    }, "")
}

