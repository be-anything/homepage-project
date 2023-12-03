document.sendMessageFrm.addEventListener('submit', (e) => {
    console.dir(e);
    const $receiveUser = $('members').getMember(document.querySelector('input[name=receive-user]').value);
    
    if($receiveUser === undefined) {
        alert('받는 사람을 찾을 수 없습니다.');
        e.preventDefault();
        return;
    }
    
    const sendUser = JSON.parse(sessionStorage.getItem('loginUser'));
    const content = document.querySelector('#message-content');
    
    if(!content.value) {
        alert('쪽지 내용을 작성해주세요.');
        e.preventDefault();
        return;
    }
    
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(new Message(sendUser, $receiveUser, content.value));

    localStorage.setItem('messages', JSON.stringify(messages));
    alert('메시지 전송에 성공했습니다.')
});


class Message {
    constructor (sendUser, receiveUser, content, sendAt = Date()) {
        this.sendUser = sendUser;
        this.receiveUser = receiveUser;
        this.content = content;
        this.sendAt = sendAt;
    }
}

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

(() => {
    const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    const isBirth = loginUser.birth ? loginUser.birth : "생년월일 미등록";
    document.querySelector('#profile-info-wrap').innerHTML = `
    <p><strong>이름</strong> : ${loginUser.name}</p>
        <p><strong>아이디</strong> : ${loginUser.id}</p>
        <p><strong>생년월일</strong> : ${isBirth}</p>
        <p><strong>가입일시</strong> : ${covertToDateTime(loginUser.createdAt)}</p>
            `;
    document.querySelector('#profile-img-wrap').innerHTML = `
        <img src="${loginUser.profile}" alt="${loginUser.id}유저의 프로필사진">`;
})();

(() => {
    const inbox = document.inboxMessageFrm;
    const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    const messages = JSON.parse(localStorage.getItem('messages'));

    let myMessages = [];
    messages.forEach((message) => {
        if(message.receiveUser.id === loginUser.id){
            myMessages.push(message);
        }
    })

    inbox.querySelector('tbody').innerHTML = myMessages.reduce((html, {sendUser, receiveUser, content, sendAt}, i) => {
        return `
        ${html}
        <tr>
        <td>${i + 1}</td>
        <td>${content}</td>
        <td>${sendUser.id}</td>
        <td>${covertToDateTime(sendAt)}</td>
        </tr>`
    }, "");
})();

(() => {
    const area = document.querySelector("#content-detail");
    area.innerHTML = document.querySelector("#message-list tr td:nth-child(2)").innerHTML;
})();

document.querySelectorAll('#message-list tr td:nth-child(2)').forEach((tr) => {
    tr.addEventListener('click', (e) => {
        const area = document.querySelector("#content-detail");
        // area.parentElement.style = 'display: table-cell;'
        area.innerHTML = e.target.innerHTML;
    })
})


