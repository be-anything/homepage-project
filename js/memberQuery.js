// 회원 한명 찾아오기 용이하려고 만듬
const $ = (selector) => {
    return new MemberQuery(selector);
}

class MemberQuery {
    constructor(selector) {
        const elems = JSON.parse(localStorage.getItem(selector));

        if(elems === null)
            return false;

        this.length = elems.length;
        for(let i = 0; i < elems.length; i++){
            this[i] = elems[i];
        }
    }
    getMember(userId) {
        for(let i = 0; i < this.length; i++){
            if(this[i].id === userId) {
                return this[i];
            };
        }
    }
}