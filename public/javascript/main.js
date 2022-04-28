const courses = document.getElementsByClassName("course");

for(let i = 0 ; i < courses.length; i++){
    if(i%2==1){
        courses[i].style.borderLeftColor = "purple";
    }
    if(i%3==0){
        courses[i].style.borderLeftColor = "yellow";
    }
    if(i%5==0){
        courses[i].style.borderLeftColor = "mediumspringgreen";
    }
}