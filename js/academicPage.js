// gets the data from local
const data = JSON.parse(localStorage.getItem("academic"));
const studentsData = JSON.parse(localStorage.getItem("students"));
const classesData = JSON.parse(localStorage.getItem("classes"));
const classData = new Academic(data, studentsData);// then create academic class instance to shape the page
const addStudentBtn= document.getElementById("add-class-to-student");
// adds event listener to a addstudent btn for submitting reason
addStudentBtn.addEventListener("click", function(event) {
    event.preventDefault();
    addStudentClass();
  });

classData.setNavbar()
classData.setDataGradesStudent()
classData.setAddition()
// classData.setDataMain()


let currentPage = "#main-content-home";

// in this changePage function we decide which page to be shown and which to be not
function changePage(page) {
    ifLoggedIn();
    if (page != currentPage) {
        const oldPage = document.querySelector(currentPage);
        let newPage;
        oldPage.classList.add("hidden");//old page will be hidden
        ifLoggedIn();
        switch (page) {
            case '#main-content-add-to-system':
                console.log(classData);//if page matches the case
                currentPage = "#main-content-add-to-system"// sets the current page
                newPage = document.querySelector(currentPage);//reach the page via document
                newPage.classList.remove("hidden");// makes the page visible
                break;
            case '#main-content-home':
                console.log(classData);
                currentPage = "#main-content-home"
                newPage = document.querySelector(currentPage);
                newPage.classList.remove("hidden");
                break;
            case '#main-content-grades':
                currentPage = "#main-content-grades"
                newPage = document.querySelector(currentPage);
                newPage.classList.remove("hidden");
                break;
            case '#main-content-addStd':
                currentPage = "#main-content-addStd"
                newPage = document.querySelector(currentPage);
                newPage.classList.remove("hidden");
                break;
            case '#main-content-announcement':
                console.log(classData);
                currentPage="#main-content-announcement"
                newPage = document.querySelector(currentPage);
                newPage.classList.remove("hidden");
                currentPage="#main-content-announcement"
                break;
            default:
                break;
        }
    }

}


function createClass(){
    // gets data
    const className=document.getElementById("class-name-input").value;
    const scale=document.getElementById("grading-scale-input").value;
    classesData[className]= scale;
    localStorage.setItem("classes",JSON.stringify(classesData));// saves the data locally
}

function addStudentClass() {
    // gets values from user
    const stdID=document.getElementById("student-id-input").value;
    const className=document.getElementById("selected-class").value;
    const stdMid=document.getElementById("student-mid-input").value;
    const stdFin=document.getElementById("student-fin-input").value;
    // finds student
    const index = students.findIndex(student => student.student_id == stdID);
    // creates new note then saves it into student
    const newNotes = {};
    newNotes["midterm"]=stdMid
    newNotes["final"]=stdFin
    students[index].classes[className]=newNotes;
    classData.students=students
    localStorage.setItem("students",JSON.stringify(students))//localy save new students data
    location.reload();
}


//decide the table content for search related things 
function HandleTable() {
    const table = document.querySelector("tbody");
    const keyword = document.querySelector("#keyword-input").value; //takes the values
    table.innerHTML="";//clear the table
    classData.setDataGradesStudent(keyword); // send keyword to create new table body
}

changePage('#main-content-home');