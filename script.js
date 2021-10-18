const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);
let globalStore = []; //array of objects
const generateNewCard = (taskData) =>
  `
    <div class="col-sm-12 col-md-6 col-lg-4" >
    <div class="card">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this.arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this.arguments)"></i></button>
      </div>
      <div class="card-body">
        <img src="${taskData.imageUrl}" class="card-img-top" alt="...">
        <h5 class="card-title mt-3 fw-bold text-primary">${taskData.taskTitle}</h5>
        <p class="card-text">${taskData.taskDescription}</p>
        <a href="#" class="btn btn-primary">${taskData.taskType}</a>
      </div>
    </div>
    </div>
  `;


const loadInitialCardData = () => {
  //localstorage to get tasky card data
  const getCardData = localStorage.getItem("tasky");

  //converting to normal object
  const { cards } = JSON.parse(getCardData);

  //loop over those array of task object to create HTML card, inject it to DOM
  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    //update our globalStore
    globalStore.push(cardObject);
  });
}

//delete function
const deleteCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagName = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => {cardObject.id !== targetID});
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

  if (tagName === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  } else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };
  // console.log(taskData);

  const newCard = `
    <div class="col-sm-12 col-md-6 col-lg-4" id=${taskData.id}>
    <div class="card">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="card-body">
        <img src="${taskData.imageUrl}" class="card-img-top" alt="...">
        <h5 class="card-title mt-3 fw-bold text-primary">${taskData.taskTitle}</h5>
        <p class="card-text">${taskData.taskDescription}</p>
        <a href="#" class="btn btn-primary">${taskData.taskType}</a>
      </div>
    </div>
    </div>
    `;

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStore.push(taskData);
  localStorage.setItem("tasky", JSON.stringify({cards: globalStore}));

  // Clear form
  document.getElementById("imageurl").value = "";
  document.getElementById("tasktitle").value = "";
  document.getElementById("tasktype").value = "";
  document.getElementById("taskdescription").value = "";
};

// ${xyz}

//issues

//Page refreshes causes the data to get deleted
//API-> Application Programming Interface
//local storage -> Accessing application via local storage
//Interface -> Interface means middle man

//Features -> delete, edit, open the card
