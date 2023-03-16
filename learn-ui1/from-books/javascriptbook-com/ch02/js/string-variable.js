// Create variables to hold the name and note text.
var username;
var message;

// Assign values to these variables.
username = 'Molly';
message = 'See our upcoming range';

// Get the element with an id of name.
var elName = document.getElementById('name');
// Replace the content of this element.
elName.textContent = username;

let currHour = new Date().getHours();
console.log("currHour = "+currHour)
if(currHour > 0 && currHour <12)
    document.getElementById("greet").textContent="Morning"
else if(currHour >= 12 && currHour < 17)
    document.getElementById("greet").textContent="Afternoon"
else if(currHour >= 17 && currHour < 20)
    document.getElementById("greet").textContent="Evening"
else document.getElementById("greet").textContent="Night"

// Get the element with an id of note.
var elNote = document.getElementById('note');
// Replace the content of this element.
elNote.textContent = message;

/* 
NOTE: textContent does not work in IE8 or earlier
You can use innerHTML, but note the security issues on p228-231
elName.innerHTML = username;
elNote.innerHTML = message;
*/