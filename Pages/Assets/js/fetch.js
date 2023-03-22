const baseUrl = "https://crudcrud.com/api/";
const apikey = "5ded140fe2b144b99301f17b346a1de2";
const url = baseUrl + apikey + "/todos";

const form = document.querySelector("form");
const inputUser = document.getElementById
("input-user");
const listGroup = document.querySelector
(".list-group");
const list_item = [];

// Local storage

if(localStorage.getItem("TO DO ITEMS")){
  const itemLocalStorage = JSON.parse(localStorage.getItem("TO DO ITEMS"));
  itemLocalStorage.forEach(function(itemTodo){
    listGroup.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <h3>${itemTodo}</h3> <span class="fs-3"><i class="bi bi-x-square-fill 
      text-danger" id="delete-btn"></i></span>
    </li> `;

    list_item.push(itemTodo);
  });
  
}

function manageLocalStorage(action, item) {
  switch (action) {
    case 'TAMBAH':
      list_item.push(item);
      break;
    case 'HAPUS':
      list_item = list_item.filter(function (todoItem) {
        return todoItem != item;
      });
      break;
  }

  localStorage.setItem("TO DO ITEMS", JSON.stringify(list_item));

 }

// Todo List

form.addEventListener("submit", function (event) {

 listGroup.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <h3>${inputUser.value}</h3> <span class="fs-3"><i class="bi bi-x-square-fill 
        text-danger" id="delete-btn"></i></span>
    </li> 
    `;
// menambahkan item baru ke local storage

manageLocalStorage("TAMBAH", inputUser.value);


    inputUser.value = "";

    event.preventDefault();
});

listGroup.addEventListener("click", function (event) {
    if (event.target.id == "delete-btn") {
     event.target.parentElement.parentElement.remove();
     manageLocalStorage('HAPUS',event.target.parentElement.parentElement.textContent.trim());
    }
});