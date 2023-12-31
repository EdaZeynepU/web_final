class Student{

    constructor(data){
        this.student_id=data.student_id;
        this.name=data.name;
        this.surname=data.surname;
        this.gpa=data.gpa;
        this.classes=data.classes;
        this.advisor=data.advisor;
        this.country=data.country;
        this.city=data.city;
    }

    // set navbar is a func that I set the infos at the navbar so simple
    setNavbar(){
        const name = document.querySelector(".name");
        const number = document.querySelector(".number");
        name.textContent=this.name;
        number.textContent= this.student_id;

    }


    //in setDatagrades I take the grades from student then add it into a table
    setDataGrades(){
        const table = document.querySelector("tbody");
        const classesDict = JSON.parse(localStorage.getItem("classes"));
        Object.keys(this.classes).forEach(className => {
            const x = document.createElement("tr");// creating the main row
            const a=document.createElement("td");// then the children of the row
            const b=document.createElement("td");
            const c=document.createElement("td");
            const d=document.createElement("td");
            const e=document.createElement("td");

            a.innerHTML=className;// it sets the first col as a classname
            
            // gets the points
            const midPoint=this.classes[className].midterm;
            const finPoint=this.classes[className].final;
            
            const gradingScale=classesDict[className];

            //then sets the other cols such as mid fin
            b.innerHTML=midPoint;
            c.innerHTML=finPoint;
            d.innerHTML=gradingScale;
            e.innerHTML=GradeCalculator(midPoint,finPoint,gradingScale); // this func calculates the note
            //then append all of them into the row
                x.appendChild(a);
                x.appendChild(b);
                x.appendChild(c);
                x.appendChild(d);
                x.appendChild(e);
            table.appendChild(x);// append row into the table
        });
    }

    //in setMainData I fill the empty infos in my main page such as gpa of the student 
    setDataMain() {
        const gpaHtml = document.querySelector(".gpa-student");
        const totalclass = document.querySelector(".count-class");
        const advisor = document.querySelector(".info-advisor");
        gpaHtml.textContent=this.gpa;
        totalclass.textContent=Object.keys(this.classes).length;
        advisor.textContent = this.advisor;
    }

    //in setInfo I fill the empty infos in my infos page such as stuent name just like the other set  
    setInfo(){
        const stdName=document.getElementById("std-info-name");
        const stdSurname=document.getElementById("std-info-surname");
        const stdCountry=document.getElementById("std-info-country");
        const stdCity=document.getElementById("std-info-city");
        const stdGpa=document.getElementById("std-info-gpa");
        const stdAdvisor=document.getElementById("std-info-advisor");
        stdName.innerHTML+=this.name
        stdSurname.innerHTML+=this.surname
        stdCountry.innerHTML+=this.country
        stdCity.innerHTML+=this.city
        stdGpa.innerHTML+=this.gpa
        stdAdvisor.innerHTML+=this.advisor
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