
const form = document.querySelector("#todo-form");

const todoInput = document.querySelector("#todo");

const todoList = document.querySelector(".list-group");

//bir todo eklendiği zaman başarılı olarak eklendi diye bir alert gelmesi için card-body i parent olarak seçicez.

const firstCardBody = document.querySelectorAll(".card-body")[0];

const secondCardBody =document.querySelectorAll(".card-body")[1];

const filter = document.getElementById("filter");

const clearButton = document.querySelector("#clear-todos");

//----------------------------------------------------------------------------------------
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",LoadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);

    //--------------------------------------------------------------------------------
    clearButton.addEventListener("click",clearAllTodos);

}
//------------------------------------------------------------------------------------
function clearAllTodos(event){
    if(confirm("tümünü silmek istediğinize emin misiniz?")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild); 
        }
        localStorage.removeItem("todos"); 
    }
}
//------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------
//filtreleme için fonksiyon
function filterTodos(event){ 
    const filterValue = event.target.value.toLowerCase(); 
    const listItems = document.querySelectorAll(".list-group-item"); 
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue) === -1){ 
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }
    })
}
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
function deleteTodo(event){
    
    
    
    if (event.target.className==="fa fa-remove"){ 
        event.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(event.target.parentElement.parentElement.textContent);
        showAlert("warning","Başarıyla Silindi...");
    }
}
//------------------------------------------------------------------------------------
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){ 
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos)); 
}
//------------------------------------------------------------------------------------
function LoadAllTodosToUI(){  
    let todos = getTodosFromStorage(); 

    
    todos.forEach(function(tektekgeztodo){
        addTodoToUI(tektekgeztodo); 
    }) 
}
//------------------------------------------------------------------------------------
function addTodo(event){ 
    const newTodo = todoInput.value.trim(); 
    
    if(newTodo===""){ 
        
        showAlert("danger","Lütfen Bir Todo Girin.."); 
    }
    else { 
        addTodoToUI(newTodo);
        
        addTodoToStorage(newTodo);
        showAlert("success","Todo Başarıyla Eklendi...")
    }
    event.preventDefault(); 
    todoInput.value="";
}
//------------------------------------------------------------------------------------------
function getTodosFromStorage(){
   
    let todos;
    
    if (localStorage.getItem("todos")===null){ 
        todos = [];
    }

    else {
        todos = JSON.parse(localStorage.getItem("todos")); 
    }
    return todos; 
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage(); 
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos)); 
}
//------------------------------------------------------------------------------------------
function showAlert(type,message){ 
    const alert = document.createElement("div");   
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    
    window.setTimeout(function(){ 
        alert.remove();
    },1000);  
}
//------------------------------------------------------------------------------------------
function addTodoToUI (newTodo){   
    const listItem = document.createElement("li");    
    listItem.className = "list-group-item d-flex justify-content-between";   
    const link = document.createElement("a");  
    link.href = "#";   
    link.className= "delete-item";
    link.innerHTML= "<i class = 'fa fa-remove'></i>"; 
    listItem.appendChild(document.createTextNode(newTodo)); 
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    }