const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    // 데이터를 사용자 로컬저장소에 저장
    /*
    LocalStorage 특징
    ・키(key)와 값(value)을 하나의 세트로 저장.

    ・도메인과 브라우저별로 저장.

    ・값은 반드시 문자열로 저장됨. 
    */
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    // JavaScript의 == 연산은 값만 비교
    //  === 연산은 값과 자료형 모두 비교
    if(currentUser === null){
       askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();