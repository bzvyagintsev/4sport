// Get the modal
var modal = document.getElementById('modalWindow');

// Get the button that opens the modal
var btns = document.getElementsByClassName("btn-modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
// document.getElementsByClassName("btn-modal").onclick = function() {
//     modal.style.display = "block";
// }

[].forEach.call(btns, function (el) {
	el.onclick = function() {
    	modal.style.display = "block";
	}
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}