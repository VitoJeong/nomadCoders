const body = document.querySelector("body");

const IMG_NUMBER = 5;


function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber+1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom(){
    // Math객체 함수 -> floor 소수점 이하 버림, ceil 올림
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
 const randomNumber = genRandom();
 paintImage(randomNumber);
}

init();