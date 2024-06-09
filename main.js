// Add JS here
const parentTodos = document.querySelector(".todo-list");
let todoLists = [];

//show todos from localstorage to parent todos element
const showTodos = () => {
  todoLists = JSON.parse(localStorage.getItem("todos")) ?? [];
  let html = "";
  todoLists.forEach((todo, index) => {
    const name = todo.name;
    const status = todo.status == "done" ? "ongoing" : "done";
    if (index > 0) {
      html += `<hr>`;
    }
    html += `<li>
                    <label onclick="updateTodo('${name}','${status}',${index})">
                    <input ${
                      todo.status == "done" ? "checked" : ""
                    } type="checkbox" name="todo"  id="">
                     
                    <span class="checkmark"></span>
                    <p class="${todo.status}">${todo.name}</p>
                    </label>
                    <span onclick="removeTodo(${index})"><i class="fa fa-trash"></i></span>
                </li>`;
  });

  if (html != "") {
    clearParentTodos();
    parentTodos.innerHTML = html;
  } else {
    parentTodos.innerHTML = `<li style="text-align: center;flex:1;font-size:14px">Add your first todo</li>`;
  }
};

//add new todos
const addTodo = () => {
  const input = document.querySelector(".add-box input");
  const value = input.value;
  if (value == "") {
    alert("field requied");
    return;
  }
  todoLists.unshift({ name: value, status: "ongoing" });
  updateStorage();
  showTodos();
  input.value = "";
};

//remove todo
const removeTodo = (index) => {
  todoLists.splice(index, 1);
  updateStorage();
  showTodos();
};

//update status todos
const updateTodo = (name, status, index) => {
  removeTodo(index);
  todoLists.splice(index, 0, { name, status });
  updateStorage();
  showTodos();
};

//update localstorage
const updateStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todoLists));
};

//clear parent todos element
const clearParentTodos = () => {
  parentTodos.querySelector("li");
  while (parentTodos.firstChild) {
    parentTodos.removeChild(parentTodos.lastChild);
  }
};

//clear all todos
const clearAllTodos = () => {
  todoLists = [];
  updateStorage();
  showTodos();
};

//call function show todos
showTodos();
