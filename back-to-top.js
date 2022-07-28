const button = document.getElementById('backtotop');

document.readyState = button.style.display = "none"
window.onscroll = function() {scrollFunction()}
function scrollFunction() {
	if(document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
		button.style.display = "block"
	} else {
		button.style.display = "none"
	}
}
function btp() {
	document.body.scrollTop = 0; /* For Safari */
	document.documentElement.scrollTop = 0 /* For other */
}
