function openFunction(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

//notes
const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box");
popupTitle = popupBox.querySelector("header p");
closeIcon = popupBox.querySelector("header i");
titleTag = popupBox.querySelector("input");
descTag = popupBox.querySelector("textarea");
addBtn = popupBox.querySelector("button");
let flashcardsTab = document.getElementById("flashcards");
let flashcardsBtn = flashcardsTab.querySelector(".overall-fc-con");


//Array of months
const months = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November","December"]

//Array for the notes made
//Gets local storage notes, otherwise passes empty array
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", ()=>{
    titleTag.focus();
    popupBox.classList.add("show");
});

// Syntax explanation: This is the shorthand form of writing functions
//the empty brackets after "click" is where parameters go.
closeIcon.addEventListener("click", ()=>{
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index)=> {
        let liTag = `<li class="note">
                        <div class="details">
                        <button type="button" class="collapsible"><p>${note.title}</p></button>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index},'${note.title}','${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}

const homeBtn = document.getElementById("defaultOpen");


showNotes();

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
var coll = document.getElementsByClassName("collapsible");
coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
});
}

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e=>{
        //remove show class from settings when document is clicked (elsewhere)
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}
function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if (!confirmDel) return;
    notes.splice(noteId,1); // removes from the array
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
    var coll = document.getElementsByClassName("collapsible");
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
    }
}

function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
}
addBtn.addEventListener("click", e =>{
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;
    if(noteTitle || noteDesc) {
        //Get the date
        let dateObj = new Date(),
        //get month word from number
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            //Declares object attributes for title, desc
            title: noteTitle, description: noteDesc,
            //date, but it seems to be a string adding vars month,day and year
            date: `${month} ${day}, ${year}`
        } 
        if(!isUpdate) {
            notes.push(noteInfo); //adding new note to notes
        } else {
            //updating specified note by replacing the info in the array
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        //saving notes to local storage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
    console.log("Button clicked");
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
    var coll = document.getElementsByClassName("collapsible");
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
    }
});

const noteHome = document.getElementById("notes-con"),
fcHome = document.getElementById("fc-btn");

function goToNotes(){
  document.getElementById("openNotes").click();
}

function goToReminder(){
  document.getElementById("openReminders").click();
}

function goToFlashcards(){
  document.getElementById("openFlashcards").click();
}

//For flashcards

const flashcards = document.getElementsByClassName("flashcards")[0],
createBox = document.getElementsByClassName("create-box")[0],
cardButton = document.getElementById("save-q-btn"),
question = document.getElementById("question"),
answer = document.getElementById("answer"),
errorMessage = document.getElementById("error");

let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) :[];

contentArray.forEach(divMaker);

function divMaker(text) {
    var div = document.createElement("div");
    var h2_question = document.createElement("h2");
    var h2_answer = document.createElement("h2");

    div.className = 'flashcard';

    h2_question.setAttribute('style', "border-top:1px solid red; padding:15px; margin-top: 30px;");

    h2_question.innerHTML = text.my_question;

    h2_answer.setAttribute('style', "text-align:center; display:none; color: black");
    h2_answer.innerHTML = text.my_answer;
    div.appendChild(h2_question);
    div.appendChild(h2_answer);

    div.addEventListener("click", function(){
        if(h2_answer.style.display == "none")
            h2_answer.style.display = "block";
        else
            h2_answer.style.display = "none";
    } );
    flashcards.appendChild(div);
}

function addFlashcard(){
    var flashcard_info = {
        'my_question' : question.value,
        'my_answer' : answer.value
    }

    contentArray.push(flashcard_info);
    localStorage.setItem('items',JSON.stringify(contentArray));
    divMaker(contentArray[contentArray.length - 1])
    question.value = "";
    answer.value = "";
}

function hideCreateBox() {
    createBox.style.display = "none";
}

function showCreateBox() {
    createBox.style.display = "block";
}

function deleteCard() {
    let confirmDel = confirm("Are you sure you want to delete all cards?");
    if (!confirmDel) return;
    localStorage.removeItem('items');
    flashcards.innerHTML = "";
    contentArray = [];
}



// reminders
const itemsArray= localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

document.querySelector("#enter").addEventListener("click", () => {
    const task = document.querySelector("#task");
    createItem(task);
})

function displayTasks(){
    let tasks = "";
    for(let i = 0; i< itemsArray.length; i++){
        tasks += `<div class="task">
                    <div class="input-controller">
                        <textarea disabled>${itemsArray[i]}</textarea>
                        <div class="edit-controller">
                            <i class="uil uil-check deleteBtn"></i>
                            <i class="uil uil-pen editBtn"></i>
                        </div>
                    </div>
                    <div class="update-controller">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>`
    }
    document.querySelector(".to-do-list").innerHTML = tasks;
    activateDeleteListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
}

function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eb,i)=>{
        eb.addEventListener("click", () => { 
            updateController[i].style.display = "block";
            inputs[i].disabled = false;
        })
    });
}


function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach((db,i)=>{
        db.addEventListener("click", () => { deleteTask(i)})
    });
}

function activateSaveListeners(){
    let saveBtn = document.querySelectorAll(".saveBtn");
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb,i)=>{
        sb.addEventListener("click", () => { 
            updateTask(inputs[i].value,i);
        });
    });
}

function activateCancelListeners(){
    let cancelBtn = document.querySelectorAll(".cancelBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach((cb,i)=>{
        cb.addEventListener("click", () => { 
            updateController[i].style.display = "none";
            inputs[i].disabled = true;
            displayTasks();
        })
    });
}

function updateTask(text,i) {
    itemsArray[i] = text;
    localStorage.setItem("tasks", JSON.stringify(itemsArray));
    displayTasks();
}

function deleteTask(i){
    itemsArray.splice(i,1);
    localStorage.setItem("tasks",JSON.stringify(itemsArray));
    displayTasks();
}

function createItem(task){
    itemsArray.push(task.value);
    localStorage.setItem("tasks",JSON.stringify(itemsArray));
    displayTasks();
    task.value ="";
}
window.onload = function(){
    displayTasks();
}

//quick view functions

let tempArray = itemsArray;
const remindBtn = document.getElementById("show-r-btn");

function listedAll() {
    let tasksList = "";
    for(let i = 0; i< itemsArray.length; i++){
        tasksList += `<div class="task">
                            <div class="input-controller-temp">
                                <textarea disabled>${tempArray[i]}</textarea>
                            </div>
                        </div>`
    }
    document.querySelector(".show-tasks").innerHTML = tasksList;
}

homeBtn.addEventListener("click", ()=>{
    listedAll();
});
let tasksList = "";
let shownTasks = document.querySelector(".show-tasks");
for(let i = 0; i< itemsArray.length; i++){
    tasksList += `<div class="task">
                        <div class="input-controller-temp">
                            <textarea disabled>${tempArray[i]}</textarea>
                        </div>
                    </div>`
}
document.querySelector(".show-tasks").innerHTML = tasksList;
remindBtn.addEventListener("click", ()=>{

    if (shownTasks.classList.contains("hidden")){
        remindBtn.innerText = "Hide";
        shownTasks.classList.toggle("hidden");

    }else{
        remindBtn.innerText = "Show";
        shownTasks.classList.toggle("hidden");
    }
    
});


var displayNote = document.getElementById("view-note");
displayNote.addEventListener("click", ()=>{
    let shownNotes = document.querySelector(".show-note");
    shownNotes.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note)=> {
        let liTag = `<li class="note">
                        <div class="details">
                        <button type="button" class="collapsible"><p>${note.title}</p></button>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            
                        </div>
                    </li>`
        document.querySelector(".show-note").innerHTML += liTag;
        
        });
    if (shownNotes.classList.contains("hidden")){
        displayNote.innerText = "Hide";
        shownNotes.classList.toggle("hidden");
    }else{
        displayNote.innerText = "Show";
        shownNotes.classList.toggle("hidden");
    }
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
    var coll = document.getElementsByClassName("collapsible");
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
    }
    });
