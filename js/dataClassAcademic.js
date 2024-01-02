
class Academic{
    
    constructor(academic,students){
        this.students=students;
        this.name=academic.name;
        this.id=academic.id;
    }

    // set navbar is a func that I set the infos at the navbar 
    setNavbar(){
        const name = document.querySelector(".name");
        name.textContent=this.name;
    }

    // it handle the options inside the select of the classes when you want to add calss to a student
    setAddition(){
        const classesData = JSON.parse(localStorage.getItem("classes"));
        const optionsHTML = document.getElementById("selected-class")
        Object.keys(classesData).forEach(className => {
            const option= document.createElement("option");
            option.value=className
            option.innerText=className
            optionsHTML.appendChild(option)
        });
    }

    //sets the student table with their notes and editable
    setDataGradesStudent(keyword){
        const table = document.querySelector("tbody");
        const classesDict = JSON.parse(localStorage.getItem("classes")); //get classes from local storage
        const legitKeyword = keyword == undefined ? "": keyword; //checks the key
        const stdnts = this.filterStudentsByKeyword(this.students,legitKeyword);//create new student list according to key
        stdnts.forEach(student => { 
        Object.keys(student.classes).forEach(className => {
            const tr = document.createElement("tr");//creates row
            const tdClassName=document.createElement("td");// creates row's cols
            const tdStudentName=document.createElement("td");
            const tdMidPoint=document.createElement("td");
            const tdFinPoint=document.createElement("td");
            const tdScale=document.createElement("td");
            const tdGrade=document.createElement("td");
            const tdControl=document.createElement("td");
            // then create the contents of the cols and gives them id to find it easy later
            tdClassName.innerHTML=className;
            const midPoint=student.classes[className].midterm;
            const finPoint=student.classes[className].final;
            const gradingScale=classesDict[className];
            const id=className+student.student_id;
            const midP=document.createElement("p");
            const finP=document.createElement("p");
            tdMidPoint.id= id+"mid";
            tdFinPoint.id= id+"fin";
            midP.innerText=midPoint
            finP.innerText=finPoint
            tdMidPoint.appendChild(midP);
            tdFinPoint.appendChild(finP);
            tdStudentName.innerHTML=student.name + " " + student.surname;
            tdScale.innerHTML=gradingScale;

            // creates controllers such as editing and deleting
            const del = document.createElement("img");
            const edit = document.createElement("img");
            const btndel = document.createElement("button");
            const btnedit = document.createElement("button");
            btnedit.id= id+"edit";
            btndel.id= id+"delete";
            btndel.onclick=()=>this.deleteGrade(student,id,className);
            btnedit.onclick=()=>changeGrade(student,id,className);
            btndel.classList="no-bg no-border"
            btnedit.classList="no-bg no-border"
            edit.setAttribute("src","/images/edit.png")
            del.setAttribute("src","/images/delete.png")
            tdControl.classList="flex-evenly"
            btnedit.appendChild(edit);
            btndel.appendChild(del);
            tdControl.appendChild(btnedit);
            tdControl.appendChild(btndel);


            // here creates 2 input for each midterm and final then makes it hidden
            const inputMid=document.createElement("input");
            const inputFin=document.createElement("input");

            inputMid.type="number";
            inputMid.id=id+"input-mid";
            inputMid.classList="hidden"
            inputMid.min=0;
            inputMid.max=100;
            tdMidPoint.appendChild(inputMid);

            inputFin.type="number";
            inputFin.id=id+"input-fin";
            inputFin.classList="hidden"
            inputFin.min=0;
            inputFin.max=100;
            tdFinPoint.appendChild(inputFin);
            //calculates the grade then all is good
            tdGrade.id=id+"grade"
            tdGrade.innerHTML=GradeCalculator(midPoint,finPoint,gradingScale);
            //appends the children of the row
            tr.appendChild(tdStudentName);
            tr.appendChild(tdClassName);
            tr.appendChild(tdMidPoint);
            tr.appendChild(tdFinPoint);
            tr.appendChild(tdScale);
            tr.appendChild(tdGrade);
            tr.appendChild(tdControl);
            // appends the row into table's body
            table.appendChild(tr);
        });
        });
    }

    //deletes grade both from local storage and html
    deleteGrade(std,id,className){
        // deletes from html
        const dltBtn=document.getElementById(id+"delete");
        dltBtn.parentElement.parentElement.innerHTML=""
        delete std.classes[className]
        // deletes from local storage
        deleteClassFromStorage(std,className)
    }

