const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // filter함수 : return값을 이용해 조건에 맞는 요소를 새로 반환
    // -> 해당 li.id가 아닌 요소들만 반환
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    console.log(toDos);
    toDos = cleanToDos;
    console.log(toDos);
    saveToDos();

}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // localStorage은 String만 저장가능
    // -> object타입을 String으로 변환하여 저장
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo)
    const span = document.createElement("span");
    const newId = toDos.length +1;

    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };

    toDos.push(toDoObj);

    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    
    if(loadedToDos !== null){
        // JSON을 통해 String타입을 Object타입으로(parse),
        //     Object타입을 String타입으로 변환가능(stringify)
        const parsedToDos = JSON.parse(loadedToDos);
        // forEach함수 : array에 담겨있는 것들 만큼 각각 한번씩 실행
        // -> object들을 통해 한번씩 실행
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }

}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();