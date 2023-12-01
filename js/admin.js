



const f = (n) => n < 10 ? '0' + n : n;
const covertToDateTime = (millis) => {
    const d = new Date(millis);
    const yy = f(d.getFullYear());
    const mm = f(d.getMonth() + 1);
    const dd = f(d.getDate());
    const hh = f(d.getHours());
    const mi = f(d.getMinutes());
    return `${yy}/${mm}/${dd}(${hh}:${mi})`;
};

const printAllMember = () => {
    // const {} = JSON.parse(localStorage.getItem('members'));
    const members = JSON.parse(localStorage.getItem('members'));
    document.querySelector('#member-info').innerHTML =
        members.reduce((html, { id, name, birth, phone, createdAt, isManager }, i) => {
            let isManagerResult = isManager ? '관리자' : '일반회원';
            let isPhone = phone ? phone : '전화번호 미등록';
            let isBirth = birth ? birth : '생년월일 미등록';
            return `
            ${html}
            <tr>
                <td><input type="radio" name="selectUser"></td>
                <td>${i + 1}</td>
                <td>${id}</td>
                <td>${name}</td>
                <td>${isBirth}</td>
                <td>${isPhone}</td>
                <td>${covertToDateTime(createdAt)}</td>
                <td>${isManagerResult}</td>
            </tr>`
        }, "");
};

printAllMember();


document.querySelectorAll('input[name=selectUser]').forEach((input, i) => {
    input.addEventListener('click', (e) => {
        printSelectMember(e);
    });
});



const printSelectMember = (e) => {
    const selectId = e.target.parentElement.parentElement.cells[2].innerHTML;
    const members = JSON.parse(localStorage.getItem('members'));

    let selectIdIndex;
    // id만 순회해서 찾아오기
    members.forEach(({ id }, i) => {
        if (id === selectId)
            selectIdIndex = i;
    })
    const { name, id, birth, createdAt, profile } = members[selectIdIndex];
    document.querySelector('#profile-info-wrap').innerHTML = `
        <p><strong>이름</strong> : ${name}</p>
        <p><strong>아이디</strong> : ${id}</p>
        <p><strong>생년월일</strong> : ${birth}</p>
        <p><strong>가입일시</strong> : ${covertToDateTime(createdAt)}</p>
        `;
    document.querySelector('#profile-img-wrap').innerHTML = `
    <img src="${profile}" alt="${id}유저의 프로필사진">`;
};




// 기본으로 1번 찾아오게 하기 - 코드 통합/리팩토링 필요
(() => {
    const check = document.querySelector('#member-info tr td input');
    check.checked = true;
    const selectId = check.parentElement.parentElement.cells[2].innerHTML;

    const members = JSON.parse(localStorage.getItem('members'));

    let selectIdIndex;
    // id만 순회해서 찾아오기
    members.forEach(({ id }, i) => {
        if (id === selectId)
            selectIdIndex = i;
    })
    const { name, id, birth, createdAt, profile } = members[selectIdIndex];

    document.querySelector('#profile-info-wrap').innerHTML = `
    <p><strong>이름</strong> : ${name}</p>
        <p><strong>아이디</strong> : ${id}</p>
        <p><strong>생년월일</strong> : ${birth}</p>
        <p><strong>가입일시</strong> : ${covertToDateTime(createdAt)}</p>
            `;
    document.querySelector('#profile-img-wrap').innerHTML = `
        <img src="${profile}" alt="${id}유저의 프로필사진">`;
})();