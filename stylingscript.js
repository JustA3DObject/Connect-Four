// Function to add hovering effect to columns
let x = document.getElementById("table");
let td = document.getElementsByTagName("td");
let column = x.getElementsByTagName("col");
let columnEnter = (i) => column[i].classList.add("hover");
let columnLeave = (i) => column[i].classList.remove("hover");

for (let i = 0; i < td.length; i++) {
    let cellIndex = td[i].cellIndex;
    td[i].addEventListener("mouseenter", columnEnter.bind(this, cellIndex));
    td[i].addEventListener("mouseleave", columnLeave.bind(this, cellIndex));
}
