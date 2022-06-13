// Function to give random colors to header
function changeHeaderColor() {
    var letters = "0123456789ABCDEF";
    var randomColor = "#";
    for (var i = 0; i < 6; i++) {
        randomColor += letters[Math.floor(Math.random() * 16)];
    }
    $("h1").css("color", randomColor);
}
setInterval("changeHeaderColor()", 500);

// Function to add hovering effect to columns
const x = document.getElementById("table");
const td = document.getElementsByTagName("td");
const column = x.getElementsByTagName("col");
const columnEnter = (i) => column[i].classList.add("hover");
const columnLeave = (i) => column[i].classList.remove("hover");

for (var i = 0; i < td.length; i++) {
    const cellIndex = td[i].cellIndex;
    td[i].addEventListener("mouseenter", columnEnter.bind(this, cellIndex));
    td[i].addEventListener("mouseleave", columnLeave.bind(this, cellIndex));
}