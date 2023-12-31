const data = JSON.parse(localStorage.getItem("data"));// gets the data from local
const classData= new Student(data);// then create student class instance to shape the page

classData.setNavbar()
classData.setDataGrades()
classData.setDataMain()
classData.setInfo()

let currentPage = "#main-content-home";

// in this changePage function we decide which page to be shown and which to be not
function changePage(page) {
    ifLoggedIn();
    if (page!=currentPage) {
         const oldPage = document.querySelector(currentPage);
    let newPage;
    oldPage.classList.add("hidden");//old page will be hidden
    ifLoggedIn();
    switch (page) {
    case '#main-content-grades'://if page matches the case
        currentPage="#main-content-grades"// sets the current page
        newPage = document.querySelector(currentPage); //reach the page via document
        newPage.classList.remove("hidden");// makes the page visible
        break;
    case '#main-content-home':
        currentPage="#main-content-home"
        newPage = document.querySelector(currentPage);
        newPage.classList.remove("hidden");
        currentPage="#main-content-home"
        break;
    case '#main-content-announcement':
        currentPage="#main-content-announcement"
        newPage = document.querySelector(currentPage);
        newPage.classList.remove("hidden");
        currentPage="#main-content-announcement"
        break;
    case '#main-content-general-info':
        currentPage="#main-content-general-info"
        newPage = document.querySelector(currentPage);
        newPage.classList.remove("hidden");
        currentPage="#main-content-general-info"
        break;
    default:
        break;
    }
    }
   
}

// for initial start
changePage('#main-content-home');
