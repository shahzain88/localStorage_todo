console.log("بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيم");
const addForm = document.querySelector(".add");
const ul = document.querySelector(".todos");
const search = document.querySelector(".search input");


// up date the todos
const generateTemplate = todos => {

    let html = ``;
    ul.innerHTML = html;
    console.log("ingen")
    for (const id in todos) {

        html = html + `
            <li  class="list-group-item d-flex justify-content-between aligh-items-center">
                <span>${todos[id]}</span>
                <i id="${id}" class="far fa-trash-alt delete"></i>
            </li>
            `;

    }


    ul.innerHTML += html;
}

// get random id
const loadId = () => {
    const lastId = localStorage.getItem("id");
    if (lastId) {

        const id = Number(lastId) + 1;
        localStorage.setItem("id", id);
        return id;
    } else {
        const id = 0;
        localStorage.setItem("id", id);
        return id;
    }

}


// check if oje is empty

const isEmpty = (obj) => {
    for (const i in obj) {
        return false;
    }
    return true;
}

// get todos
const getTodos = () => {

    let todos = localStorage.getItem("todos");

    if (!todos) {
        todos = {};
        return todos;
    }
    todos = JSON.parse(todos);
    return todos;

}
// update todos
const updateTodo = (todo) => {
    const id = loadId();
    let todos = getTodos();
    todos[id] = todo;
    addTodos(todos);
    return true;
}
// add todos
const addTodos = (todos) => {

    todos = JSON.stringify(todos);
    localStorage.setItem("todos", todos);


}


// see if the string is valid hole number
const isStrNumber = (text) => {

    const holeNum = /^[0-9]{0,}$/;
    return holeNum.test(text);


}



// delete todos

const deleteTodo = (id = null) => {

    let todos = localStorage.getItem("todos");
    todos = JSON.parse(todos);

    if (id !== null) {
        delete (todos[id]);
        addTodos(todos);
        return true;
    } else {
        return false;
    }




}


// update henheling
addForm.addEventListener("submit", e => {
    e.preventDefault();
    //string.trim()  will trim the empty spase
    let todo = addForm.add.value.trim();
    updateTodo(todo);
    if (todo.length) {
        generateTemplate(getTodos());
        // addForm.add.value = "";
        // it works like above , but it resets all the input feald 
        addForm.reset();
    }
});


//delete todos

//listening to ul because we want it to de uniqe , so that nomater how big the list gets we can delete it
// delete hendeling
ul.addEventListener("click", e => {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        console.log(e.target.id)

        if (isStrNumber(e.target.id)) {
            deleteTodo(Number(e.target.id));
        }
    }


});



// searching for elements

// function to filter

const filterTool = (term) => {
    // console.log(Array.from(ul.children));
    listUl = Array.from(ul.children);
    // adding class to those witch is not matched with term
    listUl.filter(todo => !todo.textContent.toLowerCase().trim().includes(term))
        .forEach(todo => todo.classList.add("filtered"));
    // removing class from the match
    listUl.filter(todo => todo.textContent.toLowerCase().trim().includes(term))
        .forEach(todo => todo.classList.remove("filtered"));

}

search.addEventListener("keyup", () => {
    const term = search.value.trim().toLowerCase();
    filterTool(term);
});


// update on restart

if (!isEmpty(getTodos())) {
    generateTemplate(getTodos());
}