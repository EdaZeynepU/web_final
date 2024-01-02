
let jSonData;

let students = JSON.parse(localStorage.getItem("students"));
let academics = JSON.parse(localStorage.getItem("academics"));
let classes = JSON.parse(localStorage.getItem("classes"));

const isFetchingNecessary = [students, academics, classes].some(e => e == null);

async function fetchApi() {
    const data = await fetch("../../web_final/api/db.json").then((res) => {//for github pages to see db.json
        return res.json();
    }).then(data => data);

    return data;
}

async function SetDataJSON() {

    const jsonData = await fetchApi();

    if (academics == null) {
        academics = jsonData.academics
        localStorage.setItem("academics", JSON.stringify(academics))
    }
    if (students == null) {
        students = jsonData.students
        localStorage.setItem("students", JSON.stringify(students))
    }
    if (classes == null) {
        classes = jsonData.classes
        localStorage.setItem("classes", JSON.stringify(classes))
    }

    console.log([students, academics, classes]);
}


if (isFetchingNecessary) {
    SetDataJSON();
}

const login = (whoLogs) => {
    let url_name = window.location.href;
    url_name = url_name.substring(0, url_name.length - 15);
    console.log(url_name);
    let user_name;
    let password;
    if (whoLogs == "student") {
        user_name = document.getElementById("user_name_stdnt").value;
        password = document.getElementById("password_stdnt").value;
        students.map(student => {
            if (student.email == user_name && student.password == password) {
                localStorage.setItem("data", JSON.stringify(student));
                localStorage.setItem("isLogged", "1");
                window.location.href = url_name + "html/student";
            }
        })
    } else {
        user_name = document.getElementById("user_name_academic").value;
        password = document.getElementById("password_academic").value;
        academics.map(academic => {
            if (academic.email == user_name && academic.password == password) {
                localStorage.setItem("academic", JSON.stringify(academic));
                localStorage.setItem("students", JSON.stringify(students));
                localStorage.setItem("isLogged", "1");
                window.location.href = url_name + "html/academic";
                console.log("inn");
            }
        })
    }
}


const handleModal = (shouldOpen, which) => {
    const modal = document.querySelector(`#${which}-modal`);
    if (shouldOpen) {
        modal.classList.remove("hidden")
    } else {
        modal.classList.add("hidden")
    }
}

const loginDesicionSetter = (which) => {
    const loginSection = document.querySelector(`#${which}-login`);
    const desicionSection = document.querySelector("#login-desicion");
    desicionSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
}

const goBackToLoginDesicion = (which) => {
    const loginSection = document.querySelector(`#${which}-login`);
    const desicionSection = document.querySelector("#login-desicion");
    desicionSection.classList.remove("hidden");
    loginSection.classList.add("hidden");
}

const ifLoggedIn = (who) => {
    const isLogged = localStorage.getItem("isLogged");
    if (isLogged != "1") {
        let url_name = window.location.href;
        console.log(url_name);
        url_name = url_name.substring(0, url_name.length - (who == "student" ? 13 : 14));
        console.log(url_name);
        window.location.href = url_name + 'html/login.html';
    }
}

function exit(who) {
    localStorage.setItem("isLogged", "0");
    ifLoggedIn(who);
}