    addStudentClass(event){
        event.preventDefault()
        setTimeout(() => {
            console.log("heyyy");
        }, 50000);
        const className = document.getElementById("selected-class").value
        const id = document.getElementById("student-id-input").value
        const mid = document.getElementById("student-mid-input").value
        const fin = document.getElementById("student-fin-input").value
        try {
            newPoints={};
            newPoints["midterm"]=mid
            newPoints["final"]=fin
            let students=JSON.parse(localStorage.getItem("students"));
            const index = students.findIndex(student => student.student_id === id);
            students[index].classes[className]=newPoints;
        } catch (error) {
            console.log("errr");
        }
            
    }

    filterStudentsByKeyword(students, keyword) {
        keyword = keyword.toLowerCase();
      
        const filteredStudents = students.filter(student => {
          const nameMatch = student.name.toLowerCase().includes(keyword);
          const surnameMatch = student.surname.toLowerCase().includes(keyword);
      
          const classNames = Object.keys(student.classes);
          const classMatch = classNames.some(className =>
            className.toLowerCase().includes(keyword)
          );
      
          return nameMatch || surnameMatch || classMatch;
        });
      
        return filteredStudents;
      }
      


}


//calculate grades
function GradeCalculator(mid,fin,scale) {
    const calculatedPoint = mid*0.4+fin*0.6;
    if (calculatedPoint>=100-scale) {
        return "A"
    } else if (calculatedPoint>=100-scale*2) {
        return "B"
    } else if (calculatedPoint>=100-scale*3) {
        return "C"
    } else if (calculatedPoint>=100-scale*4) {
        return "D"
    } else {
        return "F"
    }
}

function deleteClassFromStorage(std,className) {
    //update stdudents classes then take students list
    delete std.classes[className]
    const students=JSON.parse(localStorage.getItem("students"));
    const index = students.findIndex(student => student.student_id === std.student_id);
    // updates students list then finaly update local storage 
    students[index]=std;
    localStorage.setItem("students",JSON.stringify(students))
}


function changeGrade(std,id,className){
    const btn=document.getElementById(id+"edit")
    const checkBox = document.createElement("img");
    checkBox.setAttribute("src","/images/check.png")
    checkBox.setAttribute("width","30px")
    checkBox.setAttribute("height","30px")
    
    btn.innerHTML="";
    btn.appendChild(checkBox);

    const midElement = document.getElementById(id+"mid");
    const finElement = document.getElementById(id+"fin");
    
    //set visiblity and input value
    midElement.children[0].classList.add("hidden")
    midElement.children[1].classList.remove("hidden")
    midElement.children[1].value=parseInt(midElement.children[0].innerText);
    finElement.children[0].classList.add("hidden")
    finElement.children[1].classList.remove("hidden")
    finElement.children[1].value=parseInt(finElement.children[0].innerText);
    
    btn.onclick = () => {
        const btn1 = document.getElementById(id+"edit");
        btn1.firstChild.setAttribute("src","/images/edit.png")
        btn1.onclick = ()=>changeGrade(std,id,className);
        changeGradeFromHTML(std,id,className);
    };
}



function changeGradeFromHTML(std,id,className) {
    // gets classes info and inputs' value 
    const allClasses=localStorage.getItem("classes");
    const inputMid = document.getElementById(id+"input-mid");
    const inputFin = document.getElementById(id+"input-fin");
    // then assign it into mid and fins place
    inputMid.parentElement.firstChild.innerText=inputMid.value;
    inputFin.parentElement.firstChild.innerText=inputFin.value;
    // calculate the grade then asign it into letter grade part
    const tdGrade=document.getElementById(id+"grade");
    tdGrade.innerHTML=GradeCalculator(inputMid.value,inputFin.value,allClasses[className]);

    inputMid.parentElement.firstChild.classList=""
    inputMid.parentElement.children[1].classList="hidden"
    inputFin.parentElement.firstChild.classList=""
    inputFin.parentElement.children[1].classList="hidden"
    //after that updates the students list then set the local storage
    newPoints={};
    newPoints["midterm"]=inputMid.value
    newPoints["final"]=inputFin.value
    let students=JSON.parse(localStorage.getItem("students"));
    const index = students.findIndex(student => student.student_id === std.student_id);
    students[index].classes[className]=newPoints;
    localStorage.setItem("students",JSON.stringify(students))
}
